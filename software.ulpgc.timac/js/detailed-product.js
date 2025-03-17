document.addEventListener("DOMContentLoaded", async() => {

    function loadProduct() {
        try {
            fetch('../json/detailed-product.json')
                .then(response => response.json())
                .then(
                    product => {
                        const container = document.querySelector('.-left');
                        const productImage = document.createElement('div');
                        productImage.innerHTML = `<img id="biggest-product" src="${product.image}" alt="Hammer">`
                        container.appendChild(productImage);
                    }
                );
        }
        catch (error) {
            console.error('Error loading product:', error);
            document.getElementById('detailed-product').innerHTML = '<p>Error loading product json</p>';
        }

        //     const decreaseBtn = document.getElementById('decrease');
        //     const increaseBtn = document.getElementById('increase');
        //     const counterSpan = document.getElementById('counter');
        //     let counter = 0;
        //
        //     decreaseBtn.addEventListener('click', () => {
        //         if (counter > 0) {
        //             counter--;
        //             counterSpan.textContent = counter;
        //         }
        //     });
        //
        //     increaseBtn.addEventListener('click', () => {
        //         counter++;
        //         counterSpan.textContent = counter;
        //     });
        //
        //     // Opcional: funcionalidad para "Add to basket"
        //     const addBasketBtn = document.getElementById('add-basket-button');
        //     addBasketBtn.addEventListener('click', (e) => {
        //         // Aquí podrías guardar el producto y la cantidad en localStorage o una variable global
        //         console.log(`Added ${counter} ${product.title} to basket`);
        //     });
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
    waitForElement(".-left", loadProduct);
});