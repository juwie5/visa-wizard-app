import Fuse from 'fuse.js'
import type { Country, RestCountry } from '~/types/visa'

export function buildCallingCode(idd?: RestCountry['idd']): string {
  if (!idd?.root) return ''
  return `${idd.root}${idd.suffixes?.[0] ?? ''}`
}

export function normalizeCountry(country: RestCountry): Country | null {
  const name = country.name?.common
  const code = country.cca3
  if (!name || !code) return null

  return {
    code,
    name,
    capital: country.capital?.[0] ?? 'No capital',
    flagUrl: country.flags?.svg ?? country.flags?.png ?? '',
    flagAlt: country.flags?.alt ?? `Flag of ${name}`,
    region: country.region ?? 'Unknown region',
    population: country.population ?? 0,
    languages: Object.values(country.languages ?? {}).sort(),
    callingCode: buildCallingCode(country.idd)
  }
}

export function normalizeCountries(payload: RestCountry[]): Country[] {
  return payload
    .map(normalizeCountry)
    .filter((country): country is Country => country !== null)
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function searchCountries(countries: Country[], query: string): Country[] {
  const search = query.trim()
  if (!search) return countries

  return new Fuse(countries, {
    keys: ['name', 'capital', 'code'],
    threshold: 0.4,
    ignoreLocation: true
  }).search(search).map(result => result.item)
}

export function formatPopulation(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

export function formatLanguages(languages: string[]): string {
  return languages.length ? languages.join(', ') : 'Not listed'
}

export function formatDate(value: string): string {
  if (!value) return 'Not provided'
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(`${value}T00:00:00`))
}
