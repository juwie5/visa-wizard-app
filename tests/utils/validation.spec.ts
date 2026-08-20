import { describe, expect, it } from 'vitest'
import type { VisaFormData } from '~/types/visa'
import { validateGeography, validatePersonalDetails } from '~/utils/validation'
import { canada, germany } from '../fixtures/countries'

const validForm: VisaFormData = {
  citizenship: canada,
  destination: germany,
  fullName: 'Ada Lovelace',
  email: 'ada@example.com',
  phone: '802 123 4567',
  phoneCountry: canada,
  dateOfBirth: '1990-01-01',
  passportNumber: 'A1234567'
}

describe('visa validation', () => {
  it('rejects missing or matching countries', () => {
    expect(validateGeography({ ...validForm, citizenship: null, destination: null })).toMatchObject({ citizenship: expect.any(String), destination: expect.any(String) })
    expect(validateGeography({ ...validForm, destination: canada }).destination).toContain('different')
  })

  it('accepts complete personal details', () => {
    expect(validatePersonalDetails(validForm, new Date('2026-01-01'))).toEqual({})
  })

  it('accepts hyphens in passport numbers', () => {
    expect(validatePersonalDetails({ ...validForm, passportNumber: 'A-1234567' }, new Date('2026-01-01')).passportNumber).toBeUndefined()
  })

  it('validates the complete international phone length using the selected country idd', () => {
    expect(validatePersonalDetails({ ...validForm, phone: '123456789012345' }, new Date('2026-01-01')).phone).toContain('selected country code')
    expect(validatePersonalDetails({ ...validForm, phoneCountry: { ...germany, idd: {}, callingCode: '' } }, new Date('2026-01-01')).phone).toContain('calling code')
  })

  it('returns field-specific errors for invalid details', () => {
    const errors = validatePersonalDetails({ ...validForm, fullName: 'Ada', email: 'bad', phone: '1', dateOfBirth: '2030-01-01', passportNumber: '!@' }, new Date('2026-01-01'))
    expect(Object.keys(errors)).toEqual(expect.arrayContaining(['fullName', 'email', 'phone', 'dateOfBirth', 'passportNumber']))
  })
})
