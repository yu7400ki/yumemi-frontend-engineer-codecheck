import { createContext } from "react";

type CheckboxGroupContextType = {
  value: string[];
  onChange: (item: string) => void;
};

export const CheckboxGroupContext = createContext<
  CheckboxGroupContextType | undefined
>(undefined);
