<template>
  <div class="wrapper">
    <div v-loading="isLoading" class="leftCol">
      <div class="card-wrapper">
        <el-card
          class="box-card"
          v-for="product in productPrices"
          :key="product.name"
        >
          <div slot="header" class="head">
            <span>{{ product.name }}</span>
          </div>
          <div class="text item">
            <ul class="price-wrapper">
              <li
                class="price"
                v-for="price in product.prices"
                :key="price.nickname"
              >
                <p><span>nickname:</span> {{ price.nickname }}</p>
                <p>
                  <span>unit_amount:</span> {{ price.unit_amount / 100 }}
                  {{ price.currency }}
                </p>
                <p><span>interval:</span> {{ price.recurring.interval }}</p>
              </li>
            </ul>
          </div>
        </el-card>
      </div>

      <el-button type="primary" @click="createNewPrices">
        Create prices
      </el-button>
    </div>

    <JsonExample
      class="rightCol"
      :jsonObject="priceJSON"
      docLink="https://stripe.com/docs/api/prices/create?lang=node"
    />
  </div>
</template>

<script>
import axios from "axios";
import JsonExample from "~/components/JsonExample";
import priceJSON from "../../objectExamples/Price.json";
export default {
  components: {
    JsonExample,
  },
  data() {
    return {
      priceJSON,
      isLoading: false,
      productPrices: [
        {
          name: "Cloud System",
          prices: [
            {
              nickname: "System Basic Monthly < 20",
              product: "system-id-v2",
              unit_amount: 0,
              currency: "eur",
              recurring: {
                interval: "month",
                interval_count: 1,
                usage_type: "licensed",
              },
              active: true,
            },
            {
              nickname: "System Medium Monthly < 50",
              product: "system-id-v2",
              unit_amount: 49900,
              currency: "eur",
              recurring: {
                interval: "month",
                interval_count: 1,
                usage_type: "licensed",
              },
              active: true,
            },
          ],
        },
        {
          name: "Cloud Hosting",
          prices: [
            {
              nickname: "Hosting Basic Monthly < 20",
              product: "hosting-id-v2",
              unit_amount: 17900,
              currency: "eur",

              recurring: {
                interval: "month",
                interval_count: 1,
                usage_type: "licensed",
              },
              active: true,
            },
            {
              nickname: "Hosting Medium Monthly < 50",
              product: "hosting-id-v2",
              unit_amount: 14900,
              currency: "eur",

              recurring: {
                interval: "month",
                interval_count: 1,
                usage_type: "licensed",
              },
              active: true,
            },
          ],
        },
      ],
    };
  },
  methods: {
    async createNewPrices() {
      this.isLoading = true;
      const prices = [
        ...this.productPrices[0].prices,
        ...this.productPrices[1].prices,
      ];
      const promiseArray = prices.map((price) => {
        const bodyData = {
          price: price,
        };
        return axios.post("/create-price", bodyData);
      });

      const res = await Promise.all(promiseArray);
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.card-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.box-card {
  width: 45%;
}

.box-card .head {
  font-size: 1.5rem;
  text-align: center;
}

.price {
  list-style: none;
  margin-bottom: 0.5rem;
}

.price p {
  margin: 0;
}

.price p span {
  font-weight: bold;
}
</style>