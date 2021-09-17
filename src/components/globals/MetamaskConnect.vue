<template>
  <button
    :class="buttonColor"
    class="
      outline-none
      focus:outline-none
      font-semibold
      hover:(bg-secondary
      shadow-md)
      transition-colors
      rounded-full
      p-2
      leading-none
      font-medium
      shadow
    "
    @click="handleButton()"
  >
    {{ buttonText }}
  </button>
</template>
<script setup lang="ts">
import { useWalletStore } from "~/stores/wallet";
const walletStore = useWalletStore();
let buttonText = $computed(() => {
  if (walletStore.installed === false) {
    return "Install Metamask";
  } else if (walletStore.getAddress !== "") {
    return walletStore.getEns
      ? walletStore.getEns
      : walletStore.getShortAddress;
  } else {
    return "Connect to Metamask";
  }
});
let buttonColor = $computed(() => {
  if (buttonText !== "Install Metamask") {
    return "bg-accent text-base00";
  } else if (buttonText === "Connect to Metamask") {
    return "bg-primary text-base00";
  }
  return "bg-secondary text-foreground";
});

const handleButton = async () => {
  if (buttonText === "Install Metamask") {
    window.open("https://metamask.io/", "_blank");
  } else {
    await walletStore.requestAccounts();
  }
};
</script>
