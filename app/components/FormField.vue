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
  <div class="min-w-0">
    <label class="mb-1.5 block font-medium" :for="id">{{ label }}</label>
    <div class="flex min-h-[58px] overflow-hidden rounded-[10px] border border-zinc-200 bg-white shadow-card focus-within:border-primary-600 focus-within:ring-4 focus-within:ring-primary-600/10" :class="{ '!border-error-500': error }">
      <div v-if="prefix" class="flex items-center gap-2 whitespace-nowrap pl-3.5 text-zinc-700" aria-hidden="true">
        <img v-if="flagUrl" class="size-6 rounded-full object-cover" :src="flagUrl" alt="">
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
        class="w-full min-w-0 border-0 bg-transparent p-3.5 text-black outline-none placeholder:text-zinc-400"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
    </div>
    <p v-if="error" :id="`${id}-error`" class="mt-1.5 text-xs text-error-600">{{ error }}</p>
  </div>
</template>
