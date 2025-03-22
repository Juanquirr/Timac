document.addEventListener("DOMContentLoaded", () => {
    function loadBasket() {
        const basket = JSON.parse(localStorage.getItem("basket")) || [];

        fetch('../json/products.json')
            .then(response => response.json())
            .then(data => {
                const allProducts = data.products;
                const header = document.querySelector('.top-basket-section h1');
                const productsContainer = document.querySelector('.bottom-basket-section');

                const basketProducts = basket
                    .filter(item => item.quantity > 0)
                    .map(item => {
                        const product = allProducts.find(p => p.id === item.id);
                        return product ? { ...product, quantity: item.quantity } : null;
                    })
                    .filter(Boolean); // Remove any null entries ??

                const totalItems = basketProducts.length;
                header.innerHTML = `My basket - ${totalItems} items<hr>`;
                productsContainer.innerHTML = '';

                basketProducts.forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.className = 'basket-product';
                    productElement.innerHTML = `
                        <label>
                            <input type="checkbox" checked>
                        </label>
                        <div class="item-image">
                            <img src="${product.image}" alt="${product.image_alt}">
                        </div>
                        <div class="item-details">
                            <h3 class="body-subtitle font-base">${product.name}</h3>
                            <div class="availability">
                                <div class="availability-in-store">
                                    <img src="../assets/star.png" alt="Star"/>
                                    <p class="body-little font-base">${product.availability.in_store}</p>
                                </div>
                                <div class="availability-for-delivery">
                                    <img src="../assets/arrow.png" alt="Arrow"/>
                                    <p class="body-little font-base">${product.availability.delivery}</p>
                                </div>
                            </div>
                            <p class="big-price font-base">${product.price}</p>
                            <div class="counter-container">
                                <button class="counter-button decrease">-</button>
                                <span class="counter-value counter">${product.quantity}</span>
                                <button class="counter-button increase">+</button>
                            </div>
                        </div>
                        <button class="remove">🗑️</button>
                    `;

                    productsContainer.appendChild(productElement);

                    const decreaseBtn = productElement.querySelector('.decrease');
                    const increaseBtn = productElement.querySelector('.increase');
                    const counterSpan = productElement.querySelector('.counter');
                    const removeBtn = productElement.querySelector('.remove');
                    const checkbox = productElement.querySelector('input[type="checkbox"]');
                    let counter = product.quantity;

                    decreaseBtn.addEventListener('click', () => {
                        if (counter > 0) {
                            counter--;
                            counterSpan.textContent = counter;
                            updateBasket(product.id, counter);
                            updateHeader();
                            updateSummary();
                        }
                    });

                    increaseBtn.addEventListener('click', () => {
                        counter++;
                        counterSpan.textContent = counter;
                        updateBasket(product.id, counter);
                        updateHeader();
                        updateSummary();
                    });

                    removeBtn.addEventListener('click', () => {
                        productElement.remove();
                        updateBasket(product.id, 0);
                        updateHeader();
                        updateSummary();
                    });

                    checkbox.addEventListener('change', () => {
                        updateSummary();
                    });
                });

                const paymentSection = document.querySelector('.summary-section section');
                paymentSection.innerHTML = `
                    <h2 class="body-subtitle center-text font-base">Payment Methods</h2>
                    <p class="body-text font-base">Visa ending in 1234</p>
                    <p class="body-text font-base">Mastercard ending in 5678</p>
                `;

                function updateBasket(productId, quantity) {
                    let basket = JSON.parse(localStorage.getItem("basket")) || [];
                    const productIndex = basket.findIndex(item => item.id === productId);
                    if (productIndex > -1) {
                        if (quantity > 0) {
                            basket[productIndex].quantity = quantity;
                        } else {
                            basket.splice(productIndex, 1);
                        }
                    } else if (quantity > 0) {
                        basket.push({ id: productId, quantity });
                    }
                    localStorage.setItem("basket", JSON.stringify(basket));
                }

                function updateHeader() {
                    const updatedBasket = JSON.parse(localStorage.getItem("basket")) || [];
                    const totalItems = updatedBasket.length;
                    header.innerHTML = `My basket - ${totalItems} items<hr>`;
                }

                function updateSummary() {
                    let subtotal = 0;
                    const updatedBasket = JSON.parse(localStorage.getItem("basket")) || [];
                    updatedBasket.forEach(item => {
                        const product = allProducts.find(p => p.id === item.id);
                        if (product && item.quantity > 0) {
                            const productElement = Array.from(productsContainer.querySelectorAll('.basket-product'))
                                .find(el => el.querySelector('h3').textContent === product.name);
                            const checkbox = productElement ? productElement.querySelector('input[type="checkbox"]') : null;

                            if (checkbox && checkbox.checked) {
                                const price = parseFloat(product.price.replace('€', ''));
                                subtotal += item.quantity * price;
                            }
                        }
                    });

                    const summary = document.querySelector('.summary-section dl');
                    summary.innerHTML = `
                        <dt>Subtotal:</dt>
                        <dd>${subtotal.toFixed(2)}€</dd>
                        <dt>Estimated Total:</dt>
                        <dd>${subtotal.toFixed(2)}€</dd>
                    `;
                }

                updateSummary();
            })
            .catch(error => {
                console.error('Error loading products:', error);
                document.querySelector('.basket-container').innerHTML = '<p>Error loading products</p>';
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

    waitForElement(".basket-container", loadBasket);
});