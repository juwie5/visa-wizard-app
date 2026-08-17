import { describe, expect, it } from 'vitest'
import { buildCallingCode, formatLanguages, formatPopulation, normalizeCountry, searchCountries } from '~/utils/countries'
import { canada, germany, unitedStates } from '../fixtures/countries'

describe('country utilities', () => {
  it('normalizes the API calling code and country values', () => {
    expect(buildCallingCode({ root: '+2', suffixes: ['34', '35'] })).toBe('+234')
    expect(buildCallingCode()).toBe('')
    expect(normalizeCountry({ cca3: 'CAN', name: { common: 'Canada' }, idd: { root: '+1' } })?.callingCode).toBe('+1')
  })

  it('finds countries despite misspellings', () => {
    const countries = [canada, germany, unitedStates]
    expect(searchCountries(countries, 'Grmany')[0]?.name).toBe('Germany')
    expect(searchCountries(countries, 'Untd Stats')[0]?.name).toBe('United States')
  })

  it('formats review metadata', () => {
    expect(formatPopulation(38_005_238)).toBe('38,005,238')
    expect(formatLanguages(['English', 'French'])).toBe('English, French')
    expect(formatLanguages([])).toBe('Not listed')
  })
})
