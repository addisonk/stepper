---
title: "feat: Portable Demo Files for Stepper Component"
type: feat
status: active
date: 2026-04-04
deepened: 2026-04-04
---

# Portable Demo Files for Stepper Component

## Overview

Create standalone demo files for the stepper component that are portable across shadcn docs, 21st.dev, and standalone use. Scaffold the missing registry infrastructure as a prerequisite — the README advertises `stepper-component.vercel.app/r/stepper.json` but no registry exists yet.

## Problem Frame

The stepper component has demos embedded in `app/page.tsx` but no portable, self-contained demo files. The registry infrastructure (`registry/`, `public/r/`, build script) also doesn't exist.

Without portable demos:
- Cannot publish to 21st.dev (requires pasting self-contained demo code)
- Cannot register examples in the shadcn registry
- Demo code is coupled to the marketing page layout
- The advertised install URL returns 404

## Requirements Trace

- R1. Registry infrastructure produces `public/r/stepper.json` via `npx shadcn@latest build`
- R2. Three portable demo files exist as standalone default-export React components
- R3. Demo code is paste-ready for 21st.dev publish form (uses `@/components/ui/stepper` imports)
- R4. Interactive demo shows step progression with next/reset controls
- R5. Minimal demo shows title-only variant without descriptions
- R6. States demo shows all three statuses (complete, current, upcoming) as a visual reference
- R7. All demos render correctly in light and dark mode

## Scope Boundaries

- `app/page.tsx` is left as-is — marketing page and portable demos serve different purposes
- No size switcher (Tabs) in the interactive demo — keeps it focused and reduces dependencies
- No test framework setup — this project has none and adding one is out of scope
- No 21st.dev submission — that is a separate manual step after files are created

## Context & Research

### Relevant Code and Patterns

- `components/ui/stepper.tsx` — the component (7 exports, pure CSS transitions, no Framer Motion)
- `app/page.tsx` — existing demos to extract from (interactive, title-only, states grid)
- `components.json` — shadcn config: `style: "radix-nova"`, `registries: {}`
- Onboarding-kit registry pattern at `~/Projects/onboarding-kit/registry.json` — flat structure, explicit `target` paths

### Institutional Learnings

- **Registry portability** (`docs/solutions/ui-bugs/registry-block-portability.md`): Never hardcode theme colors. Keep demo-only styling in the demo, not the component. Ship a `registry:page` if consumers need a working route.
- **shadcn alignment** (`docs/solutions/ui-bugs/shadcn-component-alignment-checklist.md`): Match shadcn tokens. The stepper already follows shadcn conventions (`data-slot`, `cn()`, `ComponentProps`).

### External References

- shadcn registry docs: https://ui.shadcn.com/docs/registry
- shadcn registry-item schema: https://ui.shadcn.com/schema/registry-item.json
- 21st.dev publishes via web form — no filesystem convention required, just paste-ready code

## Key Technical Decisions

- **Flat registry structure** (`registry/stepper/`): Matches the onboarding-kit pattern. Third-party registries don't use the `registry/[style]/` monorepo convention.
- **`registry:ui` type for stepper**: Single-file UI primitive, not a multi-file block.
- **`registry:example` type for demos**: shadcn convention for example files. Not included in the main component install — used for documentation and 21st.dev pasting.
- **Import path `@/components/ui/stepper`**: Consumer-facing path. Works when pasted into 21st.dev. The shadcn CLI rewrites `@/` aliases at install time.
- **`"use client"` only on interactive demo**: `stepper-demo.tsx` uses `useState`. The other two are purely declarative.
- **No `target` on example files**: Examples are reference code, not installed files. They don't need a destination path.

## Open Questions

### Resolved During Planning

- **Should demos include the Tabs size switcher?** No — it adds `Tabs`, `TabsList`, `TabsTrigger` as dependencies for a feature that's secondary to the core stepper interaction. Size variants are visible in the states demo.
- **What import paths?** `@/components/ui/stepper` — portable across all three contexts (shadcn registry, 21st.dev paste, standalone use).
- **Should `app/page.tsx` be refactored to consume demos?** No — different purposes, acceptable duplication.

### Deferred to Implementation

- **Exact `npx shadcn@latest build` output format**: May need iteration if the build produces unexpected structure. The schema is documented but third-party registry builds can have quirks.
- **Whether `registry:example` items appear in built output**: shadcn's own examples are docs-site-only. Third-party registries may or may not support this type. If the build ignores examples, the demos still serve their primary purpose (paste-ready for 21st.dev, reference code in repo).

## Implementation Units

- [x] **Unit 1: Create registry directory and copy stepper source**

  **Goal:** Establish the registry source directory with the stepper component.

  **Requirements:** R1

  **Dependencies:** None

  **Files:**
  - Create: `registry/stepper/stepper.tsx` (copy of `components/ui/stepper.tsx`)

  **Approach:**
  - Create `registry/stepper/` directory
  - Copy `components/ui/stepper.tsx` to `registry/stepper/stepper.tsx`
  - File content must be identical — no modifications

  **Patterns to follow:**
  - Onboarding-kit: `registry/onboarding-kit/` flat structure

  **Test expectation:** None — file copy with no behavioral change.

  **Verification:**
  - `registry/stepper/stepper.tsx` exists and matches `components/ui/stepper.tsx`

- [x] **Unit 2: Create registry.json manifest**

  **Goal:** Define the stepper component and demo items in the registry manifest so `npx shadcn@latest build` can discover them.

  **Requirements:** R1, R3

  **Dependencies:** Unit 1

  **Files:**
  - Create: `registry.json`

  **Approach:**
  - Follow the `$schema: https://ui.shadcn.com/schema/registry.json` format
  - `name: "stepper"`, `homepage: "https://stepper-component.vercel.app"`
  - Main item: `name: "stepper"`, `type: "registry:ui"`, `dependencies: ["lucide-react"]`, one file entry with `target: "components/ui/stepper.tsx"`
  - Three example items: `stepper-demo` (deps: `lucide-react`, registryDeps: `["stepper", "button"]`), `stepper-minimal` (registryDeps: `["stepper"]`), `stepper-states` (registryDeps: `["stepper"]`)
  - Each example uses `type: "registry:example"`

  **Patterns to follow:**
  - Onboarding-kit `registry.json` structure (flat items array, explicit file paths)

  **Test expectation:** None — config file with no behavioral change.

  **Verification:**
  - `registry.json` validates against the shadcn schema
  - All four items (stepper + 3 demos) are declared

- [x] **Unit 3: Create stepper-demo.tsx (interactive)**

  **Goal:** Extract the interactive onboarding flow from `app/page.tsx` into a self-contained demo component.

  **Requirements:** R2, R3, R4, R7

  **Dependencies:** Unit 1

  **Files:**
  - Create: `registry/stepper/stepper-demo.tsx`

  **Approach:**
  - `"use client"` directive (uses `useState`)
  - Default export: `StepperDemo`
  - 5-step onboarding data array (same step titles/descriptions as `app/page.tsx`)
  - `getStatus()` helper inline
  - `useState<number>` for `currentStep`
  - Two buttons: Reset (disabled at step 0) and Next Step (disabled when complete)
  - No Tabs size switcher — use `size="default"` only
  - No page chrome (no headings, no installation instructions, no border/card wrapper)
  - Import stepper from `@/components/ui/stepper`, Button from `@/components/ui/button`

  **Patterns to follow:**
  - shadcn demo convention: minimal, no wrappers, default export function
  - Existing `app/page.tsx` lines 76-122 (interactive section)

  **Test scenarios:**
  - Happy path: Renders 5 steps, first step shows "current", clicking "Next step" advances, all steps show "complete" when done
  - Edge case: Reset button disabled at step 0, Next button disabled after all steps complete
  - Integration: Stepper sub-components compose correctly without the page layout wrapper

  **Verification:**
  - Component renders standalone (import and mount in any page)
  - Clicking through all 5 steps produces correct status transitions
  - Works in both light and dark mode

- [x] **Unit 4: Create stepper-minimal.tsx (title-only)**

  **Goal:** Extract the title-only variant showing the stepper without descriptions.

  **Requirements:** R2, R3, R5, R7

  **Dependencies:** Unit 1

  **Files:**
  - Create: `registry/stepper/stepper-minimal.tsx`

  **Approach:**
  - No `"use client"` — purely declarative, no hooks
  - Default export: `StepperMinimal`
  - 5 hardcoded `StepperItem` entries with static statuses (2 complete, 1 current, 2 upcoming)
  - Uses `StepperTitle` directly inside `StepperItem` — no `StepperContent` or `StepperDescription`
  - Import only from `@/components/ui/stepper`

  **Patterns to follow:**
  - `app/page.tsx` lines 129-156 (title-only section, without the card/heading wrapper)

  **Test scenarios:**
  - Happy path: Renders 5 steps with correct statuses, titles visible, no descriptions rendered

  **Verification:**
  - Component renders standalone
  - No `StepperDescription` elements in output
  - Works in both light and dark mode

- [x] **Unit 5: Create stepper-states.tsx (status reference)**

  **Goal:** Create a visual reference showing all three step statuses side by side.

  **Requirements:** R2, R3, R6, R7

  **Dependencies:** Unit 1

  **Files:**
  - Create: `registry/stepper/stepper-states.tsx`

  **Approach:**
  - No `"use client"` — purely declarative
  - Default export: `StepperStates`
  - Grid layout (`grid gap-8 md:grid-cols-3`) with three items
  - Each item: a single `StepperItem` with `StepperIndicator` plus a label/description
  - Map over `["complete", "current", "upcoming"]` with descriptive text
  - No card wrappers — let the preview container provide chrome
  - Import only from `@/components/ui/stepper`

  **Patterns to follow:**
  - `app/page.tsx` lines 162-183 (states grid, without the card border/bg)

  **Test scenarios:**
  - Happy path: Renders 3 states with correct visual indicators and labels

  **Verification:**
  - Component renders standalone with all three statuses visible
  - Works in both light and dark mode

- [x] **Unit 6: Add registry build script and build**

  **Goal:** Add the build script to package.json and produce the registry output.

  **Requirements:** R1

  **Dependencies:** Units 1-5

  **Files:**
  - Modify: `package.json` (add `"registry:build"` script)
  - Generated: `public/r/stepper.json` (and potentially demo JSONs)

  **Approach:**
  - Add `"registry:build": "npx shadcn@latest build"` to `scripts` in `package.json`
  - Run the build
  - If `registry:example` items are not included in the build output, that is acceptable — the demos still serve their primary purpose as paste-ready reference code
  - Commit the `public/r/` output

  **Patterns to follow:**
  - Onboarding-kit: `public/r/onboarding-kit.json` built output

  **Test scenarios:**
  - Happy path: `npx shadcn@latest build` exits 0 and produces `public/r/stepper.json`
  - Edge case: Build may not produce example JSONs — if so, only `stepper.json` is required

  **Verification:**
  - `public/r/stepper.json` exists and contains the stepper component with embedded source
  - The registry URL (`stepper-component.vercel.app/r/stepper.json`) will serve the JSON after deploy

## System-Wide Impact

- **Interaction graph:** The registry build reads `registry.json` and `registry/stepper/` source files, producing `public/r/` output. No runtime code paths are affected.
- **API surface parity:** The stepper component's API (exports, props, types) is unchanged. Demos only consume it.
- **Unchanged invariants:** `app/page.tsx` is not modified. The existing demo site behavior is preserved exactly.

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| `npx shadcn@latest build` may not support `registry:example` type for third-party registries | Demos are primarily paste-ready reference code. If the build skips examples, only `stepper.json` is needed for the install URL. |
| Registry source (`registry/stepper/stepper.tsx`) can drift from actual source (`components/ui/stepper.tsx`) | Document the sync requirement in a future CLAUDE.md. For now, this is a one-time setup. |
| `shadcn build` may expect a different directory structure than the flat pattern | Validated against onboarding-kit which uses the same flat pattern successfully with shadcn v4. |

## Sources & References

- Stepper component: `components/ui/stepper.tsx`
- Existing demos: `app/page.tsx` (lines 76-183)
- Onboarding-kit registry: `~/Projects/onboarding-kit/registry.json`
- shadcn registry docs: https://ui.shadcn.com/docs/registry
- Portability learnings: `~/Projects/onboarding-kit/docs/solutions/ui-bugs/registry-block-portability.md`
