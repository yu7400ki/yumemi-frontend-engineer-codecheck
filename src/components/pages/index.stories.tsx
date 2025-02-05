import type { Meta, StoryObj } from "@storybook/react";
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

export const Default: Story = {};
