import { waitForElement } from './utils.js';

document.addEventListener('DOMContentLoaded', function () {
    function handlePriceRange() {
        const minPrice = document.getElementById('minPrice');
        const maxPrice = document.getElementById('maxPrice');
        let minValue = document.getElementById('minValue');
        let maxValue = document.getElementById('maxValue');
        const rangeTrackActive = document.getElementById('rangeTrackActive');

        function updateRange(source) {
            let min = parseInt(minPrice.value);
            let max = parseInt(maxPrice.value);


            if (min > max) {
                if (source === 'minPrice' || source === 'minValue') {
                    maxPrice.value = min;
                    max = min;
                } else if (source === 'maxPrice' || source === 'maxValue') {
                    minPrice.value = max;
                    min = max;
                }
            }


            if (source !== 'minValue' && minValue.tagName === 'SPAN') {
                minValue.textContent = `${min}€`;
            }
            if (source !== 'maxValue' && maxValue.tagName === 'SPAN') {
                maxValue.textContent = `${max}€`;
            }

            const minPercent = ((min - parseInt(minPrice.min)) / (parseInt(minPrice.max) - parseInt(minPrice.min))) * 100;
            const maxPercent = ((max - parseInt(maxPrice.min)) / (parseInt(maxPrice.max) - parseInt(maxPrice.min))) * 100;

            rangeTrackActive.style.left = `${minPercent}%`;
            rangeTrackActive.style.width = `${maxPercent - minPercent}%`;
        }


        minPrice.addEventListener('input', () => updateRange('minPrice'));
        maxPrice.addEventListener('input', () => updateRange('maxPrice'));


        function enableEditing(element, slider, source) {

            const currentValue = parseInt(element.textContent);


            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentValue;
            input.className = element.className;


            element.parentNode.replaceChild(input, element);


            if (source === 'minValue') {
                minValue = input;
            } else {
                maxValue = input;
            }


            input.focus();
            input.select();


            input.addEventListener('blur', () => {
                let value = parseInt(input.value);
                if (isNaN(value)) {
                    value = source === 'minValue' ? parseInt(minPrice.min) : parseInt(maxPrice.max);
                }
                value = Math.max(parseInt(slider.min), Math.min(parseInt(slider.max), value));
                slider.value = value;


                const span = document.createElement('span');
                span.id = element.id;
                span.textContent = `${value}€`;
                span.className = element.className;
                input.parentNode.replaceChild(span, input);


                if (source === 'minValue') {
                    minValue = span;
                    minValue.addEventListener('click', () => enableEditing(minValue, minPrice, 'minValue'));
                } else {
                    maxValue = span;
                    maxValue.addEventListener('click', () => enableEditing(maxValue, maxPrice, 'maxValue'));
                }

                updateRange(source);
            });

            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    input.blur();
                }
            });


            input.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '');
            });
        }

        minValue.addEventListener('click', () => enableEditing(minValue, minPrice, 'minValue'));
        maxValue.addEventListener('click', () => enableEditing(maxValue, maxPrice, 'maxValue'));

        updateRange();
    }
    waitForElement(".range-slider", handlePriceRange);

});