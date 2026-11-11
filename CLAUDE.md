# Manu / R aRchive site

River's website for the clothing brand Manu (house name) and RRchive, written with the first R flipped (reworked, used-material pieces). Being rebuilt from a Cargo site into plain HTML/CSS/JS that River owns.

## Direction (restructured 2026-11-11)
- **Manu** = River as an artist (the main home). Under it, LABELS, one per medium, each with its own name, header, home page and commissions: **ЯRchive** (clothing) and **ЯRgraphy** (photography, added 2026-11-11). Labels are defined in `SITE.labels` in assets/site.js; a future label (e.g. jewelry) is one more entry there plus a doorway on the Manu homepage. A leading "Я" in names is drawn as a flipped R (brandHTML / .flip-r).
- Which part a page belongs to is set by each label's `pages` list; the shared header adapts:
  - Manu pages: "MANU" top left (to index.html; hidden on the homepage, which has the big MANU), corner label "Manu".
  - Label pages: the label name top left (image logo for ЯRchive, text for ЯRgraphy). On the label's home screen it opens logoLinkFromHome; elsewhere it goes to the home screen. "MANU" link top right next to the dots; the label's tabs along the top; corner label = label name.
  - ЯRchive: home shop.html (logo -> archive.html); pages shop, product, archive, commissions, start-commission (clothing); tabs Current Catalog / Archive / Commissions / Experimental Fashion ↗.
  - ЯRgraphy: home rrgraphy.html (intro text, slideshow, big VIEW MY PHOTOGRAPHY button, START A COMMISSION -> photo-commissions.html; logo -> photography.html); pages rrgraphy, photography, photo-commissions, start-commission?type=photo; tabs Home / Photography / Commissions.
- Manu homepage `index.html`: MANU, "Artist working in fashion, textiles and photography.", doorways ЯRchive / Portfolio / ЯRgraphy / About. ЯRgraphy intro text on rrgraphy.html is drafted from River's bio; confirm with River.
- ЯRchive: `shop.html` Current Catalog (available pieces), `archive.html` Archive (sold pieces, status "sold" in catalog.js; optional soldNote), `product.html?piece=<id>`, `commissions.html` (garment commissions) -> `start-commission.html` form.
- Experimental Fashion (`fashion-works.html`) stays in Manu's portfolio: pieces not for sale, kept or gifted. ЯRchive links to it (tab, Archive note); it links to ЯRchive (subLink under the title).
- Each medium has its own commissions: garments under ЯRchive; photography at `photo-commissions.html` -> `start-commission.html?type=photo` (same form, photo fields). Photography page links to it under the title (PAGE.subLink). Photo services/text are placeholders until River confirms them.
- Menu: Manu / ЯRchive (Current Catalog, Archive, Commissions) / ЯRgraphy (Home, Photography, Commissions) / Portfolio (Overview, Experimental Fashion, Conceptual Art) / About.
- Contact: Instagram @rrchive.manu (one handle for the whole site for now; River plans separate ones per medium later). Phone number removed (SITE.contact.phone "").
- Shop look: light stone "showroom" inspired by Rick Owens. Products are cutouts (background removed with an ISNet ONNX model run locally) in images/shop/. The 4 current pieces are placeholders from Experimental Fashion with no prices ("Price on request"); the button emails River until a Stripe payment link is put in `buyLink`.
- Live site: https://riverruggeri.github.io/Manu-RRchive-Site/ (GitHub Pages from main; repo is public). Every push goes live. Future domain idea: something like ManuCollective (one domain for now). Custom-domain email later (Cloudflare + Email Routing + Gmail "send as").
- Text was copied from River's Cargo editor; photos are supplied by River and saved under images/<page>/.
- Home-screen icon and web-app title still say ЯRchive; may need a Manu version.

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
- Homepage and Portfolio pick the background by window shape: wide windows get home-bg.jpg, tall/narrow windows (phones, narrow browser windows, the Claude preview panel) get images/about/about-hero.jpg (PAGE.mobileBackground, passed as tallImage); swaps live on resize; homepage buttons in a 2x2 grid.
- Portfolio Fashion Works icon is River's sewing machine drawing (images/icon-fashion-works.png), shown at full original resolution, twice the normal icon width ("size: 2"), no outline/glow (River asked to remove it). "size" widens the icon box rather than zooming, which kept it sharp.
- About bio is larger on phones.
- iOS: River is on iOS 18.5 (Safari). Added home-screen icon (apple-touch-icon.png, favicon.png) and web-app tags on every page; no tap flash; no bounce on photo pages; form fields 16px so Safari doesn't zoom; commissions slideshow only pauses on hover with a real mouse; project arrows always shown on touch screens. WebKit isn't available in the workspace to test, so check on River's phone.
- ONE CREAM everywhere (River, 2026-11-10): --cream #e7e5e0 (stone off-white; River tried warmer #e8e0d2 and went back) in assets/site.css is used for every former white (text, logo, dots, buttons, icons, home-screen icon) AND the backgrounds of the shop, project and commission pages. Shades --cream-light / --cream-deep / --cream-panel are mixed from it, so changing --cream recolours the whole site. Never introduce a separate white or stone colour. The logo is drawn through a CSS mask in the page text colour (cream on dark pages, dark on cream pages).
- About is cream too (photo moved right so the logo and clock sit on cream). Commissions and Start a Commission are cream too (body class "light" in site.css gives any page the cream look).
- Project pages use the site cream with dark text; old grey values are commented in assets/projects.css.

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
