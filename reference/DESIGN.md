---
name: Physical Retail Autonomous Intelligence System
colors:
  surface: '#fbf8ff'
  surface-dim: '#dad9e3'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f2fd'
  surface-container: '#eeedf7'
  surface-container-high: '#e8e7f1'
  surface-container-highest: '#e3e1ec'
  on-surface: '#1a1b22'
  on-surface-variant: '#4b4738'
  inverse-surface: '#2f3038'
  inverse-on-surface: '#f1effa'
  outline: '#7c7766'
  outline-variant: '#cdc6b3'
  surface-tint: '#6c5e05'
  primary: '#6c5e05'
  on-primary: '#ffffff'
  primary-container: '#ebd777'
  on-primary-container: '#6b5d03'
  inverse-primary: '#dac769'
  secondary: '#485e8d'
  on-secondary: '#ffffff'
  secondary-container: '#b3c9ff'
  on-secondary-container: '#3d5383'
  tertiary: '#5f5e61'
  on-tertiary: '#ffffff'
  tertiary-container: '#d9d6da'
  on-tertiary-container: '#5d5c60'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f7e381'
  primary-fixed-dim: '#dac769'
  on-primary-fixed: '#211b00'
  on-primary-fixed-variant: '#524600'
  secondary-fixed: '#d9e2ff'
  secondary-fixed-dim: '#b0c6fc'
  on-secondary-fixed: '#001a43'
  on-secondary-fixed-variant: '#2f4674'
  tertiary-fixed: '#e4e1e6'
  tertiary-fixed-dim: '#c8c5ca'
  on-tertiary-fixed: '#1b1b1e'
  on-tertiary-fixed-variant: '#47464a'
  background: '#fbf8ff'
  on-background: '#1a1b22'
  surface-variant: '#e3e1ec'
  fog-canvas: '#F4F4F5'
  pure-surface: '#FFFFFF'
  ink: '#18181B'
  muted-steel: '#71717A'
  whisper-border: rgba(24, 24, 27, 0.10)
  lemon-signal: '#EBD777'
  brand-navy: '#001D4A'
typography:
  display-hero:
    fontFamily: Geist
    fontSize: 4.5rem
    fontWeight: '600'
    lineHeight: '1.05'
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Geist
    fontSize: 2.5rem
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Geist
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: '1.15'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Geist
    fontSize: 1.25rem
    fontWeight: '500'
    lineHeight: '1.35'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.005em
  body-md:
    fontFamily: Geist
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-sm:
    fontFamily: Geist
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-md:
    fontFamily: Geist
    fontSize: 0.875rem
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Geist
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.02em
  caption:
    fontFamily: Geist
    fontSize: 0.75rem
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0.01em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-desktop: 2rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 4rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 5rem
---

## Brand & Style

This design system delivers a high-precision, executive-ready interface tailored for retail operations directors, store managers, and institutional investors. The aesthetic fuses the calm clarity of a modern product studio with the mathematical rigor of autonomous edge systems. 

The emotional tone balances quiet authority and operational trust: airy negative space, matte physical surfaces, and balanced visual density. Rather than relying on hyper-saturated AI gradients or superficial sci-fi tropes, the interface uses crisp typographic hierarchy, precision structural outlines, and a solitary warm Lemon Signal accent. Interfaces feel tactile, grounded, and engineered.

## Colors

The system uses a strict single-theme light palette. Surfaces never invert between sections.

- **Fog Canvas (`#F4F4F5`):** The persistent, non-distracting foundation across the viewport.
- **Pure Surface (`#FFFFFF`):** High-contrast matte bento tiles, control panels, and header surfaces.
- **Lemon Signal (`#EBD777`):** The single chromatic action accent. Reserved exclusively for primary conversion surfaces, state highlights, and tactile button fills.
- **Brand Navy (`#001D4A`):** Derived from the technical mark; deployed for foundational brand anchors, primary logotypes, and high-priority system telemetry badges.
- **Ink (`#18181B`):** Structural high-contrast typography, dark tile contexts, and primary action labels. Pure black (`#000000`) is prohibited.
- **Muted Steel (`#71717A`):** Secondary metadata, operational descriptions, and subdued iconography.
- **Whisper Border (`rgba(24, 24, 27, 0.10)`): Low-contrast 1px architectural containment lines.

## Typography

Typography establishes an intentional technical cadence using Geist across all display, body, and interface functions. Hierarchy is achieved through weight, spatial tension, and contrast rather than exaggerated size shifts.

Headlines leverage tight negative tracking (`-0.03em`) and dense leading (`1.05` to `1.15`) to create compact, editorial locks. Body copy maintains a strict 65-character line limit in Muted Steel (`#71717A`) to preserve readability against clean matte backgrounds. Em-dashes, en-dashes, gradient fills, and decorative all-caps eyebrows are strictly omitted.

## Layout & Spacing

Layouts follow an asymmetric 12-column grid confined to a 1280px maximum container width. 

- **Desktop (1024px+):** Asymmetrical 12-column rhythm (e.g., 5-column copy to 7-column media ratios in the hero), 32px gutters, and dynamic section vertical rhythm (`clamp(4rem, 9vw, 8rem)`).
- **Tablet (768px - 1023px):** Balanced 8-column layout with 24px gutters and 32px margins.
- **Mobile (<768px):** Clean single-column vertical flow with 16px margins. Elements collapse without horizontal scroll, enforcing minimum 44px touch targets and 16px baseline body type.

## Elevation & Depth

Depth is established through physical surface stacking and ambient perimeter diffusion rather than heavy drops or colored glows.

- **Surface Isolation:** White modules (`#FFFFFF`) rest over Fog Canvas (`#F4F4F5`), bounded by a 1px structural `Whisper Border` (`rgba(24, 24, 27, 0.10)`).
- **Ambient Floor Shadows:** Layered containers employ an extra-diffuse, neutral-tinted shadow (`box-shadow: 0 12px 36px -8px rgba(24, 24, 27, 0.06)`).
- **Interactive Springs:** Interactive elements lift subtly by 2px on pointer hover using physics-based transitions (`cubic-bezier(0.16, 1, 0.3, 1)`), avoiding harsh step transitions.

## Shapes

The design uses an intentional, dual-tier geometry:
- **Interactive Controls (Full Pill):** Buttons, tags, and inputs employ continuous full-pill borders (`border-radius: 9999px`), delivering a tactile, pebble-like quality.
- **Structural Containers (28px):** Bento modules, persistent functional panels, and floating navigation shells use an exact 28px curvature.
- **Inline Hero Media (14px):** Typographic inline image inclusions sit cleanly at type height with a 14px radius.

## Components

### Buttons
- **Primary Action:** Solid Lemon Signal (`#EBD777`) fill, Ink (`#18181B`) text, 48px height, full-pill geometry, with a minimum 44px tap target. On pointer-down, elements translate via `scale(0.98)` with spring damping.
- **Quiet Action:** Transparent background with Ink or Muted Steel text and full pill hover treatment (`rgba(24, 24, 27, 0.05)`).

### Bento Tiles
- High-density white or dark ink surfaces with 28px curvature and whisper border lines. Media elements occupy full edge-to-edge layouts, while text information is strictly separated into dedicated structural zones. No text overlays on imagery.

### Learned Panel & Settings Rows
- Dedicated operational white surface (`28px` radius). Divided by soft grouping lines rather than per-row hairline dividers. Features clean state toggles, semantic status indicators, and quiet text actions.

### Form Inputs & Toggles
- Full-pill text inputs with 1px Whisper Border, inset Fog Canvas backgrounds, and Lemon Signal focus rings (`2px offset`).
- Toggles utilize smooth physical switches (44px horizontal length) with white pills moving across neutral-to-ink tracks.

### Iconography
- Rendered exclusively using the Phosphor icon family with regular stroke weight and 44px bounding targets for interactive clarity.