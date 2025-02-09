import { token } from "styled-system/tokens";
import { useSlideSelector } from "./slide-selector.hooks";
import { slideSelectorRecipe } from "./slide-selector.recipe";
import type { Option } from "./slide-selector.types";

export type Props = {
  options: Option[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export function SlideSelector(props: Props) {
  const { value, handleChange, handleKeyDown, optionsRef } = useSlideSelector({
    options: props.options,
    value: props.value,
    defaultValue: props?.defaultValue ?? props.options[0].value,
    onChange: props.onChange,
  });

  const classes = slideSelectorRecipe();

  const idx = props.options.findIndex((option) => option.value === value);

  return (
    <div className={classes.root}>
      <div
        style={{
          width: `calc(${100 / props.options.length}% - ${token("spacing.1")} * 2)`,
          transform: `translateX(calc(${idx} * 100% + ${token("spacing.1")} * ${idx * 2}))`,
        }}
        className={classes.indicator}
      />
      {props.options.map((option, idx) => (
        <button
          ref={optionsRef.current[idx]}
          type="button"
          key={option.value}
          onClick={() => handleChange(option.value)}
          onKeyDown={handleKeyDown}
          aria-checked={value === option.value}
          // biome-ignore lint/a11y/useSemanticElements: This is a custom component
          role="radio"
          tabIndex={value === option.value ? 0 : -1}
          data-value={option.value}
          className={classes.option}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
