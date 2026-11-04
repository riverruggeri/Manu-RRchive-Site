# Manu / R aRchive site

River's website for the clothing brand Manu (house name) and RRchive, written with the first R flipped (reworked, used-material pieces). Being rebuilt from a Cargo site into plain HTML/CSS/JS that River owns.

## Direction
- The site is brand-first: `index.html` is the Manu / ЯRchive homepage (no menu dots there, logo top-left just for looks), with the portfolio as a secondary section.
- `portfolio.html` is the old Cargo desktop-style homepage, now the portfolio page.
- Built: Photography, Experimental Fashion (`fashion-works.html`) and Conceptual Art project pages, Commissions (form uses mailto until a Formspree endpoint is set), About/Contact (fits one screen on computers).
- Planned: a store (Stripe Checkout planned); "Shop" is marked coming soon. River also wants a custom-domain email later (Cloudflare domain + Email Routing + Gmail "send as" was suggested) and the site needs hosting/a domain.
- Text was copied from River's Cargo editor; photos are being supplied by River directly and saved under images/<page>/.

## Content status (end of 2026-11-04 session)
- Photography: Drag Me Down (10), Blending With Nature (2), untitled Fashion Photography night shoot (7), Riding Back (8), Flash Photography Studio Shoot (2, from TIFs), Scanner Experimentation (5), untitled Fashion Photography studio portraits (2). Only Drag Me Down has an overview.
- Experimental Fashion: Denim Patchwork Vest (4), Reworked Denim (Phase 01/02) (4), Distressed Denim Jeans (5), Reworked Denim (4). No overviews yet. While River said "add these to fashion until I say otherwise", new uploads go here.
- Conceptual Art: empty.
- About: big photo set (about-hero.jpg); portrait IMG_5331.jpg still missing.
- Years set to 2026 for new projects are guesses unless River said otherwise.

## To do next session (River's list, 2026-11-04)
1. Smooth the transition between the homepage and the portfolio page: take out the grey screen that shows during the switch.
2. Smooth photo changes on the project pages: make the slideshow photos slide sideways (swipe) instead of switching instantly.
3. Fix the Commissions page (ask River what's wrong with it first).

## How things are set up
- Shared code lives in `assets/` (site.js holds the menu and contact details for every page; projects.js builds the project pages; ripple.js is the background effect).
- Each page keeps its editable settings in a `PAGE` block (and project pages a `PROJECTS` list) at the top of its script.
- Project page scroll warp (assets/projects.js): flat corner-pin stretch tied to position on screen; straightens only when the photo is centered; names/counters slide clear of the corners with a 64px minimum gap; portrait photos warp less (PORTRAIT_WARP). River tuned these.
- Pages fade out/in between links (site.js/site.css).
- Background ripple on `portfolio.html` mirrors Cargo's "Ripple" backdrop controls (distortionX/Y, scale, speed, direction, mouseSensitivity). River tuned it and approved the current values.
- Photos live in `images/`.
- Font: Schibsted Grotesk from Google Fonts as a free stand-in for Cargo's Diatype.

## Working with River
- River's original Cargo site must not be changed; look only.
- River describes changes in plain words; keep explanations non-technical.
