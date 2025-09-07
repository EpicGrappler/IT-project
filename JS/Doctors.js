document.addEventListener("DOMContentLoaded", () => {
  // Initialize search functionality
  if (typeof initializeSearch === 'function') {
    initializeSearch();
  }

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
});

// تحميل بعد تحميل كل عناصر الصفحة
window.addEventListener("load", () => {
  const loadingDiv = document.querySelector(".loading");
  const mainContent = document.querySelector("#mainco");

  if (mainContent) mainContent.style.display = "none";

  setTimeout(() => {
    if (loadingDiv) {
      loadingDiv.classList.add("fade-out");
      setTimeout(() => loadingDiv.style.display = "none", 500); // بعد انتهاء التلاشي
    }
    if (mainContent) mainContent.style.display = "block";
  }, 1000);
});



document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("darkModeToggle");
  const icon = btn?.querySelector("i");

  const savedMode = localStorage.getItem("darkMode");
  if (savedMode === "enabled") {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
    icon.classList.replace("fa-moon", "fa-sun");
  }

  btn?.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode", !isDark);
    localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
    icon.classList.replace(isDark ? "fa-moon" : "fa-sun", isDark ? "fa-sun" : "fa-moon");
  });
});
