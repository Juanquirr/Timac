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

                let previousPage = localStorage.getItem("previousPage");

                if (!previousPage || previousPage.includes("create-account-page.html")) {
                    previousPage = "../html/index.html";
                }

                localStorage.removeItem("previousPage");

                window.location.href = previousPage;
            } else {
                alert("User does not exist.");
            }
        });
    }

    checkInputLogIn();
});
