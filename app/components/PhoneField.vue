<script setup lang="ts">
import type { Country } from '~/types/visa'
import { searchCountries } from '~/utils/countries'

const props = withDefaults(defineProps<{
  id: string
  label: string
  modelValue: string
  countries: Country[]
  selectedCountry: Country | null
  error?: string
  pending?: boolean
}>(), { error: undefined, pending: false })

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:selectedCountry': [country: Country]
}>()

const root = ref<HTMLElement | null>(null)
const query = ref('')
const open = ref(false)
const activeIndex = ref(0)
const results = computed(() => searchCountries(props.countries.filter(country => country.callingCode), query.value))

function select(country: Country) {
  emit('update:selectedCountry', country)
  query.value = ''
  open.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (!open.value && ['ArrowDown', 'Enter', ' '].includes(event.key)) {
    event.preventDefault()
    open.value = true
    return
  }
  if (!open.value) return
  if (event.key === 'Escape') open.value = false
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    activeIndex.value = Math.min(activeIndex.value + 1, results.value.length - 1)
  }
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    activeIndex.value = Math.max(activeIndex.value - 1, 0)
  }
  if (event.key === 'Enter' && results.value[activeIndex.value]) {
    event.preventDefault()
    select(results.value[activeIndex.value]!)
  }
}

function closeOnOutside(event: MouseEvent) {
  if (!root.value?.contains(event.target as Node)) open.value = false
}

watch(query, () => { activeIndex.value = 0 })
onMounted(() => document.addEventListener('mousedown', closeOnOutside))
onBeforeUnmount(() => document.removeEventListener('mousedown', closeOnOutside))
</script>

<template>
  <div ref="root" class="relative min-w-0">
    <label class="mb-1.5 block font-medium" :for="id">{{ label }}</label>
    <div class="flex min-h-[58px] rounded-[10px] border border-zinc-200 bg-white shadow-card focus-within:border-primary-600" :class="{ '!border-error-500': error }">
      <button
        type="button"
        class="flex flex-none items-center gap-2 rounded-l-[9px] border-0 bg-transparent py-2 pl-3.5 pr-2 text-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0"
        aria-label="Choose phone country code"
        aria-haspopup="listbox"
        :aria-expanded="open"
        :aria-controls="`${id}-country-listbox`"
        @click="open = !open"
        @keydown="onKeydown"
      >
        <img v-if="selectedCountry" class="size-6 rounded-full object-cover" :src="selectedCountry.flagUrl" :alt="selectedCountry.flagAlt">
        <span>{{ selectedCountry?.callingCode || '+' }}</span>
      </button>
      <input
        :id="id"
        :value="modelValue"
        type="tel"
        placeholder="Phone number"
        autocomplete="tel-national"
        :aria-invalid="Boolean(error)"
        :aria-describedby="error ? `${id}-error` : undefined"
        class="w-full min-w-0 rounded-r-[9px] border-0 bg-transparent p-3.5 pl-1 text-black outline-none placeholder:text-zinc-400 focus-visible:ring-0 focus-visible:ring-offset-0"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
    </div>

    <Transition enter-active-class="origin-top transition duration-150" enter-from-class="-translate-y-1 scale-[.99] opacity-0" leave-active-class="origin-top transition duration-150" leave-to-class="-translate-y-1 scale-[.99] opacity-0">
      <div v-if="open" class="absolute top-[calc(100%+6px)] z-30 w-full rounded-[10px] border border-zinc-200 bg-white p-2 shadow-dropdown">
        <div class="flex items-center gap-2.5 rounded-md border border-zinc-200 px-2.5 focus-within:border-primary-600">
          <span class="relative size-3.5 flex-none rounded-full border border-zinc-500 after:absolute after:-bottom-0.5 after:-right-1 after:w-1 after:rotate-45 after:border-t after:border-zinc-500" aria-hidden="true" />
          <input v-model="query" aria-label="Search phone country code" placeholder="Search country..." autocomplete="off" class="w-full border-0 py-2.5 outline-none focus-visible:ring-0 focus-visible:ring-offset-0" @keydown="onKeydown">
        </div>
        <div :id="`${id}-country-listbox`" class="mt-1.5 max-h-[230px] overflow-y-auto" role="listbox">
          <p v-if="pending" class="m-0 p-4 text-center text-zinc-500">Loading countries…</p>
          <p v-else-if="!results.length" class="m-0 p-4 text-center text-zinc-500">No countries found.</p>
          <button
            v-for="(country, index) in results"
            v-else
            :key="country.code"
            type="button"
            role="option"
            :aria-selected="selectedCountry?.code === country.code"
            class="flex min-h-12 w-full items-center gap-2.5 rounded-md border-0 bg-transparent px-2.5 py-1.5 text-left hover:bg-zinc-100"
            :class="{ 'bg-zinc-100': index === activeIndex }"
            @mouseenter="activeIndex = index"
            @click="select(country)"
          >
            <img class="size-6 rounded-full object-cover" :src="country.flagUrl" :alt="country.flagAlt">
            <strong class="min-w-0 flex-1 truncate font-medium">{{ country.name }}</strong>
            <span class="text-zinc-500">{{ country.callingCode }}</span>
          </button>
        </div>
      </div>
    </Transition>
    <p v-if="error" :id="`${id}-error`" class="mt-1.5 text-xs text-error-600">{{ error }}</p>
  </div>
</template>
