<template>
  <div class="wrapper">
    <el-form
      class="leftCol"
      v-if="customer"
      ref="form"
      label-width="120px"
      v-loading="isLoading"
      :model="customer"
      @submit.native.prevent="createNewCustomer"
    >
      <el-form-item label="name">
        <el-input v-model="customer.name"></el-input>
      </el-form-item>

      <el-form-item label="email">
        <el-input v-model="customer.email"></el-input>
      </el-form-item>

      <el-form-item label="phone">
        <el-input v-model="customer.phone"></el-input>
      </el-form-item>

      <el-form-item label="city">
        <el-input v-model="customer.address.city"></el-input>
      </el-form-item>

      <el-form-item label="country">
        <el-input v-model="customer.address.country"></el-input>
      </el-form-item>

      <el-form-item label="line1">
        <el-input v-model="customer.address.line1"></el-input>
      </el-form-item>

      <el-form-item label="postal_code">
        <el-input v-model="customer.address.postal_code"></el-input>
      </el-form-item>

      <el-form-item label="invoice_prefix">
        <el-input v-model="customer.invoice_prefix"></el-input>
      </el-form-item>

      <div>
        <el-button type="primary" native-type="submit">
          Create customer
        </el-button>
      </div>
    </el-form>

    <JsonExample
      class="rightCol"
      :jsonObject="customerJSON"
      docLink="https://stripe.com/docs/api/customers/create?lang=node"
    />
  </div>
</template>

<script>
import faker from "faker";
import axios from "axios";
import customerJSON from "../../objectExamples/Customer.json";
import JsonExample from "~/components/JsonExample";
export default {
  components: {
    JsonExample,
  },
  data() {
    return {
      customer: null,
      isLoading: false,
      customerJSON,
    };
  },
  methods: {
    loadFakeData() {
      const fakerCustomer = {
        name: faker.company.companyName(),
        email: faker.internet.email(),
        phone: "(258) 870-8608",
        address: {
          city: faker.address.city(),
          country: faker.address.county(),
          line1: faker.address.streetAddress(),
          postal_code: faker.address.zipCode(),
        },
        description: "My First Test Customer (created for testing)",
        // Invoice number prefix must be 1–12 uppercase letters or numbers.
        invoice_prefix: this.getPrefix(),
        invoice_settings: {
          custom_fields: null,
          default_payment_method: null,
          footer: null,
        },
        metadata: {},
      };
      this.customer = fakerCustomer;
    },
    getPrefix() {
      const prefix = "PREX30X" + faker.random.number({ min: 1, max: 13654 });
      return prefix.substring(0, 10).toUpperCase();
    },
    async createNewCustomer() {
      this.isLoading = true;
      const bodyData = {
        customer: this.customer,
      };
      const res = await axios.post("/create-customer", bodyData);
      this.loadFakeData();
      this.isLoading = false;
    },
  },
  mounted() {
    this.loadFakeData();
  },
};
</script>

<style>
.wrapper {
  display: flex;
  justify-content: space-between;
}
.rightCol,
.leftCol {
  width: 48%;
}
</style>
