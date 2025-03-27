function barToggle(toggleSectionClass, arrowId) {
    const toggleSection  = document.querySelector(`.${toggleSectionClass}`);
    const arrow = document.getElementById(arrowId);

    if (toggleSection  && arrow) {
        if (toggleSection .style.display === "none" || toggleSection .style.display === "") {
            toggleSection .style.display = "flex";
            arrow.style.transform = "rotate(136deg)";
        } else {
            toggleSection .style.display = "none";
            arrow.style.transform = "rotate(45deg)";
        }
    }
}