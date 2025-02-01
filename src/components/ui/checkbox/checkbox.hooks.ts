import { use, useCallback, useState } from "react";
import { CheckboxGroupContext } from "../checkbox-group/checkbox-group.context";

export type Props = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  value?: string;
};

export function useCheckbox(props: Props) {
  const isControlled = props.checked !== undefined;
  const [internalValue, setInternalValue] = useState(
    props.defaultChecked ?? false,
  );
  const context = use(CheckboxGroupContext);
  const isGrouped = context !== undefined;

  let checked: boolean;
  if (isGrouped) {
    checked = props.value ? context.value.includes(props.value) : false;
  } else {
    checked = isControlled ? (props.checked as boolean) : internalValue;
  }

  const { onChange, value } = props;
  const { onChange: groupOnChange } = context ?? {};

  const handleChange = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (isGrouped && value) {
        groupOnChange?.(value);
      } else if (!isControlled) {
        setInternalValue(!checked);
      }
      onChange?.(!checked);
    },
    [isControlled, isGrouped, onChange, value, groupOnChange, checked],
  );

  const handleChangeHiddenInput = useCallback(() => {
    if (isGrouped && value) {
      groupOnChange?.(value);
    } else if (!isControlled) {
      setInternalValue(!checked);
    }
    onChange?.(!checked);
  }, [isControlled, isGrouped, onChange, value, groupOnChange, checked]);

  return {
    checked,
    handleChange,
    handleChangeHiddenInput,
  };
}
