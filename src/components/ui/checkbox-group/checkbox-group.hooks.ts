import { useControllableValue } from "@/hooks/use-controllable-value";
import { useCallback } from "react";

export type Props = {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
};

export function useCheckboxGroup(props: Props) {
  const [value, setValue] = useControllableValue({
    value: props.value,
    defaultValue: props.defaultValue ?? [],
    onChange: props.onChange,
  });

  const handleChange = useCallback(
    (item: string) => {
      const newValue = new Set(value);
      if (newValue.has(item)) {
        newValue.delete(item);
      } else {
        newValue.add(item);
      }
      setValue(Array.from(newValue));
    },
    [value, setValue],
  );

  return {
    value,
    handleChange,
  };
}
