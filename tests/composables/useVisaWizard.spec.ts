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
})
