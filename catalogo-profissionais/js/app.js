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

  const IMG_WIDTH = { hero: 1100, about: 900, space: 1000 };
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

    list('trust', d.trust.map(([k, v]) => `<li><span class="trust-k">${esc(k)}</span><span class="trust-v">${esc(v)}</span></li>`));
    list('aboutText', d.about.text.map((p) => `<p>${esc(p)}</p>`));
    list('creds', d.about.creds.map((c) => `<li>${icon('check')}${esc(c)}</li>`));
    list('steps', d.steps.items.map((s, i) => `<li class="step"><span class="step-n">${pad(i + 1)}</span><h3 class="display">${esc(s.t)}</h3><p>${esc(s.d)}</p></li>`));
    list('proof', d.proof.items.map((p) => (d.proof.type === 'testimonials'
      ? `<article class="proof-card"><p class="proof-k">${esc(p.k)}</p><blockquote class="proof-q">${esc(p.q)}</blockquote><footer class="proof-meta"><span class="avatar" aria-hidden="true">${esc(p.n[0])}</span><span><strong>${esc(p.n)}</strong><small>${esc(p.m)}</small></span></footer></article>`
      : `<article class="proof-card"><p class="proof-k">${esc(p.k)}</p><h3 class="proof-q">${esc(p.q)}</h3><a class="link-arrow js-demo-cta" href="#contato" data-toast="Demonstração: no site real, aqui abre o artigo completo.">Ler artigo ${icon('arrow')}</a></article>`)));
    list('faq', d.faq.map(([q, a], i) => `<details class="faq-item"${i === 0 ? ' open' : ''}><summary><span>${esc(q)}</span><span class="faq-icon" aria-hidden="true"></span></summary><div class="faq-a"><p>${esc(a)}</p></div></details>`));

    renderMap(d);

    document.title = `${d.brand.name} · ${d.brand.role}`;
    $('meta[name="theme-color"]').content = d.theme.bg;
    $$('.dock-btn').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.niche === key)));
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
    const w = mindmap.clientWidth;
    const h = mindmap.clientHeight;
    if (!w || !h) return;
    const nodes = $$('.mm-node', mindmap);
    const compact = w < 520;
    let cx, cy, pts;

    if (compact) {
      cx = w / 2;
      cy = 64;
      const cols = [w * 0.26, w * 0.74];
      const top = 180;
      const gap = (h - top - 44) / 2;
      pts = nodes.map((_, i) => [cols[i % 2], top + Math.floor(i / 2) * gap]);
    } else {
      cx = w / 2;
      cy = h / 2;
      const nw = Math.max(...nodes.map((n) => n.offsetWidth));
      const nh = Math.max(...nodes.map((n) => n.offsetHeight));
      const ox = w / 2 - nw / 2 - 6;
      const oy = h / 2 - nh / 2 - 10;
      pts = [[-ox, -oy * 0.5], [0, -oy], [ox, -oy * 0.5], [ox, oy * 0.5], [0, oy], [-ox, oy * 0.5]].map(([x, y]) => [cx + x, cy + y]);
    }

    const center = $('.mm-center', mindmap);
    center.style.left = `${cx}px`;
    center.style.top = `${cy}px`;
    nodes.forEach((n, i) => { n.style.left = `${pts[i][0]}px`; n.style.top = `${pts[i][1]}px`; });

    const curve = (x2, y2) => {
      if (compact) {
        const my = (cy + y2) / 2;
        return `M${cx} ${cy} C ${cx} ${my}, ${x2} ${my}, ${x2} ${y2}`;
      }
      const mx = (cx + x2) / 2;
      return `M${cx} ${cy} C ${mx} ${cy}, ${mx} ${y2}, ${x2} ${y2}`;
    };

    const svg = $('.mm-svg', mindmap);
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

  function drawMap() {
    if (mapDrawn) return;
    mapDrawn = true;
    mindmap.classList.add('is-drawn');
    setTimeout(() => mindmap.classList.add('is-static'), 2000);
  }

  /* ---------- scroll reveal / header ---------- */

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
      if (e.target === mindmap) drawMap();
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal', site).forEach((el) => {
    if (reduceMotion) {
      el.classList.add('is-visible');
      if (el === mindmap) drawMap();
    } else {
      io.observe(el);
    }
  });

  const header = $('.site-header');
  const onScroll = () => header.classList.toggle('is-scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

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
  function preload(key) {
    const d = N[key];
    const imgs = Object.keys(IMG_WIDTH).map((slot) => {
      const url = imgUrl(d.img[slot], IMG_WIDTH[slot]);
      if (!decoded[url]) {
        const im = new Image();
        im.src = url;
        decoded[url] = im.decode().catch(() => {});
      }
      return decoded[url];
    });
    const fonts = document.fonts ? [document.fonts.load(d.font), document.fonts.load('500 11px "IBM Plex Mono"')] : [];
    return Promise.race([Promise.all([...imgs, ...fonts]), wait(2500)]);
  }

  /* ---------- efeito scanner ---------- */

  function snapshotSite() {
    const clone = site.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.inert = true;
    $$('[id]', clone).forEach((el) => el.removeAttribute('id'));
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
    const sw = { dentista: ['#177E9E', '#DCEFF5', '#E8917E'], psicologo: ['#5E7351', '#EFE7DA', '#C97B5E'], advogado: ['#1F3A2A', '#F2EEE3', '#B38F2E'], contador: ['#1D3A5C', '#E0E8F1', '#C9A227'] }[key];
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

  const warmUp = () => ORDER.forEach(preload);
  if ('requestIdleCallback' in window) requestIdleCallback(warmUp, { timeout: 2500 });
  else setTimeout(warmUp, 1200);
})();
