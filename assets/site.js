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
      // (smaller copies in images/slides/ so they load and fade smoothly on phones),
      // and on the big slideshow at the top of the ЯRchive home. Both
      // share their place: the photo showing on Manu is the one ЯRchive
      // opens on. "wide" for computers, "tall" for phones.
      slides: {
        wide: [
          "images/slides/fashion-works-denim-patchwork-vest-01.jpg",
          "images/slides/fashion-works-distressed-denim-jeans-03.jpg",
          "images/slides/fashion-works-reworked-denim-phase-01-04.jpg",
          "images/slides/fashion-works-denim-patchwork-vest-03.jpg",
          "images/slides/fashion-works-reworked-denim-phase-01-03.jpg",
          "images/slides/fashion-works-distressed-denim-jeans-01.jpg"
        ],
        tall: [
          "images/slides/fashion-works-reworked-denim-phase-01-01.jpg",
          "images/slides/fashion-works-distressed-denim-jeans-02.jpg",
          "images/slides/fashion-works-denim-patchwork-vest-02.jpg",
          "images/slides/fashion-works-reworked-denim-01.jpg",
          "images/slides/fashion-works-reworked-denim-phase-01-02.jpg",
          "images/slides/fashion-works-denim-patchwork-vest-04.jpg",
          "images/slides/fashion-works-reworked-denim-03.jpg",
          "images/slides/fashion-works-distressed-denim-jeans-04.jpg"
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
          "images/slides/photography-drag-me-down-02.jpg",
          "images/slides/photography-riding-back-01.jpg",
          "images/slides/photography-fashion-photography-01.jpg",
          "images/slides/photography-blending-with-nature-01.jpg",
          "images/slides/photography-flash-studio-02.jpg",
          "images/slides/photography-drag-me-down-06.jpg",
          "images/slides/photography-riding-back-03.jpg",
          "images/slides/photography-fashion-photography-04.jpg"
        ],
        tall: [
          "images/slides/photography-drag-me-down-01.jpg",
          "images/slides/photography-drag-me-down-03.jpg",
          "images/slides/photography-blending-with-nature-02.jpg",
          "images/slides/photography-fashion-studio-01.jpg",
          "images/slides/photography-drag-me-down-05.jpg",
          "images/slides/photography-riding-back-07.jpg",
          "images/slides/photography-scanner-01.jpg",
          "images/slides/photography-fashion-photography-03.jpg"
        ]
      }
    }
  },

  // Moving effects (River, 2026-11-11 night, inspired by a scroll video).
  // Set any of these to false to switch that effect off on every page.
  effects: {
    grain: false,    // fine film grain (River switched off, 2026-11-11)
    reveal: true,    // text appears line by line as it scrolls into view
    float: true,     // ЯRchive cut-outs drift at their own speed as you scroll
    drift: true,     // big words that slide sideways as you scroll (ЯRchive)
    tilt: true,      // Portfolio cut-outs follow the mouse a little
    // Trying out (River, 2026-11-11 night): switch any to false to remove it
    cards3d: true,   // 1. photos tilt toward the mouse in 3D (glare removed, River 2026-11-12)
    magnetic: false, // 5. buttons lean toward the mouse (River switched off, 2026-11-12)
    smooth: true,    // 12. smooth, gliding scrolling with the mouse wheel
    stitch: true,    // 14. dividing lines are dashed stitches that sew themselves in, slowly
    denimText: true, // 15. some big titles are filled with plain denim that shifts as you scroll
    // Tried and switched off by River (2026-11-12); true brings one back
    depth: false,    // 2. River's photo as layers that move apart
    cursor: false,   // 6. custom round cursor
    fabric: false,   // 8. photos ripple like fabric under the mouse
    pushText: false, // 9. letters pushed by the mouse
    zoomOpen: false, // 10. homepage photo that grows to fill the screen (idea liked, not this version)
    pin: false,      // 11. "What I make" pinned while the mediums swap (idea liked, not this version)
    morph: false     // 13. clicked photo grows to fill the screen before the next page
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
    `<img src="${esc2(src)}" alt="" draggable="false">`).join("");
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


/* =========================================================
   MOVING EFFECTS (switches in SITE.effects above)
   ========================================================= */
(function () {
  const FX = SITE.effects || {};
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hover = matchMedia("(hover: hover)").matches;

  // ---------- Film grain ----------
  // Sits on the page backgrounds only, so it never covers photos.
  // A page whose body has data-grain-photo also gets moving grain over
  // its big background photo (the Manu homepage).
  function grain() {
    const c = document.createElement("canvas"); c.width = c.height = 180;
    const g = c.getContext("2d"), d = g.createImageData(180, 180);
    for (let i = 0; i < d.data.length; i += 4) {
      const v = Math.random() < 0.5 ? 0 : 255;
      d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = Math.random() * 26;
    }
    g.putImageData(d, 0, 0);
    const url = `url(${c.toDataURL()})`;
    document.documentElement.style.setProperty("--grain", url);
    if (document.body.hasAttribute("data-grain-photo")) {
      const el = document.createElement("div");
      el.className = "fx-grain"; el.setAttribute("aria-hidden", "true");
      el.style.backgroundImage = url;
      document.body.appendChild(el);
    }
  }

  // ---------- Text that appears line by line ----------
  // Any element with data-reveal (pages add it to their text).
  function split(el) {
    const words = [];
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const parts = n.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach(t => {
            if (!t) return;
            if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(t)); return; }
            const w = document.createElement("span"); w.className = "w"; w.textContent = t;
            frag.appendChild(w); words.push(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) {
          const inline = getComputedStyle(n).display.startsWith("inline");
          if (inline && !n.querySelector("p, div, br")) { n.classList.add("w"); words.push(n); }
          else walk(n);
        }
      });
    };
    walk(el);
    return words;
  }
  function measure(el) {
    let line = -1, last = -1e9;
    el._words.forEach(w => {
      const top = w.getBoundingClientRect().top;
      if (top > last + 4) { line++; last = top; }
      w.style.setProperty("--d", Math.min(line, 14) * 0.09 + "s");
    });
  }
  function reveal() {
    const els = [...document.querySelectorAll("[data-reveal]")].filter(el => !el._words);
    if (!els.length) return;
    const io = new IntersectionObserver(list => list.forEach(e => {
      if (!e.isIntersecting) return;
      measure(e.target); e.target.classList.add("fx-in"); io.unobserve(e.target);
    }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    els.forEach(el => { el._words = split(el); el.classList.add("fx-reveal"); io.observe(el); });
  }
  window.fxReveal = reveal;   // pages that add text later can call this again

  // ---------- Scroll-driven movement: floating cut-outs and sliding words ----------
  let floats = [], drifts = [], ticking = false;
  function collect() {
    floats = FX.float ? [...document.querySelectorAll("[data-float]")] : [];
    drifts = FX.drift ? [...document.querySelectorAll("[data-drift]")] : [];
  }
  function frame() {
    ticking = false;
    const vh = innerHeight;
    floats.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      const off = (r.top + r.height / 2 - vh / 2) / vh;          // -1 … 1 across the screen
      const amount = parseFloat(el.dataset.float) || 26;
      el.style.translate = `0 ${(-off * amount).toFixed(1)}px`;
    });
    drifts.forEach(el => {
      const r = el.parentElement.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const p = (vh - r.top) / (vh + r.height);                  // 0 as it comes in, 1 as it leaves
      const speed = parseFloat(el.dataset.drift) || 30;
      el.style.translate = `${(-(p - 0.5) * speed).toFixed(2)}% 0`;
    });
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  window.fxRefresh = () => { collect(); frame(); };

  // ---------- Portfolio cut-outs follow the mouse ----------
  function tilt() {
    const els = [...document.querySelectorAll("[data-tilt]")];
    if (!els.length || !hover) return;
    let mx = 0, my = 0, raf = 0;
    addEventListener("mousemove", e => {
      mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        els.forEach(el => {
          const depth = parseFloat(el.dataset.tilt) || 14;
          el.style.translate = `${(mx * depth).toFixed(1)}px ${(my * depth).toFixed(1)}px`;
        });
      });
    }, { passive: true });
  }

  function start() {
    if (FX.grain) grain();
    if (still) return;
    if (FX.reveal) { reveal(); if (document.fonts) document.fonts.ready.then(() => {}); }
    collect(); frame();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    if (FX.tilt) tilt();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();

/* =========================================================
   MORE MOVING EFFECTS (River, 2026-11-11 night) — each has its
   switch in SITE.effects at the top of this file.
   ========================================================= */
(function () {
  const FX = SITE.effects || {};
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const hover = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $$ = sel => [...document.querySelectorAll(sel)];
  let mx = innerWidth / 2, my = innerHeight / 2;
  addEventListener("pointermove", e => { mx = e.clientX; my = e.clientY; }, { passive: true });

  // ---------- 1. 3D tilt cards ----------
  function cards3d() {
    if (!hover) return;
    $$(".medium .pic, .piece .pic").forEach(el => {
      el.classList.add("fx-card");
      const glare = false;   // the shine made photos look blurry (River, 2026-11-12)
      let g;
      if (glare) { g = document.createElement("span"); g.className = "fx-glare"; el.appendChild(g); }
      el.addEventListener("pointermove", e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.transform = `perspective(900px) rotateX(${((0.5 - y) * 10).toFixed(2)}deg) rotateY(${((x - 0.5) * 12).toFixed(2)}deg) scale(1.02)`;
        if (g) { g.style.setProperty("--gx", x * 100 + "%"); g.style.setProperty("--gy", y * 100 + "%"); g.style.opacity = 1; }
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; if (g) g.style.opacity = 0; });
    });
  }

  // ---------- 2. Layered photo (data-depth: .depth-back + .depth-front) ----------
  function depth() {
    const els = $$("[data-depth]");
    if (!els.length) return;
    const frame = () => {
      const vh = innerHeight;
      els.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const sc = (r.top + r.height / 2 - vh / 2) / vh;           // scroll position
        const px = hover ? mx / innerWidth - 0.5 : 0, py = hover ? my / innerHeight - 0.5 : 0;
        const f = el.querySelector(".depth-front"), b = el.querySelector(".depth-back");
        if (f) f.style.transform = `translate3d(${(-px * 22).toFixed(1)}px, ${(-py * 14 - sc * 46).toFixed(1)}px, 0) scale(1.04)`;
        if (b) b.style.transform = `translate3d(${(px * 12).toFixed(1)}px, ${(py * 8 + sc * 18).toFixed(1)}px, 0) scale(1.1)`;
      });
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  // ---------- 6. Custom cursor ----------
  function cursor() {
    if (!hover) return;
    const c = document.createElement("div");
    c.className = "fx-cursor"; c.innerHTML = "<span></span>";
    document.body.appendChild(c);
    document.documentElement.classList.add("fx-cursor-on");
    let x = mx, y = my;
    const label = c.firstChild;
    const loop = () => {
      x += (mx - x) * 0.22; y += (my - y) * 0.22;
      c.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      requestAnimationFrame(loop);
    };
    loop();
    addEventListener("pointerover", e => {
      const t = e.target;
      const pic = t.closest(".pic, .piece, [data-cursor], .hero-track, .label-link, .icon, figure");
      const link = t.closest("a, button, summary, [role=button]");
      c.classList.toggle("big", !!pic);
      c.classList.toggle("link", !pic && !!link);
      label.textContent = pic ? (pic.dataset.cursor || (t.closest(".hero-track") ? "Next" : "View")) : "";
    });
    document.addEventListener("mouseleave", () => c.style.opacity = 0);
    document.addEventListener("mouseenter", () => c.style.opacity = "");
  }

  // ---------- 8. Fabric ripple on hover ----------
  function fabric() {
    if (!hover) return;
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("width", 0); svg.setAttribute("height", 0); svg.setAttribute("aria-hidden", "true");
    svg.style.position = "absolute";
    svg.innerHTML = `<filter id="fx-fabric" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.006 0.018" numOctaves="2" seed="4" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter>`;
    document.body.appendChild(svg);
    const turb = svg.querySelector("feTurbulence"), disp = svg.querySelector("feDisplacementMap");
    let on = null, amount = 0, t = 0, raf = 0;
    const loop = () => {
      amount += ((on ? 16 : 0) - amount) * 0.08;
      t += 0.012;
      turb.setAttribute("baseFrequency", `${(0.006 + Math.sin(t) * 0.0015).toFixed(4)} ${(0.018 + Math.cos(t * 0.8) * 0.004).toFixed(4)}`);
      disp.setAttribute("scale", amount.toFixed(2));
      if (!on && amount < 0.2) { $$(".fx-fabric").forEach(el => el.classList.remove("fx-fabric")); raf = 0; return; }
      raf = requestAnimationFrame(loop);
    };
    $$(".medium .pic, .piece .pic").forEach(el => {
      el.addEventListener("pointerenter", () => {
        $$(".fx-fabric").forEach(x => x.classList.remove("fx-fabric"));
        el.classList.add("fx-fabric"); on = el;
        if (!raf) raf = requestAnimationFrame(loop);
      });
      el.addEventListener("pointerleave", () => { if (on === el) on = null; });
    });
  }

  // ---------- 9. Letters pushed by the mouse (data-push) ----------
  function pushText() {
    if (!hover) return;
    const letters = [];
    $$("[data-push]").forEach(el => {
      const walk = node => [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          [...n.textContent].forEach(ch => {
            if (/\s/.test(ch)) { frag.appendChild(document.createTextNode(ch)); return; }
            const sp = document.createElement("span"); sp.className = "fx-l"; sp.textContent = ch;
            frag.appendChild(sp); letters.push(sp);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) {
          if (n.classList.contains("flip-r")) { n.classList.add("fx-l"); letters.push(n); }
          else walk(n);
        }
      });
      walk(el);
    });
    if (!letters.length) return;
    const R = 220;
    const loop = () => {
      letters.forEach(l => {
        const r = l.getBoundingClientRect();
        if (r.bottom < -50 || r.top > innerHeight + 50) return;
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = cx - mx, dy = cy - my, d = Math.hypot(dx, dy);
        const k = d < R ? Math.pow(1 - d / R, 2) : 0;
        const base = l.classList.contains("flip-r") ? "scaleX(-1) " : "";
        l.style.transform = base + (k ? `translate(${(dx / (d || 1) * k * 26).toFixed(1)}px, ${(dy / (d || 1) * k * 26).toFixed(1)}px) rotate(${(dx / (d || 1) * k * 6).toFixed(1)}deg)` : "");
      });
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  // ---------- 10. Photo that zooms open (data-zoom section) ----------
  function zoomOpen() {
    const els = $$("[data-zoom]");
    if (!els.length) return;
    const loop = () => {
      els.forEach(el => {
        const r = el.getBoundingClientRect(), vh = innerHeight;
        if (r.bottom < 0 || r.top > vh) return;
        const p = Math.min(1, Math.max(0, -r.top / (r.height - vh)));
        const e = p < 0.85 ? p / 0.85 : 1;
        const k = 1 - Math.pow(1 - e, 3);
        el.style.setProperty("--zoom", k.toFixed(4));
      });
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  // ---------- 11. Pinned section (data-pin): children swap as you scroll ----------
  function pin() {
    const els = $$("[data-pin]");
    if (!els.length) return;
    const wide = matchMedia("(min-width: 901px)");
    const apply = () => els.forEach(el => el.classList.toggle("pinned", wide.matches));
    apply(); wide.addEventListener("change", apply);
    const loop = () => {
      els.forEach(el => {
        if (!el.classList.contains("pinned")) return;
        const items = [...el.querySelectorAll(el.dataset.pin)];
        const r = el.getBoundingClientRect(), vh = innerHeight;
        const p = Math.min(0.999, Math.max(0, -r.top / (r.height - vh)));
        const i = Math.floor(p * items.length);
        items.forEach((x, j) => { x.classList.toggle("active", j === i); x.classList.toggle("past", j < i); });
        el.style.setProperty("--pin", p.toFixed(4));
      });
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  // ---------- 12. Smooth scrolling with the mouse wheel ----------
  function smooth() {
    if (!hover) return;
    let target = scrollY, cur = scrollY, running = false;
    const max = () => document.documentElement.scrollHeight - innerHeight;
    const scrollsInside = (el, dy) => {
      for (; el && el !== document.body && el !== document.documentElement; el = el.parentElement) {
        const cs = getComputedStyle(el);
        if (/(auto|scroll)/.test(cs.overflowY) && el.scrollHeight > el.clientHeight + 1) {
          if ((dy > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1) || (dy < 0 && el.scrollTop > 0)) return true;
        }
      }
      return false;
    };
    addEventListener("wheel", e => {
      if (e.ctrlKey || e.defaultPrevented || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (getComputedStyle(document.body).overflowY === "hidden" || max() <= 0) return;
      if (scrollsInside(e.target, e.deltaY)) return;
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 32 : e.deltaMode === 2 ? innerHeight : 1;
      if (!running) { target = cur = scrollY; }
      target = Math.min(max(), Math.max(0, target + e.deltaY * unit));
      if (!running) { running = true; requestAnimationFrame(step); }
    }, { passive: false });
    function step() {
      cur += (target - cur) * 0.085;
      if (Math.abs(target - cur) < 0.5) { cur = target; running = false; }
      scrollTo(0, cur);
      if (running) requestAnimationFrame(step);
    }
  }

  // ---------- 13. Clicked photo grows to fill the screen before the next page ----------
  function morph() {
    document.addEventListener("click", e => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest("a[href]");
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      const box = a.getBoundingClientRect();
      // the photo actually showing inside the link
      const img = [...a.querySelectorAll("img")].find(im => {
        const r = im.getBoundingClientRect();
        return r.width > 40 && r.left < box.right - 5 && r.right > box.left + 5 && getComputedStyle(im).opacity > 0.5;
      });
      if (!img) return;
      e.preventDefault();
      const r = img.getBoundingClientRect();
      const clone = new Image();
      clone.src = img.currentSrc || img.src;
      clone.className = "fx-morph";
      clone.style.objectFit = getComputedStyle(img).objectFit || "cover";
      Object.assign(clone.style, { left: r.left + "px", top: r.top + "px", width: r.width + "px", height: r.height + "px" });
      document.documentElement.appendChild(clone);
      document.documentElement.classList.add("fx-morphing");
      requestAnimationFrame(() => requestAnimationFrame(() => {
        Object.assign(clone.style, { left: "0px", top: "0px", width: innerWidth + "px", height: innerHeight + "px" });
      }));
      setTimeout(() => { location.href = url.href; }, 720);
    }, true);
    addEventListener("pageshow", () => {
      document.documentElement.classList.remove("fx-morphing");
      $$(".fx-morph").forEach(x => x.remove());
    });
  }

  // ---------- 5. Magnetic buttons ----------
  function magnetic() {
    if (!hover) return;
    const els = $$(".pill, .start, .work, .buy, .send, .hero-down, .scroll-cue, .to-manu");
    els.forEach(el => el.classList.add("fx-magnet"));
    addEventListener("pointermove", e => {
      els.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = e.clientX - cx, dy = e.clientY - cy;
        const reach = Math.max(r.width, r.height) / 2 + 60;
        const d = Math.hypot(dx, dy);
        el.style.translate = d < reach ? `${(dx * 0.3).toFixed(1)}px ${(dy * 0.35).toFixed(1)}px` : "";
      });
    }, { passive: true });
  }

  // ---------- 14. Stitched dividing lines ----------
  // Sewn one stitch at a time; starts once the line is well onto the screen.
  function stitch() {
    const top = $$(".labels, .medium, .big-links a, .to-archive");
    const bottom = $$(".catalog-head, .rail-head, .big-links a:last-child, .section-title");
    top.forEach(el => el.classList.add("fx-stitch"));
    bottom.forEach(el => el.classList.add("fx-stitch-b"));
    const size = () => top.concat(bottom).forEach(el => {
      const n = Math.max(4, Math.round(el.offsetWidth / 12));     // one step per stitch (12px)
      el.style.setProperty("--st-n", n);
      el.style.setProperty("--st-dur", Math.min(7, Math.max(2, n * 0.08)).toFixed(2) + "s");
    });
    size(); addEventListener("resize", size);
    const io = new IntersectionObserver(list => list.forEach(e => {
      if (e.isIntersecting) { const t = e.target; io.unobserve(t); setTimeout(() => t.classList.add("fx-sewn"), 450); }
    }), { threshold: 0, rootMargin: "0px 0px -28% 0px" });
    top.concat(bottom).forEach(el => io.observe(el));
  }

  // ---------- 15. Denim-filled titles (data-denim) ----------
  function denimText() {
    const els = $$("[data-denim]");
    els.forEach(el => el.classList.add("fx-denim"));
    if (!els.length) return;
    const loop = () => {
      els.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        el.style.setProperty("--denim-y", (r.top * -0.35).toFixed(1) + "px");
        el.style.setProperty("--denim-x", (r.top * 0.12).toFixed(1) + "px");
      });
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  function start() {
    const run = (k, f) => { if (FX[k]) try { f(); } catch (err) { console.warn(k, err); } };
    run("cards3d", cards3d); run("depth", depth); run("cursor", cursor); run("fabric", fabric);
    run("pushText", pushText); run("zoomOpen", zoomOpen); run("pin", pin); run("smooth", smooth);
    run("morph", morph); run("stitch", stitch); run("denimText", denimText); run("magnetic", magnetic);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
