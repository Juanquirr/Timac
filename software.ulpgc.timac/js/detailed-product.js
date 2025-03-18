document.addEventListener("DOMContentLoaded", () => {

    function loadProduct() {
        fetch('../json/detailed-product.json')
            .then(response => response.json())
            .then(product => {
                const imageContainer = document.querySelector('.top-box-detailed-product-left');
                const img = document.createElement('img');
                img.src = product.image;
                img.alt = product.alt;
                imageContainer.appendChild(img);

                const informationContainer = document.querySelector('.information-detailed-product');
                const information = document.createElement('div');
                information.innerHTML = `
                    <h1 class="body-title font-base">${product.title}</h1>
                    <h2 class="big-price font-base">${product.price}</h2>
                    <p class="body-text font-base">
                        Subcategory: ${product.subcategory}<br>
                        Brand: ${product.brand}<br>
                        Color: ${product.color}<br>
                        Specific attribute 1: ${product.specific_attribute_1}<br>
                        Specific attribute 2: ${product.specific_attribute_2}
                    </p>
                    <div class="availability">
                        <div class="in-store">
                            <img src="../assets/star.png" alt="Star"/>
                            <p class="body-text font-base">${product.availability['in-store'] ? 'AVAILABLE IN STORE' : 'NOT AVAILABLE IN STORE'}</p>
                        </div>
                        <div class="in-store">
                            <img src="../assets/arrow.png" alt="Arrow"/>
                            <p class="body-text font-base">${product.availability.delivery ? 'AVAILABLE FOR DELIVERY' : 'NOT AVAILABLE FOR DELIVERY'}</p>
                        </div>
                    </div>
                `;
                informationContainer.appendChild(information);

                const decreaseBtn = document.getElementById('decrease');
                const increaseBtn = document.getElementById('increase');
                const counterSpan = document.getElementById('counter');
                let counter = 0;
                decreaseBtn.addEventListener('click', () => {
                    if (counter > 0) {
                        counter--;
                        counterSpan.textContent = counter;
                    }
                });

                increaseBtn.addEventListener('click', () => {
                    counter++;
                    counterSpan.textContent = counter;
                });

                const addBasketBtn = document.getElementById('add-basket-button');

                addBasketBtn.addEventListener('click', (_) => {
                    console.log(`Added ${counter} ${product.title} to basket`);
                });

                const descriptionContainer = document.querySelector('.bottom-box-detailed-product');
                descriptionContainer.innerHTML = `
                    <h2 class="body-title font-base">About this item</h2>
                    <p class="body-text font-base">${product.description.join('<br>')}</p>
                `;

            })
            .catch(error => {
                console.error('Error loading product:', error);
                document.getElementById('detailed-product').innerHTML = '<p>Error loading product json</p>';
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

    waitForElement(".top-box-detailed-product-left", loadProduct);
});