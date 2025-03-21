import { waitForElement, loadHomePageProductsFromJSON } from './utils.js';

document.addEventListener('DOMContentLoaded',  () => {
    waitForElement("#product-section-offers", ()=> loadHomePageProductsFromJSON("../json/offers-products.json","#product-section-offers"));
});