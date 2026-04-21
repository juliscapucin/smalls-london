import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { MatrixSection } from "@/storybook/matrix-components";
import { componentStates } from "@/storybook/matrix-helpers";
import { Link, type LinkVariant } from "./link";

const variants: LinkVariant[] = ["default", "footer", "inline"];

const matrixStatesStyles: Record<LinkVariant, string> = {
  default:
    "data-[state=hover]:border-foreground data-[state=hover]:bg-accent-1 data-[state=active]:border-foreground data-[state=active]:bg-background data-[state=focus]:border-foreground data-[state=focus]:bg-background data-[state=focus]:ring-2 data-[state=focus]:ring-ring data-[state=focus]:ring-offset-2 data-[state=disabled]:border-foreground data-[state=disabled]:bg-background",
  footer:
    "data-[state=hover]:underline data-[state=hover]:decoration-1 data-[state=hover]:underline-offset-2 data-[state=active]:underline data-[state=active]:decoration-1 data-[state=active]:underline-offset-2 data-[state=focus]:border-ring data-[state=focus]:underline data-[state=focus]:decoration-1 data-[state=focus]:underline-offset-2 data-[state=focus]:ring-2 data-[state=focus]:ring-ring data-[state=focus]:ring-offset-2 data-[state=disabled]:border-ring data-[state=disabled]:underline data-[state=disabled]:decoration-1 data-[state=disabled]:underline-offset-2",
  inline:
    "data-[state=hover]:text-foreground data-[state=active]:text-foreground data-[state=focus]:border-ring data-[state=focus]:text-foreground data-[state=focus]:ring-2 data-[state=focus]:ring-ring data-[state=focus]:ring-offset-2 data-[state=disabled]:text-muted-foreground",
};

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
          {componentStates.map((state) => (
            <tr key={`${variant}-${state}`}>
              <td className="px-2 py-1 text-label-small leading-label-small tracking-label-small capitalize">
                {state}
              </td>
              <td className="px-2 py-1">
                <Link
                  href="/"
                  variant={variant}
                  data-state={state}
                  className={matrixStatesStyles[variant]}
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
    children: "Link",
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
    variant: "footer",
    children: "Link",
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
    variant: "inline",
    children: "Link",
  },
  render: () => <VariantMatrix variant="inline" />,
  globals: {
    viewport: { value: "desktop", isRotated: false },
  },
};
