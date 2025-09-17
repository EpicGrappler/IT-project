// Initialize functionality when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the shared search functionality
    initializeSearch();

    // Dark mode functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        const icon = darkModeToggle.querySelector('i');
        const navLogo = document.getElementById('navLogo');

        // Check saved preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            icon.classList.replace('fa-moon', 'fa-sun');
            if (navLogo) navLogo.src = navLogo.dataset.dark;
        }

        // Toggle dark mode
        darkModeToggle.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-mode');
            icon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
            
            if (navLogo) {
                navLogo.style.opacity = '0';
                setTimeout(() => {
                    navLogo.src = isDark ? navLogo.dataset.dark : navLogo.dataset.light;
                    navLogo.style.opacity = '1';
                }, 150);
            }

            localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        });
    }

    // Mobile menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    if (menuToggle && sideMenu) {
        menuToggle.addEventListener('click', () => {
            sideMenu.classList.toggle('active');
            menuToggle.textContent = sideMenu.classList.contains('active') ? '✖' : '☰';
        });
    }
});

// Initialize page load
setTimeout(() => {
    const loader = document.querySelector(".loader");
    const mainco = document.querySelector("#mainco");
    if (loader) loader.style.display = "none";
    if (mainco) mainco.style.display = "block";
    document.body.classList.remove("loading");
}, 1000);
