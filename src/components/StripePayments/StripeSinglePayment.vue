<template>
  <form id="payment-form">
    <div id="card-element" />

    <p id="card-error" role="alert" :class="[defMsgStyles, errorClass]"></p>

    <div class="mt-12 flex justify-between items-center">
      <el-button class="ml-8" @click="onBack">
        Back
      </el-button>
      <el-button type="primary" native-type="submit" :disabled="disabledBtn">
        Pay now
      </el-button>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import {
  purchase,
  paymentStyle,
  mountInterval,
  msgTimeout,
  defMsgStyles,
  defHiddenStyles,
} from "../../constants/stripe";
let stripe = null;
let card = null;

export default {
  props: {
    amountInCents: Number,
    currency: String,
    name: String,
    email: String,
  },
  data() {
    return {
      disabledBtn: true,
      hasError: false,
      defMsgStyles: defMsgStyles,
    };
  },
  computed: {
    errorClass() {
      const isVisible = this.hasError
        ? "text-red-600 my-2 h-auto"
        : defHiddenStyles;
      return isVisible;
    },
    stripeURL() {
      const base = "/create-payment-intent";
      if (process.env.GRIDSOME_BE_URL) {
        return process.env.GRIDSOME_BE_URL + base;
      }
      return base;
    },
  },
  methods: {
    async fetchStripeData() {
      const bodyData = {
        currency: this.currency,
        amountInCents: this.amountInCents,
        name: this.name,
        email: this.email,
      };
      const res = await axios.post(this.stripeURL, bodyData);
      return res.data;
    },
    setStripeCard(stripe) {
      const elements = stripe.elements();
      card = elements.create("card", {
        hidePostalCode: true,
        style: paymentStyle,
      });
      // Stripe injects an iframe into the DOM
      card.mount("#card-element");
      card.on("change", (event) => {
        this.disabledBtn = event.empty;
        document.querySelector("#card-error").textContent = event.error
          ? event.error.message
          : "";
      });
    },
    async setPaymentHandler(stripe, card, data) {
      const form = document.getElementById("payment-form");
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        await this.payWithCard(stripe, card, data.clientSecret);
      });
    },
    async initStripe() {
      this.loading(true);

      stripe = window.Stripe(process.env.GRIDSOME_STRIPE_PUBLISHABLE);
      const data = await this.fetchStripeData();

      this.setStripeCard(stripe);

      await this.setPaymentHandler(stripe, card, data);

      this.loading(false);
    },
    clearCardData() {
      card.clear();
    },
    async payWithCard(stripe, card, clientSecret) {
      this.loading(true);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: this.email,
            name: this.name,
          },
        },
      });
      if (result.error) {
        this.onErrorPayment(result.error.message);
      } else {
        this.onSuccessPayment(result.paymentIntent.id);
      }
    },
    onSuccessPayment(paymentIntentId) {
      this.clearCardData();
      this.loading(false);
      this.$emit("onsuccess");
    },
    onErrorPayment(errorMsgText) {
      const element = document.querySelector("#card-error");
      element.textContent = errorMsgText;
      this.showError(element);
      this.loading(false);
    },
    showError(element) {
      this.hasError = true;
      setTimeout(() => {
        this.hasError = false;
        element.textContent = "";
      }, msgTimeout);
    },
    onBack() {
      this.$emit("onback");
    },
    loading(isLoading) {
      this.disabledBtn = isLoading;
      this.$emit("loading", isLoading);
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
