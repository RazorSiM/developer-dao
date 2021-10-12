<template>
  <Listbox v-model="selectedTheme" as="div" class="relative">
    <ListboxButton
      class="
        bg-base02
        rounded-full
        p-2
        ring-1 ring-transparent
        focus:(outline-none
        )
        active:(ring-1
        ring-accent)
        hover:(bg-base03
        shadow-md)
        transition
        shadow
      "
      ><IconHeroiconsOutlineColorSwatch
    /></ListboxButton>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-out"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <ListboxOptions
        as="div"
        class="
          flex flex-col
          absolute
          rounded-md
          mt-1
          left-0
          shadow-lg
          bg-base01
          max-h-300px
          overflow-y-auto
          z-1
        "
      >
        <ListboxOption
          v-for="theme in themes"
          :key="theme"
          v-slot="{ active, selected }"
          as="template"
          :value="theme"
          :disabled="theme === globalStore.getTheme"
          @click="globalStore.setTheme(theme)"
        >
          <div
            class="
              px-3
              py-2
              transition
              flex
              justify-between
              items-center
              leading-none
              capitalize
              hover:(bg-base03)
            "
            :class="{ 'bg-base03': active, 'bg-primary': selected }"
          >
            {{ theme.replace("-", " ") }}
            <IconHeroiconsOutlineCheckCircle v-show="selected" />
          </div>
        </ListboxOption>
      </ListboxOptions>
    </transition>
  </Listbox>
</template>
<script lang="ts" setup>
// import IconColorSwatch from "~icons/heroicons-outline/color-swatch";
// import IconCheck from "~icons/heroicons-outline/check-circle";

import { useGlobalStore } from "~/stores/global";

const globalStore = useGlobalStore();
let selectedTheme = $ref(globalStore.getTheme);

const themes = reactive([
  "ashes",
  "brogrammer",
  "dracula",
  "ocean",
  "onedark",
  "rebecca",
  "nord",
  "solarized-dark",
  "github",
  "monokai",
]);
</script>
