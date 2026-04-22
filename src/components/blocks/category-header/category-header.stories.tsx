import type { Meta, StoryObj } from "@storybook/react";

import { CategoryHeader } from "./category-header";

const variantMatrix = [
  { color: "accent-1", label: "Design" },
  { color: "accent-2", label: "Furniture" },
  { color: "accent-3", label: "Beauty" },
  { color: "accent-4", label: "Textiles" },
  { color: "accent-5", label: "Digital" },
] as const;

const meta = {
  title: "Blocks/CategoryHeader",
  component: CategoryHeader,
  tags: ["autodocs"],
  args: {
    color: "accent-1",
    label: "Design",
  },
  argTypes: {
    color: {
      control: "select",
      options: ["accent-1", "accent-2", "accent-3", "accent-4", "accent-5"],
    },
    label: {
      control: "text",
    },
  },
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="h-fit overflow-hidden gutter-stable bg-background">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CategoryHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    color: "accent-1",
    label: "Design",
  },
};

export const Accent4: Story = {
  args: {
    color: "accent-4",
    label: "Textiles",
  },
};

export const CustomLabel: Story = {
  args: {
    color: "accent-3",
    label: "Wellness",
  },
};

export const VariantMatrix: Story = {
  render: () => (
    <div className="flex flex-col">
      {variantMatrix.map((variant) => (
        <CategoryHeader
          key={variant.color}
          color={variant.color}
          label={variant.label}
        />
      ))}
    </div>
  ),
};
