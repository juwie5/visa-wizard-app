<script setup lang="ts">
import type { VisaApplication } from '~/types/visa'

defineProps<{ applications: VisaApplication[] }>()

function submittedDate(value: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(new Date(value))
}
</script>

<template>
  <section class="submissions" aria-labelledby="submissions-heading">
    <header>
      <h2 id="submissions-heading">Recent Submissions</h2>
      <span>{{ applications.length }} {{ applications.length === 1 ? 'Record' : 'Records' }}</span>
    </header>
    <div v-if="!applications.length" class="empty-state">
      <span aria-hidden="true">!</span>
      <strong>No applications submitted yet.</strong>
    </div>
    <ol v-else class="application-list">
      <li v-for="application in applications" :key="application.id">
        <div class="route">
          <div class="flags">
            <img :src="application.citizenship.flagUrl" :alt="application.citizenship.flagAlt">
            <img :src="application.destination.flagUrl" :alt="application.destination.flagAlt">
          </div>
          <div><small>{{ application.applicant.fullName }}</small><strong>{{ application.citizenship.name }} → {{ application.destination.name }}</strong></div>
        </div>
        <div class="date"><small>Submitted</small><strong>{{ submittedDate(application.submittedAt) }}</strong></div>
        <StatusBadge :status="application.status" />
      </li>
    </ol>
  </section>
</template>

<style scoped>
.submissions { margin-top: 64px; }
.submissions > header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
h2 { margin: 0; font-size: 18px; line-height: 27px; }
.empty-state { display: grid; min-height: 153px; border: 1px dashed var(--gray-200); border-radius: 10px; place-content: center; place-items: center; gap: 8px; }
.empty-state span { display: grid; width: 32px; height: 32px; border: 2px solid currentColor; border-radius: 50%; place-items: center; font-size: 20px; }
.application-list { display: grid; gap: 8px; margin: 0; padding: 0; list-style: none; }
.application-list li { display: grid; grid-template-columns: 1fr auto auto; align-items: center; gap: 34px; min-height: 72px; padding: 12px 16px; background: var(--white); border: 1px solid var(--gray-200); border-radius: 10px; box-shadow: var(--shadow-card); }
.route, .date { display: flex; align-items: center; gap: 12px; min-width: 0; }
.route > div:last-child, .date { flex-direction: column; align-items: flex-start; gap: 0; }
.flags { display: flex; width: 45px; }
.flags img { width: 26px; height: 26px; object-fit: cover; border: 2px solid var(--white); border-radius: 50%; }
.flags img + img { margin-left: -7px; }
small { color: var(--gray-500); font-size: 11px; }
.route strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
@media (max-width: 640px) {
  .submissions { margin-top: 36px; }
  .application-list li { grid-template-columns: 1fr auto; gap: 12px; }
  .date { grid-column: 1; grid-row: 2; }
}
</style>
