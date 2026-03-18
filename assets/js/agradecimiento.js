/* ===================================================
   AGRADECIMIENTO — JS
   Theme toggle sincronizado con localStorage
   (misma clave 'ra-theme' que index.html)
=================================================== */

(function () {
  'use strict';

  const html = document.documentElement;
  const btn  = document.getElementById('themeToggle');
  const KEY  = 'ra-theme';

  /* Aplicar tema guardado o preferencia del sistema */
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(KEY, theme);
  }

  const saved = localStorage.getItem(KEY);
  applyTheme(saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  /* Toggle al hacer click */
  if (btn) {
    btn.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

})();
