<template>
  <Layout>
    <h1>Stripe Data Setup</h1>
    <ul>
      <li>1) Create a Customer</li>
      <li>2) Create a Product</li>
      <li>3) Create a Price for the product</li>
    </ul>

    <el-collapse v-model="activeNames">
      <el-collapse-item title="Create Customer" name="1">
        <CreateCustomer />
      </el-collapse-item>

      <el-collapse-item title="Create Products" name="2">
        <CreateProduct />
      </el-collapse-item>

      <el-collapse-item title="Create Prices" name="3">
        <CreatePrices />
      </el-collapse-item>
    </el-collapse>
  </Layout>
</template>

<script>
import CreateCustomer from "../components/StripeSetup/CreateCustomer";
import CreateProduct from "../components/StripeSetup/CreateProduct";
import CreatePrices from "../components/StripeSetup/CreatePrices";
export default {
  components: {
    CreateCustomer,
    CreateProduct,
    CreatePrices
  },
  data() {
    return {
      activeNames: ["1"],
    };
  },
};
</script>

<style>
</style>