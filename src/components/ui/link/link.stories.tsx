import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { MatrixSection } from "@/storybook/matrix-components";
import { getForcedStateClassname } from "@/storybook/matrix-helpers";
import { linkStateStyles, Link, type LinkVariant } from "./link";

const variants: LinkVariant[] = ["default", "footer", "inline"];
const states = ["default", "hover", "active", "focus"] as const;

const meta = {
  title: "UI/Link",
  component: Link,
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
    children: {
      control: "text",
      description: "The text to display in the link",
    },
    href: {
      control: "text",
    },
    className: {
      control: false,
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

function VariantMatrix({ variant }: { variant: LinkVariant }) {
  return (
    <MatrixSection title={variant}>
      <table className="w-full border-separate border-spacing-x-3 border-spacing-y-2">
        <thead>
          <tr className="text-left text-label-small leading-label-small tracking-label-small">
            <th className="px-2 py-1">State</th>
            <th className="px-2 py-1">Renders</th>
          </tr>
        </thead>
        <tbody>
          {states.map((state) => (
            <tr key={`${variant}-${state}`}>
              <td className="px-2 py-1 text-label-small leading-label-small tracking-label-small capitalize">
                {state}
              </td>
              <td className="px-2 py-1">
                <Link
                  href="/"
                  variant={variant}
                  data-state={state}
                  className={getForcedStateClassname({
                    stateStylesByVariant: linkStateStyles,
                    variant,
                    state,
                  })}
                >
                  Link
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MatrixSection>
  );
}

export const Playground: Story = {
  args: {
    href: "/",
    variant: "default",
    children: "Link",
  },
  parameters: {
    layout: "centered",
  },
};

export const DefaultMatrix: Story = {
  name: "Default Matrix",
  args: {
    href: "/",
    variant: "default",
  },
  render: () => <VariantMatrix variant="default" />,
  globals: {
    viewport: { value: "desktop", isRotated: false },
  },
};

export const FooterMatrix: Story = {
  name: "Footer Matrix",
  args: {
    href: "/",
  },
  render: () => <VariantMatrix variant="footer" />,
  globals: {
    viewport: { value: "desktop", isRotated: false },
  },
};

export const InlineMatrix: Story = {
  name: "Inline Matrix",
  args: {
    href: "/",
  },
  render: () => <VariantMatrix variant="inline" />,
  globals: {
    viewport: { value: "desktop", isRotated: false },
  },
};
