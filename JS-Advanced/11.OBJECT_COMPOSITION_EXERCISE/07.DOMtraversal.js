function domTraversal(selector) {
    let deepesPath = 0;
    let deepesElement;
    let allLeafElement = $(`${selector} *:not(:has(*))`);

    allLeafElement.each(function (index, element) {
        let currentDeepnesLevel = 0;
        let originalLeaf = element;

        while (element) {
            currentDeepnesLevel++;
            element = $(element).parent()[0];
        }

        if (currentDeepnesLevel > deepesPath) {
            deepesPath = currentDeepnesLevel;
            deepesElement = originalLeaf;
        }
    });

    let selectedElement = $(selector)[0];

    while (deepesElement && deepesElement !== selectedElement) {
        $(deepesElement).addClass("highlight");
        deepesElement = $(deepesElement).parent()[0];
    }

    $(selector).addClass("highlight");
}