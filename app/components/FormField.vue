<script setup lang="ts">
withDefaults(defineProps<{
  id: string
  label: string
  modelValue: string
  type?: string
  placeholder?: string
  error?: string
  prefix?: string
  flagUrl?: string
  max?: string
  autocomplete?: string
}>(), {
  type: 'text', placeholder: '', error: undefined, prefix: undefined, flagUrl: undefined, max: undefined, autocomplete: undefined
})

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <div class="form-field">
    <label :for="id">{{ label }}</label>
    <div class="input-wrap" :class="{ invalid: error, prefixed: prefix }">
      <div v-if="prefix" class="prefix" aria-hidden="true">
        <img v-if="flagUrl" :src="flagUrl" alt="">
        <span>{{ prefix }}</span>
      </div>
      <input
        :id="id"
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :aria-invalid="Boolean(error)"
        :aria-describedby="error ? `${id}-error` : undefined"
        :max="max"
        :autocomplete="autocomplete"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
    </div>
    <p v-if="error" :id="`${id}-error`" class="field-error">{{ error }}</p>
  </div>
</template>

<style scoped>
.form-field { min-width: 0; }
label { display: block; margin-bottom: 6px; font-weight: 500; }
.input-wrap { display: flex; min-height: 58px; overflow: hidden; background: var(--white); border: 1px solid var(--gray-200); border-radius: 10px; box-shadow: var(--shadow-card); }
.input-wrap:focus-within { border-color: var(--primary-600); box-shadow: 0 0 0 3px rgb(79 0 208 / 12%); }
.input-wrap.invalid { border-color: var(--error-500); }
input { width: 100%; min-width: 0; padding: 14px; color: var(--black); background: transparent; border: 0; outline: 0; }
input::placeholder { color: var(--gray-400); }
.prefix { display: flex; align-items: center; gap: 8px; padding-left: 14px; color: var(--gray-700); white-space: nowrap; }
.prefix img { width: 24px; height: 24px; object-fit: cover; border-radius: 50%; }
.field-error { margin: 6px 0 0; color: var(--error-600); font-size: 12px; }
</style>
