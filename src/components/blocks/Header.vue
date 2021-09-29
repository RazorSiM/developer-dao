<template>
  <div class="flex items-center justify-between px-5">
    <div class="justify-self-end flex items-center space-x-5">
      <a href="https://github.com/RazorSiM/developer-dao" target="_blank">
        <IconCodiconGithubInverted
          class="h-8 w-8 transition hover:(text-primary)"
        />
      </a>
      <a href="https://twitter.com/Razor_SiM" target="_blank">
        <IconCodiconTwitter class="h-8 w-8 transition hover:(text-primary)" />
      </a>
    </div>

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
