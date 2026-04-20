import { Link } from "@/components/ui/link";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

const FOOTER_LINKS = [
  { label: "About us", href: "/about-us" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Support", href: "/support" },
] as const;

export type FooterVariant = "default" | "dark";

type FooterProps = {
  className?: string;
  variant?: FooterVariant;
};

export function Footer({ className, variant = "default" }: FooterProps) {
  const isDark = variant === "dark";

  return (
    <footer
      className={cn(
        "py-6 px-4 h-footer flex flex-col justify-between",
        isDark ? "bg-foreground" : "bg-accent-2",
        className,
      )}
      aria-label="Footer"
    >
      <nav aria-label="Footer links">
        <ul className="flex flex-col items-start text-foreground">
          {FOOTER_LINKS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                variant="footer"
                className={isDark ? "text-background" : "text-foreground"}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={`flex w-full justify-between gap-8 md:flex-row md:items-end px-2 ${isDark ? "text-background" : "text-foreground"}`}
      >
        <div className="flex flex-col items-start gap-2">
          <Logo variant={isDark ? "horizontal-inverted" : "horizontal-alt"} />
          <p className="text-body-large">
            All rights reserved ©{new Date().getFullYear()}
          </p>
        </div>
        <p className="text-body-large md:text-right">
          Crafted by Juli Scapucin
        </p>
      </div>
    </footer>
  );
}
