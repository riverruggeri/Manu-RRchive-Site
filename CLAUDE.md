# Manu / R aRchive site

River's website for the clothing brand Manu (house name) and RRchive, written with the first R flipped (reworked, used-material pieces). Being rebuilt from a Cargo site into plain HTML/CSS/JS that River owns.

## Direction
- The site is brand-first: `index.html` is the Manu / ЯRchive homepage (no menu dots there, logo top-left just for looks), with the portfolio as a secondary section.
- `portfolio.html` is the old Cargo desktop-style homepage, now the portfolio page.
- Built: Photography, Experimental Fashion (`fashion-works.html`) and Conceptual Art project pages, Commissions (info page) + Start a Commission (form page; uses mailto until a Formspree endpoint is set), About/Contact (fits one screen on computers).
- Shop: `shop.html` (Current Catalog, one-of-one pieces) and `product.html?piece=<id>`, both built from `assets/catalog.js`; light stone "showroom" look inspired by Rick Owens. Products are cutouts (background removed with an ISNet ONNX model run locally) in images/shop/. The 4 current pieces are placeholders from Experimental Fashion with no prices ("Price on request"); the button emails River until a Stripe payment link is put in `buyLink`. Sold pieces move to a "Sold" section.
- Menu: Shop and Portfolio are dropdowns (Shop: Start A Commission -> commissions.html, Current Catalog -> shop.html; Portfolio: Fashion Works, Conceptual Art, Photography). portfolio.html is no longer in the menu; it is reached from the homepage button.
- Live site: https://riverruggeri.github.io/Manu-RRchive-Site/ (GitHub Pages from main; repo is public). Every push goes live. River also wants a custom-domain email later (Cloudflare domain + Email Routing + Gmail "send as" was suggested) and the site needs hosting/a domain.
- Text was copied from River's Cargo editor; photos are being supplied by River directly and saved under images/<page>/.

## Content status (end of 2026-11-04 session)
- Photography: Drag Me Down (10), Blending With Nature (2), untitled Fashion Photography night shoot (7), Riding Back (8), Flash Photography Studio Shoot (2, from TIFs), Scanner Experimentation (5), untitled Fashion Photography studio portraits (2). Only Drag Me Down has an overview.
- Experimental Fashion: Denim Patchwork Vest (4), Reworked Denim (Phase 01/02) (4), Distressed Denim Jeans (5), Reworked Denim (4). No overviews yet. While River said "add these to fashion until I say otherwise", new uploads go here.
- Conceptual Art: empty.
- About: big photo set (about-hero.jpg); portrait IMG_5331.jpg still missing.
- Years set to 2026 for new projects are guesses unless River said otherwise.

## To do next session (River's list, 2026-11-04)
1. DONE: Home/Portfolio switch keeps the photo on screen (no grey gap); browsers with built-in page cross-fades use them.
2. DONE: slideshow photos slide sideways; swipe on phones.
3. DONE: Commissions is one screen (no scroll) ending in START A COMMISSION, which goes to start-commission.html (the form). Right side: tall example slideshow, slides every 3s, arrows, swipe. Examples are stand-ins from fashion-works until River sends commission photos.

## Mobile version (started 2026-11-04 evening)
- Phones: long pages get a fading bar behind the logo/menu dots (colour from each page's --bar); corner clock/name hidden on long pages.
- Ripple settings also have brightness (1.15 = 15% brighter), phoneStrength (2.2x stronger ripple on touch screens) and phoneAutoMotion (an invisible "finger" wanders over the photo on phones; a real touch takes over).
- Homepage and Portfolio on phones use images/about/about-hero.jpg (PAGE.mobileBackground); homepage buttons in a 2x2 grid.
- Portfolio Fashion Works icon is River's sewing machine drawing (images/icon-fashion-works.png), shown at full original resolution, twice the normal icon width ("size: 2"), no outline/glow (River asked to remove it). "size" widens the icon box rather than zooming, which kept it sharp.
- About bio is larger on phones.
- iOS: River is on iOS 18.5 (Safari). Added home-screen icon (apple-touch-icon.png, favicon.png) and web-app tags on every page; no tap flash; no bounce on photo pages; form fields 16px so Safari doesn't zoom; commissions slideshow only pauses on hover with a real mouse; project arrows always shown on touch screens. WebKit isn't available in the workspace to test, so check on River's phone.
- On trial: every white on the dark/photo pages is cream #e8e0d2, between the shop stone and a warmer cream (--cream in assets/site.css; set it to #ffffff to go back). The logo is drawn through a CSS mask in the page text colour (cream on dark pages, dark on cream pages).
- Commissions and Start a Commission are cream too (body class "light" in site.css gives any page the cream look).
- Project pages are now cream (#e7e5e0, same as the shop) with dark text, on trial at River's request; old grey values are commented in assets/projects.css.

## How things are set up
- Shared code lives in `assets/` (site.js holds the menu and contact details for every page; projects.js builds the project pages; ripple.js is the background effect).
- Each page keeps its editable settings in a `PAGE` block (and project pages a `PROJECTS` list) at the top of its script.
- Project page scroll warp (assets/projects.js): flat corner-pin stretch tied to position on screen; straightens only when the photo is centered; names/counters slide clear of the corners with a 64px minimum gap; portrait photos warp less (PORTRAIT_WARP). River tuned these.
- Pages fade out/in between links (site.js/site.css).
- Background ripple on `portfolio.html` mirrors Cargo's "Ripple" backdrop controls (distortionX/Y, scale, speed, direction, mouseSensitivity). River tuned it and approved the current values.
- Photos live in `images/`.
- Font: Schibsted Grotesk from Google Fonts as a free stand-in for Cargo's Diatype.

## Saving changes
- Run `sh bump-version.sh` before each commit: it stamps a new ?v= number on the asset links so phones and GitHub Pages caching load the latest files.

## Working with River
- River's original Cargo site must not be changed; look only.
- River describes changes in plain words; keep explanations non-technical.
