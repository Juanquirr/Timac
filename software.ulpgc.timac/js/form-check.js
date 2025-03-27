document.addEventListener("DOMContentLoaded", () => {
    const phoneInput = document.getElementById("phone-input");

    phoneInput.addEventListener("input", function () {
        this.value = this.value.replace(/\D/g, "");
        if (this.value.length >= 9) {
            this.value = this.value.slice(0, 9);
        }
    });

    const form = document.getElementById("form");
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
        if(!validatePassword()) {
            event.preventDefault();
        }
    });
});