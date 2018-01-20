function templateFormat(arr) {

    return getXML(arr);

    function getXML(arr) {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<quiz>\n';
        for (let i = 0; i < arr.length; i++) {
            if (i % 2 === 0) {
                xml += getQuestion(arr[i]);
            } else if (i <= arr.length - 1) {
                xml += getAnswer(arr[i]);
            }
        }
        xml += '</quiz>';

        return xml;
    }
    
    function getQuestion(question) {
        return `    <question>\n        ${question}\n    </question>\n`;
    }

    function getAnswer(answer) {
        return `    <answer>\n        ${answer}\n    </answer>\n`;
    }
}

console.log(templateFormat(["Dry ice is a frozen form of which gas?",
    "Carbon Dioxide",
    "What is the brightest star in the night sky?",
    "Sirius"]));