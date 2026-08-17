<script setup lang="ts">
import type { FieldErrors, VisaFormData } from '~/types/visa'

const props = defineProps<{ form: VisaFormData, errors: FieldErrors }>()
const emit = defineEmits<{
  update: [field: keyof VisaFormData, value: string]
  back: []
  continue: []
}>()

const today = new Date().toISOString().slice(0, 10)
interface PersonalField {
  key: 'fullName' | 'email' | 'phone' | 'dateOfBirth' | 'passportNumber'
  label: string
  type?: string
  autocomplete?: string
  placeholder?: string
  prefix?: string
  flagUrl?: string
  max?: string
}

const fields = computed<PersonalField[]>(() => [
  { key: 'fullName', label: 'Full Name', autocomplete: 'name', placeholder: 'Enter full name' },
  { key: 'email', label: 'Email Address', type: 'email', autocomplete: 'email', placeholder: 'you@example.com' },
  { key: 'phone', label: 'Phone Number', type: 'tel', autocomplete: 'tel-national', placeholder: 'Phone number', prefix: props.form.citizenship?.callingCode || '+', flagUrl: props.form.citizenship?.flagUrl },
  { key: 'dateOfBirth', label: 'Date of Birth', type: 'date', autocomplete: 'bday', max: today },
  { key: 'passportNumber', label: 'Passport Number', autocomplete: 'off', placeholder: 'Enter passport number' }
])
</script>

<template>
  <div>
    <div class="step-content">
      <header>
        <h1 id="wizard-heading">Personal Details</h1>
        <p>Please provide accurate information as it appears on your official documents.</p>
      </header>
      <div class="field-grid">
        <FormField
          v-for="field in fields"
          :id="field.key"
          :key="field.key"
          :label="field.label"
          :model-value="String(form[field.key] ?? '')"
          :type="field.type"
          :placeholder="field.placeholder"
          :autocomplete="field.autocomplete"
          :prefix="field.prefix"
          :flag-url="field.flagUrl"
          :max="field.max"
          :error="errors[field.key]"
          @update:model-value="emit('update', field.key, $event)"
        />
      </div>
    </div>
    <footer class="wizard-actions">
      <BaseButton icon-only label="Back to geography" @click="emit('back')">‹</BaseButton>
      <BaseButton @click="emit('continue')">Continue <span aria-hidden="true">›</span></BaseButton>
    </footer>
  </div>
</template>

<style scoped>
.step-content { padding: 34px 28px 40px; }
header { margin-bottom: 40px; }
h1 { margin: 0 0 6px; font-size: 24px; font-weight: 800; line-height: 27px; }
p { margin: 0; }
.field-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.wizard-actions { display: flex; justify-content: space-between; min-height: 84px; padding: 16px 28px; border-top: 1px solid var(--gray-100); }
@media (max-width: 640px) { .field-grid { grid-template-columns: 1fr; } .step-content { padding: 28px 20px; } }
</style>
