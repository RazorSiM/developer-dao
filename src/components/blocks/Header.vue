<template>
  <div class="flex items-center justify-between gap-5 flex-wrap">
    <div class="justify-self-end flex items-center gap-5">
      <ThemePicker />
      <a href="https://github.com/RazorSiM/developer-dao" target="_blank">
        <IconCodiconGithubInverted
          class="h-8 w-8 transition hover:(text-primary)"
        />
      </a>
      <a href="https://twitter.com/Razor_SiM" target="_blank">
        <IconCodiconTwitter class="h-8 w-8 transition hover:(text-primary)" />
      </a>
    </div>
    <div class="justify-self-end flex items-center gap-2.5">
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
