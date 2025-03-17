async function xLuIncludeFile() {
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
xLuIncludeFile().then(r => loadProduct());