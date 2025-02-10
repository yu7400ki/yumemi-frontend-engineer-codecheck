import { token } from "styled-system/tokens";
import { useSegmentedControl } from "./segmented-control.hooks";
import { segmentedControlRecipe } from "./segmented-control.recipe";
import type { Option } from "./segmented-control.types";

export type Props = {
  options: Option[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export function SegmentedControl(props: Props) {
  const { value, handleChange, handleKeyDown, optionsRef } =
    useSegmentedControl({
      options: props.options,
      value: props.value,
      defaultValue: props?.defaultValue ?? props.options[0].value,
      onChange: props.onChange,
    });

  const classes = segmentedControlRecipe();

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
