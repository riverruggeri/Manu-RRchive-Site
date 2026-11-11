/* =========================================================
   SITE-WIDE SETTINGS — used by every page.
   Change the menu or contact details here once and every
   page updates.
   ========================================================= */
window.SITE = {
  name: "Manu Clothing",

  // Logo in the top-left corner of every page.
  // Clicking it goes back to the homepage.
  logo: "images/rrchive-logo.png",

  contact: {
    email: "riverruggeri@gmail.com",
    phone: "+1 (541)-674-9866",
    instagram: "rr.archive.rr"
  },

  // Menu (three dots, top right). An item with "items" opens
  // into a dropdown. "ready: false" shows a "coming soon" note
  // instead of a broken link.
  menu: [
    { label: "Home", link: "index.html" },
    { label: "Shop", items: [
      { label: "Start A Commission", link: "commissions.html", also: ["start-commission.html"] },
      { label: "Current Catalog",    link: "shop.html",        also: ["product.html"] }
    ]},
    { label: "Portfolio", items: [
      { label: "Fashion Works",  link: "fashion-works.html" },
      { label: "Conceptual Art", link: "conceptual-art.html" },
      { label: "Photography",    link: "photography.html" }
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

  const here = location.pathname.split("/").pop() || "index.html";
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

  // Home logo, top left
  const onHome = here === "index.html";
  const home = document.createElement(onHome ? "span" : "a");
  home.className = "home-logo";
  if (onHome) {
    home.innerHTML = `<img src="${S.logo}" alt="RRchive">`;
  } else {
    home.href = "index.html";
    home.setAttribute("aria-label", "RRchive, back to home");
    home.innerHTML = `<img src="${S.logo}" alt="">`;
  }

  function mount() {
    if (!document.body.hasAttribute("data-no-menu")) document.body.append(btn, menu);
    if (S.logo) document.body.append(home);
    document.body.append(toast);
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
