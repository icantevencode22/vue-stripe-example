<template>
  <form id="payment-form" v-loading="isLoading">
    <div id="card-element" />

    <p id="card-error" role="alert" :class="[defMsgStyles]"></p>

    <div class="mt-12 flex justify-between items-center">
      <el-button class="ml-8"> Back </el-button>
      <el-button type="primary" native-type="submit"> Subscribe now </el-button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { paymentStyle, mountInterval, defMsgStyles } from "@/constants/stripe";
let stripe = null;
let card = null;

export default {
  props: {
    orders: Array,
  },
  data() {
    return {
      isLoading: false,
      customerId: "cus_IptdPsIVaFrRoj",
      hasError: false,
      defMsgStyles: defMsgStyles,
    };
  },
  computed: {
    subscriptionData() {
      return {
        customerId: this.customerId,
        orders: this.orders,
      };
    },
  },
  methods: {
    async initStripe() {
      stripe = window.Stripe(process.env.GRIDSOME_STRIPE_PUBLISHABLE);
      this.setStripeCard();
      await this.setPaymentHandler();
    },
    setStripeCard() {
      const elements = stripe.elements();
      card = elements.create("card", {
        hidePostalCode: true,
        style: paymentStyle,
      });
      // Stripe injects an iframe into the DOM
      card.mount("#card-element");
    },
    async setPaymentHandler() {
      const form = document.getElementById("payment-form");
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        await this.createPaymentMethod();
      });
    },
    async createPaymentMethod() {
      this.isLoading = true;
      try {
        const paymentRes = await stripe.createPaymentMethod({
          type: "card",
          card: card,
        });

        await this.createSubscription({
          paymentMethodId: paymentRes.paymentMethod.id,
          ...this.subscriptionData,
        });
      } catch (e) {
        console.error("createPaymentMethod", e);
      }
      this.isLoading = false;
    },
    async createSubscription(subscriptionBody) {
      const subsRes = await axios.post(
        "/create-subscription",
        subscriptionBody
      );
    },
  },
  async mounted() {
    // Load stripe
    const stripeURL = "https://js.stripe.com/v3/";
    const stripeScript = document.createElement("script");
    stripeScript.setAttribute("src", stripeURL);
    document.body.appendChild(stripeScript);

    let interval = setInterval(async () => {
      try {
        Stripe;
        clearInterval(interval);
        await this.initStripe();
      } catch (e) {}
    }, mountInterval);
  },
};
</script>

<style>
#payment-form {
  max-width: 500px;
  margin: 0 auto;
}
</style>