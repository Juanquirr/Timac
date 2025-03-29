import { clearContainer, waitForElement } from './utils.js';
import { handlePriceRange } from './price-bar.js';
import { updateProducts } from './update-search-results.js';
import { togglePriceOrder } from './toggle-price-order.js';
// Main load products function
function loadProducts() {
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
            clearContainer(productContainer);

            // Filter products
            let filteredProducts = filterProducts(products, searchQuery);

            if (filteredProducts.length === 0) {
                productContainer.innerHTML = `<p>No results found for "${searchQuery}"</p>`;
                return;
            }

            // Calculate price range
            const { minPrice, maxPrice } = calculatePriceRange(filteredProducts);

            // Create brand filters
            const brandSet = new Set(filteredProducts.map(product => product.brand).filter(brand => brand.trim() !== ""));
            createBrandFilters(brandSet);

            // Render products
            filteredProducts.forEach(product => {
                productContainer.appendChild(createProductElement(product));
            });

            const button = document.querySelector('.product-display-title-button');

            if (button) {

                button.addEventListener('click', togglePriceOrder);
            }

            // Create price range inputs
            const rangeContainer = document.querySelector('.range-inputs');
            createPriceRangeInputs(rangeContainer, minPrice, maxPrice);
            // Initialize price filter bar
            handlePriceRange();
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

// Calculate price range
function calculatePriceRange(products) {
    products.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^\d.-]/g, ""));
        const priceB = parseFloat(b.price.replace(/[^\d.-]/g, ""));
        return priceA - priceB;
    });

    return {
        minPrice: products.length > 0 ? parseInt(products[0].price.replace(/[^\d.-]/g, "")) : 0,
        maxPrice: products.length > 0 ? parseInt(products[products.length - 1].price.replace(/[^\d.-]/g, "")) : 0
    };
}

// Create product element
function createProductElement(product) {
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
    return productElement;
}

// Create price range inputs
function createPriceRangeInputs(container, minPrice, maxPrice) {
    container.innerHTML = `
        <input type="range" id="minPrice" min="${minPrice}" max="${maxPrice}" value="${minPrice}">
        <input type="range" id="maxPrice" min="${minPrice}" max="${maxPrice}" value="${maxPrice}">
    `;
}
// Create brand filters
function createBrandFilters(brandSet) {
    const brandFilterContainer = document.querySelector(".filter-bar-option-brand");
    const sortedBrands = [...brandSet].sort((a, b) => a.localeCompare(b));

    sortedBrands.forEach(brand => {
        const brandElement = document.createElement('label');
        brandElement.innerHTML = `
            <input type="checkbox" class="brand" />
            <span class="brand-label">${brand}</span>
        `;
        brandFilterContainer.appendChild(brandElement);
        const checkbox = brandElement.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', function() {
            updateProducts();
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    waitForElement(".product-display-product-container", loadProducts);
});