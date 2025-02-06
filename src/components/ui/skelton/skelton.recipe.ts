import { cva } from "styled-system/css";

export const skeltonRecipe = cva({
  base: {
    bg: "bg.emphasis",
    rounded: "lg",
    animation: "pulse 2s infinite",
  },
});
