import { acceptHMRUpdate, defineStore } from "pinia";

export const useGlobalStore = defineStore({
  id: "global",
  state: () => ({
    loading: false,
    theme: useStorage("devsRev", { name: "dracula" }),
  }),
  getters: {
    getTheme: (state) => state.theme.name,
  },
  actions: {
    setTheme(theme: string) {
      this.theme.name = theme;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot));
}
