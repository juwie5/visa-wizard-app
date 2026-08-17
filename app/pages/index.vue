<template>
  <div class="app-shell">
    <AppHeader />
    <main class="page-content">
      <section class="wizard-card" aria-labelledby="wizard-heading">
        <WizardStepper :current-step="1" />
        <div class="placeholder-panel">
          <h1 id="wizard-heading">Select your journey</h1>
          <p>Define your origin and destination to begin the application process.</p>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.page-content {
  width: min(880px, calc(100% - 40px));
  margin: 44px auto;
}

.wizard-card {
  overflow: hidden;
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 16px;
  box-shadow: var(--shadow-card);
}

.placeholder-panel {
  padding: 34px 28px 44px;
}

h1 {
  margin: 0 0 6px;
  font-size: 24px;
  font-weight: 800;
  line-height: 27px;
}

p {
  margin: 0;
}
</style>
