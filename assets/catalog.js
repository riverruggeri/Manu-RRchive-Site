/* =========================================================
   CURRENT CATALOG
   Every piece for sale lives in this one list. The shop page
   and each piece's own page are built from it.

   TO ADD A PIECE: copy the template below, paste it into the
   list (top = first in the shop), and fill it in. Product
   photos go in images/shop/ (photos with the background taken
   out look best).

   {
     id: "piece-name",                 // short, lowercase, hyphens; used in the link
     name: "Piece Name",
     price: "",                        // e.g. "$320". Leave "" to show "Price on request"
     status: "available",              // "available", "reserved" or "sold"
     size: "",                         // e.g. "Fits 30–32 waist"
     photos: ["piece-name-01.webp", "piece-name-02.webp"],
     description: `A few sentences about the piece.

     A blank line starts a new paragraph.`,
     details: ["Reworked from ...", "Hand distressed"],   // short lines
     measurements: [],                 // e.g. ["Waist 32 in", "Inseam 31 in"]
     buyLink: ""                       // a Stripe payment link, once set up. Leave "" to have
                                       // the button email you about the piece instead.
   },

   When a piece sells, change its status to "sold". It moves to
   the "Sold" section at the bottom of the shop.
   ========================================================= */
window.CATALOG = [
  {
    id: "distressed-denim-jeans",
    name: "Distressed Denim Jeans",
    price: "",
    status: "available",
    size: "",
    photos: ["distressed-denim-jeans-01.webp", "distressed-denim-jeans-02.webp", "distressed-denim-jeans-03.webp", "distressed-denim-jeans-04.webp"],
    description: `One of one. Wide-leg denim reworked by hand, with heavy shredding across the front and down the side panels.`,
    details: ["Reworked from used denim", "Hand distressed", "Two waistbands layered at the top"],
    measurements: [],
    buyLink: ""
  },
  {
    id: "reworked-denim",
    name: "Reworked Denim",
    price: "",
    status: "available",
    size: "",
    photos: ["reworked-denim-01.webp", "reworked-denim-02.webp", "reworked-denim-03.webp", "reworked-denim-04.webp"],
    description: `One of one. Wide-leg jeans rebuilt with panels, pockets and patches cut from other pairs.`,
    details: ["Reworked from used denim", "Added cargo pocket", "Contrast side panels and cuffs"],
    measurements: [],
    buyLink: ""
  },
  {
    id: "reworked-denim-phase-01",
    name: "Reworked Denim (Phase 01/02)",
    price: "",
    status: "available",
    size: "",
    photos: ["reworked-denim-phase-01-01.webp", "reworked-denim-phase-01-02.webp", "reworked-denim-phase-01-03.webp"],
    description: `One of one. Wide-leg jeans opened up with darker denim panels set into the sides.`,
    details: ["Reworked from used denim", "Inset side panels", "Studded back pockets"],
    measurements: [],
    buyLink: ""
  },
  {
    id: "denim-patchwork-vest",
    name: "Denim Patchwork Vest",
    price: "",
    status: "available",
    size: "",
    photos: ["denim-patchwork-vest-01.webp", "denim-patchwork-vest-02.webp", "denim-patchwork-vest-03.webp", "denim-patchwork-vest-04.webp"],
    description: `One of one. A cropped vest pieced together from pockets, flies and waistbands of old jeans, finished with vintage patches.`,
    details: ["Reworked from used denim", "Zigzag stitched raw edges", "Vintage patches"],
    measurements: [],
    buyLink: ""
  }
];
