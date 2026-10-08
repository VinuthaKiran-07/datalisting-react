---
name: Post Explorer
description: A modern editorial data browser with flexible Card, List, and Table views.
colors:
  snow: "#FFFFFF"
  plum: "#704C5D"
  ice: "#EADDE2"
  slate: "#A39599"
  sage: "#D9E7DC"
  sage-ink: "#315344"
  apricot: "#F3DFC8"
  apricot-ink: "#80552E"
  lilac: "#E5E0EF"
  lilac-ink: "#5C5275"
  bg: "#F7F8F5"
  surface: "#FFFFFF"
  surface-2: "#F0F3EF"
  text: "#263238"
  muted: "#687775"
  line: "#DCE4DE"
typography:
  headline: "Crimson Text, Georgia, serif"
  body: "Instrument Sans, sans-serif"
  display-size: "clamp(34px, 4vw, 54px)"
  body-size: "13px"
rounded:
  control: "6px"
  surface: "12px"
spacing:
  compact: "14px"
  comfortable: "22px"
  spacious: "32px"
---

# Design System: Post Explorer

## Overview

Post Explorer is an editorial-style data browser. Its identity comes from a clean white canvas, charcoal typography, muted plum navigation, and a restrained supporting palette of sage, apricot, and lilac. The design should feel modern and considered without looking like a generic SaaS dashboard.

The application uses a glass-inspired layer sparingly: soft background color fields, translucent surfaces, thin borders, blur, and low-elevation shadows. Glass is limited to surfaces that benefit from separation; content remains high-contrast and readable.

## Colors

- **Snow** `#FFFFFF`: primary light surface and text on dark plum controls.
- **Plum** `#704C5D`: brand, primary controls, active navigation, and table headings.
- **Ice** `#EADDE2`: soft plum-tinted category fallback and selection support.
- **Slate** `#A39599`: secondary control borders and muted accents.
- **Sage** `#D9E7DC`: Technology, Artificial Intelligence, and Cloud categories.
- **Apricot** `#F3DFC8`: Design, Productivity, and Career categories.
- **Lilac** `#E5E0EF`: JavaScript and Web Development categories.
- **Warm neutral** `#F7F8F5`: page background.
- **Charcoal** `#263238`: readable primary text.

Dark mode uses charcoal blue-gray surfaces with warm white text, pale sage secondary copy, and a lighter blush-plum accent. Category labels retain written names so color is never the only signal.

## Typography

Crimson Text gives collection headings and post titles an editorial voice. Instrument Sans handles body copy, controls, metadata, and navigation. Headings use tight but readable tracking; body content stays comfortably readable with generous line height.

## Layout

The desktop layout has a collapsible library sidebar and a flexible main content column. The top section is intentionally compact so the Card, List, or Table view receives most of the viewport. The page scrolls naturally; views do not create a separate vertical scroll box. Table mode may scroll horizontally when its full column set is wider than the viewport.

The content controls remain above the data. Pagination sits after the complete view with its own top divider and spacing, making the final article and page controls visually distinct. On mobile, filters collapse into a compact row and cards become a single column.

## Density

Row density is persisted in local storage and applies to all views:

- **Compact:** 14px item padding and 10px gaps.
- **Comfortable:** 22px item padding and 14px gaps.
- **Spacious:** 32px item padding and 24px gaps.

## Glass surfaces and depth

The background uses static sage and apricot color fields behind the interface. Header, sidebar, search, cards, list surfaces, table surfaces, and empty states use translucent backgrounds with `backdrop-filter`, thin borders, and restrained shadows. The effect is decorative support, never a replacement for hierarchy or contrast.

## Components

- **Header:** brand, library disclosure, short caption, and theme toggle.
- **Library:** category and author filters with counts and selected states.
- **Search:** full-width input with clear action and visible focus treatment.
- **View switcher:** accessible Card, List, and Table radio controls.
- **Views:** responsive Card, full-width List, and horizontally scrollable Table layouts.
- **Post details drawer:** clicking or keyboard-activating a post opens the full article and metadata without leaving the browsing context.
- **States:** loading skeletons, actionable error recovery, and empty filter results.
- **Pagination:** page navigation and rows-per-page selection separated from content by a divider.

## Motion and accessibility

Motion is subtle and purposeful: content fades upward on entry, cards lift slightly on hover, rows translate without layout shifts, and the details drawer slides in. `prefers-reduced-motion` disables animations and transitions. All icon-only actions have accessible labels, controls expose their state, and interactive posts support keyboard activation.

## Source of truth

The implementation is in [src/styles.css](./src/styles.css), [src/App.jsx](./src/App.jsx), and the reusable components under [src/components](./src/components). Product constraints live in [PRODUCT.md](./PRODUCT.md). Data is fetched from JSONPlaceholder through Axios and deterministically enriched in [src/utils/transformPosts.js](./src/utils/transformPosts.js).
