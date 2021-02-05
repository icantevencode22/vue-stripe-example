<template>
  <div class="layout">
    <header class="header">
      <nav class="nav">
        <g-link class="nav__link" to="/">Home</g-link>
        <g-link class="nav__link" to="/stripe-setup/">Internal setup</g-link>
        <g-link class="nav__link" to="/subscription-checkout/"
          >Subscription Checkout</g-link
        >
        <g-link class="nav__link" to="/update-subscription/"
          >Subscription Update</g-link
        >
        <g-link class="nav__link" to="/stripe-single/">Single payment w/ intent</g-link
        ><g-link class="nav__link" to="/stripe-elements-token/">Single payment w/ token</g-link>
      </nav>
    </header>
    <slot />
  </div>
</template>

<style>
body {
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

.layout {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem 3rem 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  height: 80px;
}

.nav__link {
  margin-left: 20px;
}
</style>
