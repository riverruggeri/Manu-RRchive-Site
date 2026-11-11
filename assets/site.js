/* =========================================================
   SITE-WIDE SETTINGS — used by every page.
   Change the menu or contact details here once and every
   page updates.
   ========================================================= */
window.SITE = {
  // The site has two parts:
  //   MANU    - River as an artist: home, portfolio, photography, about
  //   ЯRCHIVE - the clothing label: catalog, archive of sold pieces, commissions
  // A future label (jewelry, say) would be a new part like ЯRchive.
  manu: { name: "Manu", home: "index.html" },
  rrchive: {
    name: "ЯRchive",
    logo: "images/rrchive-logo.png",   // top left on ЯRchive pages
    home: "shop.html",                 // ЯRchive's home screen (the Current Catalog)
    // The logo opens the Archive from the home screen, and goes back to
    // the home screen from every other ЯRchive page.
    logoLinkFromHome: "archive.html",
    pages: ["shop.html", "product.html", "archive.html", "commissions.html", "start-commission.html"],
    // Tabs along the top of every ЯRchive page
    tabs: [
      { label: "Current Catalog",      link: "shop.html", also: ["product.html"] },
      { label: "Archive",              link: "archive.html" },
      { label: "Commissions",          link: "commissions.html", also: ["start-commission.html"] },
      { label: "Experimental Fashion", link: "fashion-works.html", away: true }
    ]
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
    { label: "Portfolio", items: [
      { label: "Overview",                link: "portfolio.html" },
      { label: "Experimental Fashion",    link: "fashion-works.html" },
      { label: "Conceptual Art",          link: "conceptual-art.html" },
      { label: "Photography",             link: "photography.html" },
      { label: "Photography Commissions", link: "photo-commissions.html", also: ["start-commission.html?type=photo"] }
    ]},
    { label: "About / Contact", link: "about.html" }
  ]
};

/* ---------- Shared behaviour (no need to edit below) ---------- */
(function () {
  const S = window.SITE;

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
  const section = (!photoForm && S.rrchive.pages.includes(page)) ? "rrchive" : "manu";
  document.documentElement.dataset.section = section;
  const isHere = item => item.link === here || (item.also || []).includes(here);
  function link(item, parent) {
    const a = document.createElement("a");
    a.href = item.link;
    a.textContent = item.label;
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
    toggle.textContent = item.label;
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

  // Top-left name. ЯRchive pages: the ЯRchive logo, which opens the Archive,
  // plus a MANU link top right back to the main site. Manu pages: MANU,
  // which goes home (hidden on the homepage, which has its own big MANU).
  const extras = [];
  if (section === "rrchive") {
    const logo = document.createElement("a");
    logo.className = "home-logo";
    const onRrHome = page === S.rrchive.home;
    logo.href = onRrHome ? S.rrchive.logoLinkFromHome : S.rrchive.home;
    logo.setAttribute("aria-label", onRrHome ? "ЯRchive: the Archive of past pieces" : "ЯRchive home");
    logo.innerHTML = `<span class="logo-mark" aria-hidden="true"></span>`;
    logo.style.setProperty("--logo", `url("${new URL(S.rrchive.logo, location.href).href}")`);
    const manu = document.createElement("a");
    manu.className = "to-manu";
    manu.href = S.manu.home;
    manu.textContent = "MANU";
    manu.setAttribute("aria-label", "Back to Manu");
    // Tabs for the ЯRchive pages
    const tabs = document.createElement("nav");
    tabs.className = "rr-tabs";
    tabs.setAttribute("aria-label", "ЯRchive");
    S.rrchive.tabs.forEach(t => {
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
    word.textContent = "MANU";
    word.setAttribute("aria-label", "Manu, home");
    extras.push(word);
  }

  // Bottom-right corner label: the name of the part of the site you're in.
  function cornerName() {
    document.querySelectorAll("[data-section-name]").forEach(a => {
      a.textContent = section === "rrchive" ? S.rrchive.name : S.manu.name;
      a.href = section === "rrchive" ? S.rrchive.home : S.manu.home;
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
  window.esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
})();
