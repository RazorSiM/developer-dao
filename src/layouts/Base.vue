<template>
  <div
    :class="globalStore.getTheme"
    class="
      rooterone
      min-h-screen
      w-full
      transition
      text-foreground
      duration-100
      p-4
      globalBackground
    "
  >
    <Header />

    <div class="container mx-auto">
      <slot />
    </div>
    <div class="absolute bottom-0 py-3 text-xs">
      Handcrafted by me with the help of
      <a
        href="https://v3.vuejs.org/guide/introduction.html"
        target="_blank"
        class="text-tertiary"
        >Vue3</a
      >
      and
      <a href="https://windicss.org/" target="_blank" class="text-secondary"
        >WindiCSS</a
      >
    </div>
  </div>
</template>
<setup lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  component: {
    name: "BaseLayout",
  },
});
</setup>
<script lang="ts" setup>
import { useGlobalStore } from "~/stores/global";
const globalStore = useGlobalStore();

function RGBToHEX(s: string) {
  const [r, g, b] = s.replace(" ", "").split(",");
  let rHex = parseInt(r).toString(16);
  let gHex = parseInt(g).toString(16);
  let bHex = parseInt(b).toString(16);
  if (rHex.length == 1) rHex = "0" + rHex;
  if (gHex.length == 1) gHex = "0" + gHex;
  if (bHex.length == 1) bHex = "0" + bHex;
  return rHex + gHex + bHex;
}

function fillBgString(s: string) {
  return `url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z' fill='%23${s}' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`;
}

let stuff = $ref("");
let bgString = $ref("");
let hex = $ref("");
onMounted(() => {
  stuff = window
    .getComputedStyle(document.getElementsByClassName(globalStore.getTheme)[0])
    .getPropertyValue("--base0A");
  hex = RGBToHEX(stuff);
  bgString = fillBgString(hex);
});

watch(
  () => globalStore.getTheme,
  (theme) => {
    stuff = window
      .getComputedStyle(document.getElementsByClassName(theme)[0])
      .getPropertyValue("--base0A");
    hex = RGBToHEX(stuff);
    bgString = fillBgString(hex);
  },
  {
    flush: "post",
  }
);
</script>
<style scoped>
.globalBackground {
  background-color: rgb(var(--base00));
  background-image: v-bind("bgString");
}
</style>
