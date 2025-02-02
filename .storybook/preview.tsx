import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from "msw-storybook-addon";
import { TanstackQueryProvider } from "../src/components/providers/tanstack-query";
import { handlers } from "../src/mocks/handlers";
import "../src/index.css";

initialize();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers,
    },
  },
  decorators: [
    (Story) => (
      <TanstackQueryProvider>
        <Story />
      </TanstackQueryProvider>
    ),
  ],
  loaders: [mswLoader],
};

export default preview;
