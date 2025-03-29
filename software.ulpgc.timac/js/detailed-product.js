import { waitForElement } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {

    function loadDetailedProduct() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get("id");

        fetch('../json/products.json')
            .then(response => response.json())
            .then(data => {
                const product = data.products.find(p => p.id === productId);

                if (!product) {
                    document.getElementById('detailed-product').innerHTML = '<p>Product not found</p>';
                    return;
                }

                const imageContainer = document.querySelector('.top-box-detailed-product-left');
                const img = document.createElement('img');
                img.src = product.image;
                img.alt = product.image_alt;
                imageContainer.appendChild(img);

                const informationContainer = document.querySelector('.information-detailed-product');
                const information = document.createElement('div');
                information.innerHTML = `
                    <h1 class="body-title font-base">${product.name}</h1>
                    <h2 class="big-price font-base">${product.price}</h2>
                    <p class="body-text font-base">
                        Subcategory: ${product.subcategory || 'N/A'}<br>
                        Brand: ${product.brand || 'N/A'}<br>
                        Color: ${product.color || 'N/A'}<br>
                    </p>
                    <div class="availability">
                        <div class="availability-in-store">
                            <img src="../assets/star.png" alt="Star"/>
                            <p class="body-text font-base">${product.availability.in_store ? 'AVAILABLE IN STORE' : 'NOT AVAILABLE IN STORE'}</p>
                        </div>
                        <div class="availability-for-delivery">
                            <img src="../assets/arrow.png" alt="Arrow"/>
                            <p class="body-text font-base">${product.availability.delivery ? 'AVAILABLE FOR DELIVERY' : 'NOT AVAILABLE FOR DELIVERY'}</p>
                        </div>
                    </div>
                `;
                informationContainer.appendChild(information);

                const decreaseBtn = document.getElementById('decrease');
                const increaseBtn = document.getElementById('increase');
                const counterSpan = document.getElementById('counter');

                let basket = JSON.parse(localStorage.getItem("basket")) || [];
                const existingProduct = basket.find(item => item.id === product.id);
                let counter = existingProduct ? existingProduct.quantity : 0;
                counterSpan.textContent = counter;

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

                addBasketBtn.addEventListener('click', () => {
                    if (counter > 0) {
                        let basket = JSON.parse(localStorage.getItem("basket")) || [];
                        const existingProductIndex = basket.findIndex(item => item.id === product.id);
                        if (existingProductIndex > -1) {
                            basket[existingProductIndex].quantity = counter;
                        } else {
                            basket.push({ id: product.id, quantity: counter });
                        }
                        localStorage.setItem("basket", JSON.stringify(basket));
                        console.log(`Added ${counter} ${product.name} to basket`);
                    } else {
                        console.log("Please select a quantity greater than 0.");
                    }
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



    waitForElement(".top-box-detailed-product-left", loadDetailedProduct);
});