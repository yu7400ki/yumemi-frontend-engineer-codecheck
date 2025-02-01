import { useCallback, useState } from "react";

export type Props = {
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
};

export function useCheckbox(props: Props) {
  const isControlled = props.value !== undefined;
  const [internalValue, setInternalValue] = useState(
    props.defaultValue ?? false,
  );

  const value = isControlled ? props.value : internalValue;

  const handleChange = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (!isControlled) {
        setInternalValue(!internalValue);
      }
      props.onChange?.(!value);
    },
    [internalValue, isControlled, props, value],
  );

  return {
    value,
    handleChange,
  };
}
