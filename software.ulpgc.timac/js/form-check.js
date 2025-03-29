document.addEventListener("DOMContentLoaded", () => {

    function checkInputCreateAccount() {
        const phoneInput = document.getElementById("phone-input");

        phoneInput.addEventListener("input", function () {
            this.value = this.value.replace(/\D/g, "");
            if (this.value.length >= 9) {
                this.value = this.value.slice(0, 9);
            }
        });

        const form = document.getElementById("signup-form");
        const password1 = document.getElementById("password1");
        const password2 = document.getElementById("password2");
        const passwordError = document.getElementById("passwordError")

        function validatePassword() {
            if(password1.value !== password2.value) {
                passwordError.textContent = "Passwords do not match";
                passwordError.style.display = "block";
                password2.setCustomValidity("Passwords do not match");
                return false;
            } else {
                passwordError.style.display = "none";
                password2.setCustomValidity("");
                return true;
            }
        }

        password1.addEventListener("input", validatePassword)
        password2.addEventListener("input", validatePassword)

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            if(validatePassword()) {

                const formData = {
                    name: document.getElementById("name-input").value,
                    email: document.getElementById("email-input").value,
                    phone: phoneInput.value,
                    password: password1.value,
                    birthDate: document.getElementById("date-input").value,
                }

                let users = JSON.parse(localStorage.getItem("users")) || [];

                const emailExists = users.some(user => user.email === formData.email);

                if (emailExists) {
                    alert("Este email ya está registrado. Por favor, usa otro email o inicia sesión.");
                    console.log("Error: Email ya registrado:", formData.email);
                } else {
                    users.push(formData);

                    localStorage.setItem("users", JSON.stringify(users));

                    form.reset();
                }
            }

        });
    }

    checkInputCreateAccount();
});