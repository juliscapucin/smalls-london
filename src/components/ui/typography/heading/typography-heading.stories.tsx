import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { TypographyHeading } from "./typography-heading";

const variants = ["display", "headline", "title"] as const;
const colors = ["default", "inverted"] as const;

const meta = {
  title: "UI/Typography/Heading",
  component: TypographyHeading,
  tags: ["autodocs"],
  globals: {
    backgrounds: {
      value: "light",
    },
  },
  args: {
    tag: "h1",
    variant: "display",
    color: "default",
    children: "Example heading",
  },
  argTypes: {
    tag: {
      control: { type: "select" },
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    },
    variant: {
      control: { type: "select" },
      options: variants,
    },
    color: {
      control: { type: "select" },
      options: colors,
    },
    children: {
      control: "text",
      description: "Heading content",
    },
  },
} satisfies Meta<typeof TypographyHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: {
    layout: "centered",
  },
};

export const DefaultMatrix: Story = {
  name: "Default Matrix",
  render: () => (
    <div className="flex w-full flex-col gap-4 p-8">
      {variants.map((variant) => (
        <TypographyHeading
          key={`default-${variant}`}
          tag="h2"
          variant={variant}
        >
          Example heading
        </TypographyHeading>
      ))}
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};

export const InvertedMatrix: Story = {
  name: "Inverted Matrix",
  render: () => (
    <div className="w-full bg-foreground p-8">
      <div className="flex w-full flex-col gap-4">
        {variants.map((variant) => (
          <TypographyHeading
            key={`inverted-${variant}`}
            tag="h2"
            variant={variant}
            color="inverted"
          >
            Example heading
          </TypographyHeading>
        ))}
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
};
