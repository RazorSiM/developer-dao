<template>
  <div class="my-3 flex w-full flex-wrap">
    <div class="flex items-center sm:mb-0">
      <IconMdiArch class="fill-current mr-2" />
      <span class="font-bold text-tertiary mr-2 not-italic"> ~ </span>
      <span class="font-semibold text-accent mr-4 not-italic">> </span>
      <span class="font-semibold text-secondary">{{ command }} </span>
    </div>

    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  command: {
    type: String,
    default: "Some random text",
  },
});
</script>
