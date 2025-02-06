import { cva } from "styled-system/css";

export const spinnerRecipe = cva({
  base: {
    borderStyle: "solid",
    borderTopColor: "transparent",
    borderLeftColor: "bg.emphasis",
    borderBottomColor: "bg.emphasis",
    borderRightColor: "bg.emphasis",
    rounded: "full",
    aspectRatio: "1 / 1",
    animation: "spin",
  },
  variants: {
    size: {
      md: {
        borderWidth: 4,
        height: 12,
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
