document.addEventListener('DOMContentLoaded', () => {
    // Elements for mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Toggle aria-expanded for screen readers
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Close mobile menu when a nav link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Elements for theme toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const iconMoon = document.querySelector('.icon-moon');
    const iconSun = document.querySelector('.icon-sun');
    const body = document.body;

    // Helper function to update theme UI
    const updateThemeUI = (isDark) => {
        if (isDark) {
            iconMoon.style.display = 'none';
            iconSun.style.display = 'block';
        } else {
            iconMoon.style.display = 'block';
            iconSun.style.display = 'none';
        }
    };

    // Initialization: check local storage or system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.classList.add(currentTheme);
        updateThemeUI(currentTheme === 'dark-theme');
    } else {
        // Fallback to system preferred color scheme
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            body.classList.add('dark-theme');
            updateThemeUI(true);
        }
    }

    // Toggle theme on button click
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const isDark = body.classList.contains('dark-theme');
            
            updateThemeUI(isDark);
            
            // Persist the choice in local storage
            localStorage.setItem('theme', isDark ? 'dark-theme' : 'light-theme');
        });
    }
});
