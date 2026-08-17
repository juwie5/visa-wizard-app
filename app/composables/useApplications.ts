import type { ApplicationStatus, VisaApplication, VisaFormData } from '~/types/visa'

const statuses: ApplicationStatus[] = ['Pending', 'Approved', 'Rejected']
const STORAGE_KEY = 'visa-wizard-applications'

export function useApplications() {
  const applications = useState<VisaApplication[]>('visa-applications', () => [])

  function hydrate() {
    if (!import.meta.client) return
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      applications.value = stored ? JSON.parse(stored) as VisaApplication[] : []
    } catch {
      applications.value = []
      sessionStorage.removeItem(STORAGE_KEY)
    }
  }

  function persist() {
    if (import.meta.client) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(applications.value))
  }

  function submit(form: VisaFormData): VisaApplication {
    if (!form.citizenship || !form.destination) throw new Error('Country selections are required.')
    const status = statuses[Math.floor(Math.random() * statuses.length)] ?? 'Pending'
    const application: VisaApplication = {
      id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      submittedAt: new Date().toISOString(),
      status,
      citizenship: form.citizenship,
      destination: form.destination,
      applicant: {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        phoneCountry: form.phoneCountry,
        dateOfBirth: form.dateOfBirth,
        passportNumber: form.passportNumber.trim().toUpperCase()
      }
    }
    applications.value.unshift(application)
    persist()
    return application
  }

  return { applications, hydrate, submit }
}
