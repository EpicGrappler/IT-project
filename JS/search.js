window.onload = function () {
  // loader يختفي بعد 3 ثواني
  setTimeout(() => {
    document.querySelector('.loader').style.display = 'none';
    document.querySelector('#mainco').style.display = 'block';
    document.body.classList.remove('loading');
  }, 3000);

  const doctors = [
     { name: "Rubaa", specialty: "Pediatrics" },
    { name: "mohamed ragab", specialty: "neurology" },
    { name: "Mostafa Ashraf ", specialty: "psychology" },
    { name: "Youssef Al-Demerdash", specialty: "dermatology" },
    { name: "Mohamed Waleed", specialty: "Internal" },
    { name: "Mohamed Zaky", specialty: "Cardiology" },
    { name: "Omar Ragab", specialty: "dentistry" },
  ];

  const form = document.querySelector(".search-form");
  const messageBox = document.getElementById("message-box");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = document.getElementById("name").value.trim();
    const specialtyInput = document.getElementById("specialty").value;

    if (nameInput === "" || specialtyInput === "") {
      messageBox.textContent = "Please enter doctor name and choose the specialty.";
      messageBox.style.color = "red";
      return; // هنا علشان اوقف تنفيذ باقي الكود
    }

    const foundDoctor = doctors.find(doc =>
      doc.specialty.toLowerCase() === specialtyInput.toLowerCase() &&
      doc.name.toLowerCase().includes(nameInput.toLowerCase())
    );

    if (foundDoctor) {
      messageBox.textContent = `Yes, Dr. ${foundDoctor.name} is available in ${foundDoctor.specialty}.`;
      messageBox.style.color = "green";
    } else {
      messageBox.textContent = "Doctor not available.";
      messageBox.style.color = "red";
    }
  });
};
