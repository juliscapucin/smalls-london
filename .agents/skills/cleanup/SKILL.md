---
name: cleanup
description: Clean up project housekeeping tasks (use "run" to apply selected fixes)
argument-hint: run|check
---

## Objective

Review the codebase for housekeeping cleanup opportunities.

## Input

- `$ARGUMENT1`: mode (`check` or `run`)

## Guardrails (Fail Fast)

1. If mode is missing, default to `check`.
2. If mode is not exactly `check` or `run`:
   - Stop immediately.
   - Return: `Invalid cleanup mode. Use "check" or "run".`
3. In `check` mode, do not modify files.
4. In `run` mode, do not modify files until user explicitly selects item numbers or `all`.

## Cleanup Checks

Run these checks and report findings as numbered items:

1. Unnecessary `console.log` statements in `src/`.
2. Unused imports.
3. Stale `TODO` comments.
4. Orphaned or unused files.
5. Potentially stale `@ts-ignore` comments.
6. Design token usage/linking issues (for example: hardcoded values where project tokens should be used, or outdated/inexistent tokens).

### Token Migration Audit (for check #6)

When reviewing design tokens, apply these deterministic checks:

1. Source of truth:
   - Validate token names/classes against project token sources (for example: `/styles/tokens.css` and related token files).
2. Missing/invalid tokens:
   - Flag any token/class reference that does not exist in current token sources.
3. Deprecated tokens:
   - Flag token names known to be removed, renamed, or deprecated in the migration.
4. Hardcoded values:
   - Flag hardcoded colors/spacing/radii/shadows where project tokens should be used.
5. Fallback usage:
   - Flag local hardcoded fallbacks where token usage is required by project conventions.

For token findings, include severity:

- `critical`: broken or missing token reference that can cause incorrect styles.
- `recommended`: valid UI but violates token conventions or uses deprecated names.
- `nice-to-have`: low-risk consistency cleanup.

## Mode Behavior

### `check` mode (default)

- Only report findings.
- Do not modify anything.
- List what would be cleaned up.

### `run` mode

1. Report all findings with numbered items.
2. Ask exactly:
   - `Which items would you like me to fix? (enter numbers like 1,3,5 or "all" or "none")`
3. Wait for user response.
4. Only fix selected items.
5. Report what changed and what was skipped.
