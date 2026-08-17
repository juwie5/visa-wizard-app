<script setup lang="ts">
import type { Country } from '~/types/visa'
import { formatLanguages, formatPopulation } from '~/utils/countries'

defineProps<{ label: string, country: Country }>()
</script>

<template>
  <article class="country-summary">
    <img :src="country.flagUrl" :alt="country.flagAlt">
    <div>
      <small>{{ label }}</small>
      <strong>{{ country.name }}</strong>
      <span>Pop. {{ formatPopulation(country.population) }} • {{ country.region }}</span>
      <span class="languages">{{ formatLanguages(country.languages) }}</span>
    </div>
  </article>
</template>

<style scoped>
.country-summary { display: flex; gap: 12px; min-width: 0; padding: 12px; border: 1px solid var(--gray-200); border-radius: 10px; }
img { width: 32px; height: 32px; object-fit: cover; border-radius: 50%; }
div { display: flex; min-width: 0; flex-direction: column; }
small, span { color: var(--gray-500); font-size: 11px; }
strong { font-size: 14px; }
.languages { overflow: hidden; margin-top: 2px; text-overflow: ellipsis; white-space: nowrap; }
</style>
