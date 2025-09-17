// In// Sample doctors data
const doctors = [
    { name: "Dr. Youssef Al-Demerdash", specialty: "Dermatology", page: "Al-Demerdash.html" },
    { name: "Dr. Mohamed Waleed", specialty: "Internal Medicine", page: "Doc Waleed Page .html" },
    { name: "Dr. Omar Ragap", specialty: "Dental Surgery", page: "OmarRagap.html" },
    { name: "Dr. Mostafa Ashraf", specialty: "Clinical Psychology", page: "Mostafa.html" },
    { name: "Dr. Mohamed Ragap", specialty: "Neurology", page: "Ragap.html" },
    { name: "Dr. Mohamed Zaky", specialty: "Cardiology", page: "Zaky.html" }
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

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSearch);

// Initialize page load
setTimeout(() => {
  document.querySelector(".loader").style.display = "none";
  document.querySelector("#mainco").style.display = "block";
  document.body.classList.remove("loading");
}, 1000);//ize search functionality
if (typeof initializeSearch === 'function') {
    initializeSearch();
}

setTimeout(() => {
  document.querySelector(".loader").style.display = "none";
  document.querySelector("#mainco").style.display = "block";
  document.body.classList.remove("loading");
}, 1000);
