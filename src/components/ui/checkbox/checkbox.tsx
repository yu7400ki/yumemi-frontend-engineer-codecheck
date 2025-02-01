import { CheckIcon } from "lucide-react";
import { useCheckbox } from "./checkbox.hooks";
import { checkboxRecipe } from "./checkbox.recipe";

type Props = {
  children?: React.ReactNode;
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
  id?: string;
  name?: string;
};

export function Checkbox(props: Props) {
  const { value, handleChange } = useCheckbox(props);
  const classes = checkboxRecipe();

  return (
    <label className={classes.root}>
      <button
        type="button"
        // biome-ignore lint/a11y/useSemanticElements: This is a button that acts as a checkbox
        role="checkbox"
        aria-checked={value}
        onClick={handleChange}
        className={classes.trigger}
      >
        <div className={classes.icon}>{value && <CheckIcon />}</div>
      </button>
      {props.children}
      <input
        className={classes.input}
        type="checkbox"
        aria-hidden
        checked={value}
        tabIndex={-1}
        id={props.id}
        name={props.name}
      />
    </label>
  );
}
