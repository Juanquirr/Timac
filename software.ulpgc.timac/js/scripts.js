document.addEventListener('DOMContentLoaded', function () {
    const observer = new MutationObserver(() => {
        const decreaseButton = document.getElementById("decrease");
        const increaseButton = document.getElementById("increase");
        const counterElement = document.getElementById("counter");

        initCounter(decreaseButton, increaseButton, counterElement);
    });
    observer.observe(document.body, {childList: true, subtree: true});
});

function initCounter(decreaseButton, increaseButton, counterElement) {

    let count = parseInt(counterElement.textContent);

    increaseButton.addEventListener("click", function () {
        count++;
        counterElement.textContent = count;
    });

    decreaseButton.addEventListener("click", function () {
        if (count > 0){
            count--;
            counterElement.textContent = count;
        }
    });
}