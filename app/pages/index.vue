<script setup lang="ts">
import type { Country, VisaFormData } from '~/types/visa'

const { countries, pending, error: countriesError, loadCountries } = useCountries()
const { currentStep, form, errors, clearError, next, back, reset } = useVisaWizard()
const { submit } = useApplications()
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

onMounted(() => loadCountries())
</script>

<template>
  <div class="app-shell">
    <AppHeader />
    <main class="page-content">
      <p v-if="submissionMessage" class="success-message" role="status">✓ {{ submissionMessage }}</p>
      <section class="wizard-card" aria-labelledby="wizard-heading">
        <WizardStepper :current-step="currentStep" />
        <div v-if="countriesError" class="api-error" role="alert">
          <span>{{ countriesError }}</span>
          <button type="button" @click="loadCountries(true)">Retry</button>
        </div>
        <Transition name="step" mode="out-in">
          <GeographyStep
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
          <PersonalDetailsStep
            v-else-if="currentStep === 2"
            key="personal"
            :form="form"
            :errors="errors"
            @update="setPersonalField"
            @back="back"
            @continue="next"
          />
          <ReviewStep
            v-else
            key="review"
            :form="form"
            @back="back"
            @submit="submitApplication"
          />
        </Transition>
      </section>
    </main>
  </div>
</template>

<style scoped>
.page-content {
  width: min(880px, calc(100% - 40px));
  margin: 44px auto;
}

.wizard-card {
  overflow: hidden;
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 16px;
  box-shadow: var(--shadow-card);
}

.success-message {
  margin: 0 0 16px;
  padding: 12px 16px;
  color: var(--success-700);
  background: var(--success-50);
  border: 1px solid #a6f4c5;
  border-radius: 8px;
}

.api-error {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 28px;
  color: var(--error-600);
  background: var(--error-50);
}

.api-error button {
  color: inherit;
  background: transparent;
  border: 0;
  font-weight: 700;
}

.step-enter-active,
.step-leave-active { transition: opacity 180ms ease, transform 180ms ease; }
.step-enter-from { opacity: 0; transform: translateX(10px); }
.step-leave-to { opacity: 0; transform: translateX(-10px); }
</style>
