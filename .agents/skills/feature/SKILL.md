---
name: feature
description: Manage current feature workflow - start, review, explain or complete
argument-hint: load|start|review|explain|complete
---

# Feature Workflow

Manages the full lifecycle of a feature from spec to merge.

## Working File

Read the following file: $ARGUMENT1

## Task

Execute the requested action: $ARGUMENT2

| Action     | Description                         |
| ---------- | ----------------------------------- |
| `start`    | Begin implementation, create branch |
| `review`   | Check goals met, code quality       |
| `test`     | Add tests                           |
| `explain`  | Document what changed and why       |
| `complete` | Commit, push, merge, reset          |

See [actions/](actions/) for detailed instructions.

If no action provided, explain the available options.
