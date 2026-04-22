import type { Meta, StoryObj } from "@storybook/react";

import { Footer } from "./footer";

const meta = {
  title: "Blocks/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    variant: "default",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "dark"],
      description: "Footer color variant",
    },
  },
  decorators: [
    (Story) => (
      <div className="gutter-stable">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
  },
};

export const Dark: Story = {
  args: {
    variant: "dark",
  },
};
