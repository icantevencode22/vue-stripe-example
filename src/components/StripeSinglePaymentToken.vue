<template>
  <form id="example-2-form" v-loading="isLoading">
    <div id="card-example-2" />

    <el-alert
      v-if="successText"
      :title="successText"
      type="success"
      :closable="false"
    />
    <el-alert
      v-if="errorText"
      :title="errorText"
      type="error"
      :closable="false"
    />

    <div class="mt-12 flex justify-between items-center">
      <el-button type="primary" native-type="submit" :disabled="disabledBtn">
        Pay now
      </el-button>
    </div>
  </form>
</template>

<script>
// https://stripe.com/docs/payments/accept-a-payment-charges
import axios from "axios";
import { mountInterval } from "../constants/stripe";
let stripe = null;
let card = null;
let elements = null;

export default {
  data() {
    return {
      isLoading: false,
      disabledBtn: true,
      hasError: false,
      successText: "",
      errorText: "",
    };
  },
  methods: {
    async initStripe() {
      stripe = window.Stripe(process.env.GRIDSOME_STRIPE_PUBLISHABLE);

      this.cardSetup();
      await this.setPaymentHandler();

      this.loading(false);
    },
    cardSetup() {
      elements = stripe.elements({
        fonts: [{ cssSrc: "https://fonts.googleapis.com/css?family=Roboto" }],
      });
      card = elements.create("card", {
        iconStyle: "solid",
        hidePostalCode: true,
      });
      card.mount("#card-example-2");
      card.on("change", (event) => {
        this.disabledBtn = event.empty;
        this.errorText = event.error ? event.error.message : "";
      });
    },
    setPaymentHandler() {
      const form = document.getElementById("example-2-form");
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        this.payWithCard();
      });
    },

    async payWithCard() {
      this.loading(true);

      const additionalData = {
        name: "Simeon Petrov",
        cardholder_name: "Simeon Petrov",
        address_line1: "Sofia",
        address_city: "Bulgaria",
        address_state: "Sofia",
        address_zip: "1000",
      };
      const result = await stripe.createToken(card, additionalData);
      if (result.error) {
        this.onErrorPayment(result.error.message);
      } else {
        this.createCharge(result.token);
      }
    },

    async createCharge(token) {
      const bodyData = {
        stripeToken: token,
        amount: 314, //In cents
        currency: "eur",
        description: "Charge via token and no paymentIntent",
      };
      const { data } = await axios.post("/charge-token", bodyData);
      if (data.charge) {
        this.onSuccessPayment();
      } else {
        this.onErrorPayment("Error with charge");
      }
    },
    onSuccessPayment() {
      card.clear();
      this.successText = "Success!";
      this.loading(false);
    },
    onErrorPayment(errorMsgText) {
      this.errorText = errorMsgText;
      this.loading(false);
    },
    loading(isLoading) {
      this.isLoading = isLoading;
      this.disabledBtn = isLoading;
    },
  },
  async mounted() {
    // Load stripe
    this.loading(true);
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

<style></style>
