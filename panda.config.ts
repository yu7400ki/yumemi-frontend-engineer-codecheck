import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      semanticTokens: {
        colors: {
          bg: {
            default: { value: "white" },
            canvas: { value: "#fcfcfc" },
            emphasis: { value: "{colors.neutral.200}" },
            fill: { value: "{colors.neutral.800}" },
          },
          fg: {
            default: { value: "{colors.neutral.800}" },
            fill: { value: "{colors.neutral.50}" },
          },
          border: {
            default: { value: "{colors.neutral.300}" },
            emphasis: { value: "{colors.neutral.500}" },
          },
        },
      },
    },
  },

  globalCss: {
    body: {
      bg: "bg.canvas",
      color: "fg.default",
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
