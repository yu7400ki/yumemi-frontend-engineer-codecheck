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
      display: "inline-block",
      width: "1.2em",
      height: "1.2em",
      borderRadius: "md",
      border: "1px solid",
      borderColor: "black",
      cursor: "pointer",
    },
    icon: {
      display: "inline-block",
      "& > svg": {
        width: "1em",
        height: "1em",
      },
    },
    input: {
      srOnly: true,
    },
  },
});
