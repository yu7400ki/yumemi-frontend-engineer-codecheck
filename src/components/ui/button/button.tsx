import type { JSX } from "react";
import { cx } from "styled-system/css";
import { buttonRecipe } from "./button.recipe";

export type Props = JSX.IntrinsicElements["button"] &
  Parameters<typeof buttonRecipe>[0];

export function Button({ className, style, size, ...props }: Props) {
  return (
    <button
      className={cx(buttonRecipe({ style, size }), className)}
      {...props}
    />
  );
}
