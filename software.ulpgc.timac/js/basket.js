document.addEventListener("DOMContentLoaded", () => {

    function loadDetailedProduct() {
        fetch('../json/basket.json')
            .then(response => response.json())
            .then(product => {

            })
            .catch(error => {
                console.error('Error loading product:', error);
                document.getElementById('   ').innerHTML = '<p>Error loading product json</p>';
            });
    }

    function waitForElement(selector, callback) {
        const element = document.querySelector(selector);
        if (element) {
            callback();
            return;
        }
        const observer = new MutationObserver((mutations, obs) => {
            if (document.querySelector(selector)) {
                obs.disconnect();
                callback();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    waitForElement(".", loadDetailedProduct);
});