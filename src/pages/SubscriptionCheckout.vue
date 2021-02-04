<template>
  <Layout>
    <h2>Create a subscription with selected plan</h2>
    <StripeSubscriptionPayment :orders="selectedPlans" />
    <SubscriptionData :selectedPlans="selectedPlans" />
  </Layout>
</template>

<script>
import SubscriptionData from "../components/StripeSubscription/SubscriptionSetup";
import StripeSubscriptionPayment from "../components/StripeSubscription/StripeSubscriptionPayment.vue";
export default {
  components: {
    SubscriptionData,
    StripeSubscriptionPayment,
  },
  data() {
    return {
      selectedPlans: [
        { price: "price_1IEERKGQC8c4dIgjyPgJgVKD", quantity: 1 },
        { price: "price_1IEERKGQC8c4dIgjV6Wol59f", quantity: 3 },
      ],
    };
  },
};
</script>