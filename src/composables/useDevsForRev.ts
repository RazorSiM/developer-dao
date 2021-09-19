import {
  claim as _claim,
  estimateClaim as _estimateClaim,
  getBalanceOf as _getBalanceOf,
  getClothing as _getClothing,
  getIndustry as _getIndustry,
  getLanguage as _getLanguage,
  getLocation as _getLocation,
  getMind as _getMind,
  getOS as _getOS,
  getOwnerOf as _getOwnerOf,
  getTextEditor as _getTextEditor,
  getTokenOfOwnerByIndex as _getTokenOfOwnerByIndex,
  getTokenURI as _getTokenURI,
  getVibe as _getVibe,
  totalSupply as _totalSupply,
} from "~/services/contracts/devsForRev";

import { BigNumberish } from "@ethersproject/bignumber";
import { Ref } from "vue";
import { lookupAddress } from "~/services/contracts";

const Status = {
  IDLE: "IDLE",
  RUNNING: "RUNNING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useDevsForRev(id: BigNumberish | Ref<BigNumberish>) {
  const status = ref(Status.IDLE);
  const nftData = reactive({
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
  });
  const ownerData: { wallet: string; balance: string; tokenIDs: string[] } =
    reactive({
      wallet: "",
      balance: "",
      tokenIDs: [],
    });
  const estimate = ref("");
  const totalSupply = ref("####");

  async function getTokenData() {
    status.value = Status.RUNNING;
    try {
      const promises = [
        _getTokenURI(unref(id)),
        _getClothing(unref(id)),
        _getIndustry(unref(id)),
        _getLanguage(unref(id)),
        _getLocation(unref(id)),
        _getMind(unref(id)),
        _getOS(unref(id)),
        _getTextEditor(unref(id)),
        _getVibe(unref(id)),
        _getOwnerOf(unref(id)),
      ];

      const res = await Promise.all(promises);
      nftData.clothing = res[1];
      nftData.industry = res[2];
      nftData.language = res[3];
      nftData.location = res[4];
      nftData.mind = res[5];
      nftData.os = res[6];
      nftData.textEditor = res[7];
      nftData.vibe = res[8];
      ownerData.wallet = res[9];
      ownerData.balance = await _getBalanceOf(ownerData.wallet);
      await getOwnerTokenIDs();
      const ens = await lookupAddress(ownerData.wallet);
      if (ens !== "") {
        ownerData.wallet = ens;
      }
      const tokenURIBase64str = res[0].split(",")[1];

      const { image, name } = JSON.parse(atob(tokenURIBase64str));
      const [imageFormatInfo, imageBase65str] = image.split(",");

      nftData.name = name;
      nftData.image =
        imageFormatInfo +
        "," +
        btoa(atob(imageBase65str).replace(" & ", " &amp; "));

      status.value = Status.SUCCESS;
    } catch (error) {
      status.value = Status.ERROR;
      estimate.value = await _estimateClaim(unref(id));

      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Error getting the nft data");
      }
    }
  }

  async function claimNFT() {
    try {
      return await (await _claim(unref(id))).wait();
    } catch (error) {
      status.value = Status.ERROR;

      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Cannot claim the nft");
      }
    }
  }

  async function getOwnerTokenIDs() {
    status.value = Status.RUNNING;
    ownerData.tokenIDs = [];
    try {
      if (parseInt(ownerData.balance) > 1) {
        for (let i = 0; i < parseInt(ownerData.balance); i++) {
          ownerData.tokenIDs.push(
            await _getTokenOfOwnerByIndex(ownerData.wallet, i)
          );
        }
      }
    } catch (error) {
      status.value = Status.ERROR;

      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Error getting the owner data");
      }
    }
  }
  async function getTotalSupply() {
    try {
      totalSupply.value = await _totalSupply();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Error getting the total supply");
      }
    }
  }

  if (isRef(id)) {
    debouncedWatch(
      id,
      async () => {
        await getTokenData();
      },
      { debounce: 1000 }
    );
  }
  return {
    status,
    nftData,
    estimate,
    ownerData,
    totalSupply,
    getTokenData,
    getTotalSupply,
    claimNFT,
  };
}
