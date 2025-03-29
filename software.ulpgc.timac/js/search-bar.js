document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("searchForm");

    if (form) {
        form.addEventListener("submit", function (e){
            e.preventDefault();

            let searchText = document.getElementById("searchBar").value.trim().toLowerCase();

            window.location.href = "../html/subcategory-results-page.html?query=" + searchText;
        });
    }
});