<script setup lang="ts">
import type { ApplicationStatus } from '~/types/visa'
import approvedIcon from '~/assets/images/status-approved.svg'
import pendingIcon from '~/assets/images/status-pending.svg'
import rejectedIcon from '~/assets/images/status-rejected.svg'

defineProps<{ status: ApplicationStatus }>()

const icons: Record<ApplicationStatus, string> = {
  Pending: pendingIcon,
  Approved: approvedIcon,
  Rejected: rejectedIcon
}
</script>

<template>
  <span
    class="inline-flex w-max items-center justify-center gap-1 rounded-[28px] py-1 pl-1.5 pr-2 font-semibold leading-[18px]"
    :class="{
      'bg-warning-100 text-warning-500': status === 'Pending',
      'bg-success-100 text-success-700': status === 'Approved',
      'bg-error-100 text-error-600': status === 'Rejected'
    }"
  >
    <img class="size-5 flex-none" :src="icons[status]" alt="">{{ status }}
  </span>
</template>
