# Design System

This project uses a custom design system built with:

- Tailwind CSS (utilities)
- CSS variables (design tokens)
- Radix UI (behavior & accessibility primitives)

The goal is consistency, accessibility and flexibility.

## Principles

- Tokens define meaning, utilities apply styles
- Components own interaction and states
- Semantics come before visuals
- Prefer a component-first, token-driven styling pattern

---

# Design Tokens

## Color System

The color system is structured in **two layers**.

### 1. Structural colors

Structural colors define surfaces, text, and UI.  
They are neutral and used throughout the interface.

Examples:

- `--color-background`
- `--color-foreground`
- `--color-ring` (used for focus-within ring)

Usage:

- Applied globally (body, cards, popovers)
- Components should default to structural colors unless emphasis is needed

### 2. UI semantic colors

Semantic colors describe **interaction and state**.

Examples:

- `--color-muted`
- `--color-destructive`
- `--color-accent`

Usage:

- Buttons, links, focus/hover states
- Selection and interactive feedback

---

## Typography

Typography is tokenized by **role** and **breakpoint**, inspired by Material 3.

Roles:

- Display
- Headline
- Title
- Body
- Label

Each role defines:

- Responsive font sizes (mobile / tablet / desktop)
- Line height
- Letter spacing (where relevant)

Usage rules:

- Use semantic text roles instead of arbitrary font sizes
- Avoid Tailwind `text-*` utilities for UI text
- Typography is applied via tokens or wrapper components

---

## Layout

Layout decisions are centralized to maintain rhythm and consistency.

Defined tokens:

- `--max-width-desktop`
- `--max-width-content`
- Header, footer, and content heights
- Page padding:
  - Mobile: p-4 (16px)
  - Tablet: p-6 (24px)
  - Desktop: p-8 (32px)

Usage:

- Page containers should respect the defined max widths
- Global layout spacing is tokenized; component spacing uses Tailwind utilities

---

## Spacing

Spacing uses Tailwind's default spacing scale.

Conventions:

- Component padding: `px-3`, `px-4`, `px-6`
- Stack gaps:
  - Tight: `gap-2`
  - Default: `gap-4`
  - Loose: `gap-6`
- Section spacing:
  - Mobile: `space-y-6`
  - Desktop: `space-y-12`

Avoid introducing arbitrary spacing values.

---

## Components

### Button

- Use `<Button />` for all interactive actions
- Use `asChild` to preserve correct semantics when the element is not a `<button>` (e.g. links)
- Variants express intent (primary, secondary, destructive), not color
- Button styles should not be recreated via utility classes

Example:

- `primary` → main action
- `destructive` → irreversible action
