

export function clearContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

export function waitForElement(selector, callback) {
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


export function loadHomePageProductsFromJSON(jsonFilePath, containerSelector, type) {
    const productContainer = document.querySelector(containerSelector);

    if (!productContainer) console.error('Container not found!');

    console.log(productContainer);
    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {
            const filteredProducts = data.products.filter(product => product[type] === true);

            clearContainer(productContainer);

            if (filteredProducts.length === 0) {
                productContainer.innerHTML = `<p>No products found for ${type}</p>`;
                return;
            }

            filteredProducts.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product-card');

                productElement.innerHTML = `
                    <a href="../html/detailed-product-page.html?id=${product.id}" class="product-link">
                    <div class="product-image-container">
                    <img src="${product.image}" alt="Product Image" class="product-image">
                    </div>
                    <p class="product-title font-base">${product.name}</p>
                    <p class="product-price font-base">${product.price}€</p>
                    <a> 
                `;
                productContainer.appendChild(productElement);
            });
        })
        .catch(error => console.error('Error loading products:', error));
}