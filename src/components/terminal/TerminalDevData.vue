<template>
  <div v-if="status === 'RUNNING'" class="mt-6 animate-pulse">
    ...LOADING...
  </div>
  <div v-if="status === 'ERROR'" class="mt-6 font-bold">
    <div class="text-red-500">COMMAND ERROR</div>
    <template v-if="gasUnits !== ''">
      <div>.</div>
      <div>.</div>
      <div>.</div>
      <div class="mt-3">It seems like you may be able to claim this ID.</div>
      <div>
        The amount to spend in gas units is
        <span class="text-secondary">{{ gasUnits }}</span
        >.
      </div>
      <div>
        That's roughly <span class="text-primary">${{ gasCost }}</span>
      </div>
      <div class="mt-3">Proceed?</div>
      <div>
        <button
          class="text-accent font-bold font-plex"
          @click="$emit('claim', id)"
        >
          Yes</button
        >/<span>no</span>
      </div>
    </template>
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
defineEmits(["claim"]);
const props = defineProps({
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
  gasUnits: {
    type: String,
    default: "",
  },
  gasPrice: {
    type: Number,
    default: 0,
  },
  ethPrice: {
    type: Number,
    default: 0,
  },
});

let gasCost = $computed(() => {
  return (
    ((props.gasPrice * parseFloat(props.gasUnits)) / 1e18) *
    props.ethPrice
  ).toFixed(2);
});
</script>
