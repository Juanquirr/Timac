import { waitForElement } from './utils.js';

localStorage.setItem("previousPage", window.location.href);

function menuLoader() {
    const img = document.getElementById('account-menu');

    img.addEventListener('click', () => {

        if(localStorage.getItem("UserLoggedIn") !== "true") {
            const menu = document.querySelector('.menu-container-unlogged');
            if (menu.style.display === "flex") {
                menu.style.display = "none";
            } else {
                menu.style.display = "flex";
            }
        } else {
            const menu = document.querySelector('.menu-container-logged');
            if (menu.style.display === "flex") {
                menu.style.display = "none";
            } else {
                menu.style.display = "flex";
            }
        }
    });

    document.querySelector('.menu-sign-in-button').addEventListener('click', function() {
        window.location.href = "../html/log-in-page.html";
    });
    document.querySelector('.menu-sign-up-button').addEventListener('click', function() {
        window.location.href = "../html/create-account-page.html";
    });
    document.querySelector('.menu-log-out-button').addEventListener('click', function() {
        localStorage.setItem("UserLoggedIn", "false");
        location.reload();
    });
}

waitForElement('#account-menu', menuLoader);
