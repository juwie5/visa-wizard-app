import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useCountries } from '~/composables/useCountries'

const payload = [{
  cca3: 'CAN',
  name: { common: 'Canada' },
  capital: ['Ottawa'],
  idd: { root: '+1', suffixes: [''] }
}]

describe('useCountries', () => {
  beforeEach(() => {
    useState('countries', () => []).value = []
    useState('countries-pending', () => false).value = false
    useState('countries-error', () => null).value = null
    useState('countries-loaded', () => false).value = false
    vi.unstubAllGlobals()
  })

  it('normalizes a successful API response', async () => {
    vi.stubGlobal('$fetch', vi.fn().mockResolvedValue(payload))
    const state = useCountries()
    await state.loadCountries()

    expect(state.pending.value).toBe(false)
    expect(state.error.value).toBeNull()
    expect(state.countries.value[0]).toMatchObject({ name: 'Canada', capital: 'Ottawa', callingCode: '+1' })
  })

  it('exposes failures and retries successfully', async () => {
    const fetchMock = vi.fn().mockRejectedValueOnce(new Error('Network unavailable')).mockResolvedValueOnce(payload)
    vi.stubGlobal('$fetch', fetchMock)
    const state = useCountries()

    await state.loadCountries()
    expect(state.error.value).toBe('Network unavailable')
    await state.loadCountries(true)
    expect(state.error.value).toBeNull()
    expect(state.countries.value).toHaveLength(1)
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('treats an empty API response as an error', async () => {
    vi.stubGlobal('$fetch', vi.fn().mockResolvedValue([]))
    const state = useCountries()
    await state.loadCountries()

    expect(state.error.value).toBe('No countries were returned.')
  })
})
