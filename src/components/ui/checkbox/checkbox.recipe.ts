import { sva } from "styled-system/css";

export const checkboxRecipe = sva({
  slots: ["root", "trigger", "icon", "input"],
  base: {
    root: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      gap: "1",
    },
    trigger: {
      display: "grid",
      placeItems: "center",
      width: "1.2em",
      height: "1.2em",
      borderRadius: "md",
      border: "1px solid",
      borderColor: "border.default",
      bg: "bg.default",
      cursor: "pointer",
      outline: "none",
      transition: "background-color 0.1s",
      _focusVisible: {
        outline: "2px solid",
        outlineOffset: "2px",
        outlineColor: "fg.default",
      },
      _hover: {
        bg: "bg.canvas",
      },
      _checked: {
        bg: "bg.fill",
        borderColor: "transparent",
        _hover: {
          bg: "bg.fill",
        },
      },
    },
    icon: {
      "& > svg": {
        width: "1em",
        height: "1em",
        stroke: "fg.fill",
      },
    },
    input: {
      srOnly: true,
    },
  },
});
