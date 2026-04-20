import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Link, type LinkVariant } from "./link";

const variants: LinkVariant[] = ["default", "footer", "inline"];
const states = ["default", "hover", "active", "focus"] as const;
type LinkState = (typeof states)[number];

function getStateClassname(variant: LinkVariant, state: LinkState) {
  if (variant === "default") {
    if (state === "hover") return "border-foreground bg-accent-1";
    if (state === "active") return "border-foreground bg-background";
    if (state === "focus")
      return "border-foreground bg-background shadow-[0_0_0_2px_var(--ring)]";
    return "";
  }

  if (variant === "footer") {
    if (state === "focus")
      return "border-ring underline decoration-1 underline-offset-2";
    if (state === "hover" || state === "active")
      return "underline decoration-1 underline-offset-2";
    return "";
  }

  if (state === "focus") return "border-ring text-foreground";
  if (state === "hover" || state === "active") return "text-foreground";
  return "";
}

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
    <div className="flex flex-col gap-4 bg-background p-8 text-foreground">
      <section className="flex flex-col gap-4">
        <h3 className="text-title-small leading-title-small tracking-title-small capitalize">
          {variant}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-x-3 border-spacing-y-2">
            <thead>
              <tr className="text-left text-label-small leading-label-small tracking-label-small">
                <th className="px-2 py-1">State</th>
                <th className="px-2 py-1">Link</th>
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
                      className={getStateClassname(variant, state)}
                    >
                      Link
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
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
