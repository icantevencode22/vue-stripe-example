<template>
  <div>
    <h2>Selected plan</h2>
    <ul v-if="prices.length > 0">
      <li v-for="plan in selectedPlan" :key="plan">{{ plan }}</li>
    </ul>

    <h2>Avaliable price objects</h2>
    <div class="wrapper">
      <div class="card-wrapper leftCol">
        <el-card class="box-card" v-for="price in prices" :key="price.nickname">
          <div slot="header" class="head">
            <span>{{ price.nickname }}</span>
          </div>
          <div class="text item">
            <p><span>product id:</span> {{ price.product }}</p>
            <p>
              <span>unit_amount:</span> {{ price.unit_amount / 100 }}
              {{ price.currency }}
            </p>
            <p><span>interval:</span> {{ price.recurring.interval }}</p>
          </div>
        </el-card>
      </div>
      <JsonExample
        class="rightCol"
        :jsonObject="subscriptionJSON"
        docLink="https://stripe.com/docs/api/subscriptions/create?lang=node"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import JsonExample from "~/components/JsonExample";
import subscriptionJSON from "../../objectExamples/Subscription.json";
export default {
  components: {
    JsonExample,
  },
  props: {
    selectedPlans: Array,
  },
  data() {
    return {
      subscriptionJSON,
      prices: [],
    };
  },
  computed: {
    selectedPlan() {
      const planInfo = [];
      this.selectedPlans.forEach((selected) => {
        const price = this.prices.find((price) => price.id === selected.price);
        planInfo.push(`${price.nickname} x${selected.quantity}`);
      });
      return planInfo;
    },
  },
  methods: {
    async loadAllPrices() {
      const { data } = await axios.get("/get-prices");
      this.prices = data;
    },
  },
  async created() {
    await this.loadAllPrices();
  },
};
</script>

<style>
.card-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1rem;
  row-gap: 1rem;
}

.wrapper {
  display: flex;
  justify-content: space-between;
}
.rightCol,
.leftCol {
  width: 48%;
}
</style>
