# Unroll Loop Blog

Production-grade blog platform for **Unroll Loop**, built with Next.js App Router, TypeScript, Tailwind CSS, MDX, Framer Motion, and Netlify static export.

## Features

- Dark-first cyber/developer-focused brand system
- MDX-powered blog posts with frontmatter, callouts, and syntax-highlighted code blocks
- Featured posts, latest research, category pages, related articles, and sticky table of contents
- Client-side blog filtering with search, category/tag filters, and latest/popular sorting
- SEO metadata, OpenGraph, RSS, sitemap, robots.txt, web manifest, and Netlify-ready configuration
- Newsletter signup form wired for Netlify Forms
- Theme toggle, reading progress, mock view counter, loading states, and global error boundary

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style primitives
- Framer Motion
- next-mdx-remote
- Netlify static export

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build for Netlify

```bash
npm run build
```

The app is configured for static export and writes production assets to `out/`.

## Deploy to Netlify

1. Push the repository to GitHub or your Git provider.
2. Create a new Netlify site from the repository.
3. Netlify will detect `netlify.toml` and use:
   - Build command: `npm run build`
   - Publish directory: `out`
4. Keep the Next.js Runtime plugin enabled.
5. Add your production site URL if you want to replace the placeholder `https://unrollloop.com` in `lib/constants.ts`.

## Content authoring

Add new posts in `content/posts/*.mdx` with this frontmatter:

```mdx
---
title: "Breaking Down OAuth Misconfigurations"
date: "2026-01-10"
tags: ["security", "oauth"]
category: "Security"
author: "Unroll Loop Team"
description: "Deep dive into common OAuth vulnerabilities"
---
```

Supported MDX features:

- fenced code blocks
- inline code
- `<Callout type="info">` and `<Callout type="warning">`
- linked headings with copyable anchors

## Project structure

```text
app/                App Router pages and app-level boundaries
components/         UI components and MDX primitives
content/posts/      MDX blog content
lib/                blog utilities and site configuration
public/             static assets + generated RSS/sitemap/robots
scripts/            build-time generation scripts
styles/             global Tailwind styles
```
