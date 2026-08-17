<script setup lang="ts">
defineProps<{ currentStep: number }>()

const steps = [
  { label: 'Geography', icon: '◎' },
  { label: 'Identity', icon: '▣' },
  { label: 'Verification', icon: '●' }
]
</script>

<template>
  <nav class="stepper" aria-label="Application progress">
    <template v-for="(step, index) in steps" :key="step.label">
      <div
        class="step"
        :class="{ active: currentStep >= index + 1, current: currentStep === index + 1 }"
        :aria-current="currentStep === index + 1 ? 'step' : undefined"
      >
        <span class="step-icon" aria-hidden="true">{{ step.icon }}</span>
        <span>{{ step.label }}</span>
      </div>
      <span v-if="index < steps.length - 1" class="connector" aria-hidden="true" />
    </template>
  </nav>
</template>

<style scoped>
.stepper {
  display: flex;
  align-items: center;
  gap: 24px;
  min-height: 68px;
  padding: 20px 28px;
  color: var(--primary-200);
  background: var(--primary-25);
}

.step {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}

.step.active {
  color: var(--primary-700);
}

.step-icon {
  display: grid;
  width: 28px;
  height: 28px;
  color: var(--white);
  background: var(--primary-100);
  border-radius: 50%;
  place-items: center;
  font-size: 17px;
}

.step.active .step-icon {
  background: var(--primary-700);
}

.connector {
  flex: 1;
  min-width: 36px;
  border-top: 1px dashed var(--primary-200);
}

@media (max-width: 640px) {
  .stepper {
    gap: 10px;
    padding: 16px;
  }

  .step span:last-child {
    display: none;
  }

  .connector {
    min-width: 20px;
  }
}
</style>
