<template>
  <div
    class="
      lg:(h-screen
      -mt-[95px])
      mt-20
      flex flex-col
      justify-center
      items-center
    "
  >
    <TerminalWindow
      :title-bar="`DevsForRev #${totalSupply}`"
      command="cat"
      distro-title="Arch"
      class="max-w-2xl"
    >
      <TerminalCommand command="ethget --project devdao --id ">
        <input
          ref="nftIDInput"
          v-model="nftID"
          type="text"
          class="
            italic
            md:(ml-1.5)
            bg-transparent
            font-plex font-semibold
            text-secondary
            appearance-none
            placeholder-opacity-10 placeholder-foreground
            text-right
            flex-grow
            sm:(text-left
            flex-grow-0)
            focus:(outline-none)
          "
          placeholder="give me an id"
        />
      </TerminalCommand>
      <TerminalDevData
        :id="nftID"
        :status="nftLoading"
        :nft-data="nftData"
        :owner-data="ownerData"
      />
    </TerminalWindow>
  </div>
</template>
<script setup lang="ts">
import { useDevsForRev } from "~/composables/useDevsForRev";

let nftIDInput = $ref<HTMLElement>();
let nftID = ref("");
let nftIDNumber = computed(() => parseInt(nftID.value));
const {
  status: nftLoading,
  totalSupply,
  nftData,
  ownerData,
  getTotalSupply,
} = useDevsForRev(nftIDNumber);

onMounted(async () => {
  nftIDInput.focus();
  await getTotalSupply();
});
</script>
