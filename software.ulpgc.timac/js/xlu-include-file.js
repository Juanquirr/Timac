async function xLuIncludeFile() {
    // Usamos un selector más específico en lugar de "*"
    let elements = document.querySelectorAll("[xlu-include-file]");

    for (let element of elements) {
        let file = element.getAttribute("xlu-include-file");
        try {
            let response = await fetch(file);
            if (response.ok) {
                let content = await response.text();
                let clone = element.cloneNode(false);
                clone.removeAttribute("xlu-include-file");
                clone.innerHTML = content;
                element.parentNode.replaceChild(clone, element);
            } else {
                console.error(`Error loading file ${file}: HTTP ${response.status}`);
            }
        } catch (error) {
            console.error("Error fetching file:", error);
        }
    }
}

// Ejecutar una sola vez y luego cargar el producto
xLuIncludeFile().then(() => {
    loadProduct(); // Asegúrate de que loadProduct esté definido en otro script
});