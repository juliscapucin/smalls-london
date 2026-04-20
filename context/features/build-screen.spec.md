# Build Screen Spec

## Required Arguments

- `$ARGUMENT2`: screen name (for example: `Pricing`, `Checkout`, `Dashboard`)
- `$ARGUMENT3`: Figma URL for the target screen

## Guardrails (Fail Fast)

Before implementation, validate arguments:

1. If `$ARGUMENT2` is empty, missing, or still equals literal text like `$ARGUMENT2`:
   - Stop immediately.
   - Return: `Missing required argument: screen name ($ARGUMENT2).`
2. If `$ARGUMENT3` is empty, missing, or still equals literal text like `$ARGUMENT3`:
   - Stop immediately.
   - Return: `Missing required argument: Figma URL ($ARGUMENT3).`
3. If `$ARGUMENT3` is not a valid `figma.com` URL:
   - Stop immediately.
   - Return: `Invalid Figma URL in $ARGUMENT3.`

## Task

### 1) Read Product Context

- Read PRD: `/docs/PRD.md`

### 2) Review Design

- Open and review this Figma screen: `$ARGUMENT3`

### 3) Implement Screen

- Build the `$ARGUMENT2` page using existing components from `/src/components`.
- Reuse existing components only.
- Do **not** create new inline components when an existing component can be reused.

## Output Expectations

- Page is implemented and aligned with PRD + Figma.
- Existing component system is reused consistently.
- Any missing dependency/blocker is called out explicitly.
