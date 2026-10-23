import * as THREE from 'three';

const canvas = document.querySelector('.hero-canvas');
const hero = document.querySelector('.hero');

if (canvas && hero) {
  init().catch(() => canvas.remove());
}

async function init() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isSmall = () => window.innerWidth < 760;
  const lowPower = isSmall() || (navigator.hardwareConcurrency || 8) <= 4;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !lowPower, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowPower ? 1.5 : 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0, 15);

  try { await Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 1200))]); } catch (e) {}

  const C = { cyan: '#00BBFF', blue: '#2F5BFB', violet: '#6627FA', white: '#FFFFFF', text: '#C9D1EE', muted: '#8E9AC6', hull: 'rgba(8,17,48,0.78)', line: 'rgba(140,170,255,0.22)' };
  const FONT = '"Archivo", system-ui, sans-serif';
  const MONO = 'ui-monospace, "Cascadia Code", Consolas, monospace';
  const PX = lowPower ? 150 : 220; // texture pixels per world unit

  /* ---------- canvas texture helpers ---------- */
  function panelTexture(w, h, draw, { radius = 0.14, edge = C.cyan } = {}) {
    const cw = Math.round(w * PX), ch = Math.round(h * PX);
    const cv = document.createElement('canvas');
    cv.width = cw; cv.height = ch;
    const g = cv.getContext('2d');
    const r = radius * PX;
    // glass body
    g.beginPath(); g.roundRect(2, 2, cw - 4, ch - 4, r);
    const body = g.createLinearGradient(0, 0, 0, ch);
    body.addColorStop(0, 'rgba(15,27,66,0.9)');
    body.addColorStop(1, 'rgba(7,14,40,0.86)');
    g.fillStyle = body; g.fill();
    // edge light: cyan on top-left fading to faint
    const stroke = g.createLinearGradient(0, 0, cw, ch);
    stroke.addColorStop(0, edge);
    stroke.addColorStop(0.45, 'rgba(47,91,251,0.35)');
    stroke.addColorStop(1, 'rgba(140,170,255,0.18)');
    g.lineWidth = Math.max(2, PX / 90); g.strokeStyle = stroke; g.stroke();
    // inner highlight
    g.save(); g.clip();
    const sheen = g.createLinearGradient(0, 0, cw * 0.6, ch * 0.6);
    sheen.addColorStop(0, 'rgba(255,255,255,0.06)'); sheen.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = sheen; g.fillRect(0, 0, cw, ch);
    draw(g, cw, ch, PX);
    g.restore();
    const tex = new THREE.CanvasTexture(cv);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    return tex;
  }
  const rr = (g, x, y, w, h, r, fill) => { g.beginPath(); g.roundRect(x, y, w, h, r); g.fillStyle = fill; g.fill(); };
  const grad = (g, x0, y0, x1, y1, stops) => { const l = g.createLinearGradient(x0, y0, x1, y1); stops.forEach(([o, c]) => l.addColorStop(o, c)); return l; };

  /* ---------- panel designs ---------- */
  const designs = {
    browser: (g, w, h, u) => {
      const p = u * 0.16;
      [0, 1, 2].forEach(i => { g.beginPath(); g.arc(p + i * u * 0.11, p, u * 0.032, 0, Math.PI * 2); g.fillStyle = 'rgba(140,170,255,0.45)'; g.fill(); });
      rr(g, w * 0.28, p - u * 0.05, w * 0.44, u * 0.1, u * 0.05, 'rgba(140,170,255,0.12)');
      g.fillStyle = 'rgba(140,170,255,0.18)'; g.fillRect(0, u * 0.32, w, 2);
      // nav
      rr(g, p, u * 0.45, u * 0.42, u * 0.07, 4, 'rgba(229,231,235,0.7)');
      [0, 1, 2].forEach(i => rr(g, w - p - u * 0.95 + i * u * 0.3, u * 0.465, u * 0.2, u * 0.04, 3, 'rgba(140,170,255,0.35)'));
      // hero copy
      rr(g, p, u * 0.72, w * 0.5, u * 0.13, 6, 'rgba(255,255,255,0.88)');
      rr(g, p, u * 0.92, w * 0.38, u * 0.13, 6, grad(g, p, 0, p + w * 0.38, 0, [[0, C.cyan], [1, C.blue]]));
      rr(g, p, u * 1.15, w * 0.44, u * 0.045, 3, 'rgba(140,170,255,0.4)');
      rr(g, p, u * 1.24, w * 0.34, u * 0.045, 3, 'rgba(140,170,255,0.4)');
      rr(g, p, u * 1.4, u * 0.5, u * 0.14, u * 0.04, C.cyan);
      // visual block right
      const vx = w * 0.6, vy = u * 0.66, vw = w - vx - p, vh = u * 0.9;
      rr(g, vx, vy, vw, vh, u * 0.06, grad(g, vx, vy, vx + vw, vy + vh, [[0, 'rgba(0,187,255,0.28)'], [0.6, 'rgba(47,91,251,0.2)'], [1, 'rgba(102,39,250,0.25)']]));
      // cards row
      const cy = h - u * 0.62, cwid = (w - p * 2 - u * 0.2) / 3;
      [0, 1, 2].forEach(i => {
        rr(g, p + i * (cwid + u * 0.1), cy, cwid, u * 0.45, u * 0.05, 'rgba(140,170,255,0.10)');
        rr(g, p + i * (cwid + u * 0.1) + u * 0.08, cy + u * 0.09, u * 0.12, u * 0.12, u * 0.03, i === 1 ? C.cyan : 'rgba(47,91,251,0.6)');
        rr(g, p + i * (cwid + u * 0.1) + u * 0.08, cy + u * 0.28, cwid * 0.6, u * 0.04, 3, 'rgba(140,170,255,0.35)');
      });
    },
    dashboard: (g, w, h, u) => {
      const p = u * 0.16;
      g.font = `600 ${u * 0.11}px ${FONT}`; g.fillStyle = C.text; g.fillText('Bookings this week', p, p + u * 0.08);
      g.font = `500 ${u * 0.08}px ${FONT}`; g.fillStyle = C.muted; g.fillText('Mon – Sun', p, p + u * 0.22);
      // line chart
      const x0 = p, y0 = u * 0.5, cw = w - p * 2, chh = h * 0.42;
      for (let i = 0; i < 4; i++) { g.fillStyle = 'rgba(140,170,255,0.12)'; g.fillRect(x0, y0 + (chh / 3) * i, cw, 1.5); }
      const pts = [0.62, 0.5, 0.56, 0.32, 0.4, 0.18, 0.24].map((v, i) => [x0 + (cw / 6) * i, y0 + chh * v]);
      g.beginPath(); pts.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y));
      g.lineTo(x0 + cw, y0 + chh); g.lineTo(x0, y0 + chh); g.closePath();
      g.fillStyle = grad(g, 0, y0, 0, y0 + chh, [[0, 'rgba(0,187,255,0.32)'], [1, 'rgba(0,187,255,0)']]); g.fill();
      g.beginPath(); pts.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y));
      g.strokeStyle = C.cyan; g.lineWidth = u * 0.022; g.lineJoin = 'round'; g.stroke();
      pts.forEach(([x, y], i) => { if (i === 5) { g.beginPath(); g.arc(x, y, u * 0.04, 0, Math.PI * 2); g.fillStyle = C.white; g.fill(); } });
      // stat tiles
      const ty = h - u * 0.5, tw = (cw - u * 0.1) / 2;
      [0, 1].forEach(i => {
        rr(g, x0 + i * (tw + u * 0.1), ty, tw, u * 0.34, u * 0.05, 'rgba(140,170,255,0.10)');
        rr(g, x0 + i * (tw + u * 0.1) + u * 0.08, ty + u * 0.08, tw * 0.35, u * 0.07, 3, i ? 'rgba(102,39,250,0.8)' : 'rgba(47,91,251,0.85)');
        rr(g, x0 + i * (tw + u * 0.1) + u * 0.08, ty + u * 0.2, tw * 0.6, u * 0.04, 3, 'rgba(140,170,255,0.35)');
      });
    },
    phone: (g, w, h, u) => {
      const p = u * 0.1;
      rr(g, w / 2 - u * 0.14, u * 0.07, u * 0.28, u * 0.05, u * 0.025, 'rgba(140,170,255,0.35)');
      rr(g, p, u * 0.22, w - p * 2, u * 0.62, u * 0.07, grad(g, 0, u * 0.22, w, u * 0.84, [[0, 'rgba(102,39,250,0.45)'], [1, 'rgba(0,187,255,0.3)']]));
      rr(g, p, u * 0.96, w * 0.7, u * 0.07, 4, 'rgba(255,255,255,0.85)');
      rr(g, p, u * 1.1, w * 0.5, u * 0.045, 3, 'rgba(140,170,255,0.4)');
      [0, 1].forEach(i => rr(g, p, u * 1.26 + i * u * 0.3, w - p * 2, u * 0.22, u * 0.05, 'rgba(140,170,255,0.12)'));
      rr(g, p, h - u * 0.32, w - p * 2, u * 0.18, u * 0.05, C.cyan);
    },
    code: (g, w, h, u) => {
      const p = u * 0.15;
      g.font = `500 ${u * 0.085}px ${MONO}`;
      const lines = [
        [['const ', C.violet], ['app', C.white], [' = ', C.muted], ['build', C.cyan], ['(idea);', C.text]],
        [['await ', C.violet], ['app', C.white], ['.', C.muted], ['connect', C.cyan], ['(api);', C.text]],
        [['await ', C.violet], ['deploy', C.cyan], ['(app);', C.text]],
        [['// from idea to digital experience', 'rgba(140,170,255,0.7)']],
      ];
      lines.forEach((parts, i) => {
        let x = p; const y = p + u * 0.1 + i * u * 0.19;
        parts.forEach(([t, c]) => { g.fillStyle = c; g.fillText(t, x, y); x += g.measureText(t).width; });
      });
    },
    api: (g, w, h, u) => {
      const p = u * 0.12;
      rr(g, p, h / 2 - u * 0.08, u * 0.34, u * 0.16, u * 0.04, 'rgba(0,187,255,0.18)');
      g.font = `700 ${u * 0.09}px ${MONO}`; g.fillStyle = C.cyan; g.fillText('GET', p + u * 0.07, h / 2 + u * 0.03);
      g.font = `500 ${u * 0.09}px ${MONO}`; g.fillStyle = C.text; g.fillText('/api/bookings', p + u * 0.44, h / 2 + u * 0.03);
    },
    db: (g, w, h, u) => {
      const cx = u * 0.34, cy = h / 2, rx = u * 0.16, ry = u * 0.05;
      g.strokeStyle = C.blue; g.lineWidth = u * 0.018;
      for (let i = 0; i < 3; i++) { g.beginPath(); g.ellipse(cx, cy - u * 0.12 + i * u * 0.12, rx, ry, 0, 0, Math.PI * (i ? 1 : 2)); g.stroke(); }
      g.beginPath(); g.moveTo(cx - rx, cy - u * 0.12); g.lineTo(cx - rx, cy + u * 0.12); g.moveTo(cx + rx, cy - u * 0.12); g.lineTo(cx + rx, cy + u * 0.12); g.stroke();
      g.font = `600 ${u * 0.1}px ${FONT}`; g.fillStyle = C.text; g.fillText('Database', u * 0.62, cy - u * 0.02);
      g.font = `500 ${u * 0.075}px ${FONT}`; g.fillStyle = C.muted; g.fillText('synced', u * 0.62, cy + u * 0.12);
    },
  };

  /* ---------- build the ecosystem ---------- */
  const eco = new THREE.Group();
  scene.add(eco);

  const spec = [
    { key: 'browser', w: 4.4, h: 2.85, pos: [0, 0.2, 0], rot: [-0.06, -0.32, 0.02], edge: C.cyan },
    { key: 'dashboard', w: 2.7, h: 1.85, pos: [2.55, 1.75, -1.6], rot: [0.04, -0.42, 0.03], edge: C.blue },
    { key: 'phone', w: 1.12, h: 2.2, pos: [2.85, -1.25, 1.3], rot: [0.02, -0.5, -0.04], edge: C.cyan, radius: 0.18 },
    { key: 'code', w: 2.45, h: 0.95, pos: [-2.15, -1.95, 1.0], rot: [0.08, -0.18, 0.0], edge: C.violet },
    { key: 'api', w: 1.75, h: 0.42, pos: [-2.35, 1.95, -0.9], rot: [0.0, -0.22, 0.0], edge: C.cyan, radius: 0.1, small: true },
    { key: 'db', w: 1.5, h: 0.62, pos: [0.4, -2.55, -1.4], rot: [0.06, -0.3, 0.0], edge: C.blue, radius: 0.1, small: true },
  ];
  const visibleSpec = isSmall() ? spec.filter(s => ['browser', 'dashboard', 'phone', 'code'].includes(s.key)) : spec;

  const panels = visibleSpec.map((s, i) => {
    const tex = panelTexture(s.w, s.h, designs[s.key], { radius: s.radius || 0.14, edge: s.edge });
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, side: THREE.DoubleSide, opacity: 0 });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(s.w, s.h), mat);
    mesh.position.set(...s.pos);
    mesh.rotation.set(...s.rot);
    mesh.renderOrder = Math.round((s.pos[2] + 5) * 10);
    const depthOpacity = THREE.MathUtils.clamp(0.9 + s.pos[2] * 0.08, 0.7, 1); // farther panels recede
    mesh.userData = { base: new THREE.Vector3(...s.pos), baseRot: new THREE.Euler(...s.rot), phase: i * 1.37, target: depthOpacity, delay: 0.15 + i * 0.12 };
    eco.add(mesh);
    return mesh;
  });

  // glow sprite texture
  const glowTex = (() => {
    const cv = document.createElement('canvas'); cv.width = cv.height = 128;
    const g = cv.getContext('2d');
    const rg = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    rg.addColorStop(0, 'rgba(255,255,255,1)'); rg.addColorStop(0.18, 'rgba(0,187,255,0.9)'); rg.addColorStop(0.5, 'rgba(0,187,255,0.18)'); rg.addColorStop(1, 'rgba(0,187,255,0)');
    g.fillStyle = rg; g.fillRect(0, 0, 128, 128);
    const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t;
  })();

  // connection paths between panels (API-style links)
  const byKey = Object.fromEntries(panels.map((m, i) => [visibleSpec[i].key, m]));
  const links = [['browser', 'dashboard'], ['browser', 'phone'], ['browser', 'code'], ['api', 'browser'], ['dashboard', 'db'], ['code', 'db'], ['api', 'dashboard']]
    .filter(([a, b]) => byKey[a] && byKey[b]);
  const curves = [];
  const lineMat = new THREE.LineBasicMaterial({ color: 0x2F5BFB, transparent: true, opacity: 0 });
  links.forEach(([a, b], i) => {
    const A = byKey[a].position.clone(), B = byKey[b].position.clone();
    const mid = A.clone().lerp(B, 0.5); mid.z += 1.2; mid.y += (i % 2 ? 0.5 : -0.5);
    const curve = new THREE.QuadraticBezierCurve3(A, mid, B);
    const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(48));
    const line = new THREE.Line(geo, lineMat);
    line.renderOrder = 0;
    eco.add(line);
    curves.push(curve);
  });

  // nodes where links meet, plus travelling pulses
  const nodeMat = new THREE.SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 });
  const nodePoints = [];
  curves.forEach(c => { nodePoints.push(c.getPoint(0.5)); });
  const nodes = nodePoints.map(p => { const s = new THREE.Sprite(nodeMat); s.position.copy(p); s.scale.setScalar(0.32); eco.add(s); return s; });

  const pulseMat = new THREE.SpriteMaterial({ map: glowTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 });
  const pulses = reduced ? [] : curves.map((c, i) => {
    const s = new THREE.Sprite(pulseMat); s.scale.setScalar(0.22);
    s.userData = { curve: c, t: (i * 0.29) % 1, speed: 0.12 + (i % 3) * 0.035 };
    eco.add(s); return s;
  });

  // the logo's O, as a quiet ring behind the system
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(4.6, 0.012, 8, 160),
    new THREE.MeshBasicMaterial({ color: 0x2F5BFB, transparent: true, opacity: 0 })
  );
  ring.position.set(0, 0, -3.5); ring.rotation.set(0.25, -0.45, 0);
  eco.add(ring);
  const ring2 = new THREE.Mesh(
    new THREE.TorusGeometry(3.4, 0.008, 8, 140),
    new THREE.MeshBasicMaterial({ color: 0x6627FA, transparent: true, opacity: 0 })
  );
  ring2.position.set(0, 0, -3.2); ring2.rotation.set(0.25, -0.45, 0);
  eco.add(ring2);

  // speed-dash trail (from the logo) leaving the browser to the right
  const dashMat = new THREE.MeshBasicMaterial({ color: 0x00BBFF, transparent: true, opacity: 0 });
  const dashes = [];
  if (!isSmall()) {
    [[0.9, 0.55], [0.55, 0.35], [0.2, 0.75], [-0.15, 0.4], [-0.5, 0.6]].forEach(([y, len], i) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(len, 0.045), dashMat);
      m.position.set(2.45 + len / 2 + (i % 2) * 0.15, y, 0.2);
      m.rotation.y = -0.32;
      m.userData = { baseX: m.position.x, phase: i * 0.8 };
      eco.add(m); dashes.push(m);
    });
  }

  /* ---------- layout ---------- */
  let layout = { x: 0, y: 0, s: 1 };
  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (w >= 1025) layout = { x: (4.6 + Math.max(0, 1440 - w) * 0.002) * Math.min(1.2, camera.aspect / 1.6), y: 0.1, s: 0.8 };
    else if (w >= 760) layout = { x: 0.2, y: 0, s: 0.95 };
    else layout = { x: 0.15, y: 0, s: Math.min(0.92, 0.78 * camera.aspect) };
    layout.ry = 0;
    if (document.documentElement.dir === 'rtl') { layout.x = -layout.x; layout.ry = w >= 1025 ? 0.64 : 0; }
    eco.position.set(layout.x, layout.y, 0);
    eco.scale.setScalar(layout.s);
    if (reduced) renderOnce();
  }

  /* ---------- interaction ---------- */
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  const finePtr = window.matchMedia('(pointer: fine)').matches;
  let touchAt = -10; // last time a finger moved over the hero (s)
  if (!reduced && !finePtr) {
    hero.addEventListener('touchmove', e => {
      const p = e.touches[0];
      mouse.tx = (p.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = (p.clientY / window.innerHeight) * 2 - 1;
      touchAt = time;
    }, { passive: true });
  }
  if (!reduced && finePtr) {
    window.addEventListener('pointermove', e => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });
  }
  let scrollP = 0;
  window.addEventListener('scroll', () => { scrollP = Math.min(1, window.scrollY / hero.clientHeight); }, { passive: true });

  /* ---------- loop ---------- */
  const clock = new THREE.Clock();
  let running = false, raf = 0, time = 0;
  const ease = t => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);

  function frame() {
    time += Math.min(clock.getDelta(), 0.05);
    const t = time;
    // on touch screens the scene sways on its own between touches
    if (!finePtr && t - touchAt > 2.5) { mouse.tx = Math.sin(t * 0.38) * 0.65; mouse.ty = Math.cos(t * 0.29) * 0.4; }
    mouse.x += (mouse.tx - mouse.x) * 0.04;
    mouse.y += (mouse.ty - mouse.y) * 0.04;

    // entrance: panels assemble, then links and nodes light up
    panels.forEach(p => {
      const k = ease((t - p.userData.delay) / 1.4);
      const b = p.userData.base;
      p.material.opacity = p.userData.target * k;
      p.position.set(
        b.x,
        b.y + Math.sin(t * 0.6 + p.userData.phase) * 0.08 - (1 - k) * 0.6,
        b.z + (1 - k) * -1.5
      );
      p.rotation.x = p.userData.baseRot.x + Math.sin(t * 0.4 + p.userData.phase) * 0.02;
      p.rotation.y = p.userData.baseRot.y + Math.cos(t * 0.35 + p.userData.phase) * 0.025;
    });
    const k2 = ease((t - 1.1) / 1.2);
    lineMat.opacity = 0.32 * k2;
    nodeMat.opacity = 0.75 * k2;
    pulseMat.opacity = 0.95 * k2;
    ring.material.opacity = 0.22 * k2;
    ring2.material.opacity = 0.16 * k2;
    dashMat.opacity = 0.7 * k2;

    pulses.forEach(s => {
      s.userData.t = (s.userData.t + s.userData.speed / 60) % 1;
      s.position.copy(s.userData.curve.getPoint(s.userData.t));
    });
    nodes.forEach((n, i) => n.scale.setScalar(0.28 + Math.sin(t * 1.4 + i) * 0.04));
    dashes.forEach(d => { d.position.x = d.userData.baseX + Math.sin(t * 1.1 + d.userData.phase) * 0.08; });
    ring.rotation.z = t * 0.04;
    ring2.rotation.z = -t * 0.05;

    // parallax + scroll drift
    eco.rotation.y = (layout.ry || 0) + mouse.x * 0.16;
    eco.rotation.x = mouse.y * 0.08 + scrollP * 0.15;
    eco.position.y = layout.y + scrollP * 1.6;
    camera.position.x = mouse.x * 0.4;
    camera.position.y = -mouse.y * 0.25;
    camera.lookAt(0, 0, 0);
    canvas.style.opacity = String(1 - scrollP * 0.85);

    renderer.render(scene, camera);
    if (running) raf = requestAnimationFrame(frame);
  }

  function renderOnce() {
    panels.forEach(p => { p.material.opacity = p.userData.target; });
    lineMat.opacity = 0.32; nodeMat.opacity = 0.75; ring.material.opacity = 0.22; ring2.material.opacity = 0.16; dashMat.opacity = 0.7;
    renderer.render(scene, camera);
  }

  const start = () => { if (!running && !reduced) { running = true; clock.getDelta(); raf = requestAnimationFrame(frame); } };
  const stop = () => { running = false; cancelAnimationFrame(raf); };

  resize();
  window.addEventListener('resize', resize);
  document.addEventListener('orafdev:lang', resize);
  document.body.classList.add('has-webgl');
  document.querySelector('.hero-fallback')?.style.setProperty('opacity', '0.55');

  if (reduced) { renderOnce(); return; }
  new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0 }).observe(hero);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
}
