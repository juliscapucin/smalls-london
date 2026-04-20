# Review Action

## Objective

Review a feature implementation against its stated goals and decide whether it is ready to complete or needs changes.

## Inputs

- `$ARGUMENT`: feature goals/spec to validate against.

## Required Context Files

Read these before auditing:

- `/styles/tokens.css` (design tokens)
- `/src/lib/utils.ts` (shared utilities, including `cn()`)

## Review Steps

1. Read `$ARGUMENT` and extract explicit acceptance goals.
2. Review all code changes made for the feature.
3. Compare implementation vs goals:
   - Goals met
   - Goals missing or incomplete
   - Scope creep (code outside the feature goals)
4. Perform the UI engineering quality audit using the checklist below.
5. Return a final verdict:
   - `Ready to complete`
   - `Needs changes`

## UI Engineering Checklist

### Next.js

- Interactive components include `'use client'` when needed.
- Treat as interactive when using handlers/hooks/primitives such as:
  - `onClick`
  - `useState`
  - `useEffect`
  - Radix interactive primitives

### Component Patterns

- Uses React `ref` prop patterns correctly for DOM refs.
- Sets `displayName` where appropriate.
- Uses named exports (not default exports).

### Types

- Props interface is exported and strongly typed.
- Non-obvious props include JSDoc.
- Avoids `any`.

### Design Tokens

- No hardcoded colors (for example: `text-muted-foreground`).
- No hardcoded spacing (for example: `p-4`, `gap-2`).
- Uses design token classes (for example: `text-foreground`, `bg-background`).

### Utilities

- Uses `cn()` from `@/lib/utils` for conditional class composition.

### Accessibility

- Adds ARIA attributes where Radix does not provide them.
- Decorative icons include `aria-hidden="true"`.
- Focus states are visible and keyboard navigation works.

### Storybook Coverage

- Includes matrix story for all variants, sizes and states.
- Covers edge cases (empty state, long text, etc.).

## Output Format

When issues exist, report each with:

- File path and line reference
- Problem description
- Suggested fix with a short code example
- Priority: `critical`, `recommended`, or `nice-to-have`
