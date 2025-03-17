async function loadProduct() {
    try {
        const response = await fetch('../json/detailed-product.json');
        const data = await response.json();
        const product = data.product;

        const container = document.getElementById('detailed-product');

        container.innerHTML = `
      <div class="top-boxes-detailed-product">
        <div class="top-box-detailed-product -left">
          <img class="biggest-product" src="${product.image}" alt="${product.alt}">
        </div>
        <div class="top-box-detailed-product">
          <div>
            <h1 class="body-title font-base">${product.title}</h1>
            <h2 class="big-price font-base">${product.price}</h2>
            <p class="body-text font-base">
              Subcategory: ${product.subcategory}<br>
              Brand: ${product.brand}<br>
              Color: ${product.color}<br>
              Specific attribute 1: ${product.specific_attribute_1}<br>
              Specific attribute 2: ${product.specific_attribute_2}
            </p>
            <div class="availability">
              <div class="in-store">
                <img src="../assets/star.png" alt="Star"/>
                <p class="body-text font-base">${
            product.availability.in_store ? 'AVAILABLE IN STORE' : 'NOT AVAILABLE IN STORE'
        }</p>
              </div>
              <div class="in-store">
                <img src="../assets/arrow.png" alt="Arrow"/>
                <p class="body-text font-base">${
            product.availability.for_delivery ? 'AVAILABLE FOR DELIVERY' : 'NOT AVAILABLE FOR DELIVERY'
        }</p>
              </div>
            </div>
          </div>
          <div class="counter-container">
            <p class="body-text font-base">Amount</p>
            <button class="counter-button" id="decrease">-</button>
            <span class="counter-value" id="counter">0</span>
            <button class="counter-button" id="increase">+</button>
          </div>
          <div id="add-basket-container">
            <a href="../html/basket-page.html" class="add-basket-button" id="add-basket-button" target="_self">
              <span class="basket-text font-base">Add to basket</span>
            </a>
          </div>
        </div>
      </div>
      <div class="bottom-box-detailed-product">
        <h2 class="body-title font-base">About this item</h2>
        <p class="body-text font-base">${product.description.join('<br><br>')}</p>
      </div>
    `;

        const decreaseBtn = document.getElementById('decrease');
        const increaseBtn = document.getElementById('increase');
        const counterSpan = document.getElementById('counter');
        let counter = 0;

        decreaseBtn.addEventListener('click', () => {
            if (counter > 0) {
                counter--;
                counterSpan.textContent = counter;
            }
        });

        increaseBtn.addEventListener('click', () => {
            counter++;
            counterSpan.textContent = counter;
        });

        // Opcional: funcionalidad para "Add to basket"
        const addBasketBtn = document.getElementById('add-basket-button');
        addBasketBtn.addEventListener('click', (e) => {
            // Aquí podrías guardar el producto y la cantidad en localStorage o una variable global
            console.log(`Added ${counter} ${product.title} to basket`);
        });

    } catch (error) {
        console.error('Error loading product:', error);
        document.getElementById('detailed-product').innerHTML = '<p>Error loading product json</p>';
    }
}

window.onload = loadProduct;