import { clearContainer, waitForElement } from './utils.js';

document.addEventListener('DOMContentLoaded',  () => {
    function loadSubcategories() {

        const subcategoryContainer = document.querySelector('.subcategory-selection-main-container');

        if (!subcategoryContainer) {
            console.error(".subcategory-selection-main-container was not found in the DOM");
            return;
        }

        const params = new URLSearchParams(window.location.search);
        const searchQuery = params.get("category") || "";  // si no hay query pongo cadena vacia para que los cargue todos

        fetch('../json/subcategory-option-selector.json')
            .then(response => response.json())
            .then(data  => {

                const subcategories = data[searchQuery];

                clearContainer(subcategoryContainer);

                subcategories .forEach(subcategory => {
                    const subcategoryElement = document.createElement('div');
                    subcategoryElement.classList.add('subcategory-selection-sub-category-option');
                    subcategoryElement.innerHTML = `
                    <div class="subcategory-selection-ellipse-1">
                        <a href="${subcategory.link}" class="subcategory-selection-full-link"></a>
                        <img class="subcategory-selection-ellipse-2" src="${subcategory.image}" alt="${subcategory.alt}" />
                        <p class="body-text font-base">${subcategory.name}</p>
                    </div>
                    
          `;
                    subcategoryContainer.appendChild(subcategoryElement);
                });
            })
            .catch(error => console.error('Error loading Subcategories:', error));
    }

    waitForElement(".subcategory-selection-main-container", loadSubcategories);
});