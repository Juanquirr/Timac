async function xLuIncludeFile() {
    let elements = document.getElementsByTagName("*");
    let processed = false;

    for (let i = 0; i < elements.length; i++) {
        if (elements[i].getAttribute("xlu-include-file")) {
            let clone = elements[i].cloneNode(false);
            let file = elements[i].getAttribute("xlu-include-file");

            try {
                let response = await fetch(file);
                if (response.ok) {
                    let content = await response.text();
                    clone.removeAttribute("xlu-include-file");
                    clone.innerHTML = content;
                    elements[i].parentNode.replaceChild(clone, elements[i]);
                    processed = true;
                } else {
                    console.error(`Error loading file ${file}: HTTP ${response.status}`);
                }
            } catch (error) {
                console.error("Error fetching file:", error);
            }
        }
    }

    if (processed) {
        xLuIncludeFile(); // Recursivo solo si se procesó algo
    }
}