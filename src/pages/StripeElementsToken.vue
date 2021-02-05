<template>
  <Layout>
      <h1>Single payment without paymentIntent (through token)</h1>
    <StripeSinglePaymentToken />
  </Layout>
</template>

<script>
import StripeSinglePaymentToken from "../components/StripeSinglePaymentToken";
export default {
  components: {
    StripeSinglePaymentToken,
  },
};
</script>

<style></style>
