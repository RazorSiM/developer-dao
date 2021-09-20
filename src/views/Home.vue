<template>
  <div class="flex flex-col justify-center items-center">
    <TerminalWindow
      :title-bar="`DevsForRev #${totalSupply}`"
      command="cat"
      distro-title="Arch"
      class="max-w-2xl my-3"
    >
      <TerminalCommand command="ethget --project devdao --id ">
        <input
          ref="nftIDInput"
          v-model="nftID"
          type="text"
          class="
            italic
            ml-1.5
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
        :gas-units="estimate"
        :gas-price="gasPrice"
        :eth-price="ethPrice"
        @claim="handleClaim"
      />
    </TerminalWindow>
  </div>
</template>
<script setup lang="ts">
import { useDevsForRev } from "~/composables/useDevsForRev";
import { $fetch } from "ohmyfetch";

let nftIDInput = $ref<HTMLElement>();
let nftID = ref("");
let nftIDNumber = computed(() => parseInt(nftID.value));
const {
  status: nftLoading,
  totalSupply,
  nftData,
  estimate,
  ownerData,
  claimNFT,
  getTotalSupply,
} = useDevsForRev(nftIDNumber);
let gasPrice = $ref(0);
let ethPrice = $ref(0);
const handleClaim = () => {
  claimNFT();
};
onMounted(async () => {
  nftIDInput.focus();
  await getTotalSupply();
  const { data } = await $fetch(
    "https://www.gasnow.org/api/v3/gas/price?utm_source=:DevDaoRaz"
  );
  const { ethereum } = await $fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
  );
  gasPrice = data.standard;
  ethPrice = ethereum.usd;
});
</script>
