/* ===================================================
   PROYECTOS.JS — versión corregida
=================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ══════════════════════════════
     1. FORZAR TODAS LAS CARDS VISIBLES
        (neutraliza cualquier observer
         de main.js que ponga opacity:0)
  ══════════════════════════════ */
  document.querySelectorAll('#projectsGrid .proj-card').forEach(function (card) {
    card.style.opacity    = '1';
    card.style.transform  = 'none';
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    card.style.display    = '';
  });

  /* ══════════════════════════════
     2. FILTROS
  ══════════════════════════════ */
  var filterBar = document.getElementById('filterBar');

  if (filterBar) {
    filterBar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;

      filterBar.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      var filter = btn.dataset.filter;

      document.querySelectorAll('#projectsGrid .proj-card').forEach(function (card) {
        var tags  = (card.dataset.tags || '').split(' ');
        var show  = filter === 'all' || tags.indexOf(filter) !== -1;

        card.style.display   = show ? '' : 'none';
        card.style.opacity   = show ? '1' : '0';
        card.style.transform = show ? 'none' : 'translateY(10px)';
      });
    });
  }

  /* ══════════════════════════════
     3. SLIDESHOW
  ══════════════════════════════ */
  function initSlideshow(id) {
    var wrap = document.getElementById('demo-' + id);
    if (!wrap) return;

    var slides   = Array.from(wrap.querySelectorAll('.demo-slide'));
    var dots     = Array.from(wrap.querySelectorAll('.demo-dot'));
    var bar      = document.getElementById('bar-' + id);
    var current  = 0;
    var timer    = null;
    var progress = 0;
    var DURATION = 3500;
    var TICK     = 50;

    if (slides.length === 0) return;

    function goTo(idx) {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = ((idx % slides.length) + slides.length) % slides.length;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
      progress = 0;
      if (bar) bar.style.width = '0%';
    }

    function startAuto() {
      if (slides.length < 2) return;
      clearInterval(timer);
      timer = setInterval(function () {
        progress += (TICK / DURATION) * 100;
        if (bar) bar.style.width = Math.min(progress, 100) + '%';
        if (progress >= 100) goTo(current + 1);
      }, TICK);
    }

    startAuto();
    wrap.addEventListener('mouseenter', function () { clearInterval(timer); });
    wrap.addEventListener('mouseleave', startAuto);

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function (e) {
        e.stopPropagation();
        goTo(i);
        clearInterval(timer);
        startAuto();
      });
    });

    wrap.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-action]');
      if (!btn || btn.dataset.demo !== id) return;
      e.stopPropagation();
      goTo(current + (btn.dataset.action === 'next' ? 1 : -1));
      clearInterval(timer);
      startAuto();
    });
  }

  ['sge', 'presupuestos', 'inventario', 'wallet', 'gic', 'paes', 'cv'].forEach(initSlideshow);

});