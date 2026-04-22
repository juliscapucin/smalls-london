import { cva, type VariantProps } from "class-variance-authority";

import { TypographyHeading } from "@/components/ui/typography/heading/typography-heading";
import { cn } from "@/lib/utils";

const categoryHeaderVariants = cva("border-t-2 border-foreground px-6 py-4", {
  variants: {
    color: {
      "accent-1": "bg-accent-1",
      "accent-2": "bg-accent-2",
      "accent-3": "bg-accent-3",
      "accent-4": "bg-accent-4",
      "accent-5": "bg-accent-5",
    },
  },
});

type CategoryHeaderColor = NonNullable<
  VariantProps<typeof categoryHeaderVariants>["color"]
>;

type CategoryHeaderProps = {
  className?: string;
  color: CategoryHeaderColor;
  label: string;
};

export function CategoryHeader({
  className,
  color,
  label,
}: CategoryHeaderProps) {
  return (
    <header
      className={cn(categoryHeaderVariants({ color }), className)}
      aria-label={label}
    >
      <TypographyHeading tag="h2" variant="display">
        {label}
      </TypographyHeading>
    </header>
  );
}

export type { CategoryHeaderColor, CategoryHeaderProps };
