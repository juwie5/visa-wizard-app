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
    class="base-button"
    :class="{ 'icon-only': iconOnly }"
    :disabled="disabled"
    :aria-label="iconOnly ? label : undefined"
  >
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 12px 18px;
  color: var(--white);
  background: var(--primary-600);
  border: 0;
  border-radius: 28px;
  font-family: 'DM Sans', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  transition: background-color 160ms ease, transform 160ms ease;
}

.base-button:hover:not(:disabled) {
  background: var(--primary-700);
  transform: translateY(-1px);
}

.base-button:disabled {
  color: var(--gray-400);
  background: var(--gray-100);
}

.base-button.icon-only {
  width: 52px;
  min-height: 52px;
  padding: 0;
  color: var(--gray-700);
  background: var(--white);
  border: 1px solid var(--gray-200);
}
</style>
