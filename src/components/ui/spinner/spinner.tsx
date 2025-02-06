import type { JSX } from "react";
import { cx } from "styled-system/css";
import { spinnerRecipe } from "./spinner.recipe";

export type Props = JSX.IntrinsicElements["div"] &
  Required<Parameters<typeof spinnerRecipe>>[0];

export function Spinner({ size, className, ...props }: Props) {
  return <div className={cx(spinnerRecipe({ size }), className)} {...props} />;
}
