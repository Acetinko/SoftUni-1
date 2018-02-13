function queryMess(arr) {
    let messages = {};

    for (let text of arr) {
        let tokens = text.split('&');

        for (let i = 0; i < tokens.length; i++) {
            let [key, value] = tokens[i].split('=');

            key = key
                .replace(/^[+]+/g, '')
                .replace(/^[%20]+/g, '')
                .replace(/[+]+$/g, '')
                .replace(/[%20]+$/g, '');

            value = value
                .replace(/^[+]+/g, '')
                .replace(/^[%20]+/g, '')
                .replace(/[+]+$/g, '')
                .replace(/[%20]+$/g, '');

            messages = {key:key, values: []};
            messages.values.push(value)
        }

        console.log(messages);
    }

}

queryMess([
    'foo=%20foo&value=+val&foo+=5+%20+203',
    'foo=poo%20&value=valley&dog=wow+',
    'url=https://softuni.bg/trainings/coursesinstances/details/1070',
    'https://softuni.bg/trainings.asp?trainer=nakov&course=oop&course=php'
]);