import { cn } from "@/lib/utils";

export function IconClose() {
  const classnames =
    "absolute h-0.5 w-full bg-foreground rotate-45 rounded-full top-1/2 left-0 transform -translate-y-1/2";
  return (
    <div className="relative size-6" aria-hidden="true">
      <div className={cn(classnames, "rotate-45")}></div>
      <div className={cn(classnames, "-rotate-45")}></div>
    </div>
  );
}
