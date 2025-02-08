import { client } from "@/libs/api";
import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "msw";
import { Page } from ".";

const meta = {
  title: "Pages/Index",
  component: Page,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof Page>;

function createQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return queryClient;
}

function decorators(queryClient: QueryClient): Story["decorators"] {
  return (Story) => (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  );
}

export const Default: Story = {
  decorators: decorators(createQueryClient()),
};

export const OnError: Story = {
  decorators: decorators(createQueryClient()),
  parameters: {
    msw: {
      handlers: [
        [
          http.get(client.prefectures.$url().toString(), () => {
            return new Response("Internal Server Error", { status: 500 });
          }),
        ],
      ],
    },
  },
};
