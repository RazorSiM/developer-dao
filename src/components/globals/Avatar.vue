<template>
  <img
    v-if="walletStore.getAvatar !== ''"
    class="h-5 w-5"
    :src="walletStore.getAvatar"
    alt=""
  />
  <img
    v-if="walletStore.getAvatar === '' && walletStore.getAddress !== ''"
    class="h-8 w-8 rounded-full"
    :src="blockie"
    alt=""
  />
</template>
<script lang="ts" setup>
import { useWalletStore } from "~/stores/wallet";
import makeBlockie from "ethereum-blockies-base64";
const walletStore = useWalletStore();
let blockie = $ref("");
if (walletStore.getAddress !== "") {
  blockie = makeBlockie(walletStore.getAddress);
}
</script>
