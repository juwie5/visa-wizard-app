<script setup lang="ts">
import type { Country, FieldErrors } from '~/types/visa'

defineProps<{
  countries: Country[]
  citizenship: Country | null
  destination: Country | null
  errors: FieldErrors
  pending: boolean
}>()

const emit = defineEmits<{
  'update:citizenship': [country: Country]
  'update:destination': [country: Country]
  continue: []
}>()
</script>

<template>
  <div>
    <div class="step-content">
      <header class="section-heading">
        <h1 id="wizard-heading">Select your journey</h1>
        <p>Define your origin and destination to begin the application process.</p>
      </header>
      <div class="field-grid">
        <CountryDropdown
          id="citizenship"
          label="Citizenship"
          :countries="countries"
          :model-value="citizenship"
          :disabled-code="destination?.code"
          :error="errors.citizenship"
          :pending="pending"
          @update:model-value="emit('update:citizenship', $event)"
        />
        <CountryDropdown
          id="destination"
          label="Destination"
          :countries="countries"
          :model-value="destination"
          :disabled-code="citizenship?.code"
          :error="errors.destination"
          :pending="pending"
          @update:model-value="emit('update:destination', $event)"
        />
      </div>
      <div v-if="citizenship && destination" class="route-valid">
        <div class="flag-stack">
          <img :src="citizenship.flagUrl" :alt="citizenship.flagAlt">
          <img :src="destination.flagUrl" :alt="destination.flagAlt">
        </div>
        <div><strong>Route Validated</strong><span>{{ citizenship.name }} → {{ destination.name }}</span></div>
        <span class="route-check" aria-hidden="true">✓</span>
      </div>
    </div>
    <footer class="wizard-actions end">
      <BaseButton @click="emit('continue')">Continue <span aria-hidden="true">›</span></BaseButton>
    </footer>
  </div>
</template>

<style scoped>
.step-content { padding: 34px 28px 40px; }
.section-heading { margin-bottom: 40px; }
h1 { margin: 0 0 6px; font-size: 24px; font-weight: 800; line-height: 27px; }
p { margin: 0; }
.field-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.route-valid { display: flex; align-items: center; gap: 16px; min-height: 61px; margin-top: 16px; padding: 12px 16px; background: var(--success-50); border: 1px solid #a6f4c5; border-radius: 8px; }
.flag-stack { position: relative; width: 50px; height: 30px; }
.flag-stack img { position: absolute; width: 28px; height: 28px; object-fit: cover; border: 2px solid var(--white); border-radius: 50%; }
.flag-stack img:last-child { left: 21px; }
.route-valid div:nth-child(2) { display: flex; flex: 1; flex-direction: column; }
.route-valid strong { color: var(--success-700); font-size: 12px; }
.route-check { display: grid; width: 24px; height: 24px; color: var(--white); background: var(--success-600); border-radius: 50%; place-items: center; }
.wizard-actions { display: flex; min-height: 80px; padding: 16px 28px; border-top: 1px solid var(--gray-100); }
.wizard-actions.end { justify-content: flex-end; }
@media (max-width: 640px) { .field-grid { grid-template-columns: 1fr; } .step-content { padding: 28px 20px; } }
</style>
