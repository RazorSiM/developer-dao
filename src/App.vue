<template>
  <component :is="layout" class="font-roboto">
    <router-view />
  </component>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
const route = useRoute();
let layout = $computed(() => {
  return route.meta.layout;
});
</script>
