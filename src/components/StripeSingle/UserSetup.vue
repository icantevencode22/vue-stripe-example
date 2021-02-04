<template>
  <el-form ref="form" :model="value" class="form" label-position="top">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="Donation Amount">
          <el-input-number
            v-model="value.amount"
            :step="1"
            :min="0"
            :class="[amountError ? 'mb-2' : 'mb-4']"
          />
          <el-alert
            v-if="amountError"
            title="We need a valid amount"
            type="error"
            :closable="false"
          />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="Currency">
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
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col>
        <el-form-item label="Name" :rules="[{ required: true }]">
          <el-input
            id="name"
            v-model="value.name"
            type="text"
            name="name"
            :class="[nameError ? 'mb-2' : 'mb-4']"
          />
          <el-alert
            v-if="nameError"
            title="We need a valid name"
            type="error"
            :closable="false"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col>
        <el-form-item label="Email" :rules="[{ required: true }]">
          <el-input
            id="email"
            v-model.trim="value.email"
            type="email"
            name="email"
            :class="[nameError ? 'mb-2' : 'mb-4']"
          />
          <el-alert
            v-if="mailError"
            title="We need a valid email"
            type="error"
            :closable="false"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
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
.mb-2 {
  margin-bottom: 0.5rem;
}
.mb-4 {
  margin-bottom: 1rem;
}
</style>
