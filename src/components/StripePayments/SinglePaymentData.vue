<template>
  <div>
    <div class="flex justify-center items-center mb-10">
      <el-input-number v-model="value.amount" :step="1" :min="0" />
      <el-select
        v-model="value.currency"
        placeholder="Select"
        class="w-100 borderlessInput"
      >
        <el-option
          v-for="item in currencies"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <span
      v-if="mailError"
      class="block w-3/4 mx-auto mb-4 text-sm text-red-500"
    >
      Error with amount
    </span>

    <div class="w-3/4 mx-auto mb-6">
      <label class="uppercase text-gray-main" for="name">
        Name
      </label>
      <input
        required
        id="name"
        v-model="value.name"
        type="text"
        name="name"
        class="border-b-2 border-0 outline-none w-full border-black py-2 text-sm font-bold"
        :class="[nameError ? 'mb-2' : 'mb-4']"
      />
      <span v-if="nameError" class="block mb-4 text-sm text-red-500">
        Error with name
      </span>
    </div>

    <div class="w-3/4 mx-auto mb-6">
      <label class="uppercase text-gray-main" for="email">
        Email
      </label>
      <input
        required
        id="email"
        v-model.trim="value.email"
        type="email"
        name="email"
        class="border-b-2 border-0 outline-none w-full border-black py-2 text-sm font-bold"
        :class="[mailError ? 'mb-2' : 'mb-4']"
      />
      <span v-if="mailError" class="block mb-4 text-sm text-red-500">
        Error with email
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Object,
    nameError: Boolean,
    mailError: Boolean,
    amountError: Boolean,
  },
  data() {
    return {
      currencies: [
        {
          value: "bgn",
          label: "лв BGN",
        },
        {
          value: "eur",
          label: "€ EUR",
        },
        {
          value: "usd",
          label: "$ USD",
        },
      ],
    };
  },
};
</script>

<style>
.el-tooltip__popper {
  width: 300px;
}
</style>
