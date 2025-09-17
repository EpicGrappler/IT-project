window.onload = function () {
    setTimeout(() => {
        document.querySelector(".loader").style.display = "none";
        document.querySelector("#mainco").style.display = "block";
        document.body.classList.remove("loading");
    }, 1000);

    function check_name() {
        const nameInput = document.getElementById("name");
        const name_error = document.getElementById("error_name");
        const name = nameInput.value.trim();

        if (!/^[^\d]+$/.test(name)) {
            if (name === "") {
                name_error.textContent = "";
                nameInput.style.border = "";
            } else {
                nameInput.style.border = "2px solid red";
                name_error.textContent = "Name must not contain numbers.";
                return false;
            }
        } else {
            name_error.textContent = "";
            nameInput.style.border = "";
            return true;
        }
    }
    function check_email() {
        const emailInput = document.getElementById("email");
        const email_error = document.getElementById("error_email");
        const email = emailInput.value.trim();

        if (!/\S+@\S+\.\S+/.test(email)) {
            if (email === "") {
                email_error.textContent = "";
                emailInput.style.border = "";
            } else {
                emailInput.style.border = "2px solid red";
                email_error.textContent = "Enter email in (example@gmail.com) format.";
                return false;
            }
        } else {
            email_error.textContent = "";
            emailInput.style.border = "";
            return true;
        }
    }

    function check_phone() {
        const phoneInput = document.getElementById("phone");
        const phone_error = document.getElementById("error_phone");
        const phone = phoneInput.value.trim();

        if (!/^\d{11}$/.test(phone)) {
            if (phone === "") {
                phone_error.textContent = "";
                phoneInput.style.border = "";
            } else {
                phoneInput.style.border = "2px solid red";
                phone_error.textContent =
                    "Phone must be exactly 11 digits and contain only numbers.";
                return false;
            }
        } else {
            phone_error.textContent = "";
            phoneInput.style.border = "";
            return true;
        }
    }

    const dateInput = document.getElementById("date");
    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.setAttribute("min", today);
        dateInput.value = today;
    }

    window.handleSubmit = function () {
        const submit_button = document.getElementById("submit-btn");
        const validEmail = check_email();
        const validName = check_name();
        const validPhone = check_phone();

        submit_button.disabled = !(validEmail && validName && validPhone);
        return validEmail && validName && validPhone;
    };

};

    function showSubTests() {
        const selectedTest = document.getElementById("main-test").value;


        const allSubTestDivs = document.querySelectorAll(".sub-test");
        allSubTestDivs.forEach(div => {
            div.style.display = "none";
        });//for each selection restart sub_divs


        if (selectedTest === "blood") {
            document.getElementById("blood-tests").style.display = "block";
        } else if (selectedTest === "urine") {
            document.getElementById("urine-tests").style.display = "block";
        } else if (selectedTest === "xray") {
            document.getElementById("xray-tests").style.display = "block";
        } else if (selectedTest === "mri") {
            document.getElementById("mri-tests").style.display = "block";
        } else if (selectedTest === "other") {
            document.getElementById("other-tests").style.display = "block";
        }
    }
