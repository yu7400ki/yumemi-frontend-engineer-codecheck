import { sva } from "styled-system/css";

export const segmentedControlRecipe = sva({
  slots: ["root", "indicator", "option"],
  base: {
    root: {
      position: "relative",
      display: "grid",
      gridAutoFlow: "column",
      gridAutoColumns: "1fr",
      gap: "1",
      rounded: "full",
      p: "1",
      bg: "bg.emphasis",
      h: "fit-content",
      fontSize: "xs",
      sm: {
        fontSize: "sm",
      },
    },
    indicator: {
      position: "absolute",
      left: "0",
      top: "0",
      bottom: "0",
      m: "1",
      bg: "bg.default",
      rounded: "full",
      transition: "transform 0.3s ease",
      shadow: "xs",
    },
    option: {
      cursor: "pointer",
      rounded: "full",
      h: "6",
      zIndex: "1",
      transition: "background-color 0.1s",
      _hover: {
        bg: "rgba(0, 0, 0, 0.1)",
      },
      _focusVisible: {
        outline: "2px solid",
        outlineColor: "fg.default",
      },
      _checked: {
        fontWeight: "bold",
        _hover: {
          bg: "transparent",
        },
      },
      sm: {
        h: "8",
      },
    },
  },
});
