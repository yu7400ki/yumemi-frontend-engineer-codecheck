import { CheckboxGroupContext } from "./checkbox-group.context";
import { useCheckboxGroup } from "./checkbox-group.hooks";

export type Props = {
  children?: React.ReactNode;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
};

export function CheckboxGroup(props: Props) {
  const { value, handleChange } = useCheckboxGroup(props);

  return (
    <CheckboxGroupContext
      value={{ value: value ?? [], onChange: handleChange }}
    >
      {props.children}
    </CheckboxGroupContext>
  );
}
