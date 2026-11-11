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
  // Optional link under the title, e.g. to this medium's commissions page.
  const sub = PAGE.subLink ? `<a class="page-sub" href="${esc(PAGE.subLink.link)}">${esc(PAGE.subLink.label)} →</a>` : "";
  page.innerHTML = `<h1 class="page-title">${esc(PAGE.title || "")}</h1>${sub}<main class="projects"></main>`;
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
    let busy = null;   // the slide animation in progress, if any
    let goal = 0;      // the photo being slid to (runs ahead of "at" during a slide)
    let token = 0;     // makes sure only the latest slide finishes

    // Slide the current photo out to one side and the next one in from the
    // other (dir 1 = next, -1 = previous). The next photo is loaded first so
    // the frame never goes empty.
    function slideTo(n, dir) {
      if (!photos.length || photos.length < 2) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const old = frame.querySelector("img");
      if (reduce || !old || !old.animate) { show(n); return; }
      if (busy) busy.finish();
      const nextAt = (n + photos.length) % photos.length;
      goal = nextAt;
      const mine = ++token;
      const probe = new Image();
      probe.src = src(photos[nextAt]);
      const ready = probe.decode ? probe.decode().catch(() => {}) : Promise.resolve();
      const out = old.animate(
        [{ transform: "translateX(0)", opacity: 1 }, { transform: `translateX(${-dir * 18}%)`, opacity: 0 }],
        { duration: 240, easing: "cubic-bezier(0.4, 0, 1, 1)", fill: "forwards" });
      busy = out;
      Promise.all([out.finished.catch(() => {}), ready]).then(() => {
        if (mine !== token) return;
        show(nextAt);
        const img = frame.querySelector("img");
        if (img && img.animate) {
          busy = img.animate(
            [{ transform: `translateX(${dir * 18}%)`, opacity: 0 }, { transform: "translateX(0)", opacity: 1 }],
            { duration: 380, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" });
          busy.finished.catch(() => {}).then(() => { busy = null; });
        } else busy = null;
      });
    }

    function show(n) {
      if (!photos.length) {
        frame.classList.remove("portrait");
        frame.replaceChildren(missingBox(""));
        count.textContent = "";
        return;
      }
      at = goal = (n + photos.length) % photos.length;
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
    // Tap/click the photo or use the arrows; on phones, swipe left or right.
    let swiped = false;
    frame.addEventListener("click", () => { if (swiped) { swiped = false; return; } slideTo(goal + 1, 1); });
    el.querySelector(".prev")?.addEventListener("click", () => slideTo(goal - 1, -1));
    el.querySelector(".next")?.addEventListener("click", () => slideTo(goal + 1, 1));
    let sx = 0, sy = 0;
    frame.addEventListener("touchstart", e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    frame.addEventListener("touchend", e => {
      const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        swiped = true;
        slideTo(goal + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
      }
    }, { passive: true });
    // Thumbnails in the "More" panel jump to a photo, sliding in the right direction.
    p._show = n => { if (n !== goal) slideTo(n, n > goal ? 1 : -1); };
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
     at the top, the bottom-right corner is pulled down and out.
     The project name moves up out of the way of the stretched corner
     and slides back down to the photo as it straightens (the photo
     counter does the same below). */
  const warp = PAGE.scrollWarp ?? 1;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !warp || !frames.length) return;

  const STRETCH_X = 0.08;   // how far the corner pulls sideways, as a share of the photo's width
  const STRETCH_Y = 0.24;   // how far it pulls up or down, as a share of the photo's height
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

  frames.forEach(f => { f.style.transformOrigin = "0 0"; f.style.willChange = "transform"; });
  const OTHER_CORNER = 0.55;   // how far the second corner on the same side sticks out, compared with the first
  const PORTRAIT_WARP = 0.6;  // tall photos stretch this much compared with wide ones (1 = the same)
  const MIN_GAP = 64;          // the closest a photo counter may get to the next project's name, in pixels

  // Sizes and positions are measured once (and again when something
  // changes size), not on every frame: measuring while scrolling is what
  // made the effect stutter on iPhones.
  const items = frames.map(f => {
    const proj = f.closest(".project");
    const info = proj.querySelector(".info"), count = proj.querySelector(".count");
    [info, count].forEach(el => { el.style.willChange = "transform"; });
    return { f, proj, info, count, last: {} };
  });
  let vh = innerHeight, dirty = true;
  function measure() {
    vh = innerHeight;
    const sy = scrollY;
    // Clear the moves first so the name and counter are measured where they really sit.
    for (const it of items) {
      const box = it.f.parentElement.getBoundingClientRect();
      it.top = box.top + sy; it.height = box.height;
      it.w = it.f.offsetWidth; it.h = it.f.offsetHeight;
      it.gap = parseFloat(getComputedStyle(it.proj).rowGap) || 0;
      it.infoH = it.info.offsetHeight; it.countH = it.count.offsetHeight;
    }
    dirty = false;
  }
  function set(it, key, el, value) {
    if (it.last[key] !== value) { it.last[key] = value; el.style.transform = value; }
  }

  function update() {
    if (dirty) measure();
    const sy = scrollY;
    // Pass 1: work out how far each photo would stretch.
    for (const it of items) {
      const { w, h } = it;
      const top = it.top - sy;
      // 0 when the photo's middle is at the middle of the screen, 1 when it is just
      // peeking in at the bottom (enter) or almost gone at the top (leave).
      const mid = top + it.height / 2, reach = vh / 2 + h / 2;
      it.enter = h ? ease(Math.min(1, Math.max(0, (mid - vh / 2) / reach))) : 0;
      it.leave = h ? ease(Math.min(1, Math.max(0, (vh / 2 - mid) / reach))) : 0;
      const s = h * STRETCH_Y * warp * (h > w ? PORTRAIT_WARP : 1);
      it.up = s * it.enter; it.down = s * it.leave;
      it.infoTop = top - it.gap - it.infoH;
      it.countBottom = top + it.height + it.gap + it.countH;
    }
    // Pass 2: where a counter sliding down meets the next name sliding up,
    // shrink both moves (and the stretch with them) to keep a clear gap.
    for (let i = 0; i + 1 < items.length; i++) {
      const a = items[i], b = items[i + 1];
      const room = (b.infoTop - a.countBottom) - MIN_GAP;
      const want = a.down + b.up;
      if (want > room) {
        const k = room > 0 && want > 0 ? room / want : 0;
        a.down *= k; b.up *= k;
      }
    }
    // Pass 3: apply (only what changed, and nothing for photos far off screen).
    for (const it of items) {
      const { f, info, count, w, h, enter, leave } = it;
      const top = it.top - sy;
      const offscreen = top > vh * 1.5 || top + it.height < -vh * 0.5;
      if (offscreen || !w || !h || (it.up < 0.5 && it.down < 0.5)) {
        set(it, "f", f, ""); set(it, "i", info, ""); set(it, "c", count, "");
        continue;
      }
      const sx = w * STRETCH_X * warp;
      // Coming in: both left corners stick out (the top one more), the top-left also pulls up.
      // Going out: the mirror, on the right side.
      set(it, "f", f, cornerPin(w, h,
        [-sx * enter, -it.up],
        [w + sx * leave * OTHER_CORNER, 0],
        [w + sx * leave, h + it.down],
        [-sx * enter * OTHER_CORNER, h]));
      // Keep the name and counter just clear of the stretched corners.
      set(it, "i", info, it.up >= 0.5 ? `translate3d(0,${(-it.up).toFixed(1)}px,0)` : "");
      set(it, "c", count, it.down >= 0.5 ? `translate3d(0,${it.down.toFixed(1)}px,0)` : "");
    }
  }

  // While the page is moving, redraw on every screen refresh (this keeps
  // up with iPhone momentum scrolling); stop once it has been still a moment.
  let running = false, lastY = -1, still = 0;
  function loop() {
    const y = scrollY;
    if (y !== lastY || dirty) { lastY = y; still = 0; update(); } else still++;
    if (still < 20) requestAnimationFrame(loop); else running = false;
  }
  function wake() { still = 0; if (!running) { running = true; requestAnimationFrame(loop); } }
  function remeasure() { dirty = true; wake(); }
  addEventListener("scroll", wake, { passive: true });
  addEventListener("touchmove", wake, { passive: true });
  addEventListener("resize", remeasure);
  frames.forEach(f => f.addEventListener("load", remeasure, true));
  if ("ResizeObserver" in window) {
    const ro = new ResizeObserver(remeasure);
    items.forEach(it => { ro.observe(it.f); ro.observe(it.proj); });
  }
  remeasure();
})();
