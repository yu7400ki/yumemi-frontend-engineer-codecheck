import { TanstackQueryProvider } from "@/components/providers/tanstack-query";
import { PrefecturesCheckboxGroup } from "@/domain/prefecture/components/prefectures-checkbox-group";
import { InMemoryStore, LocationStateProvider } from "@location-state/core";
import type { Meta, StoryObj } from "@storybook/react";
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

function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <LocationStateProvider stores={{ url: new InMemoryStore() }}>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
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
