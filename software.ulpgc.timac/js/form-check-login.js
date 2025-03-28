document.addEventListener("DOMContentLoaded", () => {

    function checkInputLogIn() {

        const form = document.getElementById("login-form");
        const email = document.getElementById("email-input");
        const password = document.getElementById("password");

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            let users = JSON.parse(localStorage.getItem("users")) || [];

            const userExists = users.find(user => user.email === email.value && user.password === password.value);

            if (userExists) {
                localStorage.setItem("UserLoggedIn", "true");
                window.location.href = "../html/index.html";
            } else {
                alert("User does not exist.");
            }

        });
    }

    checkInputLogIn();
});