/* =========================================================
   CONCEPTUAL ART PROJECTS
   Used by conceptual-art.html (the list) and conceptual-project.html
   (each project's own page, opened by "About the piece →").

   TO ADD A NEW PROJECT: copy a block, paste it where you want it in
   the list (top = first), and fill it in.
     id:       short, lowercase, hyphens; used in the page link
     title:    the project's name
     photos:   files in images/conceptual-art/ (first = the big one)
     overview: your write-up. A blank line starts a new paragraph.
   ========================================================= */
window.PROJECTS = [
  {
    id: "long-pants",
    year: "2026",                    // guess, change if needed
    title: "Long Pants",
    medium: "Conceptual Art",
    photos: ["trailing-denim-01.jpg", "trailing-denim-02.jpg", "trailing-denim-03.jpg"],
    details: ["2026", "Conceptual Art", "Reworked denim"],
    // River's words (2026-11-22), lightly tidied
    overview: `I wanted a pair of jeans that you couldn't really walk away from.

It's made piece by piece, to show how things add up over time. It drags, it keeps growing, and it just gets heavier.`
  },
  {
    id: "denim-life-jacket",
    year: "2026",                    // guess, change if needed
    title: "Denim Life Jacket",
    medium: "Conceptual Art",
    photos: [
      "layered-denim-01.jpg", "layered-denim-02.jpg", "layered-denim-03.jpg", "layered-denim-04.jpg",
      "layered-denim-05.jpg", "layered-denim-06.jpg", "layered-denim-07.jpg", "layered-denim-08.jpg"
    ],
    details: ["2026", "Conceptual Art", "Layered denim"],
    // River's words (2026-11-22), lightly tidied
    overview: `This piece came from the idea of all the layers of protection you put around the parts of yourself you want to suppress and keep hidden, almost like an onion.

The way I saw it, the life jacket keeps you floating at the top of your consciousness, unable to dive deeper and truly learn. It's only after you take off all the layers of protection that you can take off the vest.`
  }
];
