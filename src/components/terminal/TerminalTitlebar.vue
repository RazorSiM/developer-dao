<template>
  <div
    class="
      py-2
      px-4
      bg-base01
      flex
      justify-center
      items-center
      text-xs
      font-bold
      tracking-wide
      align-middle
      relative
      w-fulll
      rounded-t-lg
    "
  >
    <div></div>
    <div>{{ title }}</div>
    <div class="absolute right-2 flex gap-x-2">
      <div class="bg-accent h-3 w-3 rounded-full"></div>
      <div class="bg-tertiary h-3 w-3 rounded-full"></div>
      <div class="bg-primary h-3 w-3 rounded-full"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: "DevsForRevolution",
  },
});
</script>
