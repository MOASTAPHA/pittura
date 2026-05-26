# Plan: Bilingual Refactor + Map Page + New Homepage + Routing Cleanup

## 1. Global Language Context (AR/EN)

Create `src/contexts/LanguageContext.tsx`:
- `LanguageProvider` exposing `{ lang: 'ar' | 'en', isRTL, setLang, toggle, t }`
- Persists choice in `localStorage` (`pittura.lang`, default `ar`)
- On change: sets `document.documentElement.dir` and `lang` attributes globally so RTL applies app-wide (no per-page `dir` juggling)
- `useLanguage()` hook
- Small `t(key)` helper backed by a single dictionary file `src/i18n/strings.ts` for shared nav/footer/landing strings

Wrap `<App />` tree with `<LanguageProvider>` in `src/App.tsx`.

Refactor:
- `Navigation.tsx` and `LanguageSwitcher.tsx`: read/write via `useLanguage()` instead of URL params + `window.location.href` reload. Toggle becomes instant, global.
- `Footer.tsx`: same.
- `Index.tsx` / other pages: drop local `isRTL` state, use the hook.

## 2. Shared Layout with Nav + Footer on Every Page

Create `src/components/Layout.tsx`:
- Renders `<Navigation />`, `<Outlet />`, `<Footer />`
- Pulls `isRTL` from context, passes to Nav/Footer
- Variant prop `fullBleed` for the map page so the map can fill the viewport under the nav without footer pushing layout (map page will opt out of footer via a `<Layout hideFooter>` flag)

Update `src/App.tsx` routes to nest all pages under `<Route element={<Layout />}>` so Nav + Footer are guaranteed on every route, including currently-broken ones.

## 3. Dedicated Map Page `/explore`

Create `src/pages/Explore.tsx`:
- Move the entire current map + glassmorphism sidebar + Details Modal from `Index.tsx` into it (unchanged behavior: HeritageMap, site cards, fly-to, modal with "Start 360° Tour")
- Use language context for RTL + strings
- Route: `/explore` (also alias `/map` → same component)

## 4. New Homepage `src/pages/Index.tsx`

Premium landing page, vertical scroll, sections:

1. **Hero** — full-viewport background (Unsplash Saudi heritage image, e.g. AlUla rock formations), dark gradient overlay, large bilingual headline + subhead, primary CTA `Explore the Map` → `/explore`, secondary CTA `Watch Tour` → `/virtual-museum`. Framer-motion fade/parallax.
2. **About / Vision & Mission** — two-column editorial layout, gold accent rule, paragraph on digitizing Saudi heritage.
3. **Core Features** — 3-card grid:
   - Interactive Map (`MapPin` icon) → `/explore`
   - 360° Virtual Tours (`Compass` icon) → `/virtual-museum`
   - Reliable Heritage Information (`BookOpen` icon) → `/heritage-experience`
4. **Featured Sites strip** — reuse the 3 heritage sites as horizontal cards linking to `/explore`.
5. **CTA band** — "Begin your journey" → `/explore`.

Footer renders via Layout.

## 5. Fix Broken Routes / Placeholder Pages

Audit links in `Navigation.tsx`, `Footer.tsx`, `MegaMenu.tsx`. Pages that exist already: About, Auctions, ArtifactExplorer, HeritageExperience, VirtualMuseum, HologramExperience, Login, Register.

Missing routes referenced in nav/footer → create lightweight placeholder pages using a shared `<PlaceholderPage title subtitle />` component (Nav+Footer come from Layout):
- `/contact` → `Contact.tsx`
- `/museums` → `Museums.tsx`
- `/search` → `SearchPage.tsx`
- `/tours` → redirect to `/virtual-museum`
- Any other dead link discovered during audit gets the same treatment

Each placeholder: centered hero, bilingual title, short description, "Coming soon" badge, back-to-home button. No crashes, no blank screens.

Keep the existing `NotFound` as the final catch-all.

## Technical Notes

- No backend changes.
- No new deps required (framer-motion already used elsewhere; if not installed, add it).
- All colors via existing tokens / current Pittura palette (sand `#F5F0E8`, brown `#3D2E1A`, gold `#B8945F`).
- `document.documentElement.dir` flip in the context effect handles RTL globally — individual pages no longer need `dir={...}` wrappers (can be removed incrementally; new pages won't add them).
- Language toggle no longer reloads the page.

## Files

Created:
- `src/contexts/LanguageContext.tsx`
- `src/i18n/strings.ts`
- `src/components/Layout.tsx`
- `src/components/PlaceholderPage.tsx`
- `src/pages/Explore.tsx`
- `src/pages/Contact.tsx`, `src/pages/Museums.tsx`, `src/pages/SearchPage.tsx`

Edited:
- `src/App.tsx` (provider + nested Layout routes + new routes)
- `src/pages/Index.tsx` (replaced with landing page)
- `src/components/Navigation.tsx`, `src/components/LanguageSwitcher.tsx`, `src/components/Footer.tsx` (use context)
