import { cva } from "styled-system/css";

export const buttonRecipe = cva({
  base: {
    appearance: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    whiteSpace: "nowrap",
    verticalAlign: "middle",
    rounded: "lg",
    lineHeight: "none",
    fontWeight: "semibold",
    cursor: "pointer",
    transition: "all 0.1s",
    _focusVisible: {
      outline: "2px solid",
      outlineColor: "fg.default",
      outlineOffset: "2px",
    },
    "& :where(svg)": {
      w: "1.1em",
      h: "1.1em",
    },
  },
  variants: {
    style: {
      solid: {
        bg: "bg.fill",
        color: "fg.fill",
      },
    },
    size: {
      md: {
        fontSize: "sm",
        h: "10",
        minW: "10",
        px: "4",
        gap: "2",
      },
    },
  },
  defaultVariants: {
    style: "solid",
    size: "md",
  },
});
