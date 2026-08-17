<script setup lang="ts">
import type { Country } from '~/types/visa'
import { searchCountries } from '~/utils/countries'

const props = withDefaults(defineProps<{
  id: string
  label: string
  countries: Country[]
  modelValue: Country | null
  disabledCode?: string
  error?: string
  pending?: boolean
}>(), {
  disabledCode: undefined,
  error: undefined,
  pending: false
})

const emit = defineEmits<{ 'update:modelValue': [country: Country] }>()
const root = ref<HTMLElement | null>(null)
const query = ref('')
const open = ref(false)
const activeIndex = ref(0)

const results = computed(() => searchCountries(props.countries, query.value).slice(0, 50))

function select(country: Country) {
  if (country.code === props.disabledCode) return
  emit('update:modelValue', country)
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
    <div class="relative">
      <button
        :id="id"
        type="button"
        class="select-control flex min-h-[58px] w-full items-center rounded-[10px] border border-zinc-200 bg-white px-3.5 py-2 text-left text-black shadow-card"
        :class="{ '!border-error-500': error }"
        :aria-expanded="open"
        :aria-controls="`${id}-listbox`"
        :aria-describedby="error ? `${id}-error` : undefined"
        aria-haspopup="listbox"
        @click="open = !open"
        @keydown="onKeydown"
      >
        <span v-if="modelValue" class="flex min-w-0 items-center gap-2.5">
          <img class="size-6 rounded-full object-cover" :src="modelValue.flagUrl" :alt="modelValue.flagAlt">
          <span class="flex min-w-0 flex-col"><strong class="truncate font-medium">{{ modelValue.name }}</strong><small class="text-[11px] text-zinc-500">{{ modelValue.capital }}</small></span>
        </span>
        <span v-else class="text-zinc-400">Select a country...</span>
        <span class="relative ml-auto size-[18px] flex-none rounded-full border-[1.5px] border-zinc-500 after:absolute after:-bottom-0.5 after:-right-1 after:w-1.5 after:rotate-45 after:border-t-[1.5px] after:border-zinc-500" aria-hidden="true" />
      </button>
      <Transition enter-active-class="origin-top transition duration-150" enter-from-class="-translate-y-1 scale-[.99] opacity-0" leave-active-class="origin-top transition duration-150" leave-to-class="-translate-y-1 scale-[.99] opacity-0">
        <div v-if="open" class="absolute top-[calc(100%+6px)] z-20 w-full rounded-[10px] border border-zinc-200 bg-white p-2 shadow-dropdown">
          <div class="flex items-center gap-2.5 rounded-md border border-zinc-200 px-2.5">
            <span class="relative size-3.5 flex-none rounded-full border border-zinc-500 after:absolute after:-bottom-0.5 after:-right-1 after:w-1 after:rotate-45 after:border-t after:border-zinc-500" aria-hidden="true" />
            <input
              v-model="query"
              :aria-label="`Search ${label.toLowerCase()}`"
              placeholder="Search country..."
              autocomplete="off"
              class="w-full border-0 py-2.5 outline-none"
              @keydown="onKeydown"
            >
          </div>
          <div :id="`${id}-listbox`" class="mt-1.5 max-h-[230px] overflow-y-auto" role="listbox">
            <p v-if="pending" class="m-0 p-4 text-center text-zinc-500">Loading countries…</p>
            <p v-else-if="!results.length" class="m-0 p-4 text-center text-zinc-500">No countries found.</p>
            <button
              v-for="(country, index) in results"
              v-else
              :key="country.code"
              type="button"
              role="option"
              class="option flex min-h-12 w-full min-w-0 items-center gap-2.5 rounded-md border-0 bg-transparent px-2.5 py-1.5 text-left hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-[.45]"
              :class="{ 'bg-zinc-100': index === activeIndex }"
              :disabled="country.code === disabledCode"
              :aria-selected="modelValue?.code === country.code"
              @mouseenter="activeIndex = index"
              @click="select(country)"
            >
              <img class="size-6 rounded-full object-cover" :src="country.flagUrl" :alt="country.flagAlt">
              <strong class="min-w-0 truncate font-medium">{{ country.name }}</strong>
              <span v-if="country.code === disabledCode" class="ml-auto text-[11px] text-zinc-500">Selected</span>
            </button>
          </div>
        </div>
      </Transition>
    </div>
    <p v-if="error" :id="`${id}-error`" class="mt-1.5 text-xs text-error-600">{{ error }}</p>
  </div>
</template>
