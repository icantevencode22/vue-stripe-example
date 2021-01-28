<template>
  <div class="wrapper">
    <div v-loading="isLoading" class="leftCol">
      <div class="card-wrapper">
        <el-card
          class="box-card"
          v-for="product in products"
          :key="product.name"
        >
          <div slot="header" class="head">
            <span>{{ product.name }}</span>
          </div>
          <div class="text item">
            <p>ID: {{ product.id }}</p>
            <p>Description: {{ product.description }}</p>
          </div>
        </el-card>
      </div>

      <el-button type="primary" @click="createProducts">
        Create products
      </el-button>
    </div>

    <JsonExample
      class="rightCol"
      :jsonObject="productJSON"
      docLink="https://stripe.com/docs/api/products/create?lang=node"
    />
  </div>
</template>

<script>
import axios from "axios";
import JsonExample from "~/components/JsonExample";
import productJSON from "../../objectExamples/Product.json";
export default {
  components: {
    JsonExample,
  },
  data() {
    return {
      productJSON,
      isLoading: false,
      products: [
        {
          id: "system-id-v2",
          name: "Cloud System",
          description: "System product",
          active: true,
        },
        {
          id: "hosting-id-v2",
          name: "Cloud Hosting",
          description: "Hosting product",
          active: true,
        },
      ],
    };
  },
  methods: {
    async createProducts() {
      this.isLoading = true;
      const promiseArray = this.products.map((product) => {
        const bodyData = {
          product: product,
        };
        return axios.post("/create-product", bodyData);
      });

      const res = await Promise.all(promiseArray);
      this.isLoading = false;
    },
  },
};
</script>

<style  scoped>
.card-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.box-card {
  width: 45%;
  font-size: 1.25rem;
}
.box-card .head {
  text-align: center;
  font-size: 1.5rem;
}
</style>