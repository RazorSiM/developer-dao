<template>
  <component :is="layout" class="font-roboto">
    <router-view />
  </component>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
const route = useRoute();
let layout = $computed(() => {
  return route.meta.layout;
});
onMounted(() => {
  //@ts-expect-error any
  window.ethereum.on("accountsChanged", (accounts) => {
    console.log("New account detected: ", accounts);
    window.location.reload();
  });
  //@ts-expect-error any
  window.ethereum.on("chainChanged", (chainId) => {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    console.log("New chain detected: ", chainId);
    window.location.reload();
  });
});
</script>
