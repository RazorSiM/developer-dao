<template>
  <div class="shadow-xl rounded-lg ring-2 ring-base01">
    <TerminalTitlebar :title="titleBar" />
    <TerminalShell>
      <slot></slot>
    </TerminalShell>
  </div>
</template>
<script setup lang="ts">
defineProps({
  titleBar: {
    type: String,
    default: "Arch",
  },
});
</script>
