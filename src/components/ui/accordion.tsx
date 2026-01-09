"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { cn } from "@/lib/utils";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b-2 border-foreground", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-start justify-between gap-4 py-2 my-2 text-left transition-all outline-none hover:underline disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>div]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <IconChevronDown />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down overflow-hidden border-t-2 border-foreground"
      {...props}
    >
      <div className={cn("p-4 pt-2", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

function IconChevronDown() {
  return (
    <div className="text-foreground pointer-events-none size-5 shrink-0 translate-y-0.5 transition-transform duration-200">
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

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
