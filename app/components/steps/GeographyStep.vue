<script setup lang="ts">
import type { Country, FieldErrors } from '~/types/visa'
import continueIcon from '~/assets/images/alt-arrow-right.svg'

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
    <div class="px-7 pb-10 pt-[34px] max-sm:px-5 max-sm:py-7">
      <header class="mb-10">
        <h1 id="wizard-heading" class="mb-1.5 text-2xl font-extrabold leading-[27px]">Select your journey</h1>
        <p class="m-0">Define your origin and destination to begin the application process.</p>
      </header>
      <div class="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
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
      <div v-if="citizenship && destination" class="mt-4 flex min-h-[61px] items-center gap-4 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3">
        <div class="relative h-[30px] w-[50px]">
          <img class="absolute size-7 rounded-full border-2 border-white object-cover" :src="citizenship.flagUrl" :alt="citizenship.flagAlt">
          <img class="absolute left-[21px] size-7 rounded-full border-2 border-white object-cover" :src="destination.flagUrl" :alt="destination.flagAlt">
        </div>
        <div class="flex flex-1 flex-col">
          <span class="text-xs text-zinc-700">Route Validated</span>
          <strong class="font-semibold">{{ citizenship.name }} <span class="mx-1 font-normal" aria-hidden="true">→</span> {{ destination.name }}</strong>
        </div>
        <span class="grid size-6 place-items-center rounded-full bg-success-600 text-white" aria-hidden="true">✓</span>
      </div>
    </div>
    <footer class="flex min-h-20 justify-end border-t border-zinc-100 px-7 py-4">
      <BaseButton @click="emit('continue')">Continue <img class="size-5" :src="continueIcon" alt=""></BaseButton>
    </footer>
  </div>
</template>
