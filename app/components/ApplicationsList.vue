<script setup lang="ts">
import type { VisaApplication } from '~/types/visa'
import routeArrowIcon from '~/assets/images/route-arrow.svg'

defineProps<{ applications: VisaApplication[] }>()

function submittedDate(value: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(value))
}
</script>

<template>
  <section class="mt-16 font-display max-sm:mt-9" aria-labelledby="submissions-heading">
    <header class="mb-5 flex items-center justify-between">
      <h2 id="submissions-heading" class="m-0 text-lg leading-[27px]">Recent Submissions</h2>
      <span>{{ applications.length }} {{ applications.length === 1 ? 'Record' : 'Records' }}</span>
    </header>
    <div v-if="!applications.length" class="grid min-h-[153px] place-content-center place-items-center gap-2 rounded-[10px] border border-dashed border-zinc-200">
      <span class="grid size-8 place-items-center rounded-full border-2 border-current text-xl" aria-hidden="true">!</span>
      <strong>No applications submitted yet.</strong>
    </div>
    <ol v-else class="m-0 grid list-none gap-2 p-0">
      <li v-for="application in applications" :key="application.id" class="grid min-h-[72px] grid-cols-[1fr_auto_auto] items-center gap-[34px] rounded-[10px] border border-zinc-200 bg-white px-4 py-3 shadow-card max-sm:grid-cols-[1fr_auto] max-sm:gap-3">
        <div class="flex min-w-0 items-center gap-3">
          <div class="flex w-[45px] [&>img+img]:-ml-[7px]">
            <img class="size-[26px] rounded-full border-2 border-white object-cover" :src="application.citizenship.flagUrl" :alt="application.citizenship.flagAlt">
            <img class="size-[26px] rounded-full border-2 border-white object-cover" :src="application.destination.flagUrl" :alt="application.destination.flagAlt">
          </div>
          <div class="flex min-w-0 flex-col">
            <small class="text-[11px] text-zinc-500">{{ application.applicant.fullName }}</small>
            <strong class="flex min-w-0 items-center gap-1.5">
              <span class="truncate">{{ application.citizenship.name }}</span>
              <img class="h-[11px] w-3.5 flex-none" :src="routeArrowIcon" alt="">
              <span class="truncate">{{ application.destination.name }}</span>
            </strong>
          </div>
        </div>
        <div class="flex min-w-0 flex-col items-start gap-0 max-sm:col-start-1 max-sm:row-start-2"><small class="text-[11px] text-zinc-500">Submitted</small><strong>{{ submittedDate(application.submittedAt) }}</strong></div>
        <StatusBadge :status="application.status" />
      </li>
    </ol>
  </section>
</template>
