document.addEventListener('DOMContentLoaded',  () => {
    function loadProducts() {

        const productContainer = document.querySelector('.product-display-product-container');

        if (!productContainer) {
            console.error(".product-display-product-container was not found in the DOM");
            return;
        }

        fetch('../json/subcategory-results.json')
            .then(response => response.json())
            .then(products => {
                clearContainer(productContainer);
                products.forEach(product => {

                    const productElement = document.createElement('div');
                    productElement.classList.add('single-big-product-container');

                    productElement.innerHTML = `
            <a class="single-big-product-full-link" href="${product.link}"></a>
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

    function clearContainer(container) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }

    function waitForElement(selector, callback) {
        const element = document.querySelector(selector);
        if (element) {
            callback();
            return;
        }

        const observer = new MutationObserver((mutations, obs) => {
            if (document.querySelector(selector)) {
                obs.disconnect();
                callback();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    waitForElement(".product-display-product-container", loadProducts);
});