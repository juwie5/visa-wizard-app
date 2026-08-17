<script setup lang="ts">
import type { Country, FieldErrors } from '~/types/visa'

const { countries, pending, error: countriesError, loadCountries } = useCountries()
const citizenship = ref<Country | null>(null)
const destination = ref<Country | null>(null)
const errors = ref<FieldErrors>({})

function validateGeography() {
  errors.value = {
    ...(!citizenship.value && { citizenship: 'Citizenship is required' }),
    ...(!destination.value && { destination: 'Destination is required' })
  }
  if (citizenship.value?.code === destination.value?.code) {
    errors.value.destination = 'Destination must be different from citizenship'
  }
}

onMounted(() => loadCountries())
</script>

<template>
  <div class="app-shell">
    <AppHeader />
    <main class="page-content">
      <section class="wizard-card" aria-labelledby="wizard-heading">
        <WizardStepper :current-step="1" />
        <div v-if="countriesError" class="api-error" role="alert">
          <span>{{ countriesError }}</span>
          <button type="button" @click="loadCountries(true)">Retry</button>
        </div>
        <GeographyStep
          :countries="countries"
          :citizenship="citizenship"
          :destination="destination"
          :errors="errors"
          :pending="pending"
          @update:citizenship="citizenship = $event; errors.citizenship = undefined"
          @update:destination="destination = $event; errors.destination = undefined"
          @continue="validateGeography"
        />
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
</style>
