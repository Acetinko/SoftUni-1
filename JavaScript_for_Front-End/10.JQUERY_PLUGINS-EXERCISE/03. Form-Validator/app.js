$.validate({
    modules : 'location, date, security, file',
    onModulesLoaded : function() {
        $('#country').suggestCountry();
    }
});

// Restrict presentation length
$('#presentation').restrictLength( $('#pres-max-length') );

$('#bold-btn').click(function(ev){
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

$('#italic-btn').click(function(ev){
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