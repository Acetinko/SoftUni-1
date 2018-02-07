function xmlMessenger(text) {
    let messageObj = {to: '', from: '', message: ''};

    let pattern = /^(<message(?:[ ][a-z]+="[A-Za-z0-9 .]+")+>)((?:.|\n)+)(<\/message>)$/g;
    let match = pattern.exec(text);

    if (match !== null) {

        let patternFrom = /\b(from)="(.+?)"/g;
        let patternTo = /\b(to)="(.+?)"/g;
        let matchFrom = patternFrom.exec(match[1]);
        let matchTo = patternTo.exec(match[1]);

        if (matchFrom !== null && matchTo) {

            messageObj.from = matchFrom[2];
            messageObj.to = matchTo[2];
            matchFromTo = pattern.exec(match[1]);
            messageObj.message = match[2];

        } else {
            console.log("Missing attributes");
            return;
        }

    } else {
        console.log("Invalid message format");
        return;
    }

    let messages = messageObj.message.split(/\n/);

    console.log('<article>');
    console.log(`  <div>From: <span class="sender">${messageObj.from}</span></div>`);
    console.log(`  <div>To: <span class="recipient">${messageObj.to}</span></div>`);
    console.log('  <div>');
    for (let message of messages) {
        console.log(`    <p>${message}</p>`);
    }
    console.log('  </div>');
    console.log('</article>');
}

//xmlMessenger('<message from="Alice" timestamp="1497254112">Same old, same old</message>');
//xmlMessenger('<message to="Bob" from="Alice" timestamp="1497254092">Hey man, what\'s up?</message>');
//xmlMessenger('<message to="Bob" from="Alice" timestamp="1497254114">Same old, same old\\nLet\'s go out for a beer</message>');
//xmlMessenger('<message to="Alice" from="Charlie"><img src="fox.jpg"/></message><meta version="2"/>');
//xmlMessenger('<message from="Hillary" to="Edward" secret:true>VGhpcyBpcyBhIHRlc3Q</message>');

xmlMessenger('<message to="Bob" from="Alice" timestamp="1497254114">Same old, same old\n' +
    'Let\'s go out for a beer</message>');