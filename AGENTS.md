<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

@context/rules/design-system-rules.md
@context/rules/figma-design-system.md

# DevStash

A developer knowledge hub for snippets, prompts, commands, notes, files, images, links and custom item types.

## Context Files

Read these for full project context:

- @context/coding-standards.md: Code conventions and patterns

Use `docs/*` for product scope, requirements, and acceptance criteria.
Use `.cursor/rules/*` for implementation constraints and coding/design-system rules.

## Tech Stack

- Next.js 16 (App Router, Server Components)
- TypeScript (strict)
- Tailwind CSS v4 + Radix UI

## Quick Commands

```bash
npm run dev             # Start dev server
npm run build           # Build for production
npm run lint            # Run ESLint
npm run design-tokens   # Generate design tokens from Figma exported JSON
```
