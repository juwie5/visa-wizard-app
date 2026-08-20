import type { FieldErrors, VisaFormData } from '~/types/visa'
import { buildCallingCode } from '~/utils/countries'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[0-9 ()-]+$/
const PASSPORT_PATTERN = /^[A-Za-z0-9-]{5,20}$/

export function validateGeography(form: VisaFormData): FieldErrors {
  const errors: FieldErrors = {}
  if (!form.citizenship) errors.citizenship = 'Citizenship is required'
  if (!form.destination) errors.destination = 'Destination is required'
  if (form.citizenship && form.destination && form.citizenship.code === form.destination.code) {
    errors.destination = 'Destination must be different from citizenship'
  }
  return errors
}

export function validatePersonalDetails(form: VisaFormData, today = new Date()): FieldErrors {
  const errors: FieldErrors = {}
  if (!form.fullName.trim()) errors.fullName = 'Full name is required'
  else if (form.fullName.trim().split(/\s+/).length < 2) errors.fullName = 'Enter your first and last name'
  if (!form.email.trim()) errors.email = 'Email address is required'
  else if (!EMAIL_PATTERN.test(form.email)) errors.email = 'Enter a valid email address'
  const phoneCountry = form.phoneCountry ?? form.citizenship
  const callingCode = buildCallingCode(phoneCountry?.idd)
  const subscriberDigits = form.phone.replace(/\D/g, '')
  const internationalDigits = `${callingCode}${form.phone}`.replace(/\D/g, '')
  if (!form.phone.trim()) errors.phone = 'Phone number is required'
  else if (!callingCode) errors.phone = 'Select a country calling code'
  else if (!PHONE_PATTERN.test(form.phone) || subscriberDigits.length < 4 || internationalDigits.length > 15) {
    errors.phone = 'Enter a valid phone number for the selected country code'
  }
  if (!form.dateOfBirth) errors.dateOfBirth = 'Date of birth is required'
  else if (Number.isNaN(Date.parse(form.dateOfBirth))) errors.dateOfBirth = 'Enter a valid date'
  else if (new Date(`${form.dateOfBirth}T00:00:00`) >= today) errors.dateOfBirth = 'Date of birth must be in the past'
  if (!form.passportNumber.trim()) errors.passportNumber = 'Passport number is required'
  else if (!PASSPORT_PATTERN.test(form.passportNumber)) errors.passportNumber = 'Use 5–20 letters, numbers, or hyphens'
  return errors
}
