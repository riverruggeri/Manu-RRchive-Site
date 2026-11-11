/* =========================================================
   RIPPLE BACKGROUND
   Underwater ripple effect for a full-screen photo, modeled on
   Cargo's "Ripple" backdrop. Pages start it with:

     startRipple({
       canvas: <canvas element>,
       fallback: <element shown if the effect can't run>,
       image: "images/home-bg.jpg",
       ripple: { distortionX, distortionY, scale, speed,
                 direction, mouseInteraction, mouseSensitivity }
     });
   ========================================================= */
window.startRipple = function (opts) {
  const canvas = opts.canvas;
  canvas.style.opacity = "0";
  canvas.style.transition = "opacity 0.4s ease";
  const fallback = opts.fallback;
  // Show the still photo straight away, so there's never an empty screen
  // while the ripple effect starts up on top of it.
  fallback.hidden = false;
  fallback.style.backgroundImage = `url("${opts.image}")`;
  fallback.style.filter = `brightness(${opts.ripple.brightness || 1})`;
  // Keep the still photo underneath the moving one, not on top of it.
  if (fallback.parentNode === canvas.parentNode) canvas.parentNode.insertBefore(fallback, canvas);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const gl = canvas.getContext("webgl2", { antialias: false, premultipliedAlpha: false });

  function useFallback() {
    canvas.hidden = true;
  }
  if (!gl || reduceMotion) { useFallback(); return; }
  const R = opts.ripple;

  const halfFloat = !!gl.getExtension("EXT_color_buffer_float");
  const SIM = 128;

  const vert = `#version 300 es
    in vec2 aPos; out vec2 vUv;
    void main(){ vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }`;

  // Flow map: remembers recent cursor motion and lets it fade.
  const flowFrag = `#version 300 es
    precision highp float;
    in vec2 vUv; out vec4 outColor;
    uniform sampler2D uFlow;
    uniform vec2 uMouse, uVel;
    uniform float uAspect, uRadius, uSettle, uEncoded, uActive;
    vec3 decode(vec4 c){ return uEncoded > 0.5 ? vec3(c.xy * 2.0 - 1.0, c.z) : c.xyz; }
    vec4 encode(vec3 v){ return uEncoded > 0.5 ? vec4(v.xy * 0.5 + 0.5, v.z, 1.0) : vec4(v, 1.0); }
    void main(){
      vec3 f = decode(texture(uFlow, vUv)) * uSettle;
      vec2 d = vUv - uMouse; d.x *= uAspect;
      float speed = min(1.0, length(uVel));
      vec3 stamp = vec3(uVel, 1.0 - pow(1.0 - speed, 3.0));
      float fall = smoothstep(uRadius, 0.0, length(d));
      fall = fall * fall * 0.35 * uActive;
      f = mix(f, stamp, fall);
      outColor = encode(f);
    }`;

  // Final image: the photo pushed around by drifting ripples. Near the mouse,
  // the flow map makes the ripples stronger and adds a small push.
  const showFrag = `#version 300 es
    precision highp float;
    in vec2 vUv; out vec4 outColor;
    uniform sampler2D uImage, uFlow;
    uniform vec2 uCover, uAmp, uDrift;
    uniform float uEncoded, uTime, uFreq, uAspect, uMouseBoost, uBright;

    // Soft ridge along the edges between curvy, moving cells (0 inside a cell, 1 on a line).
    float ripple(vec2 p){
      vec2 q = p + 0.25 * vec2(sin(p.y * 1.3 + uTime * 0.7), cos(p.x * 1.2 - uTime * 0.6))
                 + 0.12 * vec2(sin(p.y * 3.1 - uTime), cos(p.x * 2.9 + uTime * 0.9));
      vec2 cell = floor(q), fr = fract(q);
      float F1 = 9.0, F2 = 9.0;
      for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
        vec2 g = vec2(float(i), float(j));
        vec2 h = fract(sin(vec2(dot(cell + g, vec2(127.1, 311.7)), dot(cell + g, vec2(269.5, 183.3)))) * 43758.5453);
        vec2 o = 0.5 + 0.4 * sin(uTime * vec2(0.8, 0.9) + 6.2831 * h);
        float d = length(g + o - fr);
        if (d < F1) { F2 = F1; F1 = d; } else if (d < F2) { F2 = d; }
      }
      // Wide, soft falloff: the warp follows the ripple shapes without drawing hard lines.
      float edge = (F2 - F1) / 0.42;
      return exp(-edge * edge);
    }

    // Smooth swells, so the ripple shapes read as water and not as drawn lines.
    float swell(vec2 p){
      return 0.5 * sin(p.x * 0.9 + sin(p.y * 0.7 + uTime * 0.5) + uTime * 0.6)
           + 0.5 * sin(p.y * 1.1 + sin(p.x * 0.8 - uTime * 0.4) - uTime * 0.5);
    }

    float water(vec2 p){ return 0.55 * ripple(p) + 0.2 * swell(p); }

    void main(){
      vec4 c = texture(uFlow, vUv);
      vec3 f = uEncoded > 0.5 ? vec3(c.xy * 2.0 - 1.0, c.z) : c.xyz;

      // Underwater look: soft pool-ripple shapes blended with gentle swells.
      vec2 p = vec2(vUv.x * uAspect, vUv.y) * uFreq - uDrift;
      float e = 0.06;
      float c0 = water(p);
      vec2 grad = vec2(water(p + vec2(e, 0.0)) - c0, water(p + vec2(0.0, e)) - c0) / e;
      // The image bends gently along the lines and stays put inside each shape.
      vec2 cellWarp = grad / uFreq;

      float boost = 1.0 + f.z * uMouseBoost;
      vec2 offset = cellWarp * uAmp * boost + f.xy * f.z * 0.006 * uMouseBoost;

      vec2 uv = vUv + offset;
      uv = (uv - 0.5) * uCover + 0.5;
      outColor = texture(uImage, clamp(uv, 0.001, 0.999));
      outColor.rgb = min(outColor.rgb * uBright, vec3(1.0));
    }`;

  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
    return s;
  }
  function program(fs) {
    const p = gl.createProgram();
    gl.attachShader(p, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(p, compile(gl.FRAGMENT_SHADER, fs));
    gl.bindAttribLocation(p, 0, "aPos");
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
    const u = {};
    const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < n; i++) { const name = gl.getActiveUniform(p, i).name; u[name] = gl.getUniformLocation(p, name); }
    return { p, u };
  }

  let flowProg, showProg;
  try { flowProg = program(flowFrag); showProg = program(showFrag); }
  catch (err) { console.warn(err); useFallback(); return; }

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  function makeTarget() {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    if (halfFloat) gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, SIM, SIM, 0, gl.RGBA, gl.HALF_FLOAT, null);
    else {
      const blank = new Uint8Array(SIM * SIM * 4);
      for (let i = 0; i < blank.length; i += 4) { blank[i] = 128; blank[i + 1] = 128; blank[i + 3] = 255; }
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, SIM, SIM, 0, gl.RGBA, gl.UNSIGNED_BYTE, blank);
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    const fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    return { tex, fb };
  }
  let read = makeTarget(), write = makeTarget();
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  const imageTex = gl.createTexture();
  let imgW = 1, imgH = 1, ready = false;
  const img = new Image();
  img.onload = () => {
    imgW = img.naturalWidth; imgH = img.naturalHeight;
    gl.bindTexture(gl.TEXTURE_2D, imageTex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    ready = true;
    requestAnimationFrame(() => requestAnimationFrame(() => { canvas.style.opacity = "1"; }));
  };
  img.onerror = useFallback;
  img.src = opts.image;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
  }
  resize();
  addEventListener("resize", resize);

  // Pointer tracking (mouse and touch)
  const mouse = { x: 0.5, y: 0.5 }, last = { x: 0.5, y: 0.5 }, vel = { x: 0, y: 0 };
  let lastMove = 0, hasPointer = false;
  function onMove(x, y) {
    mouse.x = x / innerWidth;
    mouse.y = 1 - y / innerHeight;
    if (!hasPointer) { last.x = mouse.x; last.y = mouse.y; hasPointer = true; }
    lastMove = performance.now();
  }
  addEventListener("pointermove", e => onMove(e.clientX, e.clientY), { passive: true });
  addEventListener("pointerdown", e => onMove(e.clientX, e.clientY), { passive: true });

  // Phones and tablets: nobody drags a finger around, so the ripple is made
  // stronger and an invisible "finger" wanders slowly over the photo on its
  // own, pulling the water along. A real touch takes over while it lasts.
  const touchScreen = matchMedia("(hover: none) and (pointer: coarse)").matches;
  const phoneBoost = touchScreen ? (R.phoneStrength ?? 2) : 1;
  const wander = touchScreen && R.phoneAutoMotion !== false;
  let realTouch = -1e9;
  addEventListener("touchstart", () => { realTouch = performance.now(); }, { passive: true });
  addEventListener("touchmove", () => { realTouch = performance.now(); }, { passive: true });

  let prevT = performance.now();
  const drift = { x: 0, y: 0 }, push = { x: 0, y: 0 };
  let anim = 0;
  function frame(t) {
    const dt = Math.max(0.001, Math.min(0.05, (t - prevT) / 1000));
    prevT = t;

    if (wander && t - realTouch > 1500) {
      // A slow looping path that sweeps across most of the screen.
      const s = t / 1000;
      const wx = 0.5 + 0.34 * Math.sin(s * 0.31) + 0.1 * Math.sin(s * 0.83 + 1.3);
      const wy = 0.5 + 0.3 * Math.sin(s * 0.23 + 0.7) + 0.1 * Math.cos(s * 0.67);
      onMove(wx * innerWidth, (1 - wy) * innerHeight);
    }

    // Cursor speed in screen-widths per second, eased so the smear feels liquid.
    const moving = t - lastMove < 80;
    let tx = moving ? (mouse.x - last.x) / dt * 0.35 : 0;
    let ty = moving ? (mouse.y - last.y) / dt * 0.35 : 0;
    const len = Math.hypot(tx, ty);
    if (len > 1) { tx /= len; ty /= len; }
    vel.x += (tx - vel.x) * 0.3;
    vel.y += (ty - vel.y) * 0.3;
    last.x = mouse.x; last.y = mouse.y;

    const aspect = innerWidth / innerHeight;

    // Drift: the ripples flow in the set direction, and moving the mouse
    // speeds them up and pulls them along the way the mouse is going.
    const sens = R.mouseInteraction ? R.mouseSensitivity / 50 : 0;
    push.x += (vel.x - push.x) * (Math.hypot(vel.x, vel.y) > Math.hypot(push.x, push.y) ? 0.12 : 0.025);
    push.y += (vel.y - push.y) * (Math.hypot(vel.x, vel.y) > Math.hypot(push.x, push.y) ? 0.12 : 0.025);
    const ang = R.direction * Math.PI / 180;
    const base = R.speed * 0.07;
    drift.x += (Math.cos(ang) * base + push.x * aspect * 1.2 * sens) * dt;
    drift.y += (Math.sin(ang) * base + push.y * 1.2 * sens) * dt;
    anim += dt * R.speed * 0.12 * (1 + Math.hypot(push.x, push.y) * 2.5 * sens);

    // Update the flow map
    gl.viewport(0, 0, SIM, SIM);
    gl.bindFramebuffer(gl.FRAMEBUFFER, write.fb);
    gl.useProgram(flowProg.p);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, read.tex);
    gl.uniform1i(flowProg.u.uFlow, 0);
    gl.uniform2f(flowProg.u.uMouse, mouse.x, mouse.y);
    gl.uniform2f(flowProg.u.uVel, vel.x, vel.y);
    gl.uniform1f(flowProg.u.uAspect, aspect);
    gl.uniform1f(flowProg.u.uRadius, 0.3);
    gl.uniform1f(flowProg.u.uSettle, 0.985);
    gl.uniform1f(flowProg.u.uEncoded, halfFloat ? 0 : 1);
    gl.uniform1f(flowProg.u.uActive, hasPointer && R.mouseInteraction ? 1 : 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    [read, write] = [write, read];

    // Draw the photo
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, canvas.width, canvas.height);
    if (ready) {
      gl.useProgram(showProg.p);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, imageTex);
      gl.uniform1i(showProg.u.uImage, 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, read.tex);
      gl.uniform1i(showProg.u.uFlow, 1);
      const imgAspect = imgW / imgH;
      const cover = aspect > imgAspect ? [1, imgAspect / aspect] : [aspect / imgAspect, 1];
      gl.uniform2f(showProg.u.uCover, cover[0], cover[1]);
      // Translate Cargo-style numbers into shader values.
      gl.uniform2f(showProg.u.uDrift, drift.x, drift.y);
      gl.uniform2f(showProg.u.uAmp, R.distortionX * 0.006 * phoneBoost, R.distortionY * 0.006 * phoneBoost);
      gl.uniform1f(showProg.u.uBright, R.brightness || 1);
      gl.uniform1f(showProg.u.uFreq, R.scale * 2.8);
      gl.uniform1f(showProg.u.uTime, anim);
      gl.uniform1f(showProg.u.uAspect, aspect);
      gl.uniform1f(showProg.u.uMouseBoost, R.mouseInteraction ? R.mouseSensitivity / 50 * 2.5 : 0);
      gl.uniform1f(showProg.u.uEncoded, halfFloat ? 0 : 1);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
};
