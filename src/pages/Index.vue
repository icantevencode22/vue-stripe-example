<template>
  <Layout>
    <g-image
      class="centeredImg"
      alt="Example image"
      src="~/favicon.png"
      width="135"
    />
    <h1 class="centered">Hello, world!</h1>
    <h2 class="centered">Example of integrating Stripe in Vue</h2>

    <p>
      The point of this project is to test and show how we can connect and use
      Stripe for a different existing app. You can find examples of creating a
      Customer, Price and Product. You can also see how to connect for a single
      payment or a subscription via Stripe Elements (using the dedicated
      checkout pages were not part of the test, but should work relatevely the
      same way as these funcionaloties).
      <br />
      Please take note that not everything in the project will be connected in
      the best or self-suficient way - we have a lot of hard-coded ID's or
      names. Please doble check all of the ID's and see how they're conencted so
      you can update them and use them the best way applicable for your need.
      This is done because the aim was to show what we can do, not to create a
      full app for working with Stripe. The same goes for the styling, which of
      course can be done better.
    </p>

    <h3>Usefull links for Stripe Documentation</h3>
    <ul>
      <li v-for="(link, index) in links" :key="index">
        <a :href="link.url" target="__blank" :title="link.title">{{
          link.title
        }}</a>
      </li>
    </ul>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          title: "Stripe API reference and models",
          url: "https://stripe.com/docs/api?lang=node",
        },
        {
          title: "Create per-seat subscriptions with Elements",
          url:
            "https://stripe.com/docs/billing/subscriptions/per-seat#collapsable-1",
        },
        {
          title: "Billing examples",
          url: "https://stripe.com/docs/billing/subscriptions/examples",
        },
        {
          title: "Upgrade and downgrade subscriptions",
          url:
            "https://stripe.com/docs/billing/subscriptions/upgrade-downgrade",
        },
        {
          title: "SEPA Card Payment",
          url: "https://stripe.com/docs/payments/sepa-debit/accept-a-payment",
        },

        {
          title: "Create subscriptions with Checkout (Not applicable probably)",
          url: "https://stripe.com/docs/billing/subscriptions/checkout",
        },
      ],
    };
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
.centered {
  text-align: center;
}
.centeredImg {
  display: block;
  margin: 0 auto;
}
</style>
