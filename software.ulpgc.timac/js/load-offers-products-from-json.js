import { waitForElement, loadHomePageProductsFromJSON } from './utils.js';

document.addEventListener('DOMContentLoaded',  () => {
    waitForElement("#product-section-offers", ()=> loadHomePageProductsFromJSON("../json/products.json","#product-section-offers", "on_sale"));
});