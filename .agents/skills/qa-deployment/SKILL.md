---
name: qa-deployment
description: Procedures for TypeScript validation, linting, asset checks, and production deployment.
---

# QA & Deployment Skill

## Validation Checklist
1. Execute `npm run build` and ensure complete compilation without errors.
2. Verify that all URLs inside `src/data/projects.ts` point to actual assets in `public/`.
3. Check OpenGraph tags and metadata base in `src/app/layout.tsx`.
4. Ensure no unhandled runtime null pointers in dynamic routes (`/projects/[slug]`).