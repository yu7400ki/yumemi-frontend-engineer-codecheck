import { cva } from "styled-system/css";

export const spinnerRecipe = cva({
  base: {
    borderStyle: "solid",
    borderColor: "border.default",
    borderTopColor: "border.emphasis",
    rounded: "full",
    aspectRatio: "1 / 1",
    animation: "spin",
  },
  variants: {
    size: {
      md: {
        borderWidth: 3,
        height: 12,
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
