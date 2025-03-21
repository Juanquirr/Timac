import { waitForElement, loadHomePageProductsFromJSON } from './utils.js';

document.addEventListener('DOMContentLoaded',  () => {
    waitForElement("#product-section-trending", ()=> loadHomePageProductsFromJSON("../json/trending-products.json","#product-section-trending"));
});