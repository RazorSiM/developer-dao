import { createRouter, createWebHashHistory } from "vue-router";

import Home from "~/views/Home.vue";
import { useWalletStore } from "~/stores/wallet";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      layout: "BaseLayout",
    },
  },
];

const router = createRouter({ history: createWebHashHistory(), routes });

router.beforeEach(async (to, from, next) => {
  const walletStore = useWalletStore();

  /**
   * If the root requires a wallet to interact with the blockchain...
   */
  if (to.meta.requiresWallet === true) {
    /** try to get the provider - we need to check if window.ethereum is present
     * so we do not break the app throwing an error
     */
    if (window.ethereum) {
      await walletStore.setProvider();
    } else {
      next(from);
    }

    /**
     * ... and the wallet provider is not installed ...
     */
    if (walletStore.installed === false) {
      /**  ... redirect the  user to the home page*/
      next("/");
    } else {
      /** if the wallet provider is installed but the account is not present */
      if (!walletStore.connected) {
        /** try to get the account without firing up the permission modal */
        await walletStore.setConnected();
        if (walletStore.connected) {
          next();
        } else {
          next(from);
        }
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router;
