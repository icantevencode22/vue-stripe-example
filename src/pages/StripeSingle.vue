<template>
  <Layout>
    <div class="componentWrapper" v-loading="isLoading">
      <el-steps
        class="steps"
        :space="200"
        :active="activeStep"
        align-center
        finish-status="success"
      >
        <el-step title="Amount"></el-step>
        <el-step title="Payment"></el-step>
        <el-step title="Success"></el-step>
      </el-steps>

      <div v-if="activeStep === 0" class="flex justify-center flex-col">
        <SinglePaymentData
          v-model="data"
          :nameError="nameError"
          :mailError="mailError"
          :amountError="amountError"
        />
      </div>

      <div v-if="activeStep === 1" class="px-4 sm:px-10">
        <StripeSinglePayment
          ref="stripeRef"
          :amountInCents="amountInCents"
          :currency="data.currency"
          :name="data.name"
          :email="data.email"
          @onback="onBack"
          @onsuccess="onSuccess"
          @loading="onLoading"
        />
      </div>

      <div v-if="activeStep === 3" class="px-10">
        <div class="success">Success!</div>
      </div>

      <div
        v-if="activeStep === 0"
        class="mt-12 flex justify-between items-center sm:px-10"
      >
        <el-button class="" :disabled="cancelDisabled" @click="onBack">
          Back
        </el-button>
        <el-button type="primary" :disabled="submitDisabled" @click="onNext">
          Next
        </el-button>
      </div>
    </div>
  </Layout>
</template>

<script>
import SinglePaymentData from "../components/StripeSingle/UserSetup";
import StripeSinglePayment from "../components/StripeSingle/StripeSinglePayment";
export default {
  components: {
    StripeSinglePayment,
    SinglePaymentData,
  },
  data() {
    return {
      isLoading: false,
      successfullySend: false,
      activeStep: 0,
      data: {
        amount: 0,
        currency: "bgn",
        name: "",
        email: "",
      },
      nameError: false,
      mailError: false,
      amountError: false,
    };
  },
  computed: {
    submitDisabled() {
      return this.activeStep === 1 && !this.successfullySend;
    },
    cancelDisabled() {
      return this.activeStep === 0;
    },
    amountInCents() {
      return this.data.amount * 100;
    },
  },
  methods: {
    onLoading(isLoading) {
      this.isLoading = isLoading;
    },
    onNext() {
      this.checkInputs();
      if (!this.amountError && !this.nameError && !this.mailError) {
        this.activeStep++;
      }
    },
    onBack() {
      if (this.activeStep > 0) {
        this.activeStep--;
      }
    },
    onSuccess() {
      this.activeStep = 3;
    },
    checkInputs() {
      this.nameError = this.data.name ? false : true;
      this.mailError = this.data.email ? false : true;
      this.amountError = this.data.amount > 0 ? false : true;
    },
  },
};
</script>

<style>
.componentWrapper {
  max-width: 600px;
  margin: 0 auto;
}
.steps {
  margin: 0 auto 1rem auto;
}
</style>
