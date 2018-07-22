$.validate({
    modules : 'date, security',
    addValidClassOnAll: true,
    lang: 'en'
});

$('#bold-btn').click(function (ev) {
    let txtClass = $("div#format-text input");
    let oldNameClass = (txtClass.prop('class')).split(' ');
    let command = '';
    let isBold = false;

    for (let i = 0; i < oldNameClass.length; i++) {
        if (oldNameClass[i] === "text-bold") {
            isBold = true;
        }
        command += isBold ? '' : ' ' + oldNameClass[i];
    }

    command += isBold ? '' : " text-bold";
    txtClass.attr("class", command.trim());
});

$('#italic-btn').click(function (ev) {
    let txtClass = $("div#format-text input");
    let oldNameClass = (txtClass.prop('class')).split(' ');
    let command = '';
    let isItalic = false;

    for (let i = 0; i < oldNameClass.length; i++) {
        if (oldNameClass[i] === "text-italic") {
            isItalic = true;
        }
        command += isItalic ? '' : ' ' + oldNameClass[i];
    }

    command += isItalic ? '' : " text-italic";
    txtClass.attr("class", command.trim());
});

let textBox = $('#format-text > input');

textBox.on('input propertychange', function (ev) {
    let input = ev.currentTarget.value.trim();

    if (input.length > 0) {
        textBox[0].setAttribute("data-validation", "length");
        textBox[0].setAttribute("data-validation-length", "0-1500");
    } else {
        textBox[0].removeAttribute("data-validation");
        textBox[0].removeAttribute("data-validation-length");
    }
});
