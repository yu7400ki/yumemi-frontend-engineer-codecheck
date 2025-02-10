import { useControllableValue } from "@/hooks/use-controllable-value";
import { type RefObject, createRef, useCallback, useMemo, useRef } from "react";
import type { Option } from "./segmented-control.types";

export type Props = {
  options: Option[];
  value?: string;
  defaultValue: string;
  onChange?: (value: string) => void;
};

export function useSegmentedControl(props: Props) {
  const [value, setValue] = useControllableValue({
    value: props.value,
    defaultValue: props.defaultValue,
    onChange: props.onChange,
  });
  const optionsRef = useRef<RefObject<HTMLButtonElement | null>[]>([]);

  useMemo(() => {
    optionsRef.current = props.options.map(() =>
      createRef<HTMLButtonElement>(),
    );
  }, [props.options]);

  const handleChange = useCallback(
    (item: string) => {
      setValue(item);
    },
    [setValue],
  );

  const moveFocusRelative = useCallback((relative: number) => {
    const index = optionsRef.current.findIndex(
      (ref) => ref.current === document.activeElement,
    );
    if (index !== -1) {
      const newIndex = index + relative;
      if (newIndex >= 0 && newIndex < optionsRef.current.length) {
        optionsRef.current[newIndex].current?.focus();
      }
    }
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.currentTarget !== document.activeElement) {
        return;
      }
      if (event.key === "ArrowLeft") {
        moveFocusRelative(-1);
      } else if (event.key === "ArrowRight") {
        moveFocusRelative(1);
      }
    },
    [moveFocusRelative],
  );

  return {
    value,
    handleChange,
    handleKeyDown,
    optionsRef,
  };
}
