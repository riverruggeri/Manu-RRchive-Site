# Manu / ЯRchive website — handoff (2026-11-17)

Start a new chat with: "Continue the Manu website. Read HANDOFF.md and CLAUDE.md in the repo riverruggeri/Manu-RRchive-Site first."

## Where things live
- **Live site:** https://riverruggeri.github.io/Manu-RRchive-Site/ (GitHub Pages; every push to `main` goes live)
- **Code:** GitHub repo `riverruggeri/Manu-RRchive-Site` (plain HTML/CSS/JS). `CLAUDE.md` in the repo holds every detail and decision so far.
- **Preview artifact:** https://claude.ai/artifact/JNDvXfWbgfn4XMi26GpyY2 (needs a recent browser; older Macs/Safari can't open it, the live site works everywhere)
- **Store research doc:** "ЯRchive Store Playbook" https://claude.ai/artifact/4njLBRPauRZ3mTV24G3jX9
- Before each commit: `sh bump-version.sh` (cache-busting). River's name is always "River Manu Ruggeri". Never change the original Cargo site.

## What the site is
- **Manu** = River as an artist (homepage `index.html`). Under it two labels:
  - **ЯRchive** (clothing, `shop.html`): full-screen slideshow, Current Catalog in sliding rows (Bottoms / Tops / Accessories), Archive (sold pieces), product pages, garment commissions + form.
  - **ЯRgraphy** (photography, `rrgraphy.html`): dark grey theme, intro, slideshow, photography page, photo commissions.
- Portfolio (Experimental Fashion, Photography, Conceptual Art), About (stone white, bio, services incl. Photography Commissions).
- One colour: stone off-white `--cream #e7e5e0` everywhere (warmer creams tried and rejected).

## Done recently (Nov 11–17)
- iPhone homepage built and live (`home-phone.html`, see below).
- Manu homepage scrolls to an About section (photo, bio, "What I make" with three sliding photo boxes, big Portfolio / About links). Portfolio + About are pill buttons top right. Homepage always opens at the top.
- Hover photos on the label names: 2.8 s per photo, 1 s even slide; phones press-and-hold.
- About page: stone white, narrower photo, bigger portrait slot, bigger text, services fixed.
- Moving effects, each with an on/off switch in `SITE.effects` (assets/site.js):
  - ON: line-by-line text reveal, ЯRchive sliding words + floating cut-outs, Portfolio icons follow the mouse, 3D tilt on photos (no shine), smooth wheel scrolling, stitch-by-stitch dashed lines, plain-denim-filled titles ("What I make", "Current Catalog").
  - OFF (tried, River didn't want): grain, fog, falling threads, layered photo, custom cursor, fabric ripple, pushed letters, zoom-open photo, pinned "What I make", photo morph, magnetic buttons. River might like zoom-open and pinned sections later, but done differently.
- Store research: the Playbook doc (10 ranked changes, checkout/payments, drops, mobile fixes).

## In progress / decisions open
1. **iPhone homepage: DONE and live (2026-11-17).** Phones get `home-phone.html` (index.html sends them there; `?desktop` shows the computer version). Design River chose: the warped photo full screen, MANU + short intro + ЯRchive / ЯRgraphy buttons on it, a stone card that slides up from the bottom (MANU moves onto it), Portfolio / About pills top right then a bar at the bottom, and below: tiles, About, What I make, big links, footer. Only the card scrolls the page; fingers on the photo play with the warp. Mock/sandbox: `_mock/e.html`. Details in CLAUDE.md "Latest status".
2. **Payments:** River leaning to PayPal over Stripe. Fees are similar (Stripe card 2.9% + 30¢; PayPal card 2.99% + 49¢, PayPal/Venmo balance 3.49% + 49¢), no monthly fee either way. Option: offer both. **Waiting on River's choice**, then wire it into the Buy button (`buyLink` in assets/catalog.js) and update the Playbook.
3. **Returns policy:** all sales final vs. final sale with measurements guaranteed (comment left in the Playbook).

## To do next (from the Playbook, in order)
1. Show a price on every piece (needs River's prices)
2. Flat measurements in inches + cm and a "fits like" line (needs River to measure)
3. Real checkout per piece (PayPal and/or Stripe; one sale per piece)
4. Show the shipping cost on each piece (needs River's US shipping price)
5. Worn photos (front/back, unstyled) on each piece page
6. Drop list email field (shop, Archive, footer)
7. Release in drops of 3–5 pieces every 6–8 weeks
8. Phone piece pages: Buy bar fixed at the bottom; name + price on the first screen; measurements open by default; tabs not cut off
9. Archive as proof (sold labels, drop numbers, buyer photos)
10. Own domain (e.g. ManuCollective), then Google product data and Instagram product tags

## Still waiting on River
Prices and measurements for the 4 pieces, shipping price, returns choice, payment choice, worn photos, titles/years/overviews for the two Conceptual Art projects, About portrait (IMG_5331.jpg), real photo-commission details, Archive photos, a Manu home-screen icon.
