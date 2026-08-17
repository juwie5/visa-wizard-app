<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'button' | 'submit'
  disabled?: boolean
  iconOnly?: boolean
  label?: string
}>(), {
  type: 'button',
  disabled: false,
  iconOnly: false,
  label: undefined
})
</script>

<template>
  <button
    :type="type"
    class="inline-flex min-h-12 items-center justify-center rounded-[28px] border-0 bg-primary-600 px-[18px] py-3 font-display text-base font-medium leading-5 text-white transition duration-150 hover:-translate-y-px hover:bg-primary-700 disabled:translate-y-0 disabled:bg-zinc-100 disabled:text-zinc-400"
    :class="{ '!min-h-[52px] !w-[52px] !border !border-zinc-200 !bg-white !p-0 !text-zinc-700 hover:!bg-zinc-50': iconOnly }"
    :disabled="disabled"
    :aria-label="iconOnly ? label : undefined"
  >
    <slot />
  </button>
</template>
