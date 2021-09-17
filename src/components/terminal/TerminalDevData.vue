<template>
  <div v-if="status === 'RUNNING'" class="mt-6 animate-pulse">
    ...LOADING...
  </div>
  <div v-if="status === 'ERROR'" class="mt-6 text-red-500 font-bold">
    COMMAND ERROR
  </div>
  <div v-if="status === 'SUCCESS'" class="flex flex-col space-y-3 mt-6">
    <template v-for="(value, item) in nftData" :key="item">
      <div
        v-if="item !== 'image'"
        class="w-full flex justify-between text-right"
      >
        <span class="not-italic text-foreground text-opacity-50">{{
          item
        }}</span>
        <span class="font-bold text-tertiary">{{ value }}</span>
      </div>
    </template>
    <div class="text-xs text-base03 pt-3">
      <div v-if="ownerData.wallet !== ''">owner: {{ ownerData.wallet }}</div>
      <div v-if="parseInt(ownerData.balance) > 1">
        also owns:
        {{ ownerData.tokenIDs }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  id: {
    type: String,
    default: "1",
  },
  status: {
    type: String,
    default: "IDLE",
  },
  ownerData: {
    type: Object,
    default() {
      return {
        balance: "",
        tokenIDs: [],
        wallet: "",
      };
    },
  },
  nftData: {
    type: Object,
    default() {
      return {
        name: "",
        clothing: "",
        industry: "",
        language: "",
        location: "",
        mind: "",
        os: "",
        textEditor: "",
        vibe: "",
        image: "",
      };
    },
  },
});
</script>
