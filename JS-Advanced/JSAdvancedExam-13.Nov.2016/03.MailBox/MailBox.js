class MailBox {
    constructor() {
        this.boxes = [];
    }

    addMessage(subject, text) {
        this.boxes.push({subject: subject, text: text});
        return this; // !!!!!!!!!!!!!!!!!!!!!
    }

    get messageCount() {
        return this.boxes.length;
    }

    deleteAllMessages() {
        this.boxes = [];
    }

    findBySubject(substr) {
        let output = [];
        for (let obj of this.boxes) {
            if (obj.subject.indexOf(substr) > -1) {
                output.push(obj);
            }
        }

        return output;
    }

    toString() {
        if (this.boxes.length > 0) {
            let output = [];
            for (let obj of this.boxes) {
                output.push(`* [${obj.subject}] ${obj.text}`);
            }

            return output.join('\n');
        }
        return "* (empty mailbox)";
    }
}

let mb = new MailBox();
console.log("Msg count: " + mb.messageCount); // Msg count: 0
console.log('Messages:\n' + mb);
// Messages:
//* (empty mailbox)
mb.addMessage("meeting", "Let's meet at 17/11");
mb.addMessage("beer", "Wanna drink beer tomorrow?");
mb.addMessage("question", "How to solve this problem?");
mb.addMessage("Sofia next week", "I am in Sofia next week.");
console.log("Msg count: " + mb.messageCount);
// Msg count: 4

console.log('Messages:\n' + mb);
//Messages:
//* [meeting] Let's meet at 17/11
//* [beer] Wanna drink beer tomorrow?
//* [question] How to solve this problem?
//* [Sofia next week] I am in Sofia next week.

console.log("Messages holding 'rakiya': " + JSON.stringify(mb.findBySubject('rakiya')));
//Messages holding 'rakiya': []
console.log("Messages holding 'ee': " + JSON.stringify(mb.findBySubject('ee')));
//Messages holding 'ee': [{"subject":"meeting","text":"Let's meet at 17/11"},
// {"subject":"beer","text":"Wanna drink beer tomorrow?"},
// {"subject":"Sofia next week","text":"I am in Sofia next week."}]

mb.deleteAllMessages();
console.log("Msg count: " + mb.messageCount);

console.log('Messages:\n' + mb);

console.log("New mailbox:\n" + new MailBox()
        .addMessage("Subj 1", "Msg 1")
        .addMessage("Subj 2", "Msg 2")
        .addMessage("Subj 3", "Msg 3")
        .toString());
