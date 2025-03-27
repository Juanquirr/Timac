import { waitForElement } from './utils.js';

document.addEventListener("DOMContentLoaded", function () {
    function modifyElementStyle(selector, styleProperty, styleValue) {

        const element = document.querySelector(selector);

        if (!element) {

            waitForElement(selector, () => modifyElementStyle(selector, styleProperty, styleValue));
        } else {
            element.style[styleProperty] = styleValue;
        }
    }

    const testRange = document.createElement("input");
    testRange.type = "range";

    document.body.appendChild(testRange);

    const supportsThumb = window.getComputedStyle(testRange, '::-webkit-slider-thumb').getPropertyValue('appearance') ||
        window.getComputedStyle(testRange, '::-moz-range-thumb').getPropertyValue('appearance');

    document.body.removeChild(testRange);

    if (!supportsThumb) {
        modifyElementStyle('.range-slider-value', 'display', 'none');
        modifyElementStyle('.range-values', 'justifyContent', 'space-evenly');
    } else {
        modifyElementStyle('.limit-price-label', 'display', 'none');
    }

});