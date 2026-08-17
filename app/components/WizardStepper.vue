<script setup lang="ts">
defineProps<{ currentStep: number }>()

const steps = [
  { label: 'Geography', icon: '◎' },
  { label: 'Identity', icon: '▣' },
  { label: 'Verification', icon: '●' }
]
</script>

<template>
  <nav class="flex min-h-[68px] items-center gap-6 bg-primary-25 px-7 py-5 text-primary-200 max-sm:gap-2.5 max-sm:p-4" aria-label="Application progress">
    <template v-for="(step, index) in steps" :key="step.label">
      <div
        class="flex flex-none items-center gap-1.5 font-medium"
        :class="{ 'text-primary-700': currentStep >= index + 1 }"
        :aria-current="currentStep === index + 1 ? 'step' : undefined"
      >
        <span class="grid size-7 place-items-center rounded-full bg-primary-100 text-[17px] text-white" :class="{ '!bg-primary-700': currentStep >= index + 1 }" aria-hidden="true">{{ step.icon }}</span>
        <span class="max-sm:hidden">{{ step.label }}</span>
      </div>
      <span v-if="index < steps.length - 1" class="min-w-9 flex-1 border-t border-dashed border-primary-200 max-sm:min-w-5" aria-hidden="true" />
    </template>
  </nav>
</template>
