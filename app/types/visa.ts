export type ApplicationStatus = 'Pending' | 'Approved' | 'Rejected'
export type WizardStep = 1 | 2 | 3

export interface Country {
  code: string
  name: string
  capital: string
  flagUrl: string
  flagAlt: string
  region: string
  population: number
  languages: string[]
  idd: NonNullable<RestCountry['idd']>
  callingCode: string
}

export interface RestCountry {
  cca3?: string
  name?: { common?: string }
  capital?: string[]
  flags?: { svg?: string, png?: string, alt?: string }
  region?: string
  population?: number
  languages?: Record<string, string>
  idd?: { root?: string, suffixes?: string[] }
}

export interface VisaFormData {
  citizenship: Country | null
  destination: Country | null
  fullName: string
  email: string
  phone: string
  phoneCountry: Country | null
  dateOfBirth: string
  passportNumber: string
}

export interface VisaApplication {
  id: string
  submittedAt: string
  status: ApplicationStatus
  applicant: Omit<VisaFormData, 'citizenship' | 'destination'>
  citizenship: Country
  destination: Country
}

export type FieldErrors = Partial<Record<keyof VisaFormData, string>>
