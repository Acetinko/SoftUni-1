function wikiParser(selector) {
    let element = $(selector);

    let patternB = /[']{3}(.*?)[']{3}/g;
    let patternI = /[']{2}(.*?)[']{2}/g;
    let patternH3 = /[=]{3}(.*?)[=]{3}/g;
    let patternH2 = /[=]{2}(.*?)[=]{2}/g;
    let patternH1 = /[=]{1}(.*?)[=]{1}/g;
    let patternLink = /\[\[(.[^|\][]*?)]]/g;
    let patternLinkText = /\[\[(.*?)]]/g;
    let patternLinkTextGroup = /(.*)\|(.*)/g;

    let text = ((element.text()
            .replace(patternB, (match, group) => `<b>${group}</b>`)
            .replace(patternI, (match, group) => `<i>${group}</i>`)
            .replace(patternH3, (match, group) => `<h3>${group}</h3>`)
            .replace(patternH2, (match, group) => `<h2>${group}</h2>`)
            .replace(patternH1, (match, group) => `<h1>${group}</h1>`)
            .replace(patternLink, (match, group) => `<a href="/wiki/${group}">${group}</a>`)
            .replace(patternLinkText, (match, group) => group
                .replace(patternLinkTextGroup, (m, gr1, gr2) => `<a href="/wiki/${gr1}">${gr2}</a>`))
    ));

    element.html(text);
}