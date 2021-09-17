<template>
  <div
    class="
      w-full
      min-h-400px
      rounded-b-lg
      bg-base00
      terminalShell
      p-4
      font-plex
      italic
    "
  >
    <slot></slot>
  </div>
</template>

<style scoped>
@supports (backdrop-filter: blur(1px)) {
  .terminalShell {
    @apply backdrop-filter backdrop-blur-sm bg-opacity-10;
  }
}
@supports not (backdrop-filter: blur(1px)) {
  .terminalShell {
    @apply bg-opacity-80;
  }
}
</style>
