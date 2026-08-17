import type { FieldErrors, VisaFormData, WizardStep } from '~/types/visa'
import { validateGeography, validatePersonalDetails } from '~/utils/validation'
import { reactive, ref } from 'vue'

function emptyForm(): VisaFormData {
  return {
    citizenship: null,
    destination: null,
    fullName: '',
    email: '',
    phone: '',
    phoneCountry: null,
    dateOfBirth: '',
    passportNumber: ''
  }
}

export function useVisaWizard() {
  const currentStep = ref<WizardStep>(1)
  const form = reactive<VisaFormData>(emptyForm())
  const errors = ref<FieldErrors>({})

  function clearError(field: keyof VisaFormData) {
    if (errors.value[field]) errors.value = { ...errors.value, [field]: undefined }
  }

  function next() {
    errors.value = currentStep.value === 1 ? validateGeography(form) : validatePersonalDetails(form)
    if (Object.values(errors.value).some(Boolean)) return false
    if (currentStep.value < 3) currentStep.value = (currentStep.value + 1) as WizardStep
    return true
  }

  function back() {
    errors.value = {}
    if (currentStep.value > 1) currentStep.value = (currentStep.value - 1) as WizardStep
  }

  function reset() {
    Object.assign(form, emptyForm())
    currentStep.value = 1
    errors.value = {}
  }

  return { currentStep, form, errors, clearError, next, back, reset }
}
