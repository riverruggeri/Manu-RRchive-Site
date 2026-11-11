/* =========================================================
   SITE-WIDE SETTINGS — used by every page.
   Change the menu or contact details here once and every
   page updates.
   ========================================================= */
window.SITE = {
  // The site has parts:
  //   MANU     - River as an artist: home, portfolio, about
  //   labels   - each medium with its own name, header and commissions:
  //              ЯRchive (clothing) and ЯRgraphy (photography).
  // A future label (jewelry, say) is one more entry in "labels" and one more
  // doorway on the Manu homepage. A leading "Я" is drawn as a flipped R.
  manu: { name: "Manu", home: "index.html" },
  labels: {
    rrchive: {
      name: "ЯRchive",
      logo: "images/rrchive-logo.png",   // image logo; leave out to draw the name as text
      home: "shop.html",                 // the label's home screen
      // From the home screen the logo opens this; from every other page of
      // the label it goes back to the home screen.
      logoLinkFromHome: "archive.html",
      pages: ["shop.html", "product.html", "archive.html", "commissions.html", "start-commission.html"],
      tabs: [
        { label: "Current Catalog",      link: "shop.html", also: ["product.html"] },
        { label: "Archive",              link: "archive.html" },
        { label: "Commissions",          link: "commissions.html", also: ["start-commission.html"] },
        { label: "Experimental Fashion", link: "fashion-works.html", away: true }
      ],
      // Photos that slide by on the Manu homepage while you hover ЯRchive,
      // and on the big slideshow at the top of the ЯRchive home. Both
      // share their place: the photo showing on Manu is the one ЯRchive
      // opens on. "wide" for computers, "tall" for phones.
      slides: {
        wide: [
          "images/fashion-works/denim-patchwork-vest-01.jpg",
          "images/fashion-works/distressed-denim-jeans-03.jpg",
          "images/fashion-works/reworked-denim-phase-01-04.jpg",
          "images/fashion-works/denim-patchwork-vest-03.jpg",
          "images/fashion-works/reworked-denim-phase-01-03.jpg",
          "images/fashion-works/distressed-denim-jeans-01.jpg"
        ],
        tall: [
          "images/fashion-works/reworked-denim-phase-01-01.jpg",
          "images/fashion-works/distressed-denim-jeans-02.jpg",
          "images/fashion-works/denim-patchwork-vest-02.jpg",
          "images/fashion-works/reworked-denim-01.jpg",
          "images/fashion-works/reworked-denim-phase-01-02.jpg",
          "images/fashion-works/denim-patchwork-vest-04.jpg",
          "images/fashion-works/reworked-denim-03.jpg",
          "images/fashion-works/distressed-denim-jeans-04.jpg"
        ]
      }
    },
    rrgraphy: {
      name: "ЯRgraphy",
      home: "rrgraphy.html",
      logoLinkFromHome: "photography.html",
      pages: ["rrgraphy.html", "photography.html", "photo-commissions.html", "start-commission.html?type=photo"],
      tabs: [
        { label: "Home",        link: "rrgraphy.html" },
        { label: "Photography", link: "photography.html" },
        { label: "Commissions", link: "photo-commissions.html", also: ["start-commission.html?type=photo"] }
      ],
      // Photos that slide by on the Manu homepage while you hover ЯRgraphy.
      slides: {
        wide: [
          "images/photography/drag-me-down-02.jpg",
          "images/photography/riding-back-01.jpg",
          "images/photography/fashion-photography-01.jpg",
          "images/photography/blending-with-nature-01.jpg",
          "images/photography/flash-studio-02.jpg",
          "images/photography/drag-me-down-06.jpg",
          "images/photography/riding-back-03.jpg",
          "images/photography/fashion-photography-04.jpg"
        ],
        tall: [
          "images/photography/drag-me-down-01.jpg",
          "images/photography/drag-me-down-03.jpg",
          "images/photography/blending-with-nature-02.jpg",
          "images/photography/fashion-studio-01.jpg",
          "images/photography/drag-me-down-05.jpg",
          "images/photography/riding-back-07.jpg",
          "images/photography/scanner-01.jpg",
          "images/photography/fashion-photography-03.jpg"
        ]
      }
    }
  },

  contact: {
    email: "riverruggeri@gmail.com",
    phone: "",                     // leave "" to keep the phone number off the site
    instagram: "rrchive.manu"
  },

  // Menu (three dots, top right). An item with "items" opens
  // into a dropdown. "ready: false" shows a "coming soon" note
  // instead of a broken link.
  menu: [
    { label: "Manu", link: "index.html" },
    { label: "ЯRchive", items: [
      { label: "Current Catalog", link: "shop.html",        also: ["product.html"] },
      { label: "Archive",         link: "archive.html" },
      { label: "Commissions",     link: "commissions.html", also: ["start-commission.html"] }
    ]},
    { label: "ЯRgraphy", items: [
      { label: "Home",        link: "rrgraphy.html" },
      { label: "Photography", link: "photography.html" },
      { label: "Commissions", link: "photo-commissions.html", also: ["start-commission.html?type=photo"] }
    ]},
    { label: "Portfolio", items: [
      { label: "Overview",             link: "portfolio.html" },
      { label: "Experimental Fashion", link: "fashion-works.html" },
      { label: "Conceptual Art",       link: "conceptual-art.html" }
    ]},
    { label: "About / Contact", link: "about.html" }
  ]
};

/* ---------- Shared behaviour (no need to edit below) ---------- */
(function () {
  const S = window.SITE;
  window.esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Toast: a small note at the bottom of the screen.
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.hidden = true;
  let toastTimer;
  window.showToast = function (msg) {
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 2000);
  };

  // Menu button and list
  const btn = document.createElement("button");
  btn.className = "menu-btn";
  btn.setAttribute("aria-label", "Open menu");
  btn.setAttribute("aria-expanded", "false");
  btn.innerHTML = "<span></span><span></span><span></span>";
  const menu = document.createElement("nav");
  menu.className = "menu";
  menu.id = "site-menu";
  menu.hidden = true;
  btn.setAttribute("aria-controls", "site-menu");

  const page = location.pathname.split("/").pop() || "index.html";
  // The form page belongs to ЯRchive for clothing and to Manu for photography.
  const photoForm = page === "start-commission.html" && /type=photo/.test(location.search);
  const here = photoForm ? "start-commission.html?type=photo" : page;
  const section = Object.keys(S.labels).find(k => S.labels[k].pages.includes(here)) || "manu";
  const L = S.labels[section];   // the label this page belongs to, if any
  document.documentElement.dataset.section = section;
  // ЯRgraphy pages are dark grey: tint the phone's browser bar to match.
  if (section === "rrgraphy") {
    const tc = document.querySelector('meta[name="theme-color"]');
    if (tc) tc.content = "#4c4c4c";
  }
  // Draw a leading "Я" as a flipped R, the way the brand writes it.
  window.brandHTML = s => esc(s).replace(/Я/g, '<span class="flip-r">R</span>');
  const isHere = item => item.link === here || (item.also || []).includes(here);
  function link(item, parent) {
    const a = document.createElement("a");
    a.href = item.link;
    a.innerHTML = brandHTML(item.label);
    if (isHere(item)) a.setAttribute("aria-current", "page");
    if (item.ready === false) a.dataset.soon = "1";
    parent.appendChild(a);
  }
  S.menu.forEach((item, i) => {
    if (!item.items) { link(item, menu); return; }
    // Dropdown: a button that opens the links under it. The one holding
    // the current page starts open.
    const open = item.items.some(isHere);
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "menu-group";
    toggle.innerHTML = `<span>${brandHTML(item.label)}</span>`;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-controls", "menu-sub-" + i);
    const sub = document.createElement("div");
    sub.className = "menu-sub";
    sub.id = "menu-sub-" + i;
    sub.hidden = !open;
    item.items.forEach(child => link(child, sub));
    toggle.addEventListener("click", e => {
      e.stopPropagation();
      const now = sub.hidden;
      sub.hidden = !now;
      toggle.setAttribute("aria-expanded", String(now));
    });
    menu.append(toggle, sub);
  });

  function setOpen(open) {
    menu.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
  }
  btn.addEventListener("click", e => { e.stopPropagation(); setOpen(menu.hidden); });
  document.addEventListener("click", e => {
    if (!menu.hidden && !menu.contains(e.target)) setOpen(false);
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") setOpen(false); });

  // Any link marked "coming soon" shows a note instead.
  document.addEventListener("click", e => {
    const a = e.target.closest("a[data-soon]");
    if (!a) return;
    e.preventDefault();
    window.showToast(`${(a.dataset.label || a.textContent).trim()} is coming soon`);
  });

  // Top of the page. Label pages (ЯRchive, ЯRgraphy): the label's name top
  // left (from its home screen it opens logoLinkFromHome, elsewhere it goes
  // to the home screen), MANU top right next to the dots, and the label's
  // tabs. Manu pages: MANU top left, which goes home (hidden on the homepage,
  // which has its own big MANU).
  const extras = [];
  if (L) {
    const logo = document.createElement("a");
    logo.className = "home-logo";
    const onHome = here === L.home;
    logo.href = onHome ? L.logoLinkFromHome : L.home;
    logo.setAttribute("aria-label", L.name + (onHome ? "" : ", home"));
    if (L.logo) {
      logo.innerHTML = `<span class="logo-mark" aria-hidden="true"></span>`;
      logo.style.setProperty("--logo", `url("${new URL(L.logo, location.href).href}")`);
    } else {
      logo.classList.add("text-logo");
      logo.innerHTML = `<span aria-hidden="true">${brandHTML(L.name)}</span>`;
    }
    const manu = document.createElement("a");
    manu.className = "to-manu";
    manu.href = S.manu.home;
    manu.textContent = "MANU";
    manu.setAttribute("aria-label", "Back to Manu");
    const tabs = document.createElement("nav");
    tabs.className = "rr-tabs";
    tabs.setAttribute("aria-label", L.name);
    L.tabs.forEach(t => {
      const a = document.createElement("a");
      a.href = t.link;
      a.textContent = t.label + (t.away ? " ↗" : "");
      if (isHere(t)) a.setAttribute("aria-current", "page");
      tabs.appendChild(a);
    });
    extras.push(logo, manu, tabs);
  } else if (page !== "index.html") {
    const word = document.createElement("a");
    word.className = "manu-word";
    word.href = S.manu.home;
    word.textContent = "Manu";
    word.setAttribute("aria-label", "Manu, home");
    extras.push(word);
  }

  // Bottom-right corner label: the name of the part of the site you're in.
  function cornerName() {
    document.querySelectorAll("[data-section-name]").forEach(a => {
      a.innerHTML = brandHTML(L ? L.name : S.manu.name);
      a.href = L ? L.home : S.manu.home;
    });
  }

  function mount() {
    if (!document.body.hasAttribute("data-no-menu")) document.body.append(btn, menu);
    document.body.append(...extras);
    document.body.append(toast);
    cornerName();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();

  // Smooth page changes: fade the page out before following a link
  // to another page on the site (the next page fades itself in).
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Browsers with built-in page cross-fades handle the change themselves.
  const nativeFade = "onpagereveal" in window;
  if (nativeFade) document.documentElement.classList.add("vt");
  document.addEventListener("click", e => {
    if (e.defaultPrevented || reduceMotion || nativeFade || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest("a[href]");
    if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || (url.pathname === location.pathname && url.hash)) return;
    e.preventDefault();
    document.documentElement.classList.add("leaving");
    setTimeout(() => { location.href = url.href; }, 320);
  });
  // Coming back with the browser's back button: show the page again.
  addEventListener("pageshow", () => document.documentElement.classList.remove("leaving"));

  // Live clock for any element with data-clock
  function tick() {
    const t = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit" });
    document.querySelectorAll("[data-clock]").forEach(el => { el.textContent = t; });
  }
  setInterval(tick, 1000);
  document.addEventListener("DOMContentLoaded", tick);
  tick();

  // Small helpers shared by pages
})();

/* =========================================================
   Sliding photos shared by the Manu homepage and the ЯRchive home.
   - slideShape(): "tall" on phones / narrow windows, else "wide".
   - slidePlace: remembers which photo each label's slideshow is on,
     so it carries on from there next time (and across pages).
   - makeSlider(track, photos, start, onChange): a row of photos that
     always slides the same way; after the last photo it carries on to
     the first instead of rushing back past them all.
   ========================================================= */
window.slideShape = () => (innerWidth / innerHeight < 1 ? "tall" : "wide");
window.slidePlace = {
  get(label, shape) {
    try { const v = parseInt(localStorage.getItem(`slide:${label}:${shape}`), 10); return isNaN(v) ? 0 : v; }
    catch (e) { return 0; }
  },
  set(label, shape, i) { try { localStorage.setItem(`slide:${label}:${shape}`, String(i)); } catch (e) {} }
};
window.makeSlider = (track, photos, start, onChange) => {
  const n = photos.length;
  const esc2 = window.esc || (x => x);
  // The first photo is repeated at the end so the last → first step slides forward.
  track.innerHTML = photos.concat(photos[0]).map((src, i) =>
    `<img src="${esc2(src)}" alt="" draggable="false"${i > 1 ? ' loading="lazy"' : ""}>`).join("");
  let at = ((start % n) + n) % n, busy = false;
  const place = (i, animate) => {
    track.style.transition = animate ? "" : "none";
    track.style.transform = `translateX(${-100 * i}%)`;
    if (!animate) void track.offsetWidth;   // apply the jump before the next move
  };
  const ms = () => (parseFloat(getComputedStyle(track).transitionDuration) || 0) * 1000;
  place(at, false);
  const api = {
    get at() { return at; },
    go(i) {
      if (busy || !n) return;
      if (i >= n) {                        // forward past the last photo
        busy = true; place(n, true);
        setTimeout(() => { place(0, false); busy = false; }, ms() + 30);
        at = 0;
      } else if (i < 0) {                  // backward past the first photo
        place(n, false); place(n - 1, true); at = n - 1;
      } else { place(i, true); at = i; }
      onChange && onChange(at);
    },
    next() { api.go(at + 1); },
    prev() { api.go(at - 1); },
    jump(i) { at = ((i % n) + n) % n; place(at, false); onChange && onChange(at); }
  };
  return api;
};

