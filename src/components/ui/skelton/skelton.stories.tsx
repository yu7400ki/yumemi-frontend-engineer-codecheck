import type { Meta, StoryObj } from "@storybook/react";
import { css } from "styled-system/css";
import { Skelton } from "./skelton";

const meta = {
  title: "UI/Skelton",
  component: Skelton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    className: css({
      w: 20,
      h: 12,
    }),
  },
} as Meta<typeof Skelton>;

export default meta;

type Story = StoryObj<typeof Skelton>;

export const Default: Story = {};
