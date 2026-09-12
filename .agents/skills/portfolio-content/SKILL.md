---
name: portfolio-content
description: Manage portfolio project content, case studies, media metadata, release information, and project presentation data without unnecessarily changing UI architecture.
---

# Portfolio Content Skill

## Purpose

Use this skill when working on project content inside the portfolio.

This includes:
- Project descriptions
- Project positioning
- Features
- Case studies
- Architecture explanations
- Engineering decisions
- Challenges
- Screenshots
- Videos
- GIFs
- Media metadata
- Download metadata
- Release versions
- GitHub links
- Demo links

## Project Rules

Before making changes:

1. Inspect the existing project schema.
2. Inspect the target project entry in `src/data/projects.ts`.
3. Inspect the components that consume that project data.
4. Identify exactly which files need to change.
5. Do not redesign UI components unless explicitly requested.
6. Do not change unrelated projects.
7. Do not invent project facts.
8. Preserve existing slugs and project structure.
9. Preserve existing media categories and roles unless there is a clear reason to modify them.
10. Prefer updating data over hard-coding content into components.

## Media Rules

For media:

- Verify the referenced asset path.
- Use the existing `MediaItem` structure.
- Use meaningful `role` values:
  - hero
  - storytelling
  - gallery
  - supporting
  - demo
- Use meaningful categories.
- Do not create fake screenshots when real project media is expected.
- Do not replace real assets with placeholders.

## Release Rules

For download/release information:

- Never invent version numbers.
- Never invent release dates.
- Never mark an asset as available unless its existence is verified.
- Preserve the existing ABI structure.
- Keep pending assets pending until verification.

## Editing Workflow

Always follow:

1. Audit
2. Identify files
3. Explain proposed changes
4. Implement only the required changes
5. Validate
6. Report changed files
7. Report unresolved items

## Scope Control

Prefer additive and local changes.

Do not perform broad refactors unless explicitly requested.

Do not modify unrelated architecture.

Do not change styling, animations, layout, routing, or component architecture unless the task explicitly requires it.