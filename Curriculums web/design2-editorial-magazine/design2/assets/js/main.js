/* ===================================================
   DESIGN 2 — EDITORIAL JS
=================================================== */

(function () {
  'use strict';

  /* ── Scroll progress ── */
  const scrollBar = document.getElementById('scrollBar');
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    scrollBar.style.width = pct + '%';
  }, { passive: true });

  /* ── Scroll reveal ── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity    = '1';
        e.target.style.transform  = 'translateY(0)';
        e.target.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(
    '.stat-card, .skill-col, .exp-row, .proj-row, .about-body, .contact-wrapper'
  ).forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transitionDelay = (i % 5) * 80 + 'ms';
    io.observe(el);
  });

  /* ── Animated counter on stat cards ── */
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el    = e.target;
        const final = parseFloat(el.dataset.val);
        const isFloat = el.dataset.val.includes('.');
        const suffix  = el.dataset.suffix || '';
        let start = 0;
        const dur = 1200;
        const step = timestamp => {
          if (!start) start = timestamp;
          const prog = Math.min((timestamp - start) / dur, 1);
          const ease = 1 - Math.pow(1 - prog, 3);
          const cur  = isFloat
            ? (final * ease).toFixed(1)
            : Math.floor(final * ease);
          el.textContent = cur + suffix;
          if (prog < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-value-ed[data-val]').forEach(el => counterObserver.observe(el));

  /* ── Nav active link ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const activeIo = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.style.color = 'var(--rust)';
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => activeIo.observe(s));

  /* ── Form submit ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.f2-submit');
      const original = btn.textContent;
      btn.textContent = '✓ Mensaje enviado correctamente';
      btn.style.background = '#2d6a4f';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

  /* ── Hover row highlight ── */
  document.querySelectorAll('.proj-row').forEach(row => {
    const num = row.querySelector('.proj-row-num');
    if (!num) return;
    row.addEventListener('mouseenter', () => {
      num.style.color = 'var(--rust)';
      num.style.transition = 'color 0.2s';
    });
    row.addEventListener('mouseleave', () => {
      num.style.color = 'var(--paper)';
    });
  });
})();
