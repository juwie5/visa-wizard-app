import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useApplications } from '~/composables/useApplications'
import type { VisaFormData } from '~/types/visa'
import { canada, germany } from '../fixtures/countries'

const form: VisaFormData = {
  citizenship: canada,
  destination: germany,
  fullName: ' Ada Lovelace ',
  email: ' ada@example.com ',
  phone: '802 123 4567',
  phoneCountry: canada,
  dateOfBirth: '1990-01-01',
  passportNumber: 'a-1234567'
}

describe('useApplications', () => {
  beforeEach(() => {
    sessionStorage.clear()
    useState('visa-applications', () => []).value = []
    vi.restoreAllMocks()
  })

  it('creates, prepends, and session-persists a submission with a stable status', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const first = useApplications()
    const submitted = first.submit(form)

    expect(submitted.status).toBe('Pending')
    expect(submitted.applicant.fullName).toBe('Ada Lovelace')
    expect(submitted.applicant.passportNumber).toBe('A-1234567')
    expect(first.applications.value[0]?.id).toBe(submitted.id)

    first.applications.value = []
    first.hydrate()
    expect(first.applications.value[0]).toMatchObject({ id: submitted.id, status: 'Pending' })
  })

  it('recovers safely from invalid session data', () => {
    sessionStorage.setItem('visa-wizard-applications', '{invalid')
    const state = useApplications()
    state.hydrate()

    expect(state.applications.value).toEqual([])
    expect(sessionStorage.getItem('visa-wizard-applications')).toBeNull()
  })
})
