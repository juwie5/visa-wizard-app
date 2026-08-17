<script setup lang="ts">
import type { VisaFormData } from '~/types/visa'
import { formatDate } from '~/utils/countries'

defineProps<{ form: VisaFormData }>()
const emit = defineEmits<{ back: [], submit: [] }>()
</script>

<template>
  <div v-if="form.citizenship && form.destination">
    <div class="step-content">
      <header>
        <h1 id="wizard-heading">Review &amp; Confirm</h1>
        <p>Final check of your application data before submission.</p>
      </header>
      <div class="review-grid">
        <dl class="personal-summary">
          <div><dt>Name</dt><dd>{{ form.fullName }}</dd></div>
          <div><dt>Email</dt><dd>{{ form.email }}</dd></div>
          <div><dt>Phone</dt><dd>{{ form.citizenship.callingCode }} {{ form.phone }}</dd></div>
          <div><dt>DOB</dt><dd>{{ formatDate(form.dateOfBirth) }}</dd></div>
          <div><dt>Passport</dt><dd>{{ form.passportNumber.toUpperCase() }}</dd></div>
        </dl>
        <div class="country-list">
          <CountrySummary label="Citizenship" :country="form.citizenship" />
          <CountrySummary label="Destination" :country="form.destination" />
        </div>
      </div>
      <div class="notice" role="note">
        <span aria-hidden="true">i</span>
        <p>By clicking “Submit Application”, you confirm that all provided information is true and accurate. False information may result in immediate rejection.</p>
      </div>
    </div>
    <footer class="wizard-actions">
      <BaseButton icon-only label="Back to personal details" @click="emit('back')">‹</BaseButton>
      <BaseButton @click="emit('submit')">Submit Application <span aria-hidden="true">›</span></BaseButton>
    </footer>
  </div>
</template>

<style scoped>
.step-content { padding: 34px 28px 28px; }
header { margin-bottom: 30px; }
h1 { margin: 0 0 6px; font-size: 24px; font-weight: 800; line-height: 27px; }
p { margin: 0; }
.review-grid { display: grid; grid-template-columns: 1.1fr .9fr; gap: 16px; }
.personal-summary { margin: 0; padding: 16px; background: var(--gray-50); border: 1px solid var(--gray-200); border-radius: 10px; }
.personal-summary div { display: flex; justify-content: space-between; gap: 16px; margin-bottom: 8px; }
.personal-summary div:last-child { margin-bottom: 0; }
dt { color: var(--gray-500); }
dd { overflow-wrap: anywhere; margin: 0; text-align: right; font-weight: 600; }
.country-list { display: grid; gap: 10px; }
.notice { display: flex; align-items: flex-start; gap: 12px; margin-top: 16px; padding: 12px; background: var(--info-50); border: 1px solid #b2ddff; border-radius: 6px; font-size: 12px; }
.notice > span { display: grid; width: 18px; height: 18px; flex: none; color: var(--white); background: var(--info-500); border-radius: 50%; place-items: center; font-weight: 700; }
.wizard-actions { display: flex; justify-content: space-between; min-height: 80px; padding: 16px 28px; border-top: 1px solid var(--gray-100); }
@media (max-width: 640px) { .review-grid { grid-template-columns: 1fr; } .step-content { padding: 28px 20px; } }
</style>
