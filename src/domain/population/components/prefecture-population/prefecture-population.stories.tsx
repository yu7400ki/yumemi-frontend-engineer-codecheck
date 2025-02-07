import { PrefecturesCheckboxGroup } from "@/domain/prefecture/components/prefectures-checkbox-group";
import { handlers as prefecturesHandlers } from "@/domain/prefecture/mocks/handlers";
import { client } from "@/libs/api";
import { InMemoryStore, LocationStateProvider } from "@location-state/core";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { css } from "styled-system/css";
import { PrefecturePopulation } from "./prefecture-population";

function Component() {
  return (
    <div
      className={css({
        display: "grid",
        gap: 8,
      })}
    >
      <PrefecturesCheckboxGroup />
      <PrefecturePopulation />
    </div>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <LocationStateProvider stores={{ url: new InMemoryStore() }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </LocationStateProvider>
  );
}

const meta = {
  title: "Domain/Population/PrefecturePopulation",
  component: Component,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Providers>
        <Story />
      </Providers>
    ),
  ],
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof Component>;

export const Default: Story = {};

export const OnError: Story = {
  parameters: {
    msw: [
      ...prefecturesHandlers,
      http.get(client.population.$url().toString(), () => {
        HttpResponse.json([]);
      }),
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const checkbox = await canvas.findByRole("checkbox", {
      name: "北海道",
    });

    await userEvent.click(checkbox);
    expect(checkbox).toHaveAttribute("aria-checked", "true");

    await waitFor(() => {
      expect(checkbox).toHaveAttribute("aria-checked", "false");
    });
  },
};
