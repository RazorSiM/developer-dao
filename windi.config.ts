import { defineConfig } from "vite-plugin-windicss";

/**
 *
 * @param {string} prop - the custom property must have the '-rgb' suffix and its value should set in RGB format: 255,255,0
 * @return {Function}
 */
function cssPropColor(prop: string) {
  //@ts-expect-error need Any here :(
  return ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined)
      return `rgba(var(${prop}), ${opacityValue})`;

    if (opacityVariable !== undefined)
      return `rgba(var(${prop}), var(${opacityVariable}, 1))`;

    return `rgb(var(${prop}))`;
  };
}
export default defineConfig({
  darkMode: "class",
  attributify: {
    prefix: "w:",
  },
  theme: {
    extend: {
      colors: {
        base00: cssPropColor("--base00"),
        base01: cssPropColor("--base01"),
        base02: cssPropColor("--base02"),
        base03: cssPropColor("--base03"),

        primary: cssPropColor("--base08"),
        secondary: cssPropColor("--base09"),
        tertiary: cssPropColor("--base0A"),
        accent: cssPropColor("--base0C"),

        foreground: cssPropColor("--base06"),
        faccent: cssPropColor("--base04"),
        fmuted: cssPropColor("--base05"),
      },
      fontFamily: {
        "roboto-slab": ["Roboto Slab", "serif"],
        roboto: ["Roboto", "sans-serif"],
        plex: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [require("windicss/plugin/typography")],
});
