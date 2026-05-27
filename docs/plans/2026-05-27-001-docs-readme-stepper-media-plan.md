---
title: "docs: Add README Stepper Media and Fix Install URL"
type: docs
status: completed
date: 2026-05-27
---

# Add README Stepper Media and Fix Install URL

## Summary

Add visual README assets for the stepper component and replace the broken installation URL with a verified registry URL that works from GitHub. The work should make the component obvious on the repository page without changing the component API or demo behavior.

---

## Problem Frame

The README currently explains the component but does not show what it looks like before installation. It also advertises `https://stepper-component.vercel.app/r/stepper.json`, which returns `404`, so users copying the command cannot install the shadcn registry item.

The repository already contains a Next demo page, generated registry JSON in `public/r/`, and portable demo files under `registry/stepper/`. The documentation update should reuse those surfaces and keep media artifacts in the repo so GitHub can render them without relying on an external host.

---

## Requirements

- R1. The README shows the stepper visually with at least one screenshot and one animated GIF.
- R2. README media references are GitHub-renderable relative paths to committed assets.
- R3. The install command uses a verified URL that returns the committed `public/r/stepper.json` registry item.
- R4. Any other in-repo install URL shown to users is updated so the app and README do not disagree.
- R5. Registry metadata no longer advertises the hallucinated Vercel homepage as the canonical project location.
- R6. Validation confirms the media files are present, non-empty, and visually capture the current component states.

---

## Key Technical Decisions

- **Use raw GitHub for installation:** `https://raw.githubusercontent.com/addisonk/stepper/main/public/r/stepper.json` returns `200` for the current default branch and points at the committed registry item. The existing Vercel URL returns `404`, and the GitHub repo has no Pages site or homepage configured.
- **Commit media under `public/readme/`:** GitHub README rendering supports relative image paths, and keeping assets under `public/` also lets the Next demo serve them if needed.
- **Capture from the existing app page:** The app page already exercises the full stepper, title-only variant, and state reference. Capturing from it avoids inventing a separate visual fixture that can drift from the demo users see.
- **Keep component behavior out of scope:** The request is documentation and installation accuracy. The stepper implementation and registry item content should only change if validation exposes a blocker.

---

## Scope Boundaries

- No redesign of the stepper component or demo page layout.
- No new publishing target or Vercel deployment.
- No submission to shadcn, 21st.dev, or any external registry.
- No test framework setup; validation should use existing build/lint/typecheck scripts plus browser/media checks.

---

## Implementation Units

### U1. Correct Install URL References

- **Goal:** Replace the broken install URL everywhere users encounter it.
- **Requirements:** R3, R4, R5
- **Dependencies:** None
- **Files:**
  - `README.md`
  - `app/page.tsx`
  - `registry.json`
  - `public/r/registry.json`
- **Approach:** Use the raw GitHub URL for the install command in README and app UI. Update registry homepage metadata from the nonexistent Vercel app to the GitHub repository URL so generated registry index metadata does not keep pointing users at the bad host.
- **Patterns to follow:** Existing README installation block; existing registry JSON shape in `registry.json` and `public/r/registry.json`.
- **Test scenarios:**
  - Happy path: fetching the documented install URL returns the registry item JSON with `name: "stepper"`.
  - Consistency: searching user-facing app, README, and registry metadata sources finds no remaining `stepper-component.vercel.app` references.
  - Integration: the app page renders the same install command that appears in the README.
- **Verification:** `curl -I -L` for the new URL returns `200`; user-facing sources no longer advertise the hallucinated URL.

### U2. Capture README Media Assets

- **Goal:** Produce committed screenshots and an animation that show the component clearly on GitHub.
- **Requirements:** R1, R2, R6
- **Dependencies:** None
- **Files:**
  - `public/readme/stepper-overview.png`
  - `public/readme/stepper-title-only.png`
  - `public/readme/stepper-states.png`
  - `public/readme/stepper-progress.gif`
- **Approach:** Run the local Next app and capture cropped media from the existing demo page. Use the main card for the overview screenshot and progress GIF, the title-only section for the compact variant, and the states grid for the status reference. Optimize dimensions and file size so the README loads quickly while preserving legibility.
- **Patterns to follow:** Existing demo sections in `app/page.tsx`; GitHub README relative image references.
- **Test scenarios:**
  - Happy path: each PNG has non-zero dimensions and shows the intended stepper section.
  - Animation: the GIF advances through multiple step states and shows the separator/indicator transitions.
  - Edge case: media crops exclude unrelated page chrome enough that the component remains the visual focus.
- **Verification:** Inspect generated assets locally, confirm file sizes are reasonable, and verify the GIF contains multiple frames.

### U3. Refresh README Visual Presentation

- **Goal:** Make the GitHub README communicate the component at a glance while preserving usage details.
- **Requirements:** R1, R2, R3
- **Dependencies:** U1, U2
- **Files:**
  - `README.md`
- **Approach:** Add a compact preview section near the top with the animated GIF and screenshots. Keep installation before usage, update the command, and keep the existing API/component documentation intact. Use descriptive alt text for all media.
- **Patterns to follow:** Existing README structure and concise markdown style.
- **Test scenarios:**
  - Happy path: all README image links resolve to committed files.
  - Accessibility: alt text describes the visible stepper state or variant rather than generic labels.
  - Regression: existing usage examples and component table remain present.
- **Verification:** Render or inspect the README markdown, then confirm every referenced media path exists.

### U4. Validate Documentation and App Health

- **Goal:** Confirm the documentation-only change does not break the local app or registry metadata.
- **Requirements:** R4, R6
- **Dependencies:** U1, U2, U3
- **Files:**
  - `README.md`
  - `app/page.tsx`
  - `registry.json`
  - `public/r/registry.json`
  - `public/readme/*`
- **Approach:** Run the repo's existing static checks and a local browser pass against the demo page. Use the browser to verify the displayed install command, media capture source, and component rendering at desktop and mobile widths.
- **Patterns to follow:** Existing `package.json` scripts (`lint`, `typecheck`, `build`).
- **Test scenarios:**
  - Static checks: lint, typecheck, and build complete successfully.
  - Browser rendering: the demo page shows the updated install command and stepper sections without layout overlap.
  - Media integrity: README references point to committed files and binary assets are not empty.
- **Verification:** Static command output is clean or documented; browser inspection confirms the page and assets render as expected.

---

## Risks & Dependencies

- **GIF size:** Animated media can bloat the repository. Keep the crop narrow and optimize the palette/frame count.
- **Raw GitHub dependency:** The install URL depends on the default branch path. This is the most durable currently verified option because no Pages site or deployment exists for the repo.
- **Detached worktree state:** The current checkout is detached; implementation should create or switch to a feature branch before committing.

---

## Sources & Research

- `README.md` contains the broken Vercel install URL.
- `app/page.tsx` displays the same broken install command in the demo page.
- `registry.json` and `public/r/registry.json` currently use the same Vercel hostname as homepage metadata.
- `public/r/stepper.json` is the committed shadcn registry item to expose through the install command.
- `curl -I -L https://stepper-component.vercel.app/r/stepper.json` returns `404`.
- `curl -I -L https://raw.githubusercontent.com/addisonk/stepper/main/public/r/stepper.json` returns `200`.
