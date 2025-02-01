import { CheckIcon } from "lucide-react";
import { useCheckbox } from "./checkbox.hooks";
import { checkboxRecipe } from "./checkbox.recipe";

export type Props = {
  children?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  id?: string;
  name?: string;
  value?: string;
};

export function Checkbox(props: Props) {
  const { checked, handleChange, handleChangeHiddenInput } = useCheckbox(props);
  const classes = checkboxRecipe();

  return (
    <label className={classes.root}>
      <button
        type="button"
        // biome-ignore lint/a11y/useSemanticElements: This is a button that acts as a checkbox
        role="checkbox"
        aria-checked={checked}
        onClick={handleChange}
        className={classes.trigger}
      >
        <div className={classes.icon}>{checked && <CheckIcon />}</div>
      </button>
      {props.children}
      <input
        className={classes.input}
        type="checkbox"
        aria-hidden
        checked={checked}
        tabIndex={-1}
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={handleChangeHiddenInput}
      />
    </label>
  );
}
