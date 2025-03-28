import { updateProducts } from './update-search-results.js';

export function togglePriceOrder(){
    const button = document.querySelector('.product-display-title-button');
    if (button.textContent === "Price (Low to High)") {
        button.textContent = "Price (High to Low)";
    }else {
        button.textContent = "Price (Low to High)";

    }
    updateProducts();


}