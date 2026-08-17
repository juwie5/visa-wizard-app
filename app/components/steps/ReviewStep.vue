<script setup lang="ts">
import type { VisaFormData } from '~/types/visa'
import { formatDate } from '~/utils/countries'

defineProps<{ form: VisaFormData }>()
const emit = defineEmits<{ back: [], submit: [] }>()
</script>

<template>
  <div v-if="form.citizenship && form.destination">
    <div class="px-7 pb-7 pt-[34px] max-sm:px-5 max-sm:py-7">
      <header class="mb-[30px]">
        <h1 id="wizard-heading" class="mb-1.5 text-2xl font-extrabold leading-[27px]">Review &amp; Confirm</h1>
        <p class="m-0">Final check of your application data before submission.</p>
      </header>
      <div class="grid grid-cols-[1.1fr_.9fr] gap-4 max-sm:grid-cols-1">
        <dl class="m-0 rounded-[10px] border border-zinc-200 bg-zinc-50 p-4 [&>div:last-child]:mb-0">
          <div class="mb-2 flex justify-between gap-4"><dt class="text-zinc-500">Name</dt><dd class="m-0 text-right font-semibold [overflow-wrap:anywhere]">{{ form.fullName }}</dd></div>
          <div class="mb-2 flex justify-between gap-4"><dt class="text-zinc-500">Email</dt><dd class="m-0 text-right font-semibold [overflow-wrap:anywhere]">{{ form.email }}</dd></div>
          <div class="mb-2 flex justify-between gap-4"><dt class="text-zinc-500">Phone</dt><dd class="m-0 text-right font-semibold [overflow-wrap:anywhere]">{{ form.phoneCountry?.callingCode || form.citizenship.callingCode }} {{ form.phone }}</dd></div>
          <div class="mb-2 flex justify-between gap-4"><dt class="text-zinc-500">DOB</dt><dd class="m-0 text-right font-semibold [overflow-wrap:anywhere]">{{ formatDate(form.dateOfBirth) }}</dd></div>
          <div class="mb-2 flex justify-between gap-4"><dt class="text-zinc-500">Passport</dt><dd class="m-0 text-right font-semibold [overflow-wrap:anywhere]">{{ form.passportNumber.toUpperCase() }}</dd></div>
        </dl>
        <div class="grid gap-2.5">
          <CountrySummary label="Citizenship" :country="form.citizenship" />
          <CountrySummary label="Destination" :country="form.destination" />
        </div>
      </div>
      <div class="mt-4 flex items-start gap-3 rounded-md border border-info-200 bg-info-50 p-3 text-xs" role="note">
        <span class="grid size-[18px] flex-none place-items-center rounded-full bg-info-500 font-bold text-white" aria-hidden="true">i</span>
        <p class="m-0">By clicking “Submit Application”, you confirm that all provided information is true and accurate. False information may result in immediate rejection.</p>
      </div>
    </div>
    <footer class="flex min-h-20 justify-between border-t border-zinc-100 px-7 py-4">
      <BaseButton icon-only label="Back to personal details" @click="emit('back')">‹</BaseButton>
      <BaseButton @click="emit('submit')">Submit Application <span aria-hidden="true">›</span></BaseButton>
    </footer>
  </div>
</template>
