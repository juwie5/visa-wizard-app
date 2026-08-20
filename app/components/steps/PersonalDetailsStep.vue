<script setup lang="ts">
import type { Country, FieldErrors, VisaFormData } from '~/types/visa'
import continueIcon from '~/assets/images/alt-arrow-right.svg'

defineProps<{ form: VisaFormData, errors: FieldErrors, countries: Country[], countriesPending: boolean }>()
const emit = defineEmits<{
  update: [field: keyof VisaFormData, value: string]
  'update:phoneCountry': [country: Country]
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
  max?: string
}

const fields: PersonalField[] = [
  { key: 'fullName', label: 'Full Name', autocomplete: 'name', placeholder: 'Enter full name' },
  { key: 'email', label: 'Email Address', type: 'email', autocomplete: 'email', placeholder: 'you@example.com' },
  { key: 'phone', label: 'Phone Number', type: 'tel', autocomplete: 'tel-national', placeholder: 'Phone number' },
  { key: 'dateOfBirth', label: 'Date of Birth', type: 'date', autocomplete: 'bday', max: today },
  { key: 'passportNumber', label: 'Passport Number', autocomplete: 'off', placeholder: 'Enter passport number' }
]
</script>

<template>
  <div>
    <div class="px-7 pb-10 pt-[34px] max-sm:px-5 max-sm:py-7">
      <header class="mb-10">
        <h1 id="wizard-heading" class="mb-1.5 text-2xl font-extrabold leading-[27px]">Personal Details</h1>
        <p class="m-0">Please provide accurate information as it appears on your official documents.</p>
      </header>
      <div class="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <template v-for="field in fields" :key="field.key">
          <PhoneField
            v-if="field.key === 'phone'"
            :id="field.key"
            :label="field.label"
            :model-value="form.phone"
            :countries="countries"
            :selected-country="form.phoneCountry || form.citizenship"
            :pending="countriesPending"
            :error="errors.phone"
            @update:model-value="emit('update', 'phone', $event)"
            @update:selected-country="emit('update:phoneCountry', $event)"
          />
          <FormField
            v-else
            :id="field.key"
            :label="field.label"
            :model-value="String(form[field.key] ?? '')"
            :type="field.type"
            :placeholder="field.placeholder"
            :autocomplete="field.autocomplete"
            :max="field.max"
            :error="errors[field.key]"
            @update:model-value="emit('update', field.key, $event)"
          />
        </template>
      </div>
    </div>
    <footer class="flex min-h-[84px] justify-between border-t border-zinc-100 px-7 py-4">
      <BaseButton icon-only label="Back to geography" @click="emit('back')">‹</BaseButton>
      <BaseButton @click="emit('continue')">Continue <img class="size-5" :src="continueIcon" alt=""></BaseButton>
    </footer>
  </div>
</template>
