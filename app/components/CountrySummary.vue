<script setup lang="ts">
import type { Country } from '~/types/visa'
import { formatLanguages, formatPopulation } from '~/utils/countries'

defineProps<{ label: string, country: Country }>()
</script>

<template>
  <article class="flex min-w-0 gap-3 rounded-[10px] border border-zinc-200 p-3">
    <img class="size-8 rounded-full object-cover" :src="country.flagUrl" :alt="country.flagAlt">
    <div class="flex min-w-0 flex-col">
      <small class="text-[11px] text-zinc-500">{{ label }}</small>
      <strong class="text-sm">{{ country.name }}</strong>
      <span class="text-[11px] text-zinc-500">Pop. {{ formatPopulation(country.population) }} • {{ country.region }}</span>
      <span class="mt-0.5 truncate text-[11px] text-zinc-500">{{ formatLanguages(country.languages) }}</span>
    </div>
  </article>
</template>
