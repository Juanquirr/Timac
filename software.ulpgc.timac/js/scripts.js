document.addEventListener('DOMContentLoaded', function () {

    // ESTO SE DEBERÍA DE HACER CON UN OBSERVER, NO CON UN TIMEOUT

    setTimeout(() => {
        const decreaseButton = document.getElementById("decrease");
        const increaseButton = document.getElementById("increase");
        const counterElement = document.getElementById("counter");

        let count = 0;

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
    }, 500); // Espera medio segundo para asegurarte de que se cargó el contenido
});