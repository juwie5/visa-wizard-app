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
  <div ref="root" class="country-select">
    <label :for="id">{{ label }}</label>
    <div class="control-wrap">
      <button
        :id="id"
        type="button"
        class="select-control"
        :class="{ invalid: error }"
        :aria-expanded="open"
        :aria-controls="`${id}-listbox`"
        :aria-describedby="error ? `${id}-error` : undefined"
        aria-haspopup="listbox"
        @click="open = !open"
        @keydown="onKeydown"
      >
        <span v-if="modelValue" class="selection">
          <img :src="modelValue.flagUrl" :alt="modelValue.flagAlt">
          <span><strong>{{ modelValue.name }}</strong><small>{{ modelValue.capital }}</small></span>
        </span>
        <span v-else class="placeholder">Select a country...</span>
        <span class="search-icon" aria-hidden="true" />
      </button>
      <Transition name="dropdown">
        <div v-if="open" class="dropdown-panel">
          <div class="search-row">
            <span class="search-icon" aria-hidden="true" />
            <input
              v-model="query"
              :aria-label="`Search ${label.toLowerCase()}`"
              placeholder="Search country..."
              autocomplete="off"
              @keydown="onKeydown"
            >
          </div>
          <div :id="`${id}-listbox`" class="options" role="listbox">
            <p v-if="pending" class="state-message">Loading countries…</p>
            <p v-else-if="!results.length" class="state-message">No countries found.</p>
            <button
              v-for="(country, index) in results"
              v-else
              :key="country.code"
              type="button"
              role="option"
              class="option"
              :class="{ active: index === activeIndex }"
              :disabled="country.code === disabledCode"
              :aria-selected="modelValue?.code === country.code"
              @mouseenter="activeIndex = index"
              @click="select(country)"
            >
              <img :src="country.flagUrl" :alt="country.flagAlt">
              <span><strong>{{ country.name }}</strong><small>{{ country.capital }}</small></span>
              <span v-if="country.code === disabledCode" class="unavailable">Selected</span>
            </button>
          </div>
        </div>
      </Transition>
    </div>
    <p v-if="error" :id="`${id}-error`" class="field-error">{{ error }}</p>
  </div>
</template>

<style scoped>
.country-select { position: relative; min-width: 0; }
label { display: block; margin-bottom: 6px; font-weight: 500; }
.control-wrap { position: relative; }
.select-control {
  display: flex; width: 100%; min-height: 58px; padding: 8px 14px; align-items: center;
  text-align: left; color: var(--black); background: var(--white); border: 1px solid var(--gray-200);
  border-radius: 10px; box-shadow: var(--shadow-card);
}
.select-control.invalid { border-color: var(--error-500); }
.placeholder { color: var(--gray-400); }
.selection, .option { display: flex; align-items: center; gap: 10px; min-width: 0; }
.selection img, .option img { width: 24px; height: 24px; object-fit: cover; border-radius: 50%; }
.selection span, .option span { display: flex; flex-direction: column; min-width: 0; }
.selection strong, .option strong { overflow: hidden; font-weight: 500; text-overflow: ellipsis; white-space: nowrap; }
small { color: var(--gray-500); font-size: 11px; }
.search-icon { width: 18px; height: 18px; margin-left: auto; border: 1.5px solid var(--gray-500); border-radius: 50%; position: relative; flex: none; }
.search-icon::after { content: ''; position: absolute; width: 6px; border-top: 1.5px solid var(--gray-500); right: -4px; bottom: -2px; transform: rotate(45deg); }
.dropdown-panel { position: absolute; z-index: 20; top: calc(100% + 6px); width: 100%; padding: 8px; background: var(--white); border: 1px solid var(--gray-200); border-radius: 10px; box-shadow: 0 4px 10px rgb(0 0 0 / 9%); }
.search-row { display: flex; align-items: center; gap: 10px; padding: 0 10px; border: 1px solid var(--gray-200); border-radius: 6px; }
.search-row .search-icon { margin: 0; transform: scale(.75); }
.search-row input { width: 100%; padding: 10px 0; border: 0; outline: 0; }
.options { max-height: 230px; overflow-y: auto; margin-top: 6px; }
.option { width: 100%; min-height: 48px; padding: 6px 10px; text-align: left; background: transparent; border: 0; border-radius: 6px; }
.option:hover, .option.active { background: var(--gray-100); }
.option:disabled { opacity: .45; cursor: not-allowed; }
.unavailable { margin-left: auto; color: var(--gray-500); font-size: 11px; }
.state-message { margin: 0; padding: 16px; color: var(--gray-500); text-align: center; }
.field-error { margin: 6px 0 0; color: var(--error-600); font-size: 12px; }
.dropdown-enter-active, .dropdown-leave-active { transition: opacity 140ms ease, transform 140ms ease; transform-origin: top; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-4px) scale(.99); }
</style>
