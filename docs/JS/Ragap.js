// حفظ الوضع الليلي من localStorage وتطبيقه تلقائيًا عند التحميل
document.addEventListener("DOMContentLoaded", () => {
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode === "enabled") {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");

    const loadingDiv = document.querySelector(".loading");
    if (loadingDiv) {
      loadingDiv.classList.add("dark-mode");
      loadingDiv.classList.remove("light-mode");
    }
  }

  // Toggle Side Menu on Mobile
  const toggleBtn = document.querySelector(".menu-toggle");
  const sideMenu = document.getElementById("side-menu");

  if (toggleBtn && sideMenu) {
    toggleBtn.addEventListener("click", () => {
      sideMenu.classList.toggle("active");
      toggleBtn.textContent = sideMenu.classList.contains("active") ? "✖" : "☰";
    });
  }

  // Dark Mode Toggle
  const btn = document.getElementById('darkModeToggle');
  if (!btn) return; // حماية لو الزر مش موجود

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

  // Search functionality (basic implementation)
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const searchError = document.getElementById('search-error');

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query.length === 0) {
        searchError.textContent = 'Please enter a search term';
        searchError.classList.add('visible');
        setTimeout(() => {
          searchError.classList.remove('visible');
        }, 3000);
      } else {
        // Here you would typically perform the search
        console.log('Searching for:', query);
        searchError.classList.remove('visible');
      }
    });

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        searchBtn.click();
      }
    });
  }
});

// إخفاء اللودر بعد 4 ثوانٍ مع تأثير تلاشي
window.addEventListener("load", () => {
  const loadingDiv = document.querySelector(".loading");
  const mainContent = document.querySelector("#mainco");

  if (mainContent) mainContent.style.display = "none";

  setTimeout(() => {
    if (loadingDiv) {
      loadingDiv.classList.add("fade-out");
      setTimeout(() => loadingDiv.style.display = "none", 500);
    }
    if (mainContent) mainContent.style.display = "block";
  }, 1000);
});
