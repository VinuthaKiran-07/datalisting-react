# Post / Explorer

A reading-focused library for 100 JSONPlaceholder posts, with the Frozen lake palette (Slate #6D8196, Ice #ADD8E6, Snow #FFFAFA, Navy #000080), derived contrast tints, Crimson Text headings, Instrument Sans body text, and full content displayed inline.

## Tech stack

Vite, React, JavaScript, Tailwind CSS, Axios, and CSS animations.

## Features

- Axios-powered loading, error, empty, and skeleton states
- JavaScript data enrichment with realistic titles, descriptions, authors, categories, dates, read times, and views
- Search across title, body, author, and category
- Category and author filters, six sort modes, pagination, and rows per page
- Distinct card, list, and horizontally scrollable table views with complete post text and metadata
- Noninteractive post cards, rows, and titles: no drawers or detail popups
- Light/dark theme, selected view, row density, and Ambient motion persistence via `localStorage`
- Compact, Comfortable (default), and Spacious density across card, list, and table views
- Compact top spacing with a larger reading region
- Subtle ambient mist and loading shimmer, with an off toggle and system reduced-motion support
- Collapsible library/mobile filters, keyboard focus states, reduced-motion support, and independently scrollable view content

## Project structure

```text
src/
â”œâ”€â”€ components/       Reusable UI components and view renderers
â”œâ”€â”€ data/              Display metadata used for post enrichment
â”œâ”€â”€ services/          Axios API service
â”œâ”€â”€ utils/             Data transformation helpers
â”œâ”€â”€ App.jsx            Application state and page composition
â”œâ”€â”€ main.jsx           React entry point
â””â”€â”€ styles.css         Global theme and responsive styles
index.html             Vite HTML entry
vite.config.js         Vite + React configuration
```

## API

Data comes from `https://jsonplaceholder.typicode.com/posts`. The API `id` and `userId` are preserved while display fields are transformed in `src/utils/transformPosts.js`.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```


