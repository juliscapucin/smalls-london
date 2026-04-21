import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { componentStates } from "@/storybook/matrix-helpers";

import { MatrixSection } from "@/storybook/matrix-components";
import { Button, classVariants } from "./button";

const variants = ["primary", "secondary", "ghost"] as const;
const sizes = ["xs", "sm", "md", "lg"] as const;

const matrixStatesStyles = {
  primary:
    "data-[state=default]:bg-button-primary-background data-[state=hover]:bg-button-primary-hover-background data-[state=active]:bg-button-primary-active-background data-[state=focus]:bg-button-primary-hover-background data-[state=disabled]:bg-button-primary-disabled-background data-[state=disabled]:text-button-primary-disabled-foreground",
  secondary:
    "data-[state=default]:bg-button-secondary-background data-[state=hover]:bg-button-secondary-hover-background data-[state=active]:bg-button-secondary-active-background data-[state=focus]:bg-button-secondary-hover-background data-[state=disabled]:bg-button-secondary-disabled-background data-[state=disabled]:text-button-secondary-disabled-foreground data-[state=disabled]:border-button-secondary-disabled-foreground",
  ghost:
    "data-[state=default]:bg-button-ghost-background data-[state=hover]:bg-button-ghost-hover-background data-[state=active]:bg-button-ghost-active-background data-[state=focus]:bg-button-ghost-active-background data-[state=disabled]:bg-button-ghost-disabled-background data-[state=disabled]:text-button-ghost-disabled-foreground",
};

const meta = {
  title: "UI/Button",
  component: Button,
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
    size: {
      control: { type: "select" },
      options: sizes,
    },
    children: {
      control: "text",
      description: "The text to display in the button plus icon if provided",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

type Variant = (typeof variants)[number];

function VariantMatrix({ variant }: { variant: Variant }) {
  return (
    <MatrixSection title={variant}>
      <table className="w-full border-separate border-spacing-x-3 border-spacing-y-2">
        <thead>
          <tr className="text-left text-label-small leading-label-small tracking-label-small">
            <th className="px-2 py-1">State</th>
            {sizes.map((size) => (
              <th key={size} className="px-2 py-1 uppercase">
                {size}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {componentStates.map((state) => (
            <tr key={`${variant}-${state}`}>
              <td className="px-2 py-1 text-label-small leading-label-small tracking-label-small capitalize">
                {state}
              </td>
              {sizes.map((size) => (
                <td key={`${variant}-${state}-${size}`} className="px-2 py-1">
                  <Button
                    variant={variant}
                    size={size}
                    data-state={state}
                    className={matrixStatesStyles[variant]}
                    // className={getVariantDataStateClasses(variant)}
                  >
                    Hello
                  </Button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </MatrixSection>
  );
}

export const Playground: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Button",
  },
  parameters: {
    layout: "centered",
  },
};

export const PrimaryMatrix: Story = {
  name: "Primary Matrix",
  render: () => <VariantMatrix variant="primary" />,
  globals: {
    viewport: { value: "desktop", isRotated: false },
  },
};

export const SecondaryMatrix: Story = {
  name: "Secondary Matrix",
  render: () => <VariantMatrix variant="secondary" />,
  globals: {
    viewport: { value: "desktop", isRotated: false },
  },
};

export const GhostMatrix: Story = {
  name: "Ghost Matrix",
  render: () => <VariantMatrix variant="ghost" />,
  globals: {
    viewport: { value: "desktop", isRotated: false },
  },
};
