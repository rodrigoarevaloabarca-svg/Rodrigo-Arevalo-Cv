// Función para alternar el modo oscuro
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');

    // Opcional: Guardar la preferencia en el navegador
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Verificar si el usuario ya tenía una preferencia guardada al cargar la página
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
}
const backToTopBtn = document.getElementById('btn-back-to-top');

// Escuchar el evento de scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        // Mostrar el botón
        backToTopBtn.classList.remove('opacity-0', 'invisible');
        backToTopBtn.classList.add('opacity-100', 'visible');
    } else {
        // Ocultar el botón
        backToTopBtn.classList.add('opacity-0', 'invisible');
        backToTopBtn.classList.remove('opacity-100', 'visible');
    }
});

// Función para subir suavemente
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    const icon = document.getElementById('menu-icon');

    // Alterna la clase 'hidden' (que Tailwind usa para ocultar)
    // y 'flex' para mostrarlo como columna en móvil
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        menu.classList.add('flex');
        icon.textContent = 'close'; // Cambia el icono a una X
    } else {
        menu.classList.add('hidden');
        menu.classList.remove('flex');
        icon.textContent = 'menu'; // Vuelve al icono de hamburguesa
    }
}

// Opcional: Cerrar el menú al hacer clic en un enlace (para móviles)
document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            toggleMenu();
        }
    });
});