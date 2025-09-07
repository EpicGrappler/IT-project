// Sample doctors data - Replace this with your actual doctors data
const doctors = [
    { name: "Dr. Youssef Al-Demerdash", specialty: "Cardiologist", page: "Al-Demerdash.html" },
    { name: "Dr. Mohamed Waleed", specialty: "Neurologist", page: "Doc Waleed Page .html" },
    { name: "Dr. Omar Ragap", specialty: "Orthopedist", page: "OmarRagap.html" },
    { name: "Dr. Mostafa Ashraf", specialty: "Pediatrician", page: "Mostafa.html" },
    { name: "Dr. Ruba", specialty: "Dermatologist", page: "Ruba.html" },
    { name: "Dr. Mohamed Zaky", specialty: "Surgeon", page: "Zaky.html" },
    { name: "Dr. Mohamed Ragap", specialty: "Neurology", page: "Ragap.html" }
];

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchError = document.getElementById('search-error');
    
    // Create suggestions container
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'search-suggestions';
    document.querySelector('.search-container').appendChild(suggestionsContainer);

    // Add styles for suggestions
    const style = document.createElement('style');
    style.textContent = `
        .search-suggestions {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            margin-top: 4px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            display: none;
            z-index: 1000;
            max-height: 300px;
            overflow-y: auto;
        }
        .suggestion-item {
            padding: 10px 15px;
            cursor: pointer;
            border-bottom: 1px solid #eee;
            transition: background-color 0.2s;
        }
        .suggestion-item:last-child {
            border-bottom: none;
        }
        .suggestion-item:hover {
            background-color: #f5f8ff;
        }
        .suggestion-name {
            font-weight: 600;
            color: #333;
        }
        .suggestion-specialty {
            font-size: 0.85em;
            color: #666;
            margin-top: 2px;
        }
    `;
    document.head.appendChild(style);

    function showSuggestions(searchTerm) {
        if (!searchTerm) {
            suggestionsContainer.style.display = 'none';
            return;
        }

        const matches = doctors.filter(doctor => 
            doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (matches.length > 0) {
            suggestionsContainer.innerHTML = matches.map(doctor => `
                <div class="suggestion-item" data-page="${doctor.page}">
                    <div class="suggestion-name">${doctor.name}</div>
                    <div class="suggestion-specialty">${doctor.specialty}</div>
                </div>
            `).join('');
            suggestionsContainer.style.display = 'block';
        } else {
            suggestionsContainer.style.display = 'none';
        }
    }

    function performSearch() {
        const searchTerm = searchInput.value.trim();
        
        if (!searchTerm) {
            searchError.textContent = 'Please enter a doctor\'s name';
            searchError.classList.add('visible');
            return;
        }

        // Find exact match first
        const exactMatch = doctors.find(doctor => 
            doctor.name.toLowerCase() === searchTerm.toLowerCase() ||
            doctor.specialty.toLowerCase() === searchTerm.toLowerCase()
        );

        if (exactMatch) {
            window.location.href = exactMatch.page;
        } else {
            window.location.href = `Search Doctors.html?q=${encodeURIComponent(searchTerm)}`;
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchError.classList.remove('visible');
            showSuggestions(this.value.trim());
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });

        // Close suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
                suggestionsContainer.style.display = 'none';
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    // Handle suggestion clicks
    suggestionsContainer.addEventListener('click', function(e) {
        const suggestionItem = e.target.closest('.suggestion-item');
        if (suggestionItem) {
            const page = suggestionItem.dataset.page;
            window.location.href = page;
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
});

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

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchError = document.getElementById('search-error');

    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (!searchTerm) {
            searchError.textContent = 'Please enter a doctor\'s name';
            searchError.classList.add('visible');
            return;
        }

        // Remove any previous error message
        searchError.classList.remove('visible');
        
        // Redirect to the search doctors page with the search term
        window.location.href = `Search Doctors.html?q=${encodeURIComponent(searchTerm)}`;
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Clear error when user starts typing
        searchInput.addEventListener('input', function() {
            searchError.classList.remove('visible');
        });
    }
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