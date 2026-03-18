/* ===================================================
   DESIGN 3 — GLASSMORPHISM JS (v3)
   + Hamburger menu / drawer
   + Theme toggle dark/light con localStorage
   + FAB scroll-to-top
   + Contadores, reveal, tilt, nav activo
=================================================== */

(function () {
  'use strict';

  /* ══════════════════════════════
     1. THEME — dark / light
  ══════════════════════════════ */
  const html        = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const STORAGE_KEY = 'ra-theme';

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  applyTheme(saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  /* ══════════════════════════════
     2. HAMBURGER MENU / DRAWER
  ══════════════════════════════ */
  const menuToggle = document.getElementById('menuToggle');
  const navDrawer  = document.getElementById('navDrawer');
  const navOverlay = document.getElementById('navOverlay');
  let drawerOpen   = false;

  function openDrawer() {
    drawerOpen = true;
    navDrawer.classList.add('open');
    navOverlay.classList.add('open');
    menuToggle.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
    navDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';   // bloquea scroll de fondo
  }

  function closeDrawer() {
    drawerOpen = false;
    navDrawer.classList.remove('open');
    navOverlay.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    navDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', () => drawerOpen ? closeDrawer() : openDrawer());
  }

  // Cerrar al tocar el overlay
  if (navOverlay) {
    navOverlay.addEventListener('click', closeDrawer);
  }

  // Cerrar al hacer click en cualquier link del drawer
  document.querySelectorAll('.drawer-link, .drawer-cv').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && drawerOpen) closeDrawer();
  });

  /* ══════════════════════════════
     3. FAB scroll-to-top
  ══════════════════════════════ */
  const fab = document.getElementById('fabTop');
  if (fab) {
    window.addEventListener('scroll', () => {
      fab.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    fab.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ══════════════════════════════
     4. SCROLL PROGRESS BAR
  ══════════════════════════════ */
  const scrollBar = document.getElementById('scrollBar');
  window.addEventListener('scroll', () => {
    if (!scrollBar) return;
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    scrollBar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });

  /* ══════════════════════════════
     5. CURSOR GLOW suave
  ══════════════════════════════ */
  const glow = document.getElementById('cursorGlow');
  let gx = window.innerWidth / 2, gy = window.innerHeight / 2;
  let tx = gx, ty = gy;
  document.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; }, { passive: true });
  if (glow) {
    (function animGlow() {
      gx += (tx - gx) * 0.08;
      gy += (ty - gy) * 0.08;
      glow.style.left = gx + 'px';
      glow.style.top  = gy + 'px';
      requestAnimationFrame(animGlow);
    })();
  }

  /* ══════════════════════════════
     6. SCROLL REVEAL con stagger
  ══════════════════════════════ */
  const revealIo = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.style.opacity    = '1';
          e.target.style.transform  = 'translateY(0)';
          e.target.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
        }, (i % 5) * 80);
        revealIo.unobserve(e.target);
      }
    });
  }, { threshold: 0.07 });

  document.querySelectorAll('.glass, .proj-card3, .stat-pill, .exp-card3, .about-grid3, .skill-card3').forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    revealIo.observe(el);
  });

  /* ══════════════════════════════
     7. TILT 3D en cards
  ══════════════════════════════ */
  document.querySelectorAll('.glass, .proj-card3, .exp-card3').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform  = `translateY(-3px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'all 0.4s ease';
    });
  });

  /* ══════════════════════════════
     8. NAV ACTIVO por sección
  ══════════════════════════════ */
  const sections    = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-links .nav-link');
  const drawerLinks  = document.querySelectorAll('.drawer-link');

  function setActiveLink(id) {
    [...desktopLinks, ...drawerLinks].forEach(a => {
      const isActive = a.getAttribute('href') === '#' + id;
      a.classList.toggle('active', isActive);
    });
  }

  const activeIo = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) setActiveLink(e.target.id); });
  }, { threshold: 0.4 });

  sections.forEach(s => activeIo.observe(s));

  /* ══════════════════════════════
     9. CONTADORES ANIMADOS
  ══════════════════════════════ */
  const counterIo = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const raw    = el.dataset.val || '0';
      const suffix = el.dataset.suf || '';
      const final  = parseFloat(raw);
      let start    = null;
      function step(ts) {
        if (!start) start = ts;
        const p    = Math.min((ts - start) / 1400, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = (raw.includes('.') ? (final * ease).toFixed(1) : Math.floor(final * ease)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      counterIo.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-counter]').forEach(el => counterIo.observe(el));

  /* ══════════════════════════════
     10. FORMULARIO
     FormSubmit maneja el envío y la
     redirección a _next de forma nativa.
     NO usamos preventDefault — dejamos
     que el POST viaje a FormSubmit.co
  ══════════════════════════════ */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', () => {
      // Sin e.preventDefault() → FormSubmit envía el email
      // y redirige a la URL indicada en el campo _next
      const btn = form.querySelector('.f3-submit');
      if (btn) {
        btn.innerHTML = 'Enviando...';
        btn.style.opacity = '0.7';
        btn.disabled = true;
      }
    });
  }

  /* ══════════════════════════════
     11. GALERÍA DE PROYECTOS
         — autoplay 4s
         — drag / swipe táctil
         — pausa en hover
         — dots + flechas sincronizados
  ══════════════════════════════ */
  (function initGallery() {
    const track    = document.getElementById('galleryTrack');
    const dotsWrap = document.getElementById('galleryDots');
    const prevBtn  = document.getElementById('galleryPrev');
    const nextBtn  = document.getElementById('galleryNext');
    const progBar  = document.getElementById('galleryProgressBar');
    const wrap     = track && track.closest('.gallery-wrap');

    if (!track || !wrap) return;

    const slides = track.querySelectorAll('.gallery-slide');
    const total  = slides.length;
    let current  = 0;
    let autoTimer = null;
    let progAnim  = null;

    /* ── Manejo de imágenes rotas: muestra placeholder ── */
    slides.forEach((slide, i) => {
      const img = slide.querySelector('img');
      if (!img) return;
      img.addEventListener('error', () => {
        img.style.display = 'none';
        if (!slide.querySelector('.img-placeholder')) {
          const ph = document.createElement('div');
          ph.className = 'img-placeholder';
          ph.innerHTML = `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>Imagen no disponible</span>`;
          slide.appendChild(ph);
        }
      });
    });

    /* ── Crear dots ── */
    const dots = [];
    slides.forEach((_, i) => {
      const d = document.createElement('button');
      d.className   = 'gallery-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', `Ir a slide ${i + 1}`);
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
      dots.push(d);
    });

    /* ── Activar slide activo ── */
    function goTo(index, skipAnim) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');

      current = (index + total) % total;

      track.style.transform = `translateX(-${current * 100}%)`;
      slides[current].classList.add('active');
      dots[current].classList.add('active');

      /* Reiniciar barra de progreso */
      if (progBar) {
        progBar.style.animation = 'none';
        progBar.offsetHeight;           /* reflow */
        progBar.style.animation = '';
      }
    }

    /* Iniciar primer slide */
    slides[0].classList.add('active');

    /* ── Autoplay ── */
    function startAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(() => goTo(current + 1), 4000);
    }
    function stopAuto()  { clearInterval(autoTimer); }

    startAuto();

    /* Pausa en hover */
    wrap.addEventListener('mouseenter', () => {
      stopAuto();
      if (progBar) progBar.style.animationPlayState = 'paused';
    });
    wrap.addEventListener('mouseleave', () => {
      startAuto();
      if (progBar) progBar.style.animationPlayState = 'running';
    });

    /* ── Flechas ── */
    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });

    /* ── Teclado (cuando la galería está en foco) ── */
    wrap.setAttribute('tabindex', '0');
    wrap.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  { goTo(current - 1); startAuto(); }
      if (e.key === 'ArrowRight') { goTo(current + 1); startAuto(); }
    });

    /* ── Drag / Swipe táctil ── */
    let dragStartX = 0;
    let dragDeltaX = 0;
    let isDragging = false;

    function onDragStart(x) {
      dragStartX = x;
      dragDeltaX = 0;
      isDragging = true;
      track.classList.add('dragging');
      stopAuto();
    }
    function onDragMove(x) {
      if (!isDragging) return;
      dragDeltaX = x - dragStartX;
      const offset = current * 100;
      const pct    = (dragDeltaX / wrap.offsetWidth) * 100;
      track.style.transform = `translateX(calc(-${offset}% + ${dragDeltaX}px))`;
    }
    function onDragEnd() {
      if (!isDragging) return;
      isDragging = false;
      track.classList.remove('dragging');
      const threshold = wrap.offsetWidth * 0.2;   /* 20% del ancho */
      if      (dragDeltaX < -threshold) goTo(current + 1);
      else if (dragDeltaX >  threshold) goTo(current - 1);
      else goTo(current);                          /* volver al mismo */
      startAuto();
    }

    /* Mouse */
    track.addEventListener('mousedown',  e => onDragStart(e.clientX));
    window.addEventListener('mousemove', e => onDragMove(e.clientX));
    window.addEventListener('mouseup',   ()  => onDragEnd());

    /* Touch */
    track.addEventListener('touchstart', e => onDragStart(e.touches[0].clientX), { passive: true });
    track.addEventListener('touchmove',  e => onDragMove(e.touches[0].clientX),  { passive: true });
    track.addEventListener('touchend',   ()  => onDragEnd());

  })();

})();
