import type { ApplicationStatus, VisaApplication, VisaFormData } from '~/types/visa'

const statuses: ApplicationStatus[] = ['Pending', 'Approved', 'Rejected']

export function useApplications() {
  const applications = useState<VisaApplication[]>('visa-applications', () => [])

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
        dateOfBirth: form.dateOfBirth,
        passportNumber: form.passportNumber.trim().toUpperCase()
      }
    }
    applications.value.unshift(application)
    return application
  }

  return { applications, submit }
}
