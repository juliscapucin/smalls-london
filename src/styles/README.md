# Design System

This project uses a custom design system built with:

- Tailwind CSS (utilities)
- CSS variables (design tokens)
- Radix UI (behavior & accessibility primitives)
- shadcn/ui (component patterns)

The goal is consistency, accessibility, and flexibility

## Principles

- Tokens define meaning, utilities apply styles
- Components own interaction and states
- Semantics come before visuals
- Prefer one default pattern, allow explicit exceptions

## Design Tokens

### Typography

Roles:

- display
- headline
- title
- body
- label

Sizes are responsive (mobile / tablet / desktop) and defined as CSS variables.

Usage:

- Use semantic roles, not arbitrary font sizes
- Do not use Tailwind text-\* utilities for UI text

### Colors

Colors are defined by role, not hue.

Examples:

- --color-bg-primary
- --color-text-primary
- --color-accent
- --color-border

Components should consume color roles, not raw values.

### Layout

- Max content width: 1280px
- Page padding:
  - Mobile: p-4 (16px)
  - Tablet: p-6 (24px)
  - Desktop: p-8 (32px)

## Spacing

Spacing uses Tailwind's default scale.

Conventions:

- Component padding: px-3 / px-4 / px-6
- Stack gaps:
  - Tight: gap-2
  - Default: gap-4
  - Loose: gap-6
- Section spacing:
  - Mobile: space-y-6
  - Desktop: space-y-12

Avoid introducing arbitrary spacing values.

## Components

### Button

- Use <Button /> by default
- Use `asChild` to preserve semantic elements
- Do not apply button styles via class names

### Modal

- Built on Radix Dialog
- Handles focus trapping and keyboard behavior
- Styling comes from design tokens
