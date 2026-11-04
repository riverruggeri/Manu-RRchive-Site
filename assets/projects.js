/* =========================================================
   PROJECT PAGES
   Builds a project page from the PAGE and PROJECTS settings
   at the top of photography.html, fashion-works.html and
   conceptual-art.html. Nothing here needs editing to add
   projects.
   ========================================================= */
(function () {
  const PAGE = window.PAGE || {};
  const PROJECTS = window.PROJECTS || [];
  const folder = PAGE.photoFolder ? PAGE.photoFolder.replace(/\/?$/, "/") : "";

  const pad = n => String(n).padStart(2, "0");
  // A photo can be written as just the file name ("IMG_1.jpg"), in which
  // case it is looked up in the page's photo folder, or as a full path.
  const src = name => (/^(images\/|https?:|\/)/.test(name) ? name : folder + name);
  const label = p => (p.title ? `“${esc(p.title)}”, ` : "") + esc(p.medium || "");

  document.title = "Manu " + (PAGE.title || "");
  const page = document.querySelector(".page");
  page.innerHTML = `<h1 class="page-title">${esc(PAGE.title || "")}</h1><main class="projects"></main>`;
  const list = page.querySelector(".projects");

  if (!PROJECTS.length) {
    list.outerHTML = `<p class="empty-page">${esc(PAGE.emptyText || "New work is on the way.")}</p>`;
  }

  const frames = [];

  function missingBox(name) {
    const d = document.createElement("div");
    d.className = "photo-missing";
    d.textContent = name ? `Photo to add: ${name.split("/").pop()}` : "Photos coming soon";
    return d;
  }

  PROJECTS.forEach((p, i) => {
    const photos = p.photos || [];
    const el = document.createElement("article");
    el.className = "project";
    el.innerHTML = `
      <div class="info">
        <span class="year sq">${esc(p.year || "")}</span>
        <span class="name">${label(p)}</span>
        <button class="more" data-i="${i}" aria-label="More about ${esc(p.title || p.medium || "this project")}">More <span aria-hidden="true">→</span></button>
      </div>
      <div class="show">
        <div class="frame"></div>
        ${photos.length > 1 ? `<button class="arrow prev" aria-label="Previous photo">‹</button><button class="arrow next" aria-label="Next photo">›</button>` : ""}
      </div>
      <div class="count"></div>`;
    list.appendChild(el);

    const frame = el.querySelector(".frame");
    const count = el.querySelector(".count");
    frames.push(frame);
    let at = 0;

    function show(n) {
      if (!photos.length) {
        frame.classList.remove("portrait");
        frame.replaceChildren(missingBox(""));
        count.textContent = "";
        return;
      }
      at = (n + photos.length) % photos.length;
      const name = photos[at];
      const img = new Image();
      img.alt = `${p.title || p.medium || "Project"}, photo ${at + 1}`;
      img.decoding = "async";
      img.onload = () => frame.classList.toggle("portrait", img.naturalHeight > img.naturalWidth);
      img.onerror = () => {
        // Photo file not added yet: show the stand-in if there is one, otherwise a labeled box.
        if (p.standIn && img.dataset.tried !== "1") {
          img.dataset.tried = "1";
          img.src = src(p.standIn);
          const note = document.createElement("span");
          note.className = "standin-note";
          note.textContent = "Stand-in photo";
          frame.appendChild(note);
          return;
        }
        frame.replaceChildren(missingBox(name));
      };
      img.src = src(name);
      frame.replaceChildren(img);
      count.textContent = `${pad(at + 1)} / ${pad(photos.length)}`;
    }
    show(0);
    frame.addEventListener("click", () => show(at + 1));
    el.querySelector(".prev")?.addEventListener("click", () => show(at - 1));
    el.querySelector(".next")?.addEventListener("click", () => show(at + 1));
    p._show = show;
  });

  /* ---------- "More" panel ---------- */
  document.body.insertAdjacentHTML("beforeend", `
    <div class="scrim" hidden></div>
    <aside class="panel" aria-hidden="true" aria-label="Project details">
      <div class="panel-head">
        <span class="sq panel-title"></span>
        <button class="close" aria-label="Close">&times;</button>
      </div>
      <div class="panel-body">
        <div class="thumbs"></div>
        <div class="text">
          <div><h3>Details</h3><div class="panel-details"></div></div>
          <div><h3>Overview</h3><div class="panel-overview"></div></div>
        </div>
      </div>
    </aside>`);
  const panel = document.querySelector(".panel");
  const scrim = document.querySelector(".scrim");
  const thumbs = panel.querySelector(".thumbs");
  let lastFocus = null;

  function openPanel(i) {
    const p = PROJECTS[i];
    const photos = p.photos || [];
    lastFocus = document.activeElement;
    panel.querySelector(".panel-title").textContent = p.title || p.medium || "";
    panel.querySelector(".panel-details").innerHTML = (p.details || []).map(d => `<div>${esc(d)}</div>`).join("");
    const paras = (p.overview || "").split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
    panel.querySelector(".panel-overview").innerHTML = paras.length
      ? paras.map(s => `<p>${esc(s)}</p>`).join("")
      : `<p style="color:var(--ink-soft)">No description yet.</p>`;
    thumbs.innerHTML = photos.map((name, n) =>
      `<button data-n="${n}" aria-label="Show photo ${n + 1}"><img src="${esc(src(name))}" alt="" onerror="this.replaceWith(document.createTextNode('${n + 1}'))"></button>`).join("");
    thumbs.hidden = !photos.length;
    panel.classList.add("open");
    panel.setAttribute("aria-hidden", "false");
    scrim.hidden = false;
    panel.querySelector(".close").focus();
    panel._project = p;
  }
  function closePanel() {
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
    scrim.hidden = true;
    lastFocus?.focus?.();
  }
  thumbs.addEventListener("click", e => {
    const b = e.target.closest("button");
    if (b && panel._project) panel._project._show(+b.dataset.n);
  });
  document.addEventListener("click", e => { const b = e.target.closest(".more"); if (b) openPanel(+b.dataset.i); });
  panel.querySelector(".close").addEventListener("click", closePanel);
  scrim.addEventListener("click", closePanel);
  document.addEventListener("keydown", e => { if (e.key === "Escape" && panel.classList.contains("open")) closePanel(); });

  /* ---------- Scroll warp ----------
     While scrolling, photos tilt and bend with the scroll speed,
     then ease back flat when scrolling stops. */
  const warp = PAGE.scrollWarp ?? 1;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !warp || !frames.length) return;
  let lastY = scrollY, lastT = performance.now(), v = 0, shown = 0;
  function tick(t) {
    const dt = Math.max(1, t - lastT);
    const raw = (scrollY - lastY) / dt;          // pixels per millisecond
    lastY = scrollY; lastT = t;
    v += (raw - v) * 0.2;                        // smooth the speed
    shown += (v - shown) * 0.12;                 // ease the warp in and out
    if (Math.abs(shown) < 0.0005) shown = 0;
    const k = Math.max(-1.6, Math.min(1.6, shown)) * warp;
    const vh = innerHeight;
    for (const f of frames) {
      const r = f.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) continue;
      // Photos above and below the middle of the screen tilt in opposite directions.
      const pos = ((r.top + r.height / 2) / vh - 0.5) * 2;
      const rotX = -k * 9;
      const skew = k * 2.2 * (pos >= 0 ? 1 : -1) * Math.min(1, Math.abs(pos) + 0.3);
      const rot = k * 1.4 * pos;
      const sy = 1 + Math.abs(k) * 0.06;
      f.style.transform = shown === 0 ? "" :
        `perspective(900px) rotateX(${rotX}deg) skewY(${skew}deg) rotate(${rot}deg) scaleY(${sy})`;
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
