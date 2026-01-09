import { cn } from "@/lib/utils";

type IconChevronProps = {
  className?: string;
};

export function IconChevronDown({ className }: IconChevronProps) {
  return (
    <div
      className={cn(
        "relative text-foreground pointer-events-none size-5 shrink-0 transition-transform duration-200",
        className
      )}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.2929 6.29289C16.6834 5.90237 17.3164 5.90237 17.707 6.29289C18.0975 6.68342 18.0975 7.31643 17.707 7.70696L9.99992 15.414L2.29289 7.70696C1.90237 7.31643 1.90237 6.68342 2.29289 6.29289C2.68342 5.90237 3.31643 5.90237 3.70696 6.29289L9.99992 12.5859L16.2929 6.29289Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
