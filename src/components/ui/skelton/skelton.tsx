import type { JSX } from "react";
import { cx } from "styled-system/css";
import { skeltonRecipe } from "./skelton.recipe";

export type Props = JSX.IntrinsicElements["div"];

export function Skelton({ className, ...props }: Props) {
  return <div className={cx(skeltonRecipe(), className)} {...props} />;
}
