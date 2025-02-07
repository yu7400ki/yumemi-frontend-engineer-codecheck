import { useControllableValue } from "@/hooks/use-controllable-value";
import { use, useCallback } from "react";
import { CheckboxGroupContext } from "../checkbox-group/checkbox-group.context";

export type Props = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  value?: string;
};

export function useCheckbox(props: Props) {
  const [internalChecked, setInternalChecked] = useControllableValue({
    value: props.checked,
    defaultValue: props.defaultChecked ?? false,
    // onChange: props.onChange,
  });
  const context = use(CheckboxGroupContext);
  const isGrouped = context !== undefined;

  let checked = internalChecked;
  if (isGrouped) {
    checked = props.value ? context.value.includes(props.value) : false;
  }

  const { onChange, value } = props;
  const { onChange: groupOnChange } = context ?? {};

  const toggleChecked = useCallback(() => {
    if (isGrouped && value) {
      groupOnChange?.(value);
    } else {
      setInternalChecked(!checked);
    }
    onChange?.(!checked);
  }, [isGrouped, onChange, value, groupOnChange, checked, setInternalChecked]);

  const handleChange = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      toggleChecked();
    },
    [toggleChecked],
  );

  return {
    checked,
    handleChange,
    handleChangeHiddenInput: toggleChecked,
  };
}
