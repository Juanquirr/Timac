import { clearContainer, waitForElement } from './utils.js';


// Main update products function
export function updateProducts() {
    const productContainer = document.querySelector('.product-display-product-container');
    if (!productContainer) {
        console.error(".product-display-product-container was not found in the DOM");
        return;
    }

    const searchQuery = new URLSearchParams(window.location.search).get("query") || "";
    document.querySelector(".subcategory-name").textContent = `Search results for "${searchQuery}"`;

    fetch('../json/products.json')
        .then(response => response.json())
        .then(data => {
            const products = data.products;


            // Filter products
            let filteredProducts = filterProducts(products, searchQuery);

            if (filteredProducts.length === 0) {
                productContainer.innerHTML = `<p>No results found for "${searchQuery}"</p>`;
                return;
            }

            // get price range
            const { minPrice, maxPrice } = getPriceRange(filteredProducts);


            clearContainer(productContainer);
            // get brands
            const selectedBrands = getBrands();




            if(document.querySelector(".product-display-title-button").textContent === "Price (Low to High)") {
                products.sort((a, b) => {
                    return parseFloat(a.price.replace(/[^\d.-]/g, "")) - parseFloat(b.price.replace(/[^\d.-]/g, ""));
                });
            }else {
                products.sort((b, a) => {
                    return parseFloat(a.price.replace(/[^\d.-]/g, "")) - parseFloat(b.price.replace(/[^\d.-]/g, ""));
                });
            }


            productContainer.innerHTML = "";


            products.forEach(product => {
                const price = Math.floor(parseFloat(product.price.replace(/[^\d.-]/g, "")));

                if (price <= maxPrice && price >= minPrice && (selectedBrands.has(product.brand) || selectedBrands.size === 0)) {
                    const productElement = document.createElement('div');
                    productElement.classList.add('single-big-product-container');
                    productElement.innerHTML = `
                            <a class="single-big-product-full-link" href="../html/detailed-product-page.html?id=${product.id}"></a>
                            <div class="single-big-product-image-container">
                                <img class="single-big-product-image" src="${product.image}" alt="${product.name}"/>
                            </div>
                            <h1 class="single-big-product-title font-base body-text">${product.name}</h1>
                            <div class="single-big-product-price font-base body-text">
                                <h2>${product.price}</h2>
                            </div>
                            <div class="availability">
                                <div class="availability-in-store">
                                    <img src="../assets/star.png" alt="Star"/>
                                    <p class="body-text font-base">${product.available_in_store ? 'AVAILABLE IN STORE' : 'NOT AVAILABLE IN STORE'}</p>
                                </div>
                                <div class="availability-for-delivery">
                                    <img src="../assets/arrow.png" alt="Arrow"/>
                                    <p class="body-text font-base">${product.available_to_deliver ? 'AVAILABLE FOR DELIVERY' : 'NOT AVAILABLE FOR DELIVERY'}</p>
                                </div>
                            </div>
                        `;
                    productContainer.appendChild(productElement);
                }
            });



        })
        .catch(error => console.error('Error loading products:', error));
}

// Filter products based on search query
function filterProducts(products, searchQuery) {
    if (searchQuery === "new" || searchQuery === "offers" || searchQuery === "trending") {
        return products.filter(product => {
            if (searchQuery === "new") return product.new === true;
            if (searchQuery === "offers") return product.on_sale === true;
            if (searchQuery === "trending") return product.trending === true;
        });
    }

    return products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
    );
}


function getPriceRange() {

    const minValue = document.getElementById("minValue").textContent;
    const maxValue = document.getElementById("maxValue").textContent;
    const minPrice = parseFloat(minValue.replace(/[^\d.-]/g, "")) || 0;
    const maxPrice = parseFloat(maxValue.replace(/[^\d.-]/g, "")) || 0;

    return {
        minPrice: minPrice,
        maxPrice: maxPrice
    };
}

function getBrands() {
    const BrandsContainer = document.querySelector(".filter-bar-option-brand");
    const selectedBrands = new Set();

    const brands = BrandsContainer.children;
    Array.from(brands).forEach(product => {
        const checkbox = product.querySelector('input[type="checkbox"]');

        if (checkbox && checkbox.checked) {
            selectedBrands.add(product.textContent.trim());
        }

    });
    return selectedBrands

}

document.addEventListener('DOMContentLoaded', () => {

    waitForElement(".product-display-product-container", updateProducts);


});