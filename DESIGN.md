# Design Brief — Premium Hotel Management System

**Aesthetic:** Luxury SaaS / Enterprise Premium. Card-based editorial layout inspired by eZee Absolute. Refined, confident, generous.

**Tone:** Professional sophistication. Every pixel intentional. No decorative excess — form follows function with premium polish.

**Differentiation:** Amber/gold accent (#f59e0b) as primary interaction color. Deep navy dark mode (0.12L) with charcoal cards (0.18L). Clear surface hierarchy via distinct backgrounds, not just opacity.

## Palette (OKLCH)

| Semantic              | Light           | Dark            | Usage                          |
|----------------------|-----------------|-----------------|--------------------------------|
| Background           | 0.98L 0C 0H    | 0.12L 0C 0H    | Page fill                      |
| Card                 | 0.99L 0C 0H    | 0.18L 0C 0H    | Elevated surfaces              |
| Foreground           | 0.15L 0C 0H    | 0.95L 0C 0H    | Body text                      |
| Accent (Amber)       | 0.68L 0.19C 48H | 0.68L 0.19C 48H | Buttons, badges, highlights   |
| Border               | 0.88L 0C 0H    | 0.28L 0C 0H    | Dividers, subtle structure    |
| Destructive (Red)    | 0.55L 0.22C 25H | 0.65L 0.19C 22H | Cancellations, errors        |

**Status Badges:**
- Confirmed/Clean: Green (0.65L 0.22C 150H)
- Pending: Yellow (0.72L 0.20C 85H)
- Cancelled: Red (0.55L 0.22C 25H)
- No-show: Gray (0.50L 0C 0H)
- Occupied: Blue (0.60L 0.18C 265H)
- Dirty: Red (0.55L 0.22C 25H)
- Out of Order: Orange (0.62L 0.27C 22H)
- Maintenance: Purple (0.58L 0.22C 300H)

## Typography

- **Display/Body/Mono:** DM Sans (premium sans-serif, excellent readability)
- **Size Scale:** 12px (xs), 14px (sm), 16px (base), 18px (lg), 24px (xl), 32px (2xl), 48px (3xl)
- **Weight:** 500 (normal), 600 (semibold), 700 (bold)
- **Line Height:** 1.5 (body), 1.2 (headings)

## Elevation & Depth

| Layer      | Background | Border                  | Shadow            | Use Case               |
|-----------|-----------|-------------------------|-------------------|------------------------|
| Surface   | Background | None                    | None              | Page fill             |
| Card      | Card      | Border 1px              | card (2px 8px)    | Content containers    |
| Elevated  | Card      | Border 1px              | elevated (4px 12px)| Dialogs, modals       |
| Overlay   | Popover   | Border 1px              | elevated          | Dropdowns, tooltips   |

## Structural Zones

- **Header/Top Nav:** `bg-card` with `border-b`, icon/text controls, dark mode toggle
- **Sidebar Navigation:** `bg-sidebar` (light mode 0.96L, dark 0.16L), vertical property selector, icon navigation
- **Main Content:** `bg-background`, card grid layout, generous padding (1.5rem)
- **Sections:** Alternating `bg-card` and `bg-background` with minimal borders
- **Footer:** `border-t bg-muted/30` with secondary text

## Spacing & Rhythm

- **Base Unit:** 4px (0.25rem)
- **Card Padding:** 1.5rem (24px)
- **Section Gap:** 1.5rem
- **Grid Columns:** 2–4 depending on breakpoint; 1.5rem gutter
- **Density:** Premium spacing — never cramped. Whitespace is luxurious.

## Component Patterns

- **Buttons:** Solid amber (accent) for primary, outlined border for secondary, muted for tertiary
- **Badges:** Color-coded by status, 8px rounded, 0.75rem padding, small font
- **Cards:** Subtle border, background layer, 12px border-radius, hover lift (shadow-elevated)
- **Forms:** Transparent input bg, 1px border, focus ring in amber
- **Dividers:** Subtle border color, full-width or inset
- **Loading Skeleton:** Pulse animation, muted background, 12px rounded

## Motion

- **Page Transitions:** Fade-in 0.3s ease-out
- **Hover States:** Shadow lift + 2px ascent, 0.3s smooth
- **Form Focus:** Border color + ring in amber, 0.2s
- **Slide/Expand:** Staggered animations for lists, 0.3s per item
- **Orchestration:** All motion follows cubic-bezier(0.4, 0, 0.2, 1) for consistency

## Constraints

- No gradients on backgrounds (use layered backgrounds instead)
- No shadows > 12px blur radius
- No animations > 0.4s
- All text > 14px (accessibility)
- Badge radius always < button radius

## Signature Detail

Amber accent as consistent micro-interaction — hover state on cards lifts with amber accent highlight. Active nav items use full amber background with dark text. Status badges use semantic colors with subtle opacity overlay (20% opacity on light, 30% on dark).
