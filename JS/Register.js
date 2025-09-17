document.addEventListener("DOMContentLoaded", () => {
  // العناصر
  const form = document.getElementById("register_form");
  const email = document.getElementById("email");
  const confirmEmail = document.getElementById("confirm-email");
  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const birthDate = document.getElementById("bd");
  const password = document.getElementById("password");
  const submitBtn = document.getElementById("submit-btn");

  const emailError = document.getElementById("PrimEmail-invalid");
  const confirmEmailError = document.getElementById("email-invalid");
  const birthError = document.getElementById("bd-invalid");

  const passwordStrengthFill = document.querySelector('.password-strength-fill');
  const passwordStrengthMessage = document.querySelector('#password-strength-message');

  // دالة التحقق من البريد
  function validateEmailFormat(emailValue) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailValue);
  }

  // دالة التحقق من قوة كلمة المرور
  function updatePasswordStrength(pw) {
    let strength = 0;
    if (pw.length >= 8) strength++;
    if (/[A-Za-z]/.test(pw)) strength++;
    if (/[^A-Za-z0-9]/.test(pw)) strength++;
    if (/[0-9]/.test(pw)) strength++;

    const width = ["0%", "25%", "50%", "75%", "100%"][strength];
    const color = ["#dc3545", "#fd7e14", "#ffc107", "#0d6efd", "#198754"][strength];
    const messages = [
      "Password must be at least 8 characters.",
      "Add letters to strengthen your password.",
      "Add a symbol (e.g., !, @, #) to increase strength.",
      "Add a number to make your password very strong.",
      "<div style='color:#198754; font-weight:bold; text-align:center;'><i class='fa-solid fa-check-circle'></i> Strong password</div>"
    ];

    if (passwordStrengthFill) {
      passwordStrengthFill.style.width = width;
      passwordStrengthFill.style.backgroundColor = color;
    }

    if (passwordStrengthMessage) {
      passwordStrengthMessage.innerHTML = messages[strength];
    }

    return strength;
  }

  // التحقق من النموذج بالكامل
  function validateForm() {
    let isValid = true;

    // الاسم الأول والأخير
    if (!firstName.value.trim()) isValid = false;
    if (!lastName.value.trim()) isValid = false;

    // البريد
    if (!email.value.trim() || !validateEmailFormat(email.value)) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    } else {
      emailError.textContent = "";
    }

    // تأكيد البريد
    if (confirmEmail.value !== email.value) {
      confirmEmailError.textContent = "Emails do not match.";
      isValid = false;
    } else {
      confirmEmailError.textContent = "";
    }

    // تاريخ الميلاد
    const enteredDate = new Date(birthDate.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!birthDate.value.trim()) {
      birthError.textContent = "Please enter your date of birth.";
      isValid = false;
    } else if (enteredDate >= today) {
      birthError.textContent = "Birth date must be in the past.";
      isValid = false;
    } else {
      birthError.textContent = "";
    }

    // قوة كلمة المرور
    const strength = updatePasswordStrength(password.value);
    if (strength < 3) {
      isValid = false;
    }

    // تفعيل أو تعطيل زر الإرسال
    if (submitBtn) submitBtn.disabled = !isValid;

    return isValid;
  }

  // Event Listeners للحقل
  [firstName, lastName, email, confirmEmail, birthDate, password].forEach((input) => {
    if (input) {
      input.addEventListener("input", validateForm);
    }
  });

  // عند الإرسال
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (validateForm()) {
        // حفظ البيانات
        const fullName = `${firstName.value.trim()} ${lastName.value.trim()}`;
        
        localStorage.setItem("savedEmail", email.value.trim());
        localStorage.setItem("savedPassword", password.value.trim());
        localStorage.setItem("userName", fullName);
        localStorage.setItem("userBirthDate", birthDate.value);
        localStorage.setItem("hideSignupBtn", "true");

        // Show success message
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Your account has been created successfully! Please login to continue.",
          confirmButtonText: "Go to Login"
        }).then(() => {
          // الانتقال للصفحة التالية
          window.location.href = "../docs/Login.html";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Form Incomplete",
          text: "Please correct the errors before submitting.",
        });
      }
    });
  }

  // إخفاء زر التسجيل بعد الحفظ
  const signupBtn = document.getElementById("signup-btnID");
  if (signupBtn && localStorage.getItem("hideSignupBtn") === "true") {
    signupBtn.style.display = "none";
  }

  // تبديل ظهور كلمة السر
  const toggleEye = document.querySelector(".toggle-password i");
  if (toggleEye) {
    toggleEye.addEventListener("click", () => {
      const isHidden = password.type === "password";
      password.type = isHidden ? "text" : "password";
      toggleEye.className = isHidden ? "fa-solid fa-eye-slash icon-eye" : "fa-solid fa-eye icon-eye";
    });
  }

  // القائمة الجانبية للموبايل
  const toggleBtn = document.querySelector(".menu-toggle");
  const sideMenu = document.getElementById("side-menu");
  if (toggleBtn && sideMenu) {
    toggleBtn.addEventListener("click", () => {
      sideMenu.classList.toggle("active");
      toggleBtn.textContent = sideMenu.classList.contains("active") ? "✖" : "☰";
    });
  }

  // Password visibility toggle function
  window.togglePasswordVisibility = function() {
    const passwordInput = document.getElementById("password");
    const toggleIcon = document.querySelector(".toggle-password i");
    
    if (passwordInput && toggleIcon) {
      const isHidden = passwordInput.type === "password";
      passwordInput.type = isHidden ? "text" : "password";
      toggleIcon.className = isHidden ? "fa-solid fa-eye-slash icon-eye" : "fa-solid fa-eye icon-eye";
    }
  };

  // Password strength validation function
  window.validatePasswordStrength = function() {
    const passwordInput = document.getElementById("password");
    if (passwordInput) {
      updatePasswordStrength(passwordInput.value);
    }
  };

  // Handle submit function
  window.handleSubmit = function() {
    return validateForm();
  };
});
