# Manu / R aRchive site

River's website for the clothing brand Manu (house name) and RRchive, written with the first R flipped (reworked, used-material pieces). Being rebuilt from a Cargo site into plain HTML/CSS/JS that River owns.

## Direction (restructured 2026-11-11)
- **Manu** = River as an artist (the main home). Under it, LABELS, one per medium, each with its own name, header, home page and commissions: **ЯRchive** (clothing) and **ЯRgraphy** (photography, added 2026-11-11). Labels are defined in `SITE.labels` in assets/site.js; a future label (e.g. jewelry) is one more entry there plus a doorway on the Manu homepage. A leading "Я" in names is drawn as a flipped R (brandHTML / .flip-r); the gap between the two R's is the same for every label: .flip-r margin-right -0.035em (River, 2026-11-11: halfway between the old ЯRchive and ЯRgraphy gaps; the ЯRchive image logo is unchanged). Menu links also go through brandHTML.
- Which part a page belongs to is set by each label's `pages` list; the shared header adapts:
  - Manu pages: "Manu" top left (only the M capital, bigger: River 2026-11-11) (to index.html; hidden on the homepage, which has the big MANU), corner label "Manu".
  - Label pages: the label name top left (image logo for ЯRchive, text for ЯRgraphy). On the label's home screen it opens logoLinkFromHome; elsewhere it goes to the home screen. "MANU" link top right next to the dots; the label's tabs along the top; corner label = label name.
  - ЯRchive: home shop.html (logo -> archive.html); pages shop, product, archive, commissions, start-commission (clothing); tabs Current Catalog / Archive / Commissions / Experimental Fashion ↗.
  - ЯRgraphy: home rrgraphy.html (intro text, slideshow, big VIEW MY PHOTOGRAPHY button, START A COMMISSION -> photo-commissions.html; logo -> photography.html); pages rrgraphy, photography, photo-commissions, start-commission?type=photo; tabs Home / Photography / Commissions.
- Manu homepage `index.html` (River chose "option 2", 2026-11-11): MANU, "Artist working in fashion, textiles and photography.", then the labels as big names with captions (PAGE.labels). Hovering a name fades in that label's photos sliding by every 2.6s (overlay #labelShow above the ripple; photo lists in SITE.labels.<key>.slides, wide/tall). Each label remembers where it is (slidePlace in localStorage), hovering picks up on the photo it stopped on (phones show the next one each turn), slides only move while hovered / while the ЯRchive slideshow is on screen, transitions 1.4s, and ЯRchive's big slideshow opens on the photo last shown (shared slidePlace). All slideshows loop forward after the last photo (makeSlider in site.js repeats the first photo at the end). On phones the labels take turns every 4s, each showing its next photo (River, 2026-11-11). canvas.setRippleImage is no longer used there. Portfolio and About are small links below. Label photos are stand-ins (vest for ЯRchive, Drag Me Down for ЯRgraphy). ЯRgraphy intro text (style + studio experience in fashion, portrait, object) written 2026-11-11 for commissions; photo services now include Object / Product Photography.
- ЯRchive home `shop.html` opens with a full-screen slideshow of fashion-works photos (PAGE.hero: wide list for wide windows, tall list for phones; slides every 4.5s, swipe, click the left or right third of the screen to go back/forward (no arrows, River 2026-11-11), dots) with the big ЯRchive logo in cream in the middle (links to archive.html) and "Current Catalog ↓" that glides down (River, 2026-11-11). While the slideshow is on screen the header is cream and the small logo is hidden (body.over-hero). The page always opens at the top (scrollRestoration manual), except coming back from a piece, which returns to the same spot (sessionStorage). Below it: Current Catalog (available pieces) in sideways-sliding rows Bottoms / Tops / Accessories (River, 2026-11-11; PAGE.rows in shop.html, each piece's `category` in catalog.js; empty row shows "More coming soon"; cards same size as the old grid: 4 across desktop, 3 under 1100px, 2 on phones; arrows on desktop when a row overflows), `archive.html` Archive (sold pieces, status "sold" in catalog.js; optional soldNote), `product.html?piece=<id>`, `commissions.html` (garment commissions) -> `start-commission.html` form.
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
- Conceptual Art: first (top) an untitled project of 3 photos, black flared jeans with a long patchwork denim train (trailing-denim-01..03.jpg, River 2026-11-11); then an untitled project, 8 photos of layered denim jackets (layered-denim-01..08.jpg, River 2026-11-11, order as sent; year 2026 is a guess; no overview yet).
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
- Portfolio icons (River, 2026-11-11) are cutouts of River's own work: Conceptual Art = trailing-denim-03 (images/icon-conceptual-art.webp), Fashion Works = denim patchwork vest (icon-fashion-works.webp), Photography = the person in about-hero.jpg (icon-photography.webp; ISNet missed the jeans in that busy photo, so it was cut with OpenCV GrabCut from a hand-traced outline). All size 2.2 (size scales the box both ways), very thin (0.75px) cream sticker edge + shadow, labels 14px cream, no box (River 2026-11-11). The old sewing machine drawing was removed (it was an image from online).
- About bio is larger on phones.
- iOS: River is on iOS 18.5 (Safari). Added home-screen icon (apple-touch-icon.png, favicon.png) and web-app tags on every page; no tap flash; no bounce on photo pages; form fields 16px so Safari doesn't zoom; commissions slideshow only pauses on hover with a real mouse; project arrows always shown on touch screens. WebKit isn't available in the workspace to test, so check on River's phone.
- ONE CREAM everywhere (River, 2026-11-10): --cream #e7e5e0 (stone off-white; River tried warmer #e8e0d2 and went back) in assets/site.css is used for every former white (text, logo, dots, buttons, icons, home-screen icon) AND the backgrounds of the shop, project and commission pages. Shades --cream-light / --cream-deep / --cream-panel are mixed from it, so changing --cream recolours the whole site. Never introduce a separate white or stone colour. The logo is drawn through a CSS mask in the page text colour (cream on dark pages, dark on cream pages).
- About is cream too (photo moved right so the logo and clock sit on cream). Commissions and Start a Commission are cream too (body class "light" in site.css gives any page the cream look).
- ЯRgraphy has its own colours (River, 2026-11-11): old dark grey #4c4c4c background (slightly darker than the old #565656), cream text, near-black #222222 buttons. Green accents switched off for now (River, 2026-11-11); to bring back set --moss #9fb579 and --moss-deep #34492a. One block at the end of assets/site.css keyed on html[data-section="rrgraphy"]; ЯRchive and Manu stay cream.
- Project pages use the site cream with dark text; old grey values are commented in assets/projects.css.

## How things are set up
- Shared code lives in `assets/` (site.js holds the menu and contact details for every page; projects.js builds the project pages; ripple.js is the background effect).
- Each page keeps its editable settings in a `PAGE` block (and project pages a `PROJECTS` list) at the top of its script.
- Project page scroll warp (assets/projects.js): flat corner-pin stretch tied to position on screen; straightens only when the photo is centered; names/counters slide clear of the corners with a 64px minimum gap; portrait photos warp less (PORTRAIT_WARP). River tuned these. Positions are measured once (re-measured on resize/photo change via ResizeObserver) and redrawn every frame while scrolling, for smooth iPhone scrolling (2026-11-11).
- Pages fade out/in between links (site.js/site.css).
- Background ripple on `portfolio.html` mirrors Cargo's "Ripple" backdrop controls (distortionX/Y, scale, speed, direction, mouseSensitivity). River tuned it and approved the current values.
- Photos live in `images/`.
- Font: Schibsted Grotesk from Google Fonts as a free stand-in for Cargo's Diatype.

## Saving changes
- Run `sh bump-version.sh` before each commit: it stamps a new ?v= number on the asset links so phones and GitHub Pages caching load the latest files.

## Working with River
- River's full name on the site is always "River Manu Ruggeri" (River, 2026-11-11).
- River's original Cargo site must not be changed; look only.
- River describes changes in plain words; keep explanations non-technical.
