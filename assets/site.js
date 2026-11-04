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

  // Menu (three dots, top right). "ready: false" shows a
  // "coming soon" note instead of a broken link.
  menu: [
    { label: "Home",               link: "index.html",          ready: true },
    { label: "Shop",               link: "shop.html",           ready: false },
    { label: "Commissions",        link: "commissions.html",    ready: true },
    { label: "Portfolio",          link: "portfolio.html",      ready: true },
    { label: "Fashion Works",      link: "fashion-works.html",  ready: true },
    { label: "Conceptual Art",     link: "conceptual-art.html", ready: true },
    { label: "Photography",        link: "photography.html",    ready: true },
    { label: "About / Contact",    link: "about.html",          ready: true }
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
  S.menu.forEach(item => {
    const a = document.createElement("a");
    a.href = item.link;
    a.textContent = item.label;
    if (item.link === here) a.setAttribute("aria-current", "page");
    if (!item.ready) a.dataset.soon = "1";
    menu.appendChild(a);
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
