import type React from "react";
import { useCallback, useRef, useState } from "react";

type Props<T> = {
  defaultValue: T;
  value?: T;
  onChange?: (value: T) => void;
};

export function useControllableValue<T>({
  defaultValue,
  value,
  onChange,
}: Props<T>) {
  const isControlled = value !== undefined;
  const internalValue = useRef(isControlled ? value : defaultValue);
  const [, setDummy] = useState({});

  if (isControlled) {
    internalValue.current = value;
  }

  const update = useCallback(() => {
    setDummy({});
  }, []);

  const setValue = useCallback<React.Dispatch<React.SetStateAction<T>>>(
    (v) => {
      const newValue = v instanceof Function ? v(internalValue.current) : v;
      if (!isControlled) {
        internalValue.current = newValue;
        update();
      }
      onChange?.(newValue);
    },
    [isControlled, onChange, update],
  );

  return [internalValue.current, setValue] as const;
}
