import { clearContainer, waitForElement } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
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

                let filteredProducts = products.filter(product =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
                );

                if (searchQuery === "new" || searchQuery === "offers" || searchQuery === "trending") {
                    filteredProducts = products.filter(product => {
                        if (searchQuery === "new") return product.new === true;
                        if (searchQuery === "offers") return product.on_sale === true;
                        if (searchQuery === "trending") return product.trending === true;
                    });
                }

                if (filteredProducts.length === 0) productContainer.innerHTML = `<p>No results found for "${searchQuery}"</p>`;

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
                    productContainer.appendChild(productElement);
                });
            })
            .catch(error => console.error('Error loading products:', error));
    }

    waitForElement(".product-display-product-container", loadProducts);
});
