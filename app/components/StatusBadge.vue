<script setup lang="ts">
import type { ApplicationStatus } from '~/types/visa'

defineProps<{ status: ApplicationStatus }>()

const icons: Record<ApplicationStatus, string> = {
  Pending: '◷',
  Approved: '✓',
  Rejected: '×'
}
</script>

<template>
  <span
    class="inline-flex w-max items-center gap-1 rounded-[28px] py-1 pl-1.5 pr-2 font-semibold leading-[18px]"
    :class="{
      'bg-warning-100 text-warning-500': status === 'Pending',
      'bg-success-100 text-success-700': status === 'Approved',
      'bg-error-100 text-error-600': status === 'Rejected'
    }"
  >
    <span class="grid size-[18px] place-items-center rounded-full border-[1.5px] border-current text-xs leading-none" aria-hidden="true">{{ icons[status] }}</span>{{ status }}
  </span>
</template>
