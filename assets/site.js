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
    grain: true,     // fine film grain over the whole site
    reveal: true,    // text appears line by line as it scrolls into view
    float: true,     // ЯRchive cut-outs drift at their own speed as you scroll
    drift: true,     // big words that slide sideways as you scroll
    tilt: true       // Portfolio cut-outs follow the mouse a little
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
