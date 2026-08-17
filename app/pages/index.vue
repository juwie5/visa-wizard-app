<script setup lang="ts">
import type { Country, VisaFormData } from '~/types/visa'

const { countries, pending, error: countriesError, loadCountries } = useCountries()
const { currentStep, form, errors, clearError, next, back, reset } = useVisaWizard()
const { applications, hydrate, submit } = useApplications()
const submissionMessage = ref('')

function setCountry(field: 'citizenship' | 'destination', country: Country) {
  form[field] = country
  clearError(field)
}

function setPersonalField(field: keyof VisaFormData, value: string) {
  if (typeof form[field] === 'string') (form[field] as string) = value
  clearError(field)
}

function submitApplication() {
  submit(form)
  reset()
  submissionMessage.value = 'Application submitted successfully.'
  window.setTimeout(() => { submissionMessage.value = '' }, 4000)
}

onMounted(() => {
  loadCountries()
  hydrate()
})
</script>

<template>
  <div>
    <AppHeader />
    <main class="mx-auto my-11 w-[min(880px,calc(100%-40px))]">
      <p v-if="submissionMessage" class="mb-4 rounded-lg border border-success-200 bg-success-50 px-4 py-3 text-success-700" role="status">✓ {{ submissionMessage }}</p>
      <section class="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-card" aria-labelledby="wizard-heading">
        <WizardStepper :current-step="currentStep" />
        <div v-if="countriesError" class="flex items-center justify-between bg-error-50 px-7 py-3 text-error-600" role="alert">
          <span>{{ countriesError }}</span>
          <button class="border-0 bg-transparent font-bold text-inherit" type="button" @click="loadCountries(true)">Retry</button>
        </div>
        <Transition enter-active-class="transition duration-200" enter-from-class="translate-x-2.5 opacity-0" leave-active-class="transition duration-200" leave-to-class="-translate-x-2.5 opacity-0" mode="out-in">
          <StepsGeographyStep
            v-if="currentStep === 1"
            key="geography"
          :countries="countries"
          :citizenship="form.citizenship"
          :destination="form.destination"
          :errors="errors"
          :pending="pending"
            @update:citizenship="setCountry('citizenship', $event)"
            @update:destination="setCountry('destination', $event)"
            @continue="next"
          />
          <StepsPersonalDetailsStep
            v-else-if="currentStep === 2"
            key="personal"
            :form="form"
            :errors="errors"
            @update="setPersonalField"
            @back="back"
            @continue="next"
          />
          <StepsReviewStep
            v-else
            key="review"
            :form="form"
            @back="back"
            @submit="submitApplication"
          />
        </Transition>
      </section>
      <ApplicationsList :applications="applications" />
    </main>
  </div>
</template>
