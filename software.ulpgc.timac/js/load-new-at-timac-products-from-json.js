import { waitForElement, loadHomePageProductsFromJSON } from './utils.js';

document.addEventListener('DOMContentLoaded',  () => {
    waitForElement("#product-section-new-at-timac", ()=> loadHomePageProductsFromJSON("../json/products.json","#product-section-new-at-timac", "new"));
});