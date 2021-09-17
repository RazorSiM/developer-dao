<template>
  <div class="flex items-center justify-between px-5 py-3">
    <a href="https://github.com/RazorSiM" target="_blank">
      <IconCodiconGithubInverted class="h-8 w-8" />
    </a>

    <div class="justify-self-end flex items-center space-x-5">
      <ThemePicker />
      <MetamaskConnect />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useWalletStore } from "~/stores/wallet";

const walletStore = useWalletStore();
onMounted(async () => {
  await walletStore.setProvider();
  if (walletStore.installed) {
    await walletStore.setConnected();
  }
});
</script>
