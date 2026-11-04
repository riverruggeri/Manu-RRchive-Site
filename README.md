# Manu / R aRchive site

Website for Manu Clothing and R aRchive, built with Claude.

## Pages
- `portfolio.html`: portfolio page (desktop icons, ripple background, clock, menu)
- `photography.html`: Photography projects (slideshows that bend while scrolling, "More" panel)

## Changing things
- **Background photo:** put the new image in `images/` and change `background:` in the SITE SETTINGS block near the top of the script in `portfolio.html`.
- **Ripple effect:** the `ripple:` settings in the same block use the same names as Cargo's Ripple backdrop (distortion X/Y, scale, speed, direction, mouse sensitivity).

## Adding a project to Photography
1. Put the photos in `images/photography/`.
2. Open `photography.html` and find the PROJECTS list near the top of the script.
3. Copy the template in the comment above the list, paste it where the project should appear (top = first on the page), and fill in the year, title, medium, photo file names, details and overview.
