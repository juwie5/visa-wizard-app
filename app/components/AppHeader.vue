<template>
  <header class="app-header">
    <div class="brand-mark" aria-hidden="true">✦</div>
    <span>Visa Wizard</span>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  min-height: 72px;
  padding: 24px 28px;
  color: var(--primary-800);
  background: var(--white);
  border-bottom: 1px solid var(--gray-200);
  font-weight: 700;
}

.brand-mark {
  display: grid;
  width: 24px;
  height: 24px;
  margin-right: 4px;
  place-items: center;
  font-size: 20px;
}
</style>
