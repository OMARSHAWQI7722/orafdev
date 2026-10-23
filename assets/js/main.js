(() => {
  const doc = document.documentElement;
  const cfg = window.ORAFDEV || { contact: {}, projects: {} };
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const root = document.body.dataset.root || '';

  /* ---------- Page entrance ---------- */
  const veil = $('.page-veil');
  let fromNav = false;
  try { fromNav = sessionStorage.getItem('orafdev-nav') === '1'; } catch (e) {}
  if (veil && fromNav) {
    try { sessionStorage.removeItem('orafdev-nav'); } catch (e) {}
    veil.classList.add('is-entering');
    requestAnimationFrame(() => requestAnimationFrame(() => veil.classList.remove('is-entering')));
  }
  requestAnimationFrame(() => document.body.classList.add('is-loaded'));

  /* ---------- Config: contacts, links, screenshots ---------- */
  const c = cfg.contact || {};
  const waText = encodeURIComponent(cfg.whatsappMessage || '');
  // Social profiles are used as given; WhatsApp and email are turned into links.
  const urls = {
    ...c,
    whatsapp: c.whatsapp ? `https://wa.me/${c.whatsapp.replace(/\D/g, '')}?text=${waText}` : '',
    email: c.email ? `mailto:${c.email}` : '',
  };
  $$('[data-channel]').forEach(li => {
    const url = urls[li.dataset.channel];
    const a = $('a', li);
    if (url) { a.href = url; if (li.dataset.channel === 'email') a.removeAttribute('target'); }
    else { li.setAttribute('data-missing', ''); a.removeAttribute('href'); a.setAttribute('aria-disabled', 'true'); }
  });
  $$('[data-wa-link]').forEach(a => {
    if (urls.whatsapp) { a.href = urls.whatsapp; a.target = '_blank'; a.rel = 'noopener'; }
    else { a.href = (root || '') + '#contact'; }
  });
  const projects = cfg.projects || {};
  // Live view: animated when a real URL exists, "coming soon" otherwise
  $$('[data-live]').forEach(a => {
    const url = projects[a.dataset.live]?.live;
    if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; a.classList.remove('is-soon'); }
    else { a.removeAttribute('href'); a.classList.add('is-soon'); a.setAttribute('aria-disabled', 'true'); }
  });
  // Source code only appears when a repository is public
  $$('[data-source]').forEach(a => {
    const url = projects[a.dataset.source]?.source;
    if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; a.hidden = false; } else a.hidden = true;
  });
  // Verified technologies only
  $$('[data-project]').forEach(el => {
    const tech = projects[el.dataset.project]?.tech || [];
    const line = $('[data-tech]', el);
    if (!line) return;
    if (tech.length) line.textContent = tech.join(', ');
    else if (line.closest('.case-meta')) line.parentElement.hidden = true;
    else line.textContent = '';
  });
  $$('[data-socials]').forEach(ul => { if (!ul.querySelector('li:not([data-missing])')) ul.parentElement.hidden = true; });
  $$('[data-channels]').forEach(ul => { if (!ul.querySelector('li:not([data-missing])')) ul.hidden = true; });

  /* ---------- Theme + language ---------- */
  const I18N = window.I18N || { t: s => s, apply() {}, setAttr: (el, n, v) => el.setAttribute(n, v), lang: 'en' };
  const t = I18N.t;
  const themeBtn = $('[data-theme-toggle]');
  const langBtn = $('[data-lang-toggle]');
  const themeMeta = $('meta[name="theme-color"]');
  const syncTheme = () => {
    const light = doc.dataset.theme === 'light';
    if (themeBtn) I18N.setAttr(themeBtn, 'aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
    if (themeMeta) themeMeta.content = light ? '#F4F6FD' : '#050A1F';
  };
  themeBtn?.addEventListener('click', () => {
    doc.classList.add('theme-switching');
    doc.dataset.theme = doc.dataset.theme === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('orafdev-theme', doc.dataset.theme); } catch (e) {}
    syncTheme();
    requestAnimationFrame(() => requestAnimationFrame(() => doc.classList.remove('theme-switching')));
  });
  const syncLangBtn = () => {
    if (!langBtn) return;
    const ar = I18N.lang === 'ar';
    langBtn.textContent = ar ? 'EN' : 'عربي';
    langBtn.lang = ar ? 'en' : 'ar';
    I18N.setAttr(langBtn, 'aria-label', ar ? 'Switch to English' : 'Switch to Arabic');
  };
  langBtn?.addEventListener('click', () => {
    I18N.apply(I18N.lang === 'ar' ? 'en' : 'ar');
    syncLangBtn(); syncTheme();
    const status = $('.form-status'); if (status) { status.textContent = t(''); status.classList.remove('is-ok'); }
    toggle && I18N.setAttr(toggle, 'aria-label', toggle.getAttribute('aria-expanded') === 'true' ? 'Close menu' : 'Open menu');
  });
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  /* ---------- Navigation ---------- */
  const nav = $('[data-nav]');
  const onScrollNav = () => nav && nav.classList.toggle('is-scrolled', window.scrollY > 24);
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  const spyLinks = $$('[data-spy]');
  if (spyLinks.length) {
    const sections = spyLinks.map(a => document.getElementById(a.dataset.spy)).filter(Boolean);
    const spy = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        spyLinks.forEach(a => a.classList.toggle('is-active', a.dataset.spy === e.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));
  }

  /* ---------- Mobile menu ---------- */
  const toggle = $('.menu-toggle');
  const menu = $('#mobile-menu');
  if (toggle && menu) {
    const setOpen = open => {
      toggle.setAttribute('aria-expanded', String(open));
      I18N.setAttr(toggle, 'aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) {
        menu.hidden = false;
        requestAnimationFrame(() => menu.classList.add('is-open'));
        setTimeout(() => $('nav a', menu)?.focus(), 250);
      } else {
        menu.classList.remove('is-open');
        setTimeout(() => { if (!menu.classList.contains('is-open')) menu.hidden = true; }, reduced ? 0 : 600);
      }
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 1025px)').addEventListener('change', e => { if (e.matches) setOpen(false); });
  }

  /* ---------- Scroll reveal ---------- */
  const reveals = $$('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const sibs = Array.from(e.target.parentElement.children).filter(n => n.classList.contains('reveal'));
        const idx = Math.max(0, sibs.indexOf(e.target));
        e.target.style.setProperty('--d', `${Math.min(idx, 5) * 0.07}s`);
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(el => io.observe(el));
  }

  /* ---------- Pointer effects (desktop only) ---------- */
  if (finePointer && !reduced) {
    // Tilt with a light that follows the cursor
    $$('[data-tilt]').forEach(card => {
      const max = card.classList.contains('founder') ? 4 : 5;
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        card.style.setProperty('--ry', `${(x - 0.5) * max * 2}deg`);
        card.style.setProperty('--rx', `${(0.5 - y) * max * 2}deg`);
        card.style.setProperty('--lx', `${x * 100}%`);
        card.style.setProperty('--ly', `${y * 100}%`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg');
      });
    });

    // Magnetic buttons
    $$('[data-magnetic]').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const r = btn.getBoundingClientRect();
        btn.style.setProperty('--mx', `${(e.clientX - r.left - r.width / 2) * 0.18}px`);
        btn.style.setProperty('--my', `${(e.clientY - r.top - r.height / 2) * 0.28}px`);
      });
      btn.addEventListener('pointerleave', () => { btn.style.setProperty('--mx', '0px'); btn.style.setProperty('--my', '0px'); });
    });

    // Cursor: dot + trailing ring
    const cursor = $('.cursor');
    if (cursor) {
      document.body.classList.add('has-cursor');
      const dot = $('.cursor-dot', cursor), ring = $('.cursor-ring', cursor);
      let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
      window.addEventListener('pointermove', e => {
        x = e.clientX; y = e.clientY;
        dot.style.transform = `translate(${x}px, ${y}px)`;
        cursor.classList.remove('is-hidden');
      }, { passive: true });
      document.addEventListener('pointerleave', () => cursor.classList.add('is-hidden'));
      document.addEventListener('pointerover', e => {
        cursor.classList.toggle('is-hover', !!e.target.closest('a, button, [data-tilt], select, label, .plate'));
      });
      const loop = () => {
        rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
        ring.style.transform = `translate(${rx}px, ${ry}px)`;
        requestAnimationFrame(loop);
      };
      loop();
    }

    // Hero glow follows cursor
    const hero = $('.hero');
    const glow = $('.hero-glow');
    if (hero && glow) {
      hero.addEventListener('pointermove', e => {
        const r = hero.getBoundingClientRect();
        glow.style.setProperty('--gx', `${e.clientX - r.left}px`);
        glow.style.setProperty('--gy', `${e.clientY - r.top}px`);
      });
    }

    // Project previews tilt toward the cursor
    $$('[data-tilt-media]').forEach(media => {
      const inner = media.firstElementChild;
      if (!inner) return;
      media.addEventListener('pointermove', e => {
        const r = media.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        inner.style.setProperty('--ry', `${x * 8}deg`);
        inner.style.setProperty('--rx', `${-y * 6}deg`);
      });
      media.addEventListener('pointerleave', () => { inner.style.setProperty('--rx', '0deg'); inner.style.setProperty('--ry', '0deg'); });
    });
  }

  /* ---------- Project mockups: the desktop layout, zoomed to fit small cards ---------- */
  const fitMocks = () => {
    $$('.mock-rental, .mock-ats').forEach(mock => {
      const media = mock.parentElement;
      if (window.innerWidth > 600) { mock.style.zoom = ''; return; }
      const cs = getComputedStyle(media);
      const room = media.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const natural = mock.classList.contains('mock-ats') ? 800 : 760; // the widths set in styles.css
      mock.style.zoom = Math.min(1, room / natural).toFixed(3);
    });
  };
  fitMocks();
  window.addEventListener('resize', fitMocks);

  /* ---------- Touch screens: the same motion, driven by scrolling ---------- */
  if (!finePointer && !reduced) {
    document.body.classList.add('has-touch');
    const tilts = $$('[data-tilt]');
    const medias = $$('[data-tilt-media]');
    const deck = $$('.panel');
    const live = [...tilts, ...deck, ...$$('.pillar'), ...$$('.plan')];
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    let queued = false;
    const touchFx = () => {
      queued = false;
      const vh = window.innerHeight;
      // -1 above the middle of the screen .. 0 centred .. 1 below
      const offset = r => clamp(((r.top + r.height / 2) / vh - 0.5) * 2, -1, 1);
      tilts.forEach(card => {
        const r = card.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const d = offset(r);
        card.style.setProperty('--rx', `${(-d * 7).toFixed(2)}deg`);
        card.style.setProperty('--ry', `${(d * 3).toFixed(2)}deg`);
        card.style.setProperty('--lx', '50%');
        card.style.setProperty('--ly', `${((1 - d) * 50).toFixed(1)}%`);
      });
      medias.forEach(media => {
        const inner = media.firstElementChild;
        const r = media.getBoundingClientRect();
        if (!inner || r.bottom < 0 || r.top > vh) return;
        const d = offset(r);
        inner.style.setProperty('--rx', `${(-d * 9).toFixed(2)}deg`);
        inner.style.setProperty('--ry', `${(d * 6).toFixed(2)}deg`);
      });
      // the card in the middle of the screen plays its hover animation
      live.forEach(el => {
        const r = el.getBoundingClientRect();
        el.classList.toggle('is-live', r.top < vh * 0.64 && r.bottom > vh * 0.36);
      });
    };
    window.addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(touchFx); } }, { passive: true });
    window.addEventListener('resize', touchFx);
    touchFx();
  }

  /* ---------- Experience counters ---------- */
  $$('[data-count]').forEach(el => {
    const end = Number(el.dataset.count);
    if (reduced || !('IntersectionObserver' in window)) return;
    el.textContent = '0';
    const cio = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      cio.disconnect();
      const t0 = performance.now(), dur = 1600;
      const step = now => {
        const k = Math.min(1, (now - t0) / dur);
        el.textContent = String(Math.round(end * (1 - Math.pow(1 - k, 4))));
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.6 });
    cio.observe(el);
  });

  /* ---------- Testimonials (real entries from config only) ---------- */
  const voices = $('#testimonials');
  const quotes = (cfg.testimonials || []).filter(q => q && q.quote && q.name);
  if (voices && quotes.length) {
    const track = $('[data-carousel]', voices);
    const dots = $('[data-dots]', voices);
    const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
    const star = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2.8 2.8 5.8 6.4.9-4.6 4.5 1.1 6.3L12 17.3l-5.7 3 1.1-6.3-4.6-4.5 6.4-.9z"/></svg>';
    track.innerHTML = quotes.map((q, i) => {
      const initials = q.name.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase();
      const who = [q.role, q.company].filter(Boolean).map(esc).join(', ');
      const rating = Math.max(0, Math.min(5, Number(q.rating) || 0));
      return `<figure class="quote" role="group" aria-roledescription="slide" aria-label="${i + 1} / ${quotes.length}" ${q.lang ? `lang="${esc(q.lang)}" dir="${q.lang === 'ar' ? 'rtl' : 'ltr'}"` : ''}>
        <svg class="quote-mark" viewBox="0 0 32 32" aria-hidden="true"><path d="M13 8H7a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h3v4l4-4v-9a3 3 0 0 0-1-3Zm15 0h-6a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h3v4l4-4v-9a3 3 0 0 0-1-3Z"/></svg>
        ${rating ? `<div class="quote-stars" aria-label="${rating} / 5">${star.repeat(rating)}</div>` : ''}
        <blockquote>${esc(q.quote)}</blockquote>
        <footer>
          <span class="quote-avatar" aria-hidden="true">${q.avatar ? `<img src="${esc(root + q.avatar)}" alt="" loading="lazy">` : esc(initials)}</span>
          <span><span class="quote-name">${esc(q.name)}</span>${who ? `<br><span class="quote-role">${who}</span>` : ''}</span>
          ${q.project ? `<span class="quote-project">${esc(q.project)}</span>` : ''}
        </footer>
      </figure>`;
    }).join('');
    voices.hidden = false;
    const cardsEls = $$('.quote', track);
    dots.innerHTML = cardsEls.map((_, i) => `<button type="button" aria-label="${i + 1}"></button>`).join('');
    const dotBtns = $$('button', dots);
    const prev = $('[data-prev]', voices), next = $('[data-next]', voices);
    const stepSize = () => (cardsEls[1] ? Math.abs(cardsEls[1].offsetLeft - cardsEls[0].offsetLeft) : track.clientWidth);
    const dir = () => (doc.dir === 'rtl' ? -1 : 1);
    const go = d => track.scrollBy({ left: d * dir() * stepSize(), behavior: reduced ? 'auto' : 'smooth' });
    prev.addEventListener('click', () => go(-1));
    next.addEventListener('click', () => go(1));
    dotBtns.forEach((b, i) => b.addEventListener('click', () => cardsEls[i].scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest', inline: 'start' })));
    track.addEventListener('keydown', e => { if (e.key === 'ArrowRight') go(dir()); if (e.key === 'ArrowLeft') go(-dir()); });
    const vis = new IntersectionObserver(entries => {
      entries.forEach(e => e.target.classList.toggle('is-dim', e.intersectionRatio < 0.85));
      const firstVisible = cardsEls.findIndex(c => !c.classList.contains('is-dim'));
      dotBtns.forEach((b, i) => b.setAttribute('aria-current', String(i === Math.max(0, firstVisible))));
      const max = track.scrollWidth - track.clientWidth;
      const pos = Math.abs(track.scrollLeft);
      prev.disabled = pos < 4; next.disabled = pos > max - 4;
    }, { root: track, threshold: [0, 0.85, 1] });
    cardsEls.forEach(c => vis.observe(c));
    // Drag to scroll with a mouse; touch uses native swipe
    let dragX = null, startLeft = 0, moved = false;
    track.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; dragX = e.clientX; startLeft = track.scrollLeft; moved = false; track.classList.add('is-dragging'); });
    window.addEventListener('pointermove', e => { if (dragX === null) return; const dx = e.clientX - dragX; if (Math.abs(dx) > 4) moved = true; track.scrollLeft = startLeft - dx; });
    window.addEventListener('pointerup', () => { if (dragX === null) return; dragX = null; track.classList.remove('is-dragging'); if (moved) go(0); });
    // Gentle auto-advance, paused on hover, focus or reduced motion
    if (!reduced && quotes.length > 1) {
      let paused = false;
      ['pointerenter', 'focusin'].forEach(ev => voices.addEventListener(ev, () => { paused = true; }));
      ['pointerleave', 'focusout'].forEach(ev => voices.addEventListener(ev, () => { paused = false; }));
      setInterval(() => {
        if (paused || document.hidden) return;
        const max = track.scrollWidth - track.clientWidth;
        if (Math.abs(track.scrollLeft) >= max - 4) track.scrollTo({ left: 0, behavior: 'smooth' }); else go(1);
      }, 6500);
    }
  }

  /* ---------- Scroll-linked: work deck, system, timeline, CTA ---------- */
  const panels = $$('.panel');
  const system = $('[data-system]');
  const systemFill = $('.system-fill');
  const stages = $$('[data-stage]');
  const timeline = $('[data-timeline]');
  const steps = $$('.tl-step');
  const fill = $('.tl-fill');
  const ctaCore = $('.cta-core');
  const cta = $('.cta');
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const vh = window.innerHeight;
    // Each project panel recedes as the next one slides over it
    const stacking = !reduced;
    panels.forEach((p, i) => {
      const nextP = panels[i + 1];
      let s = 0;
      if (stacking && nextP) {
        const pr = p.getBoundingClientRect(), nr = nextP.getBoundingClientRect();
        s = Math.min(1, Math.max(0, 1 - (nr.top - pr.top) / pr.height));
      }
      p.style.setProperty('--shrink', s.toFixed(3));
      const r = p.getBoundingClientRect();
      p.classList.toggle('is-current', r.top < vh * 0.6 && r.bottom > vh * 0.3);
    });
    if (system && systemFill) {
      const r = system.getBoundingClientRect();
      const p = reduced ? 1 : Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (r.height + vh * 0.25)));
      systemFill.style.setProperty('--p', p.toFixed(4));
      stages.forEach((s, i) => s.classList.toggle('is-on', reduced || p >= (i / (stages.length - 1)) * 0.92));
    }
    if (timeline && fill) {
      const r = timeline.getBoundingClientRect();
      const p = reduced ? 1 : Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
      fill.parentElement.style.setProperty('--p', p.toFixed(4));
      fill.style.setProperty('--p', p.toFixed(4));
      const line = r.top + p * r.height;
      steps.forEach(s => {
        const sr = s.getBoundingClientRect();
        s.classList.toggle('is-active', reduced || sr.top + 40 <= line);
      });
    }
    if (cta && ctaCore && !reduced) {
      const r = cta.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, 1 - (r.top + r.height / 2 - vh / 2) / vh));
      ctaCore.style.setProperty('--core', (0.5 + p * 0.9).toFixed(3));
    }
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- Technology stack ---------- */
  const plates = $$('.plate');
  const rows = $$('[data-tech-list] > div');
  if (plates.length) {
    let current = 0, auto = null, userTouched = false;
    const activate = i => {
      current = i;
      plates.forEach(p => p.classList.toggle('is-active', Number(p.dataset.layer) === i));
      rows.forEach(r => r.classList.toggle('is-active', Number(r.dataset.layer) === i));
    };
    const stop = () => { userTouched = true; clearInterval(auto); };
    [...plates, ...rows].forEach(el => {
      el.addEventListener('pointerenter', () => { stop(); activate(Number(el.dataset.layer)); });
      el.addEventListener('click', () => { stop(); activate(Number(el.dataset.layer)); });
    });
    rows.forEach(r => { r.tabIndex = 0; r.addEventListener('focus', () => { stop(); activate(Number(r.dataset.layer)); }); });
    activate(0);
    if (!reduced) {
      const tio = new IntersectionObserver(([e]) => {
        clearInterval(auto);
        if (e.isIntersecting && !userTouched) auto = setInterval(() => activate((current + 1) % plates.length), 2200);
      }, { threshold: 0.3 });
      tio.observe($('.stack-viz'));
    }
  }

  /* ---------- Pricing → contact form preselect ---------- */
  $$('[data-plan]').forEach(a => a.addEventListener('click', () => {
    const sel = $('#f-type'); if (sel) sel.value = a.dataset.plan;
  }));

  /* ---------- Contact form ---------- */
  const form = $('[data-form]');
  if (form) {
    const status = $('.form-status', form);
    const required = ['name', 'email', 'type', 'details'];
    const validate = name => {
      const el = form.elements[name];
      const v = el.value.trim();
      const ok = name === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) : v.length > 0;
      const field = el.closest('.field');
      field.classList.toggle('has-error', !ok);
      el.setAttribute('aria-invalid', String(!ok));
      if (!ok) el.setAttribute('aria-describedby', `e-${name}`); else el.removeAttribute('aria-describedby');
      return ok;
    };
    required.forEach(n => form.elements[n].addEventListener('blur', () => { if (form.elements[n].value) validate(n); }));
    required.forEach(n => form.elements[n].addEventListener('input', () => { if (form.elements[n].closest('.has-error')) validate(n); }));

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const bad = required.filter(n => !validate(n));
      if (bad.length) { form.elements[bad[0]].focus(); status.textContent = t('Some details are missing. Check the highlighted fields.'); status.classList.remove('is-ok'); return; }
      const d = Object.fromEntries(new FormData(form));
      const lines = [
        'New project request',
        `Name: ${d.name}`,
        d.business ? `Business: ${d.business}` : null,
        `Email: ${d.email}`,
        d.phone ? `WhatsApp / phone: ${d.phone}` : null,
        `Project type: ${d.type}`,
        `Budget: ${d.budget || 'Not sure yet'}`,
        `Timeline: ${d.timeline || 'Flexible'}`,
        '', d.details,
      ].filter(v => v !== null).join('\n');
      const btn = $('button[type="submit"]', form);

      if (cfg.formEndpoint) {
        btn.setAttribute('aria-disabled', 'true'); status.textContent = t('Sending your request…');
        try {
          const res = await fetch(cfg.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(d) });
          if (!res.ok) throw new Error();
          form.reset(); status.textContent = t("Project request sent. We'll reply by email or WhatsApp."); status.classList.add('is-ok');
        } catch {
          status.textContent = t('The request did not send. Check your connection and try again, or message us on WhatsApp.');
        } finally { btn.removeAttribute('aria-disabled'); }
      } else if (urls.whatsapp) {
        window.open(`https://wa.me/${c.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(lines)}`, '_blank', 'noopener');
        status.textContent = t('WhatsApp opened with your request written out. Press send there to deliver it.'); status.classList.add('is-ok');
      } else if (urls.email) {
        location.href = `mailto:${c.email}?subject=${encodeURIComponent('Project request: ' + d.type)}&body=${encodeURIComponent(lines)}`;
        status.textContent = t('Your email app opened with the request written out. Press send there to deliver it.'); status.classList.add('is-ok');
      } else {
        status.textContent = t('Sending is not set up yet. Please reach us through another channel.');
        console.warn('Orafdev: add a WhatsApp number, email or formEndpoint in assets/js/config.js to enable the contact form.');
      }
    });
  }

  /* ---------- Page transitions between pages ---------- */
  if (veil && !reduced) {
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href]');
      if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || (url.pathname === location.pathname && url.hash)) return;
      if (url.pathname === location.pathname && !url.hash) return;
      e.preventDefault();
      try { sessionStorage.setItem('orafdev-nav', '1'); } catch (err) {}
      veil.classList.add('is-active');
      setTimeout(() => { location.href = url.href; }, 420);
    });
    window.addEventListener('pageshow', ev => { if (ev.persisted) veil.classList.remove('is-active'); });
  }

  /* ---------- WhatsApp float ---------- */
  const wa = $('.wa-float');
  if (wa) setTimeout(() => wa.classList.add('is-visible'), reduced ? 0 : 1600);

  /* ---------- Initial language + theme state ---------- */
  if (doc.lang === 'ar') I18N.apply('ar');
  syncLangBtn();
  syncTheme();
})();
