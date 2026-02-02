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