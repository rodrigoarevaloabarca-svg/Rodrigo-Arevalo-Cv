/* ===================================================
   DESIGN 1 — TERMINAL JS
=================================================== */

(function () {
  'use strict';

  /* ── Cursor ── */
  const cursor = document.getElementById('cursor');
  const trail  = document.getElementById('cursorTrail');
  let mx = 0, my = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = (mx - 5) + 'px';
    cursor.style.top  = (my - 5) + 'px';
  });

  function animTrail() {
    tx += (mx - tx) * 0.18;
    ty += (my - ty) * 0.18;
    trail.style.left = (tx - 10) + 'px';
    trail.style.top  = (ty - 10) + 'px';
    requestAnimationFrame(animTrail);
  }
  animTrail();

  document.querySelectorAll('a, button, .proj-card, .skill-row').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform  = 'scale(1.8)';
      trail.style.transform   = 'scale(1.6)';
      trail.style.borderColor = 'rgba(57,255,99,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform  = '';
      trail.style.transform   = '';
      trail.style.borderColor = '';
    });
  });

  /* ── Scroll bar ── */
  const scrollBar = document.getElementById('scrollBar');
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    scrollBar.style.width = pct + '%';
  }, { passive: true });

  /* ── Skill bars animation ── */
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.w;
        barObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-bar').forEach(bar => {
    const target = bar.dataset.w;
    bar.style.width = '0%';
    barObserver.observe(bar);
  });

  /* ── Scroll reveal ── */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity    = '';
        e.target.style.transform  = '';
        e.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.exp-item, .proj-card, .about-wrapper, .contact-grid').forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    revealObserver.observe(el);
  });

  /* ── Typewriter hero ── */
  const typeEl = document.getElementById('typewriter');
  if (typeEl) {
    const texts = [
      'Full Stack Developer en formación',
      'Python & Django Enthusiast',
      'Builder of Scalable Systems',
    ];
    let ti = 0, ci = 0, deleting = false;

    function type() {
      const current = texts[ti];
      if (!deleting) {
        typeEl.textContent = current.slice(0, ci + 1);
        ci++;
        if (ci === current.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
      } else {
        typeEl.textContent = current.slice(0, ci - 1);
        ci--;
        if (ci === 0) {
          deleting = false;
          ti = (ti + 1) % texts.length;
        }
      }
      setTimeout(type, deleting ? 45 : 80);
    }
    type();
  }

  /* ── Form submit ── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.f-submit');
      btn.textContent = '✓ Mensaje enviado';
      btn.style.background = 'var(--cyan)';
      setTimeout(() => {
        btn.textContent = '$ send_message --execute';
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

  /* ── Active nav link ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.style.color = '');
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.style.color = 'var(--green)';
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => activeObserver.observe(s));
})();
