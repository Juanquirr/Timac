import { clearContainer, waitForElement } from './utils.js';

document.addEventListener('DOMContentLoaded',  () => {
    function loadProducts() {

        const productContainer = document.querySelector('.product-display-product-container');

        if (!productContainer) {
            console.error(".product-display-product-container was not found in the DOM");
            return;
        }

        const params = new URLSearchParams(window.location.search);
        const searchQuery = params.get("query") || "";  // si no hay query pongo cadena vacia para que los cargue todos

        document.querySelector(".subcategory-name").textContent = "Search results for \"" + searchQuery + "\"";

        fetch('../json/products.json')
            .then(response => response.json())
            .then(data => {

                const products = data.products;

                clearContainer(productContainer);

                const filteredProducts = products.filter(product =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
                );

                if (filteredProducts.length === 0) {
                    productContainer.innerHTML = `<p>No results found for "${searchQuery}"</p>`;
                }

                filteredProducts.forEach(product => {

                    const productElement = document.createElement('div');
                    productElement.classList.add('single-big-product-container');

                    productElement.innerHTML = `
            <a class="single-big-product-full-link" href="../html/detailed-product-page.html?id=${product.id}"></a>
            <img class="single-big-product-image" src="${product.image}" alt="${product.name}"/>
            <h1 class="single-big-product-title font-base body-text">${product.name}</h1>
            <div class="single-big-product-price font-base body-text">
              <h2>${product.price}</h2>
            </div>
            <div class="single-big-product-start-container">
              <img class="single-big-product-star" src="../assets/star-10.svg" alt=""/>
              <p class="single-big-product-available-in-store font-base body-little">${product.available_in_store ? 'AVAILABLE IN STORE' : 'NOT AVAILABLE IN STORE'}</p>
            </div>
            <div class="single-big-product-arrow-container">
              <img class="single-big-product-arrow" src="../assets/arrow-10.svg" alt=""/>
              <p class="single-big-product-available-to-deliver font-base body-little">${product.available_to_deliver ? 'AVAILABLE TO DELIVER' : 'NOT AVAILABLE TO DELIVER'}</p>
            </div>
          `;
                    productContainer.appendChild(productElement);
                });
            })
            .catch(error => console.error('Error loading products:', error));
    }

    waitForElement(".product-display-product-container", loadProducts);
});