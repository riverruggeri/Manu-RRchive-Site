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
     A flat corner stretch tied to where the photo is on screen.
     Coming up from the bottom, the top-left corner is pulled up and
     out, and eases back until the photo is centered on screen. Leaving
     at the top, the bottom-right corner is pulled down and out. */
  const warp = PAGE.scrollWarp ?? 1;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !warp || !frames.length) return;

  const STRETCH_X = 0.065;   // how far the corner pulls sideways, as a share of the photo's width
  const STRETCH_Y = 0.18;   // how far it pulls up or down, as a share of the photo's height
  const ease = t => t * t * (3 - 2 * t);

  // CSS transform that moves the photo's four corners to new spots.
  function cornerPin(w, h, tl, tr, br, bl) {
    const [x0, y0] = tl, [x1, y1] = tr, [x2, y2] = br, [x3, y3] = bl;
    const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3;
    const dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
    const den = dx1 * dy2 - dx2 * dy1;
    const g = (dx3 * dy2 - dx2 * dy3) / den;
    const k = (dx1 * dy3 - dx3 * dy1) / den;
    const a = x1 - x0 + g * x1, b = x3 - x0 + k * x3, c = x0;
    const d = y1 - y0 + g * y1, e = y3 - y0 + k * y3, f = y0;
    return `matrix3d(${a / w},${d / w},0,${g / w},${b / h},${e / h},0,${k / h},0,0,1,0,${c},${f},0,1)`;
  }

  frames.forEach(f => { f.style.transformOrigin = "0 0"; });
  let queued = false;
  function update() {
    queued = false;
    const vh = innerHeight;
    for (const f of frames) {
      // Measure the untransformed box (the slideshow row around the photo).
      const box = f.parentElement.getBoundingClientRect();
      const w = f.offsetWidth, h = f.offsetHeight;
      if (!w || !h || box.bottom < -50 || box.top > vh + 50) continue;
      // 0 when the photo's middle is at the middle of the screen, 1 when it is just
      // peeking in at the bottom (enter) or almost gone at the top (leave).
      const mid = box.top + box.height / 2, reach = vh / 2 + h / 2;
      const top = box.top + (box.height - h) / 2, bottom = top + h;
      const enter = ease(Math.min(1, Math.max(0, (mid - vh / 2) / reach)));
      const leave = ease(Math.min(1, Math.max(0, (vh / 2 - mid) / reach)));
      if (enter === 0 && leave === 0) { f.style.transform = ""; continue; }
      // Never stretch past the space around the photo, so it can't cover the
      // project name above it or the photo counter below it.
      const proj = f.closest(".project");
      const infoBottom = proj.querySelector(".info").getBoundingClientRect().bottom;
      const countTop = proj.querySelector(".count").getBoundingClientRect().top;
      const roomAbove = Math.max(0, top - infoBottom - 6), roomBelow = Math.max(0, countTop - bottom - 4);
      const sx = w * STRETCH_X * warp;
      const syUp = Math.min(h * STRETCH_Y * warp, roomAbove), syDown = Math.min(h * STRETCH_Y * warp, roomBelow);
      f.style.transform = cornerPin(w, h,
        [-sx * enter, -syUp * enter],
        [w, 0],
        [w + sx * leave, h + syDown * leave],
        [0, h]);
    }
  }
  function queue() { if (!queued) { queued = true; requestAnimationFrame(update); } }
  addEventListener("scroll", queue, { passive: true });
  addEventListener("resize", queue);
  frames.forEach(f => f.addEventListener("load", queue, true));
  queue();
})();
