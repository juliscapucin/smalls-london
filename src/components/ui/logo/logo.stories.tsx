import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Logo, variants } from "./logo";

const meta = {
  title: "UI/Logo",
  component: Logo,
  tags: ["autodocs"],
  globals: {
    backgrounds: {
      value: "light",
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: variants,
    },
    className: {
      control: false,
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    variant: "default",
  },
  parameters: {
    layout: "centered",
  },
};

export const Default: Story = {
  args: {
    variant: "default",
  },
  parameters: {
    layout: "centered",
  },
};

export const Stacked: Story = {
  args: {
    variant: "horizontal",
  },
  parameters: {
    layout: "centered",
  },
};

export const HorizontalInverted: Story = {
  args: {
    variant: "horizontal-inverted",
  },
  globals: {
    backgrounds: {
      value: "dark",
    },
  },
  parameters: {
    layout: "centered",
  },
};

export const HorizontalAlt: Story = {
  args: {
    variant: "horizontal-alt",
  },
  parameters: {
    layout: "centered",
  },
};
