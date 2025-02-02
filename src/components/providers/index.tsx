import { LocationStateProvider } from "@location-state/core";
import { TanstackQueryProvider } from "./tanstack-query";

type Props = {
  children?: React.ReactNode;
};

export function Providers({ children }: Props) {
  return (
    <LocationStateProvider>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </LocationStateProvider>
  );
}
