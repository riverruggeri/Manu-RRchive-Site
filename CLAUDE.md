# Manu / R aRchive site

River's website for the clothing brand Manu (house name) and R aRchive (reworked, used-material pieces). Being rebuilt from a Cargo site into plain HTML/CSS/JS that River owns.

## Direction
- The site is brand-first: `index.html` is the Manu / R aRchive homepage, with the portfolio as a secondary section.
- `portfolio.html` is the old Cargo desktop-style homepage, now the portfolio page.
- Built: Photography, Fashion Works (titled "Experimental Fashion", as in Cargo) and Conceptual Art project pages, Commissions (form uses mailto until a Formspree endpoint is set), About/Contact.
- Planned: a store (Stripe Checkout planned); "Shop" is marked coming soon in the menu.
- Text on the pages was copied from River's Cargo editor. Photos could not be copied (Cargo's image server is blocked from the workspace), so each images/ folder has a PHOTOS-TO-ADD.txt with the expected Cargo file names. Photography uses low-res stand-ins cropped from a screen recording until the originals arrive.
- Fashion Works project titles/years are guesses; Cargo still had example text there.

## How things are set up
- Shared code lives in `assets/` (site.js holds the menu and contact details for every page; projects.js builds the project pages; ripple.js is the background effect).
- Each page keeps its editable settings in a `PAGE` block (and project pages a `PROJECTS` list) at the top of its script.
- Background ripple on `portfolio.html` mirrors Cargo's "Ripple" backdrop controls (distortionX/Y, scale, speed, direction, mouseSensitivity). River tuned it and approved the current values.
- Photos live in `images/`.
- Font: Schibsted Grotesk from Google Fonts as a free stand-in for Cargo's Diatype.

## Working with River
- River's original Cargo site must not be changed; look only.
- River describes changes in plain words; keep explanations non-technical.
