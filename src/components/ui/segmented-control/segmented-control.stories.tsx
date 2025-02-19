import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, waitFor, within } from "@storybook/test";
import { useState } from "react";
import { SegmentedControl } from "./segmented-control";
import type { Option } from "./segmented-control.types";

// テスト用の選択肢
const options: Option[] = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C", value: "c" },
];

const meta: Meta<typeof SegmentedControl> = {
  title: "UI/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  args: {
    options,
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;

type Story = StoryObj<typeof SegmentedControl>;

export const Default: Story = {
  args: {
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const optionA = canvas.getByRole("radio", { name: "Option A" });
    const optionB = canvas.getByRole("radio", { name: "Option B" });
    const optionC = canvas.getByRole("radio", { name: "Option C" });

    expect(optionA).toHaveAttribute("aria-checked", "true");
    expect(optionB).toHaveAttribute("aria-checked", "false");
    expect(optionC).toHaveAttribute("aria-checked", "false");

    await userEvent.click(optionB);

    expect(optionA).toHaveAttribute("aria-checked", "false");
    expect(optionB).toHaveAttribute("aria-checked", "true");
    expect(optionC).toHaveAttribute("aria-checked", "false");

    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalledWith("b");
    });
  },
};

export const KeyboardNavigation: Story = {
  args: {
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const optionA = canvas.getByRole("radio", { name: "Option A" });
    const optionB = canvas.getByRole("radio", { name: "Option B" });
    const optionC = canvas.getByRole("radio", { name: "Option C" });

    optionA.focus();
    expect(optionA).toHaveFocus();

    await userEvent.keyboard("{arrowright}");
    expect(optionB).toHaveFocus();

    await userEvent.keyboard("{arrowright}");
    expect(optionC).toHaveFocus();

    await userEvent.keyboard("{arrowleft}");
    expect(optionB).toHaveFocus();
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState("b");
    return (
      <SegmentedControl options={options} value={value} onChange={setValue} />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const optionA = canvas.getByRole("radio", { name: "Option A" });
    const optionB = canvas.getByRole("radio", { name: "Option B" });
    const optionC = canvas.getByRole("radio", { name: "Option C" });

    expect(optionA).toHaveAttribute("aria-checked", "false");
    expect(optionB).toHaveAttribute("aria-checked", "true");
    expect(optionC).toHaveAttribute("aria-checked", "false");

    await userEvent.click(optionC);

    expect(optionA).toHaveAttribute("aria-checked", "false");
    expect(optionB).toHaveAttribute("aria-checked", "false");
    expect(optionC).toHaveAttribute("aria-checked", "true");
  },
};
