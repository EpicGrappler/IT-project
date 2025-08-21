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

// Check on page load and storage changes
window.addEventListener("DOMContentLoaded", function() {
    checkSignupBtnVisibility();
    
    // Listen for storage changes (in case of multiple tabs)
    window.addEventListener('storage', function(e) {
        if (e.key === 'hideSignupBtn') {
            checkSignupBtnVisibility();
        }
    });
});