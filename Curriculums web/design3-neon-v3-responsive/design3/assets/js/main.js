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
  ══════════════════════════════ */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn  = form.querySelector('.f3-submit');
      const orig = btn.innerHTML;
      btn.innerHTML        = '✓ Mensaje enviado';
      btn.style.background = 'linear-gradient(135deg, #34d399, #06b6d4)';
      setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; form.reset(); }, 3000);
    });
  }

})();
