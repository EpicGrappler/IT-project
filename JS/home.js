// Profile modal functionality
const profileIcon = document.getElementById('profileIcon');
const profileModal = document.getElementById('profileModal');
const closeProfile = document.getElementById('closeProfile');

if (profileIcon) profileIcon.addEventListener('click', () => {
    profileModal.style.display = 'block';
});

if (closeProfile) closeProfile.addEventListener('click', () => {
    profileModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target == profileModal) {
        profileModal.style.display = 'none';
    }
});

// Signup button visibility control
window.checkSignupBtnVisibility = function() {
    const signupBtn = document.getElementById("signup-btnID");
    if (signupBtn) {
        signupBtn.style.display = localStorage.getItem("hideSignupBtn") === "true" ? "none" : "block";
    }
};

// Dark Mode Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Dark mode toggle
    const btn = document.getElementById('darkModeToggle');
    if (btn) {
        const icon = btn.querySelector('i');
        const logo = document.getElementById('logo');
        const navLogo = document.getElementById('navLogo');

        const wasDark = localStorage.getItem('darkMode') === 'enabled';
        if (wasDark) {
            document.body.classList.add('dark-mode');
            btn.classList.add('active');
            if (icon) icon.classList.replace('fa-moon', 'fa-sun');
            if (logo) logo.src = logo.dataset.dark;
            if (navLogo) navLogo.src = navLogo.dataset.dark;
        }

        btn.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-mode');
            btn.classList.toggle('active', isDark);
            if (icon) icon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');

            if (logo) logo.style.opacity = 0;
            if (navLogo) navLogo.style.opacity = 0;

            setTimeout(() => {
                if (logo) {
                    logo.src = isDark ? logo.dataset.dark : logo.dataset.light;
                    logo.style.opacity = 1;
                }
                if (navLogo) {
                    navLogo.src = isDark ? navLogo.dataset.dark : navLogo.dataset.light;
                    navLogo.style.opacity = 1;
                }
            }, 200);

            localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        });
    }

    // Mobile menu toggle
    const toggleBtn = document.querySelector(".menu-toggle");
    const sideMenu = document.getElementById("side-menu");

    if (toggleBtn && sideMenu) {
        toggleBtn.addEventListener("click", () => {
            sideMenu.classList.toggle("active");
            toggleBtn.textContent = sideMenu.classList.contains("active") ? "✖" : "☰";
        });
    }

    // Check signup button visibility
    checkSignupBtnVisibility();
    
    // Listen for storage changes (in case of multiple tabs)
    window.addEventListener('storage', function(e) {
        if (e.key === 'hideSignupBtn') {
            checkSignupBtnVisibility();
        }
    });
});

// Loading screen functionality (if needed)
window.addEventListener("load", () => {
    const loadingDiv = document.querySelector(".loading");
    const mainContent = document.querySelector("#mainco");

    if (loadingDiv) {
        if (mainContent) mainContent.style.display = "none";

        setTimeout(() => {
            loadingDiv.classList.add("fade-out");
            setTimeout(() => loadingDiv.style.display = "none", 500);
            if (mainContent) mainContent.style.display = "block";
        }, 1000); // Reduced loading time for better UX
    }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.navx').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name') || this.querySelector('input[type="text"]').value;
            const email = formData.get('email') || this.querySelector('input[type="email"]').value;
            const message = formData.get('message') || this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
});