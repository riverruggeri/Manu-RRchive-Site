# Manu / R aRchive site

Website for Manu Clothing and R aRchive by River Ruggeri, built with Claude.

## Pages
- `index.html`: Manu homepage (River as an artist; doorways to ЯRchive, Portfolio, Photography, About)
- `portfolio.html`: portfolio desktop (icons for the three project sections)
- `photography.html`, `fashion-works.html`, `conceptual-art.html`: project pages (slideshows that bend while scrolling, "More" panel)
- `commissions.html`: ЯRchive garment commissions
- `photo-commissions.html`: photography commissions
- `start-commission.html`: the request form (add `?type=photo` for photography)
- `shop.html`: ЯRchive Current Catalog (one-of-one pieces for sale)
- `archive.html`: ЯRchive Archive (pieces that have sold)
- `product.html`: one piece (opened from the catalog)
- `about.html`: bio, contact and services

## Changing things
Every page has a settings block near the top of its script, so you rarely need to touch anything else.

- **Menu and contact details** (email, phone, Instagram): `assets/site.js`. Change them once and every page updates.
- **Background photos and ripple**: the `background:` and `ripple:` settings in `index.html` and `portfolio.html`. The ripple settings use the same names as Cargo's Ripple backdrop.
- **Commission prices, text and example photos**: top of `commissions.html` (`examples:` list).
- **Bio and About photos**: top of `about.html`.
- **Shop pieces** (add, price, mark sold): `assets/catalog.js`. Product photos go in `images/shop/`.

## Adding photos
Each folder in `images/` has a `PHOTOS-TO-ADD.txt` listing the files that page expects, named the same as in Cargo. Drop the photos in and they appear. Until then the page shows a box with the file name.

## Adding a project
1. Put the photos in that page's folder (for example `images/photography/`).
2. Open the page (for example `photography.html`) and find the PROJECTS list.
3. Copy the template in the comment above the list, paste it where the project should appear (top = first on the page), and fill in the year, title, medium, photo file names, details and overview.

## Commission form
Right now the form opens the visitor's email app with the request filled in. To get requests straight to your inbox instead, make a free form at formspree.io and paste its address into `formEndpoint` at the top of `start-commission.html`.

## Shared code
`assets/` holds what every page shares: `site.css` and `site.js` (look, menu, clock), `ripple.js` (the background effect), and `projects.css` / `projects.js` (the project pages).
