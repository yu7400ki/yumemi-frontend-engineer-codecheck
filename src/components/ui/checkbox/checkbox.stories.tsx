import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, waitFor, within } from "@storybook/test";
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
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const checkboxButton = canvas.getByRole("checkbox");

    expect(checkboxButton).toHaveAttribute("aria-checked", "false");

    await userEvent.click(checkboxButton);
    expect(checkboxButton).toHaveAttribute("aria-checked", "true");
    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalledWith(true);
    });

    await userEvent.click(checkboxButton);
    expect(checkboxButton).toHaveAttribute("aria-checked", "false");
    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalledWith(false);
    });
  },
};

export const CheckedByDefault: Story = {
  args: {
    children: "Checked Checkbox",
    defaultChecked: true,
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const checkboxButton = canvas.getByRole("checkbox");

    expect(checkboxButton).toHaveAttribute("aria-checked", "true");

    await userEvent.click(checkboxButton);
    expect(checkboxButton).toHaveAttribute("aria-checked", "false");
    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalledWith(false);
    });

    await userEvent.click(checkboxButton);
    expect(checkboxButton).toHaveAttribute("aria-checked", "true");
    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalledWith(true);
    });
  },
};

const ControlledCheckboxWrapper = () => {
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <Checkbox checked={checked} onChange={(newVal) => setChecked(newVal)}>
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

const FormCheckboxWrapper = ({
  onSubmit,
}: { onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}
    >
      <Checkbox name="checkbox">Form Checkbox</Checkbox>
      <button type="submit">Submit</button>
    </form>
  );
};

export const Form: StoryObj<typeof FormCheckboxWrapper> = {
  render: (args) => <FormCheckboxWrapper {...args} />,
  args: {
    onSubmit: fn((e) => {
      const form = new FormData(e.target);
      expect(form.get("checkbox")).toBe("on");
    }),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const checkboxButton = canvas.getByRole("checkbox");
    const submitButton = canvas.getByRole("button", { name: "Submit" });

    expect(checkboxButton).toHaveAttribute("aria-checked", "false");

    await userEvent.click(checkboxButton);
    expect(checkboxButton).toHaveAttribute("aria-checked", "true");

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(args.onSubmit).toHaveBeenCalled();
    });
  },
};
