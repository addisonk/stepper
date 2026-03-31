# Stepper

A composable, animated vertical stepper component built with [shadcn/ui](https://ui.shadcn.com) conventions.

## Installation

```bash
npx shadcn@latest add https://stepper-component.vercel.app/r/stepper.json
```

## Usage

```tsx
import {
  Stepper,
  StepperItem,
  StepperIndicator,
  StepperSeparator,
  StepperContent,
  StepperTitle,
  StepperDescription,
} from "@/components/ui/stepper"

<Stepper>
  <StepperItem status="complete">
    <StepperIndicator />
    <StepperContent>
      <StepperTitle>Create account</StepperTitle>
      <StepperDescription>Sign up with your email</StepperDescription>
    </StepperContent>
    <StepperSeparator />
  </StepperItem>
  <StepperItem status="current">
    <StepperIndicator />
    <StepperContent>
      <StepperTitle>Configure settings</StepperTitle>
      <StepperDescription>Set up your preferences</StepperDescription>
    </StepperContent>
    <StepperSeparator />
  </StepperItem>
  <StepperItem status="upcoming">
    <StepperIndicator />
    <StepperContent>
      <StepperTitle>Start building</StepperTitle>
      <StepperDescription>Create your first project</StepperDescription>
    </StepperContent>
    <StepperSeparator />
  </StepperItem>
</Stepper>
```

### Title only

```tsx
<Stepper>
  <StepperItem status="complete">
    <StepperIndicator />
    <StepperTitle>Create account</StepperTitle>
    <StepperSeparator />
  </StepperItem>
  <StepperItem status="current">
    <StepperIndicator />
    <StepperTitle>Configure settings</StepperTitle>
    <StepperSeparator />
  </StepperItem>
</Stepper>
```

### Sizes

```tsx
<Stepper size="sm">...</Stepper>
<Stepper size="default">...</Stepper>
<Stepper size="lg">...</Stepper>
```

## Components

| Component | Description |
|-----------|-------------|
| `Stepper` | Root `<ol>` container. Accepts `size` prop (`sm`, `default`, `lg`). |
| `StepperItem` | Individual step `<li>`. Accepts `status` prop (`complete`, `current`, `upcoming`). |
| `StepperIndicator` | Circle indicator with animated check/dot based on status. |
| `StepperSeparator` | Connector line between steps. Auto-hidden on last item. |
| `StepperContent` | Optional wrapper for title + description. |
| `StepperTitle` | Step label. |
| `StepperDescription` | Step description text. |

## Animations

All transitions use CSS only -- no motion library required.

- **Indicator** -- background and border color transition on state change
- **Check icon** -- cross-fades in with scale (0.25 to 1), opacity, and blur
- **Current dot** -- same cross-fade treatment
- **Separator** -- fills top-to-bottom on completion via `scaleY`
- **Title** -- color transitions between foreground and muted
- **Description** -- opacity fades for upcoming steps

## License

MIT
