import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { useState } from "react";
import { Checkbox } from "./checkbox";

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    children: "Checkbox",
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    children: "Checkbox",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const checkboxButton = canvas.getByRole("checkbox");

    expect(checkboxButton).toHaveAttribute("aria-checked", "false");

    await userEvent.click(checkboxButton);
    expect(checkboxButton).toHaveAttribute("aria-checked", "true");

    await userEvent.click(checkboxButton);
    expect(checkboxButton).toHaveAttribute("aria-checked", "false");
  },
};

export const CheckedByDefault: Story = {
  args: {
    children: "Checked Checkbox",
    defaultValue: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const checkboxButton = canvas.getByRole("checkbox");

    expect(checkboxButton).toHaveAttribute("aria-checked", "true");

    await userEvent.click(checkboxButton);
    expect(checkboxButton).toHaveAttribute("aria-checked", "false");

    await userEvent.click(checkboxButton);
    expect(checkboxButton).toHaveAttribute("aria-checked", "true");
  },
};

const ControlledCheckboxWrapper = () => {
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <Checkbox value={checked} onChange={(newVal) => setChecked(newVal)}>
      Controlled Checkbox
    </Checkbox>
  );
};

export const Controlled: Story = {
  render: () => <ControlledCheckboxWrapper />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const checkboxButton = canvas.getByRole("checkbox");

    expect(checkboxButton).toHaveAttribute("aria-checked", "false");

    await userEvent.click(checkboxButton);
    expect(checkboxButton).toHaveAttribute("aria-checked", "true");

    await userEvent.click(checkboxButton);
    expect(checkboxButton).toHaveAttribute("aria-checked", "false");
  },
};
