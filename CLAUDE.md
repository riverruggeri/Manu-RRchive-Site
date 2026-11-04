# Manu / R aRchive site

River's website for the clothing brand Manu (house name) and R aRchive (reworked, used-material pieces). Being rebuilt from a Cargo site into plain HTML/CSS/JS that River owns.

## Direction
- The site is becoming brand-first: a new brand homepage (not built yet), with the portfolio as a secondary section.
- `portfolio.html` is the old Cargo desktop-style homepage, now the portfolio page.
- Planned: Fashion Works, Conceptual Art and Photography category pages (big title, project rows with year/title/"More", image slideshows that warp while scrolling, a "More" side panel with Details and Overview), a Commissions page with a form that emails River, and later a store (Stripe Checkout planned).

## How things are set up
- Each page keeps its editable settings in a `SITE` block at the top of its script, so photos, links and effects change in one place.
- Background ripple on `portfolio.html` mirrors Cargo's "Ripple" backdrop controls (distortionX/Y, scale, speed, direction, mouseSensitivity). River tuned it and approved the current values.
- Photos live in `images/`.
- Font: Schibsted Grotesk from Google Fonts as a free stand-in for Cargo's Diatype.

## Working with River
- River's original Cargo site must not be changed; look only.
- River describes changes in plain words; keep explanations non-technical.
