/* ===================================================
   PROYECTOS.JS
   Lógica exclusiva de proyectos.html
   Requiere: main.js cargado antes
   (theme, drawer, fab, scrollbar, cursor → main.js)
=================================================== */

(function () {
  'use strict';

/* ══════════════════════════════
   1. FILTROS POR CATEGORÍA
══════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {

  var filterBar = document.getElementById('filterBar');
  if (!filterBar) return;

  filterBar.addEventListener('click', function (e) {
    var btn = e.target.closest('.filter-btn');
    if (!btn) return;

    // Activar botón
    filterBar.querySelectorAll('.filter-btn').forEach(function (b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');

    var filter = btn.dataset.filter;

    // Filtrar cards
    document.querySelectorAll('#projectsGrid .proj-card').forEach(function (card) {
      var tags = card.dataset.tags || '';
      var visible = filter === 'all' || tags.split(' ').indexOf(filter) !== -1;

      if (visible) {
        card.style.display   = '';
        card.style.opacity   = '1';
        card.style.transform = 'translateY(0)';
      } else {
        card.style.display = 'none';
      }
    });
  });

});

  /* ══════════════════════════════
     2. MOTOR DE SLIDESHOW
        — un estado por demo-wrap
        — auto-play de 3.5 s
        — pausa en hover
        — barra de progreso
        — dots + flechas
  ══════════════════════════════ */
  var slideshows = {};

  function initSlideshow(id) {
    var wrap = document.getElementById('demo-' + id);
    if (!wrap) return;

    var slides  = Array.from(wrap.querySelectorAll('.demo-slide'));
    var dots    = Array.from(wrap.querySelectorAll('.demo-dot'));
    var bar     = document.getElementById('bar-' + id);
    var current = 0;
    var timer   = null;
    var progress = 0;
    var DURATION = 3500;   /* ms por slide */
    var TICK     = 50;     /* ms por tick  */

    if (slides.length === 0) return;

    /* ── Ir a slide ── */
    function goTo(idx) {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');

      current = ((idx % slides.length) + slides.length) % slides.length;

      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');

      /* Reiniciar progreso */
      progress = 0;
      if (bar) bar.style.width = '0%';
    }

    /* ── Auto-play ── */
    function startAuto() {
      if (slides.length < 2) return;
      clearInterval(timer);
      timer = setInterval(function () {
        progress += (TICK / DURATION) * 100;
        if (bar) bar.style.width = Math.min(progress, 100) + '%';
        if (progress >= 100) goTo(current + 1);
      }, TICK);
    }

    function stopAuto() {
      clearInterval(timer);
    }

    startAuto();

    /* Pausa en hover */
    wrap.addEventListener('mouseenter', stopAuto);
    wrap.addEventListener('mouseleave', function () {
      startAuto();
    });

    /* ── Dots ── */
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function (e) {
        e.stopPropagation();
        goTo(i);
        stopAuto();
        startAuto();
      });
    });

    /* ── Flechas prev/next (delegación en wrap) ── */
    wrap.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (!btn || btn.dataset.demo !== id) return;
      e.stopPropagation();
      var dir = btn.dataset.action === 'next' ? 1 : -1;
      goTo(current + dir);
      stopAuto();
      startAuto();
    });

    /* Guardar referencia pública */
    slideshows[id] = { goTo: goTo, current: function () { return current; } };
  }

  /* Inicializar todos los slideshows de la página */
  ['sge', 'presupuestos', 'cv' 'inventario', 'wallet', 'gic', 'paes'].forEach(initSlideshow);

  /* ══════════════════════════════
     3. REVEAL POR SCROLL
        (complementa el de main.js
         para las cards de proyectos)
  ══════════════════════════════ */
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.proj-card, .status-card').forEach(function (el) {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    revealObs.observe(el);
  });

})();
