// Doctors data with complete information
const doctors = [
    { 
        name: "Dr. Youssef Al-Demerdash",
        specialty: "Orthopedics",
        page: "Al-Demerdash.html",
        image: "../Images/Joo.jpg",
        experience: "14 years"
    },
    { 
        name: "Dr. Mohamed Waleed",
        specialty: "Dentistry",
        page: "Doc Waleed Page .html",
        image: "../Images/Waleed.jpeg",
        experience: "12 years"
    },
    { 
        name: "Dr. Omar Ragap",
        specialty: "General Medicine",
        page: "OmarRagap.html",
        image: "../Images/Omar.jpg",
        experience: "8 years"
    },
    { 
        name: "Dr. Mostafa Ashraf",
        specialty: "Clinical Psychology",
        page: "Mostafa.html",
        image: "../Images/mostafa .jpg",
        experience: "12 years"
    },
    { 
        name: "Dr. Ruba",
        specialty: "Pediatric Medicine",
        page: "Ruba.html",
        image: "../Images/Home/Rubaa .jpg",
        experience: "10 years"
    },
    { 
        name: "Dr. Mohamed Zaky",
        specialty: "Cardiology",
        page: "Zaky.html",
        image: "../Images/Zaky.jpeg",
        experience: "12 years"
    },
    { 
        name: "Dr. Mohamed Ragap",
        specialty: "Neurology",
        page: "Ragap.html",
        image: "../Images/ragap .avif",
        experience: "10 years"
    }
];

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchError = document.getElementById('search-error');
    
    // Create suggestions container if it doesn't exist
    let suggestionsContainer = document.querySelector('.search-suggestions');
    if (!suggestionsContainer) {
        suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'search-suggestions';
        document.querySelector('.search-container').appendChild(suggestionsContainer);
    }

    // Add styles for suggestions if not already added
    if (!document.querySelector('#search-styles')) {
        const style = document.createElement('style');
        style.id = 'search-styles';
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
                padding: 12px 15px;
                cursor: pointer;
                border-bottom: 1px solid #eee;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .suggestion-item:last-child {
                border-bottom: none;
            }
            .suggestion-item:hover {
                background-color: #f5f8ff;
                transform: translateX(2px);
            }
            .suggestion-img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                object-fit: cover;
                border: 2px solid #0D6EFD;
            }
            .suggestion-info {
                flex: 1;
            }
            .suggestion-name {
                font-weight: 600;
                color: #333;
                margin-bottom: 2px;
            }
            .suggestion-specialty {
                font-size: 0.85em;
                color: #666;
            }
            .suggestion-experience {
                font-size: 0.8em;
                color: #0D6EFD;
                font-weight: 500;
            }

            .search-container {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                margin-top: 12px;
                width: 280px;
                z-index: 1;
            }
            
            .search-container input[type="search"] {
                padding: 12px 40px 12px 16px;
                border-radius: 24px;
                border: 2px solid #0D6EFD;
                font-size: 15px;
                outline: none;
                width: 100%;
                transition: all 0.3s ease;
                background-color: #FFFFFF;
                color: #343A40;
                font-weight: 400;
                letter-spacing: 0.02em;
            }
            
            .search-container input[type="search"]:focus {
                border-color: #084298;
                box-shadow: 0 0 12px rgba(13, 110, 253, 0.2);
                transform: translateY(-1px);
            }
            
            .search-container button.search-btn {
                position: absolute;
                right: 12px;
                top: 50%;
                transform: translateY(-50%);
                background: transparent;
                border: none;
                cursor: pointer;
                font-size: 20px;
                color: #0D6EFD;
                padding: 8px;
                user-select: none;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .search-container button.search-btn:hover {
                color: #084298;
                transform: translateY(-50%) scale(1.1);
            }
            
            .search-error {
                position: absolute;
                top: 100%;
                left: 0;
                font-size: 13px;
                color: #DC3545;
                font-weight: 600;
                min-height: 18px;
                opacity: 0;
                transition: all 0.3s ease;
                margin-top: 8px;
                background-color: rgba(255, 255, 255, 0.95);
                padding: 6px 12px;
                border-radius: 4px;
                box-shadow: 0 2px 8px rgba(220, 53, 69, 0.2);
                pointer-events: none;
            }
            
            .search-error.visible {
                opacity: 1;
                transform: translateY(2px);
            }

            /* Dark mode support */
            body.dark-mode .search-suggestions {
                background: #2d2d2d;
                border-color: #444;
            }
            
            body.dark-mode .suggestion-item {
                border-bottom-color: #444;
            }
            
            body.dark-mode .suggestion-item:hover {
                background-color: #3d3d3d;
            }
            
            body.dark-mode .suggestion-name {
                color: #fff;
            }
            
            body.dark-mode .suggestion-specialty {
                color: #aaa;
            }
            
            body.dark-mode .search-container input[type="search"] {
                background-color: #2d2d2d;
                color: #fff;
                border-color: #0D6EFD;
            }
        `;
        document.head.appendChild(style);
    }

    function showSuggestions(searchTerm) {
        if (!searchTerm) {
            suggestionsContainer.style.display = 'none';
            return;
        }

        const searchTermLower = searchTerm.toLowerCase();
        const matches = doctors.filter(doctor => {
            const nameMatch = doctor.name.toLowerCase().includes(searchTermLower);
            const specialtyMatch = doctor.specialty.toLowerCase().includes(searchTermLower);
            return nameMatch || specialtyMatch;
        }).sort((a, b) => {
            // Sort exact matches first, then by name length
            const aNameLower = a.name.toLowerCase();
            const bNameLower = b.name.toLowerCase();
            const aStartsWith = aNameLower.startsWith(searchTermLower);
            const bStartsWith = bNameLower.startsWith(searchTermLower);
            
            if (aStartsWith && !bStartsWith) return -1;
            if (!aStartsWith && bStartsWith) return 1;
            return a.name.length - b.name.length;
        });

        if (matches.length > 0) {
            suggestionsContainer.innerHTML = matches.map(doctor => {
                const nameHtml = highlightMatch(doctor.name, searchTerm);
                const specialtyHtml = highlightMatch(doctor.specialty, searchTerm);
                return `
                    <div class="suggestion-item" data-page="${doctor.page}">
                        <img src="${doctor.image}" alt="${doctor.name}" class="suggestion-img">
                        <div class="suggestion-info">
                            <div class="suggestion-name">${nameHtml}</div>
                            <div class="suggestion-specialty">${specialtyHtml}</div>
                            <div class="suggestion-experience">${doctor.experience} experience</div>
                        </div>
                    </div>
                `;
            }).join('');
            suggestionsContainer.style.display = 'block';
        } else {
            suggestionsContainer.style.display = 'none';
        }
    }

    function highlightMatch(text, searchTerm) {
        if (!searchTerm) return text;
        const searchRegex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(searchRegex, '<strong style="color: #0D6EFD;">$1</strong>');
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

// Initialize search when DOM is loaded
function init() {
    if (document.querySelector('.search-container')) {
        initializeSearch();
    } else {
        // If the search container is not found, wait and try again
        setTimeout(init, 100);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
