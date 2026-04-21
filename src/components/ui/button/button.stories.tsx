import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { MatrixSection } from "@/storybook/matrix-components";
import { getForcedStateClassname } from "@/storybook/matrix-helpers";
import { buttonStateStyles, Button, type ButtonState } from "./button";

const variants = ["primary", "secondary", "ghost"] as const;
const sizes = ["xs", "sm", "md", "lg"] as const;
const states: ButtonState[] = [
  "default",
  "hover",
  "active",
  "focus",
  "disabled",
];

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
          {states.map((state) => (
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
                    className={getForcedStateClassname({
                      stateStylesByVariant: buttonStateStyles,
                      variant,
                      state,
                    })}
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
