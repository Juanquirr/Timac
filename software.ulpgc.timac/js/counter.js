function initCounters() {
    const counterElements = document.querySelectorAll(".counter-container");

    counterElements.forEach(counterElement => {
       const decreaseButton = counterElement.querySelector(".counter-button.decrease");
       const increaseButton = counterElement.querySelector(".counter-button.increase");
       const counterValue = counterElement.querySelector(".counter-value.counter");

       if(!counterElement.dataset.initialized && decreaseButton && increaseButton && counterValue){
           counterElement.dataset.initialized = "true";

           let count = parseInt(counterValue.textContent) || 0;

           decreaseButton.addEventListener("click", () => {
               if(count > 0){
                   count--;
                   counterValue.textContent = count;
               }
           });

           increaseButton.addEventListener("click", () => {
               count++;
               counterValue.textContent = count;
           });
       }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const observer = new MutationObserver(() => {
        initCounters();
    });
    observer.observe(document.body, { childList: true, subtree: true });
})