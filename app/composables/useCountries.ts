import type { RestCountry } from '~/types/visa'
import { normalizeCountries } from '~/utils/countries'

export function useCountries() {
  const countries = useState('countries', () => normalizeCountries([]))
  const pending = useState('countries-pending', () => false)
  const error = useState<string | null>('countries-error', () => null)
  const loaded = useState('countries-loaded', () => false)

  async function loadCountries(force = false) {
    if ((loaded.value || pending.value) && !force) return

    pending.value = true
    error.value = null
    try {
      const payload = await $fetch<RestCountry[]>('/api/countries')
      countries.value = normalizeCountries(payload)
      loaded.value = true
      if (!countries.value.length) throw new Error('No countries were returned.')
    } catch (cause) {
      error.value = cause instanceof Error ? cause.message : 'Unable to load countries.'
      loaded.value = false
    } finally {
      pending.value = false
    }
  }

  return { countries, pending, error, loadCountries }
}
