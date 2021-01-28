<template>
  <Layout v-loading="isLoading">
    <h1>Update subscriptions</h1>
    <p>
      Subscriptions can be changed by switching the price that a customer is
      charged or by changing the quantity. Normally the result qualifies as
      either upgrading or downgrading the subscription, depending upon the price
      difference between the two subscriptions.
    </p>
    
    <div class="inputGroup">
      <label for="selectedSubscription">Selected Subscription ID</label>
      <el-input
        name="selectedSubscription"
        v-model="selectedSubscription"
      ></el-input>
    </div>
    <div class="inputGroup">
      <label for="selectedSubscription">Quantity for each product/price</label>
      <el-input-number v-model="quantity" :step="1" :min="0" />
    </div>
    <el-button type="primary" @click="updateSubscription"> Update </el-button>
  </Layout>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isLoading: false,
      quantity: 1,
      selectedSubscription: "sub_IpupSi7M0fzbt8",
    };
  },
  methods: {
    async updateSubscription() {
      this.isLoading = true;
      const { data: subscription } = await axios.get(
        `/get-subscription/${this.selectedSubscription}`
      );
      const updatedItems = subscription.items.data.map((item) => ({
        id: item.id,
        price: item.price.id,
        quantity: this.quantity,
      }));
      const bodyData = {
        subscription: { items: updatedItems },
      };
      await axios.post(
        `/update-subscription/${this.selectedSubscription}`,
        bodyData
      );
      this.isLoading = false;
    },
  },
};
</script>

<style>
.inputGroup{
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-bottom: 1rem;
}
</style>