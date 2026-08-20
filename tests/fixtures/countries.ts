import type { Country } from '~/types/visa'

export const canada: Country = {
  code: 'CAN', name: 'Canada', capital: 'Ottawa', flagUrl: 'https://example.com/ca.svg',
  flagAlt: 'Flag of Canada', region: 'Americas', population: 38005238,
  languages: ['English', 'French'], idd: { root: '+1', suffixes: [''] }, callingCode: '+1'
}

export const germany: Country = {
  code: 'DEU', name: 'Germany', capital: 'Berlin', flagUrl: 'https://example.com/de.svg',
  flagAlt: 'Flag of Germany', region: 'Europe', population: 83240525,
  languages: ['German'], idd: { root: '+4', suffixes: ['9'] }, callingCode: '+49'
}

export const unitedStates: Country = {
  code: 'USA', name: 'United States', capital: 'Washington, D.C.', flagUrl: 'https://example.com/us.svg',
  flagAlt: 'Flag of the United States', region: 'Americas', population: 329484123,
  languages: ['English'], idd: { root: '+1', suffixes: [''] }, callingCode: '+1'
}
