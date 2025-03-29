import { waitForElement } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
    function searchForm() {
        const observer = new MutationObserver(() => {
            document.getElementById("searchForm").addEventListener("submit", function (e){
                e.preventDefault();

                let searchText = document.getElementById("searchBar").value.trim().toLowerCase();

                window.location.href = "../html/subcategory-results-page.html?query=" + searchText;
            });
        });
        observer.observe(document.body, {childList: true, subtree: true});
    }
    waitForElement('#searchForm', searchForm)
});

