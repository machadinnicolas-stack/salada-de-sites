(() => {
  const N = window.NICHES;
  const ORDER = window.NICHE_ORDER;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const html = document.documentElement;
  const site = $('.site');
  const intro = $('.intro');
  const dock = $('.dock');
  const mindmap = $('[data-mindmap]');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const IMG_WIDTH = { hero: 1800, about: 900, space: 1000 };
  const GAL = [
    { cls: 'g-1', w: 900, speed: 0.08 },
    { cls: 'g-2', w: 800, speed: 0.12 },
    { cls: 'g-3', w: 700, speed: 0.1 },
    { cls: 'g-4', w: 1600, speed: 0.14 }
  ];
  const PILL_W = 320;
  const pinMQ = matchMedia('(min-width: 900px) and (min-height: 620px)');
  const listMQ = matchMedia('(max-width: 600px)');
  const ICON_RADIUS = { round: 32, arch: 20, square: 3, soft: 12 };
  const imgUrl = (id, w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
  const get = (obj, path) => path.split('.').reduce((a, k) => (a == null ? a : a[k]), obj);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = (n) => String(n).padStart(2, '0');
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const nextFrame = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  const icon = (name, cls = 'i') => `<svg class="${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;

  let current = null;
  let busy = false;
  let activeNode = 0;
  let mapDrawn = false;
  let statsCounted = reduceMotion;
  let stepIdx = 0;
  const M = { gap: 0, headerH: 76, mf: [] };
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const fmt = (v, d) => v.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });
  const statText = (s, v) => `${s.p || ''}${fmt(v, s.d || 0)}${s.s || ''}`;

  /* ---------- render ---------- */

  function applyNiche(key) {
    const d = N[key];
    current = key;
    site.dataset.niche = key;
    site.dataset.proof = d.proof.type;

    $$('[data-bind]', site).forEach((el) => { el.textContent = get(d, el.dataset.bind) ?? ''; });
    $$('img[data-src]', site).forEach((img) => {
      const slot = img.dataset.src;
      img.src = imgUrl(d.img[slot], IMG_WIDTH[slot]);
      img.alt = get(d, img.dataset.alt) || '';
    });
    $$('use[data-href]', site).forEach((u) => u.setAttribute('href', `#i-${get(d, u.dataset.href)}`));
    $$('[data-split]', site).forEach((el) => {
      el.innerHTML = String(get(d, el.dataset.split)).split(' ')
        .map((w, i) => `<span class="w"><span style="--wi:${i}">${esc(w)}</span></span>`).join(' ');
    });
    site.style.setProperty('--hero-pos', d.heroPos);
    site.dataset.hero = d.heroFit || 'cover';
    site.style.setProperty('--hero-bg', d.heroBg || 'var(--surface-2)');

    list('stats', d.stats.map((s) => `<li><span class="stat-n" data-n="${s.n}" data-d="${s.d || 0}" data-p="${esc(s.p || '')}" data-s="${esc(s.s || '')}">${esc(statText(s, statsCounted ? s.n : 0))}</span><span class="stat-l">${esc(s.l)}</span></li>`));
    list('aboutText', d.about.text.map((p) => `<p>${esc(p)}</p>`));
    list('creds', d.about.creds.map((c) => `<li>${icon('check')}${esc(c)}</li>`));
    const pillIds = d.gallery.imgs.map(([id]) => id);
    list('mfA', marqueeRow(d.manifesto.a, [pillIds[1], pillIds[2]]));
    list('mfB', marqueeRow(d.manifesto.b, [pillIds[0], pillIds[3]]));
    const total = d.steps.items.length;
    list('steps', d.steps.items.map((s, i) => `<li class="steps-item${stepClass(i)}"><span class="steps-n">${pad(i + 1)}</span><strong>${esc(s.t)}</strong></li>`));
    list('stepCards', d.steps.items.map((s, i) => `<div class="step-card${stepClass(i)}"><span class="step-big" aria-hidden="true">${pad(i + 1)}</span><span class="step-count">Etapa ${i + 1} de ${total}</span><h3 class="display">${esc(s.t)}</h3><p>${esc(s.d)}</p></div>`));
    list('gallery', [
      ...d.gallery.imgs.map(([id, alt], i) => `<figure class="g-tile ${GAL[i].cls}" style="--k:${i}"><div class="g-inner"><div class="g-img" data-speed="${GAL[i].speed}"><img src="${imgUrl(id, GAL[i].w)}" alt="${esc(alt)}" loading="lazy"></div></div></figure>`),
      `<div class="g-tile g-note" style="--k:4"><div class="g-inner"><p class="display">${esc(d.gallery.note)}</p><span class="g-addr">${icon('pin')}${esc(d.contact.district)}</span></div></div>`
    ]);
    list('proof', d.proof.items.map((p) => (d.proof.type === 'testimonials'
      ? `<article class="proof-card"><p class="proof-k">${esc(p.k)}</p><blockquote class="proof-q">${esc(p.q)}</blockquote><footer class="proof-meta"><span class="avatar" aria-hidden="true">${esc(p.n[0])}</span><span><strong>${esc(p.n)}</strong><small>${esc(p.m)}</small></span></footer></article>`
      : `<article class="proof-card"><p class="proof-k">${esc(p.k)}</p><h3 class="proof-q">${esc(p.q)}</h3><a class="link-arrow js-demo-cta" href="#contato" data-toast="Demonstração: no site real, aqui abre o artigo completo.">Ler artigo ${icon('arrow')}</a></article>`)));
    list('faq', d.faq.map(([q, a], i) => `<details class="faq-item"${i === 0 ? ' open' : ''}><summary><span>${esc(q)}</span><span class="faq-icon" aria-hidden="true"></span></summary><div class="faq-a"><p>${esc(a)}</p></div></details>`));

    renderMap(d);

    document.title = `${d.brand.name} · ${d.brand.role}`;
    $('meta[name="theme-color"]').content = d.theme.bg;
    setFavicon(d);
    $$('.dock-btn').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.niche === key)));
    measure();
    runFx();
  }

  // favicon com o monograma do profissional, no formato de cada nicho
  function setFavicon(d) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="${ICON_RADIUS[d.shape]}" fill="${d.theme.color}"/><text x="32" y="41" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="700" fill="#FFFFFF">${esc(d.brand.mono)}</text></svg>`;
    $('link[rel="icon"]').href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }

  function marqueeRow(parts, pills) {
    const unit = parts.map((t, i) => `<span class="mf-text">${esc(t)}</span><span class="mf-pill"><img src="${imgUrl(pills[i % pills.length], PILL_W)}" alt="" loading="lazy"></span>`).join('');
    return [unit, unit, unit, unit];
  }

  function stepClass(i) {
    return `${i === stepIdx ? ' is-active' : ''}${i < stepIdx ? ' is-past is-done' : ''}`;
  }

  function list(name, items) {
    const el = $(`[data-list="${name}"]`, site);
    if (el) el.innerHTML = items.join('');
  }

  /* ---------- mapa mental ---------- */

  function renderMap(d) {
    list('mapNodes', d.map.items.map((it, i) => `<div class="mm-node" style="--d:${i * 90}ms"><button type="button" class="mm-btn" data-i="${i}" style="--i:${i}" aria-pressed="false"><span class="mm-idx">${pad(i + 1)}</span><span>${esc(it.t)}</span></button></div>`));
    layoutMap();
    setActive(activeNode, false);
  }

  function layoutMap() {
    const nodes = $$('.mm-node', mindmap);
    const svg = $('.mm-svg', mindmap);
    // no celular o CSS mostra os ramos como lista, sem posições nem linhas
    if (listMQ.matches) {
      nodes.forEach((n) => { n.style.left = ''; n.style.top = ''; });
      svg.innerHTML = '';
      return;
    }
    const w = mindmap.clientWidth;
    const h = mindmap.clientHeight;
    if (!w || !h) return;
    const cx = w / 2;
    const cy = h / 2;
    const nw = Math.max(...nodes.map((n) => n.offsetWidth));
    const nh = Math.max(...nodes.map((n) => n.offsetHeight));
    const ox = w / 2 - nw / 2 - 6;
    const oy = h / 2 - nh / 2 - 10;
    const pts = [[-ox, -oy * 0.5], [0, -oy], [ox, -oy * 0.5], [ox, oy * 0.5], [0, oy], [-ox, oy * 0.5]].map(([x, y]) => [cx + x, cy + y]);

    const center = $('.mm-center', mindmap);
    center.style.left = `${cx}px`;
    center.style.top = `${cy}px`;
    nodes.forEach((n, i) => { n.style.left = `${pts[i][0]}px`; n.style.top = `${pts[i][1]}px`; });

    const curve = (x2, y2) => {
      const mx = (cx + x2) / 2;
      return `M${cx} ${cy} C ${mx} ${cy}, ${mx} ${y2}, ${x2} ${y2}`;
    };

    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svg.innerHTML = pts.map(([x, y], i) => {
      const p = curve(x, y);
      return `<g class="mm-edge" data-i="${i}" style="--i:${i}"><path class="mm-link" pathLength="1" d="${p}"/><path class="mm-flow" d="${p}"/><circle class="mm-dot" r="3"><animateMotion dur="${(2.4 + i * 0.3).toFixed(1)}s" begin="${(-i * 0.6).toFixed(1)}s" repeatCount="indefinite" path="${p}"/></circle></g>`;
    }).join('');
    highlight(activeNode);
  }

  function highlight(i, hover) {
    $$('.mm-edge', mindmap).forEach((g) => g.classList.toggle('is-hot', +g.dataset.i === i || +g.dataset.i === hover));
  }

  function setActive(i, animate) {
    activeNode = i;
    const item = N[current].map.items[i];
    $$('.mm-btn', mindmap).forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.i === i)));
    highlight(i);
    const box = $('.mm-detail');
    $('.mm-detail-n', box).textContent = `${pad(i + 1)} / ${pad(N[current].map.items.length)}`;
    $('.mm-detail-t', box).textContent = item.t;
    $('.mm-detail-d', box).textContent = item.d;
    $('.mm-tags', box).innerHTML = item.tags.map((t) => `<li>${esc(t)}</li>`).join('');
    if (animate && !reduceMotion) {
      box.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.16,1,.3,1)' });
    }
  }

  mindmap.addEventListener('click', (e) => {
    const b = e.target.closest('.mm-btn');
    if (b) setActive(+b.dataset.i, true);
  });
  mindmap.addEventListener('pointerover', (e) => {
    const b = e.target.closest('.mm-btn');
    highlight(activeNode, b ? +b.dataset.i : undefined);
  });
  mindmap.addEventListener('pointerleave', () => highlight(activeNode));

  let lastWidth = 0;
  new ResizeObserver(() => {
    if (mindmap.clientWidth === lastWidth) return;
    lastWidth = mindmap.clientWidth;
    layoutMap();
  }).observe(mindmap);
  listMQ.addEventListener('change', layoutMap);

  function drawMap() {
    if (mapDrawn) return;
    mapDrawn = true;
    mindmap.classList.add('is-drawn');
    setTimeout(() => mindmap.classList.add('is-static'), 2000);
  }

  /* ---------- scroll reveal / header ---------- */

  function onReveal(el) {
    el.classList.add('is-visible');
    if (el === mindmap) drawMap();
    if (el.matches('.stats')) countUp();
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      onReveal(e.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal, .reveal-group', site).forEach((el) => (reduceMotion ? onReveal(el) : io.observe(el)));

  function countUp() {
    if (statsCounted) return;
    statsCounted = true;
    const els = $$('.stat-n', site);
    const t0 = performance.now();
    (function step(now) {
      const t = Math.min(1, (now - t0) / 1800);
      const e = 1 - Math.pow(1 - t, 4);
      els.forEach((el) => { el.textContent = `${el.dataset.p}${fmt(+el.dataset.n * e, +el.dataset.d)}${el.dataset.s}`; });
      if (t < 1) requestAnimationFrame(step);
    })(t0);
  }

  const header = $('.site-header');

  /* ---------- efeitos de rolagem ---------- */

  function measure() {
    const head = $('.hero-head', site);
    M.gap = head.getBoundingClientRect().left + parseFloat(getComputedStyle(head).paddingLeft);
    M.headerH = header.offsetHeight;
    M.mf = $$('.mf-row', site).map((row) => ({
      row,
      track: row.firstElementChild,
      dir: +row.dataset.dir,
      range: Math.max(0, row.firstElementChild.scrollWidth - row.clientWidth)
    }));
  }

  function heroFx(vh) {
    const win = $('[data-hero-window]', site);
    const r = win.getBoundingClientRect();
    if (r.bottom < -40 || r.top > vh + 40) return;
    const p = clamp(scrollY / Math.max(1, r.top + scrollY - M.headerH - 24), 0, 1);
    const q = 1 - p;
    const gap = M.gap * q;
    const w = r.width - gap * 2;
    let round;
    switch (N[current].shape) {
      case 'arch': {
        const rx = (w / 2) * q;
        const ry = Math.min(r.height * 0.62, w / 2) * q;
        const rb = 28 * q;
        round = `${rx.toFixed(1)}px ${rx.toFixed(1)}px ${rb}px ${rb}px / ${ry.toFixed(1)}px ${ry.toFixed(1)}px ${rb}px ${rb}px`;
        break;
      }
      case 'square': round = `${(2 * q).toFixed(1)}px`; break;
      case 'soft': round = `${(14 * q).toFixed(1)}px`; break;
      default: round = `${(36 * q).toFixed(1)}px`;
    }
    win.style.clipPath = `inset(0 ${gap.toFixed(1)}px round ${round})`;
    if (reduceMotion) return;
    const lim = r.height * 0.07;
    const ty = clamp(-(r.top - M.headerH) * 0.12, -lim, lim);
    $('.hero-img', site).style.transform = `translate3d(0, ${ty.toFixed(1)}px, 0) scale(${(1.14 - 0.14 * p).toFixed(4)})`;
  }

  function marqueeFx(vh) {
    M.mf.forEach(({ row, track, dir, range }) => {
      const r = row.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const p = clamp((vh - r.top) / (vh + r.height), 0, 1);
      const x = dir < 0 ? -range * (0.12 + 0.46 * p) : -range * (0.58 - 0.46 * p);
      track.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
    });
  }

  function stepsFx(vh) {
    if (!pinMQ.matches) return;
    const track = $('[data-steps]', site);
    const r = track.getBoundingClientRect();
    const pinH = vh - M.headerH;
    const p = clamp((M.headerH - r.top) / Math.max(1, r.height - pinH), 0, 1);
    track.style.setProperty('--sp', p.toFixed(4));
    const count = N[current].steps.items.length;
    const idx = Math.min(count - 1, Math.floor(p * count));
    if (idx === stepIdx) return;
    stepIdx = idx;
    $$('.steps-item', site).forEach((li, i) => { li.classList.toggle('is-active', i === idx); li.classList.toggle('is-done', i < idx); });
    $$('.step-card', site).forEach((c, i) => { c.classList.toggle('is-active', i === idx); c.classList.toggle('is-past', i < idx); });
  }

  function parallaxFx(vh) {
    $$('[data-speed]', site).forEach((el) => {
      const box = el.parentElement.getBoundingClientRect();
      if (box.bottom < -100 || box.top > vh + 100) return;
      const c = box.top + box.height / 2 - vh / 2;
      const lim = box.height * 0.1;
      el.style.transform = `translate3d(0, ${clamp(-c * +el.dataset.speed, -lim, lim).toFixed(1)}px, 0)`;
    });
  }

  function runFx() {
    const vh = innerHeight;
    header.classList.toggle('is-scrolled', scrollY > 8);
    heroFx(vh);
    stepsFx(vh);
    if (reduceMotion) return;
    marqueeFx(vh);
    parallaxFx(vh);
  }

  let fxQueued = false;
  const queueFx = () => {
    if (fxQueued) return;
    fxQueued = true;
    requestAnimationFrame(() => { fxQueued = false; runFx(); });
  };
  addEventListener('scroll', queueFx, { passive: true });
  addEventListener('resize', () => { measure(); queueFx(); });
  document.fonts?.ready.then(() => { measure(); queueFx(); });

  const galleryEl = $('[data-list="gallery"]', site);
  galleryEl.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' || reduceMotion) return;
    const inner = e.target.closest('.g-inner');
    if (!inner) return;
    const r = inner.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    inner.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
  });
  galleryEl.addEventListener('pointerout', (e) => {
    const inner = e.target.closest('.g-inner');
    if (inner && !inner.contains(e.relatedTarget)) inner.style.transform = '';
  });

  /* ---------- toast (CTAs de demonstração) ---------- */

  const toastEl = $('.toast');
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3000);
  }
  document.addEventListener('click', (e) => {
    const a = e.target.closest('.js-demo-cta');
    if (!a) return;
    e.preventDefault();
    toast(a.dataset.toast || 'Demonstração: no site real, este botão abre o WhatsApp do profissional.');
  });

  /* ---------- pré-carregamento ---------- */

  const decoded = {};
  function nicheImages(key, coreOnly) {
    const d = N[key];
    const urls = Object.keys(IMG_WIDTH).map((slot) => imgUrl(d.img[slot], IMG_WIDTH[slot]));
    if (coreOnly) return urls;
    return urls.concat(
      d.gallery.imgs.map(([id], i) => imgUrl(id, GAL[i].w)),
      d.gallery.imgs.map(([id]) => imgUrl(id, PILL_W))
    );
  }
  function preload(key, coreOnly) {
    const imgs = nicheImages(key, coreOnly).map((url) => {
      if (!decoded[url]) {
        const im = new Image();
        im.src = url;
        decoded[url] = im.decode().catch(() => {});
      }
      return decoded[url];
    });
    const fonts = document.fonts ? [document.fonts.load(N[key].font), document.fonts.load('500 11px "IBM Plex Mono"')] : [];
    return Promise.race([Promise.all([...imgs, ...fonts]), wait(2500)]);
  }

  /* ---------- efeito scanner ---------- */

  function stickyOffsets(root) {
    return $$('.steps-pin', root).map((el) => {
      const stuck = el.getBoundingClientRect().top;
      el.style.position = 'relative';
      const offset = stuck - el.getBoundingClientRect().top;
      el.style.position = '';
      return offset;
    });
  }

  function snapshotSite() {
    const offsets = stickyOffsets(site);
    const clone = site.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.inert = true;
    $$('[id]', clone).forEach((el) => el.removeAttribute('id'));
    $$('.steps-pin', clone).forEach((el, i) => {
      el.style.position = 'relative';
      el.style.top = `${offsets[i]}px`;
    });
    const layer = document.createElement('div');
    layer.className = 'scan-layer';
    const inner = document.createElement('div');
    inner.className = 'scan-inner';
    inner.appendChild(clone);
    layer.appendChild(inner);
    const hdr = $('.site-header', clone);
    hdr.style.position = 'absolute';
    const sync = () => {
      inner.style.transform = `translate3d(0, ${-scrollY}px, 0)`;
      hdr.style.top = `${scrollY}px`;
    };
    sync();
    document.body.appendChild(layer);
    addEventListener('scroll', sync, { passive: true });
    layer.cleanup = () => { removeEventListener('scroll', sync); layer.remove(); };
    return layer;
  }

  const GLYPHS = '01<>/\\|+=#*:';
  const TRAIL = 170;

  function makeWave(W) {
    const A = Math.max(10, Math.min(26, W * 0.018));
    const k1 = (Math.PI * 2) / (W * 0.55);
    const k2 = (Math.PI * 2) / (W * 0.21);
    return (x, base, time, env) => base + env * (A * Math.sin(x * k1 + time * 0.0032) + A * 0.45 * Math.sin(x * k2 - time * 0.0051));
  }

  function rgba(hex, a) {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${n >> 16}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
  }

  function linePath(xs, ys, dy = 0) {
    const p = new Path2D();
    xs.forEach((x, i) => (i ? p.lineTo(x, ys[i] + dy) : p.moveTo(x, ys[i] + dy)));
    return p;
  }

  function drawBeam(ctx, s) {
    const { W, H, xs, ys, base, color, time, env, wave } = s;
    ctx.clearRect(0, 0, W, H);

    const trail = new Path2D();
    xs.forEach((x, i) => (i ? trail.lineTo(x, ys[i]) : trail.moveTo(x, ys[i])));
    for (let i = xs.length - 1; i >= 0; i--) trail.lineTo(xs[i], ys[i] + TRAIL);
    trail.closePath();
    const grad = ctx.createLinearGradient(0, base - 30, 0, base + TRAIL);
    grad.addColorStop(0, rgba(color, 0.26));
    grad.addColorStop(1, rgba(color, 0));
    ctx.fillStyle = grad;
    ctx.fill(trail);

    ctx.save();
    ctx.clip(trail);
    for (let y = Math.floor(base - 40); y < base + TRAIL; y += 4) {
      ctx.fillStyle = rgba(color, 0.12 * Math.max(0, 1 - (y - base) / TRAIL));
      ctx.fillRect(0, y, W, 1);
    }
    ctx.restore();

    for (let i = 1; i <= 3; i++) {
      const echo = xs.map((x) => wave(x, base, time - i * 160, env * (1 - i * 0.16)));
      ctx.strokeStyle = rgba(color, 0.55 - i * 0.13);
      ctx.lineWidth = 1.3;
      ctx.stroke(linePath(xs, echo, i * 22));
    }

    const main = linePath(xs, ys);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    [[36, 0.07], [16, 0.14], [7, 0.3], [2.6, 1]].forEach(([w, a]) => {
      ctx.strokeStyle = rgba(color, a);
      ctx.lineWidth = w;
      ctx.stroke(main);
    });
    ctx.strokeStyle = 'rgba(255, 255, 255, .9)';
    ctx.lineWidth = 1;
    ctx.stroke(main);

    ctx.fillStyle = color;
    for (let i = 0; i < 260; i++) {
      const x = Math.random() * W;
      const r = Math.random();
      const dy = r * r * 90;
      ctx.globalAlpha = (1 - dy / 90) * (0.3 + Math.random() * 0.6);
      const sz = Math.random() < 0.8 ? 2 : 3;
      ctx.fillRect(x, wave(x, base, time, env) - 5 - dy, sz, sz);
    }
    for (let i = 0; i < 28; i++) {
      const x = Math.random() * W;
      ctx.globalAlpha = 0.2 + Math.random() * 0.4;
      ctx.fillRect(x, wave(x, base, time, env) - 3 - Math.random() * 24, 8 + Math.random() * 46, 1);
    }
    ctx.font = '500 10px "IBM Plex Mono", monospace';
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * W;
      const r = Math.random();
      ctx.globalAlpha = (1 - r * r) * 0.7;
      ctx.fillText(GLYPHS[(Math.random() * GLYPHS.length) | 0], x, wave(x, base, time, env) - 8 - r * r * 70);
    }
    ctx.globalAlpha = 1;
  }

  function scan(layer, key) {
    const d = N[key];
    if (reduceMotion) {
      return layer.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: 'forwards' }).finished;
    }
    return new Promise((resolve) => {
      const color = d.theme.beam;
      const W = html.clientWidth;
      const H = innerHeight;
      const dpr = Math.min(devicePixelRatio || 1, 2);

      const canvas = document.createElement('canvas');
      canvas.className = 'scan-canvas';
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      const tag = document.createElement('div');
      tag.className = 'scan-tag';
      tag.textContent = d.area;
      tag.style.setProperty('--beam', color);
      document.body.append(canvas, tag);
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);

      const wave = makeWave(W);
      const step = Math.max(10, Math.round(W / 72));
      const xs = [];
      for (let x = 0; x < W; x += step) xs.push(x);
      xs.push(W);
      const margin = 70;
      const tagW = tag.offsetWidth;
      const tagX = W - tagW - Math.min(40, W * 0.05);
      const duration = 1700;
      const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
      const t0 = performance.now();

      function tick(now) {
        const t = Math.min(1, (now - t0) / duration);
        const time = now - t0;
        const base = H + margin - ease(t) * (H + margin * 2);
        const env = 0.55 + 0.45 * Math.sin(Math.PI * t);
        const ys = xs.map((x) => wave(x, base, time, env));

        let poly = `polygon(0px 0px, ${W}px 0px`;
        for (let i = xs.length - 1; i >= 0; i--) poly += `, ${xs[i]}px ${ys[i].toFixed(1)}px`;
        layer.style.clipPath = `${poly})`;

        drawBeam(ctx, { W, H, xs, ys, base, color, time, env, wave });
        tag.style.transform = `translate3d(${tagX}px, ${wave(tagX + tagW / 2, base, time, env) + 20}px, 0)`;

        if (t < 1) {
          requestAnimationFrame(tick);
        } else {
          canvas.classList.add('out');
          tag.classList.add('out');
          setTimeout(() => { canvas.remove(); tag.remove(); }, 400);
          resolve();
        }
      }
      requestAnimationFrame(tick);
    });
  }

  /* ---------- troca de nicho ---------- */

  async function switchTo(key) {
    if (busy || key === current) return;
    busy = true;
    dock.classList.add('busy');
    await preload(key);
    const layer = snapshotSite();
    site.classList.add('no-trans');
    applyNiche(key);
    if (mapDrawn) mindmap.classList.add('is-static');
    await nextFrame();
    await scan(layer, key);
    layer.cleanup();
    site.classList.remove('no-trans');
    dock.classList.remove('busy');
    busy = false;
  }

  async function enterFromIntro(key, btn) {
    if (busy) return;
    busy = true;
    btn.classList.add('is-picked');
    intro.classList.add('is-leaving');
    await preload(key);
    site.classList.add('no-trans');
    applyNiche(key);
    await nextFrame();
    await scan(intro, key);
    intro.remove();
    html.classList.remove('intro-open');
    site.classList.remove('no-trans');
    showDock();
    $('.hero-title').focus({ preventScroll: true });
    busy = false;
  }

  function showDock() {
    dock.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => dock.classList.add('show')));
  }

  /* ---------- montagem ---------- */

  $('.intro-opts').innerHTML = ORDER.map((key) => {
    const d = N[key];
    const sw = { dentista: ['#0B6A93', '#D6EAF2', '#E3928B'], psicologo: ['#5A4677', '#E6DEF0', '#D69C57'], advogado: ['#6B1E2B', '#E6E3DC', '#A8894D'], contador: ['#17664A', '#D8EADF', '#E2C443'] }[key];
    const desc = { dentista: 'Clínico, leve e fresco', psicologo: 'Acolhedor e calmo', advogado: 'Clássico e sóbrio', contador: 'Preciso e moderno' }[key];
    return `<div class="intro-opt-wrap"><div class="intro-float"><button type="button" class="intro-opt" data-niche="${key}" style="--c:${d.theme.color}">
      <span class="intro-opt-top"><span class="intro-opt-icon">${icon(d.icon)}</span>${icon('arrow', 'i i-go')}</span>
      <span><strong>${esc(d.label)}</strong><small>${esc(desc)}</small></span>
      <span class="intro-swatch" aria-hidden="true">${sw.map((c) => `<i style="background:${c}"></i>`).join('')}</span>
    </button></div></div>`;
  }).join('');

  dock.insertAdjacentHTML('beforeend', ORDER.map((key) => {
    const d = N[key];
    return `<button type="button" class="dock-btn" data-niche="${key}" style="--c:${d.theme.color}" aria-pressed="false">${icon(d.icon)}<span>${esc(d.label)}</span></button>`;
  }).join(''));

  intro.addEventListener('click', (e) => {
    const b = e.target.closest('.intro-opt');
    if (b) enterFromIntro(b.dataset.niche, b);
  });
  dock.addEventListener('click', (e) => {
    const b = e.target.closest('.dock-btn');
    if (b) switchTo(b.dataset.niche);
  });

  const params = new URLSearchParams(location.search);
  const start = params.get('nicho');
  const demoOff = params.get('demo') === 'off';

  if (N[start]) {
    intro.remove();
    html.classList.remove('intro-open');
    applyNiche(start);
    if (!demoOff) showDock();
  } else {
    applyNiche(ORDER[0]);
  }
  if (demoOff) dock.remove();

  const warmUp = () => {
    ORDER.forEach((key) => preload(key, true));
    setTimeout(() => ORDER.forEach((key) => preload(key)), 4000);
  };
  if ('requestIdleCallback' in window) requestIdleCallback(warmUp, { timeout: 2500 });
  else setTimeout(warmUp, 1200);
})();
