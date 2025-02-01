import { useCallback, useState } from "react";

export type Props = {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
};

export function useCheckboxGroup(props: Props) {
  const isControlled = props.value !== undefined;
  const [internalValue, setInternalValue] = useState(props.defaultValue ?? []);

  const value = isControlled ? props.value : internalValue;

  const { onChange } = props;

  const handleChange = useCallback(
    (item: string) => {
      const newValue = new Set(value);
      if (newValue.has(item)) {
        newValue.delete(item);
      } else {
        newValue.add(item);
      }
      if (!isControlled) {
        setInternalValue(Array.from(newValue));
      }
      onChange?.(Array.from(newValue));
    },
    [isControlled, onChange, value],
  );

  return {
    value,
    handleChange,
  };
}
