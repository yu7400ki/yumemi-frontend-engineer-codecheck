import { TanstackQueryProvider } from "@/components/providers/tanstack-query";
import { InMemoryStore, LocationStateProvider } from "@location-state/core";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { usePrefecturesSelector } from "../../hooks/use-prefectures-selector";
import { seedPrefectures } from "../../mocks/data";
import { PrefecturesCheckboxGroup } from "./prefectures-checkbox-group";

function Providers({ children }: { children?: React.ReactNode }) {
  return (
    <LocationStateProvider stores={{ url: new InMemoryStore() }}>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </LocationStateProvider>
  );
}

const meta = {
  title: "Domain/Prefecture/PrefecturesCheckboxGroup",
  component: PrefecturesCheckboxGroup,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Providers>
        <Story />
      </Providers>
    ),
  ],
} satisfies Meta<typeof PrefecturesCheckboxGroup>;

export default meta;

type Story = StoryObj<typeof PrefecturesCheckboxGroup>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const prefectures = seedPrefectures();
    const checkboxes = await canvas.findAllByRole("checkbox");
    expect(checkboxes).toHaveLength(prefectures.length);

    for (const prefecture of prefectures) {
      const checkbox = canvas.getByLabelText(prefecture.prefName);
      expect(checkbox).toHaveAttribute("aria-checked", "false");
    }

    const hokkaidoCheckbox = await canvas.findByRole("checkbox", {
      name: "北海道",
    });

    expect(hokkaidoCheckbox).toHaveAttribute("aria-checked", "false");

    await userEvent.click(hokkaidoCheckbox);
    expect(hokkaidoCheckbox).toHaveAttribute("aria-checked", "true");

    await userEvent.click(hokkaidoCheckbox);
    expect(hokkaidoCheckbox).toHaveAttribute("aria-checked", "false");
  },
};

export const MultipleSelection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const hokkaidoCheckbox = await canvas.findByRole("checkbox", {
      name: "北海道",
    });
    const tokyoCheckbox = await canvas.findByRole("checkbox", {
      name: "東京都",
    });

    expect(hokkaidoCheckbox).toHaveAttribute("aria-checked", "false");
    expect(tokyoCheckbox).toHaveAttribute("aria-checked", "false");

    await userEvent.click(hokkaidoCheckbox);
    await userEvent.click(tokyoCheckbox);

    expect(hokkaidoCheckbox).toHaveAttribute("aria-checked", "true");
    expect(tokyoCheckbox).toHaveAttribute("aria-checked", "true");
  },
};

const PrefecturesWrapper = () => {
  const { selectedPrefectureCodes } = usePrefecturesSelector();
  return (
    <div>
      <PrefecturesCheckboxGroup />
      <div data-testid="selected">
        {selectedPrefectureCodes.length > 0
          ? selectedPrefectureCodes.join(",")
          : "none"}
      </div>
    </div>
  );
};

export const DisplaySelected: Story = {
  name: "Display Selected Prefectures",
  render: () => <PrefecturesWrapper />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const tokyoCheckbox = await canvas.findByRole("checkbox", {
      name: "東京都",
    });
    const selectedDisplay = await canvas.findByTestId("selected");

    expect(selectedDisplay).toHaveTextContent("none");

    await userEvent.click(tokyoCheckbox);
    await waitFor(() => {
      expect(selectedDisplay).toHaveTextContent("13");
    });

    await userEvent.click(tokyoCheckbox);
    await waitFor(() => {
      expect(selectedDisplay).toHaveTextContent("none");
    });
  },
};
