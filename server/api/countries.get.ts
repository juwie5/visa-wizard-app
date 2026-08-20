import type { RestCountry } from '../../app/types/visa'

interface V5Country {
  names?: { common?: string }
  codes?: { alpha_3?: string }
  capitals?: Array<{ name?: string }>
  flag?: { url_svg?: string, url_png?: string, emoji?: string }
  region?: string
  population?: number
  languages?: Array<{ name?: string }>
  calling_codes?: string[]
}

interface V5Response {
  data?: {
    objects?: V5Country[]
    meta?: { total?: number }
  }
  errors?: Array<{ message?: string }>
}

const RESPONSE_FIELDS = [
  'names.common',
  'codes.alpha_3',
  'capitals',
  'flag',
  'region',
  'population',
  'languages',
  'calling_codes'
].join(',')

function normalizeV5(country: V5Country): RestCountry {
  const callingCode = country.calling_codes?.[0] ?? ''

  return {
    cca3: country.codes?.alpha_3,
    name: { common: country.names?.common },
    capital: country.capitals?.map(capital => capital.name).filter((name): name is string => Boolean(name)),
    flags: {
      svg: country.flag?.url_svg,
      png: country.flag?.url_png,
      alt: country.names?.common ? `Flag of ${country.names.common}` : country.flag?.emoji
    },
    region: country.region,
    population: country.population,
    languages: Object.fromEntries(
      (country.languages ?? [])
        .map((language, index) => [String(index), language.name])
        .filter((entry): entry is [string, string] => Boolean(entry[1]))
    ),
    idd: {
      root: callingCode,
      suffixes: []
    }
  }
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const apiKey = config.restCountriesApiKey

  if (!apiKey) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Country service is not configured. Add NUXT_REST_COUNTRIES_API_KEY to your environment.'
    })
  }

  const countries: V5Country[] = []
  let offset = 0
  let total = 1

  while (offset < total) {
    const response = await $fetch<V5Response>(config.restCountriesApiBase, {
      headers: { Authorization: `Bearer ${apiKey}` },
      query: { response_fields: RESPONSE_FIELDS, limit: 100, offset }
    })

    if (response.errors?.length) {
      throw createError({ statusCode: 502, statusMessage: response.errors[0]?.message ?? 'REST Countries request failed.' })
    }

    const objects = response.data?.objects ?? []
    countries.push(...objects)
    total = response.data?.meta?.total ?? objects.length
    offset += objects.length
    if (!objects.length) break
  }

  return countries.map(normalizeV5)
})
