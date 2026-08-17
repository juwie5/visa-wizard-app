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
  <span class="status" :class="status.toLowerCase()">
    <span aria-hidden="true">{{ icons[status] }}</span>{{ status }}
  </span>
</template>

<style scoped>
.status { display: inline-flex; align-items: center; gap: 4px; width: max-content; padding: 4px 8px 6px 6px; border-radius: 28px; font-weight: 600; line-height: 18px; }
.status > span { display: grid; width: 18px; height: 18px; border: 1.5px solid currentColor; border-radius: 50%; place-items: center; font-size: 12px; line-height: 1; }
.pending { color: var(--warning-500); background: var(--warning-100); }
.approved { color: var(--success-700); background: var(--success-100); }
.rejected { color: var(--error-600); background: var(--error-100); }
</style>
