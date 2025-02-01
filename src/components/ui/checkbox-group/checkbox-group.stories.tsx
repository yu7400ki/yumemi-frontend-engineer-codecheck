import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, userEvent, waitFor, within } from "@storybook/test";
import { useState } from "react";
import { Checkbox } from "../checkbox/checkbox";
import { CheckboxGroup } from "./checkbox-group";

function Children() {
  return (
    <>
      <Checkbox name="checkbox" value="a">
        Checkbox A
      </Checkbox>
      <Checkbox name="checkbox" value="b">
        Checkbox B
      </Checkbox>
      <Checkbox name="checkbox" value="c">
        Checkbox C
      </Checkbox>
    </>
  );
}

const meta = {
  title: "UI/CheckboxGroup",
  component: CheckboxGroup,
  tags: ["autodocs"],
  args: {
    children: <Children />,
  },
  parameters: {
    layout: "centered",
  },
} as Meta<typeof CheckboxGroup>;

export default meta;

type Story = StoryObj<typeof CheckboxGroup>;

export const Default: Story = {
  args: {
    children: <Children />,
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const checkboxA = canvas.getByRole("checkbox", { name: "Checkbox A" });
    const checkboxB = canvas.getByRole("checkbox", { name: "Checkbox B" });
    const checkboxC = canvas.getByRole("checkbox", { name: "Checkbox C" });

    expect(checkboxA).toHaveAttribute("aria-checked", "false");
    expect(checkboxB).toHaveAttribute("aria-checked", "false");
    expect(checkboxC).toHaveAttribute("aria-checked", "false");

    await userEvent.click(checkboxA);
    expect(checkboxA).toHaveAttribute("aria-checked", "true");
    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalledWith(["a"]);
    });

    await userEvent.click(checkboxB);
    expect(checkboxB).toHaveAttribute("aria-checked", "true");
    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalledWith(
        expect.arrayContaining(["a", "b"]),
      );
    });

    await userEvent.click(checkboxA);
    expect(checkboxA).toHaveAttribute("aria-checked", "false");
    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalledWith(["b"]);
    });
  },
};

export const WithDefaultValue: Story = {
  args: {
    children: <Children />,
    defaultValue: ["a", "b"],
    onChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const checkboxA = canvas.getByRole("checkbox", { name: "Checkbox A" });
    const checkboxB = canvas.getByRole("checkbox", { name: "Checkbox B" });
    const checkboxC = canvas.getByRole("checkbox", { name: "Checkbox C" });

    expect(checkboxA).toHaveAttribute("aria-checked", "true");
    expect(checkboxB).toHaveAttribute("aria-checked", "true");
    expect(checkboxC).toHaveAttribute("aria-checked", "false");

    await userEvent.click(checkboxA);
    expect(checkboxA).toHaveAttribute("aria-checked", "false");
    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalledWith(["b"]);
    });

    await userEvent.click(checkboxC);
    expect(checkboxC).toHaveAttribute("aria-checked", "true");
    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalledWith(["b", "c"]);
    });
  },
};

const ControlledCheckboxWrapper = () => {
  const [value, setValue] = useState<string[]>(["a", "b"]);
  return (
    <CheckboxGroup value={value} onChange={setValue}>
      <Children />
    </CheckboxGroup>
  );
};

export const Controlled: Story = {
  args: {
    children: <ControlledCheckboxWrapper />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const checkboxA = canvas.getByRole("checkbox", { name: "Checkbox A" });
    const checkboxB = canvas.getByRole("checkbox", { name: "Checkbox B" });
    const checkboxC = canvas.getByRole("checkbox", { name: "Checkbox C" });

    expect(checkboxA).toHaveAttribute("aria-checked", "true");
    expect(checkboxB).toHaveAttribute("aria-checked", "true");
    expect(checkboxC).toHaveAttribute("aria-checked", "false");

    await userEvent.click(checkboxA);
    expect(checkboxA).toHaveAttribute("aria-checked", "false");

    await userEvent.click(checkboxC);
    expect(checkboxC).toHaveAttribute("aria-checked", "true");
  },
};

const FormCheckboxGroupWrapper = ({
  onSubmit,
}: { onSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      <CheckboxGroup>
        <Children />
      </CheckboxGroup>
      <button type="submit">Submit</button>
    </form>
  );
};

export const Form: StoryObj<typeof FormCheckboxGroupWrapper> = {
  render: (args) => <FormCheckboxGroupWrapper {...args} />,
  args: {
    onSubmit: fn((e) => {
      const formData = new FormData(e.currentTarget);
      const values = formData.getAll("checkbox");
      expect(values).toEqual(["a", "b"]);
    }),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const checkboxA = canvas.getByRole("checkbox", { name: "Checkbox A" });
    const checkboxB = canvas.getByRole("checkbox", { name: "Checkbox B" });
    const submitButton = canvas.getByRole("button", { name: "Submit" });

    await userEvent.click(checkboxA);
    await userEvent.click(checkboxB);
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(args.onSubmit).toHaveBeenCalled();
    });
  },
};
