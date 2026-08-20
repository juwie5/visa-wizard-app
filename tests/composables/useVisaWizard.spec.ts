import { describe, expect, it } from 'vitest'
import { useVisaWizard } from '~/composables/useVisaWizard'
import { canada, germany } from '../fixtures/countries'

describe('useVisaWizard', () => {
  it('blocks invalid navigation and preserves data when navigating back', () => {
    const wizard = useVisaWizard()
    expect(wizard.next()).toBe(false)
    expect(wizard.currentStep.value).toBe(1)

    wizard.form.citizenship = canada
    wizard.form.destination = germany
    expect(wizard.next()).toBe(true)
    wizard.form.fullName = 'Ada Lovelace'
    wizard.back()
    expect(wizard.form.fullName).toBe('Ada Lovelace')
  })

  it('resets every field and returns to geography after completion', () => {
    const wizard = useVisaWizard()
    Object.assign(wizard.form, {
      citizenship: canada,
      destination: germany,
      fullName: 'Ada Lovelace',
      email: 'ada@example.com',
      phone: '802 123 4567',
      phoneCountry: canada,
      dateOfBirth: '1990-01-01',
      passportNumber: 'A-1234567'
    })
    expect(wizard.next()).toBe(true)
    expect(wizard.next()).toBe(true)
    expect(wizard.currentStep.value).toBe(3)

    wizard.reset()
    expect(wizard.currentStep.value).toBe(1)
    expect(wizard.form).toMatchObject({ citizenship: null, destination: null, fullName: '', phoneCountry: null, passportNumber: '' })
    expect(wizard.errors.value).toEqual({})
  })
})
