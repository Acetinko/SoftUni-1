function formatHelper(arrStr) {
    let text = arrStr[0]
        .replace(/[.,!?:;]\s*/g, match => match.trim() + ' ')
        .replace(/\s*[.,!?:;]/g, match => match.trim())
        .replace(/[.]\s*[.]\s*[.]\s*[!]\s*/g, "...!")
        .replace(/([.]\s+)(\d+)/g,
            (match, gr1, gr2) => gr1.trim() + gr2.trim())
        .replace(/(["])(\s*[^"]+\s*)(["])/g,
        (match, gr1, gr2, gr3) => gr1 + gr2.trim() + gr3);

    console.log(text);
}


formatHelper(['Terribly formatted text .With chaotic spacings.    "       Terrible quoting "!Also this date is pretty confusing : 20 . 12. 16 .']);
formatHelper(['Make,sure to give:proper spacing where is needed. .. !']);