$(".cats").slick({
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3
});

(() => {
    let div = $('.cats div.slick-cloned');

    for (let i = 0; i < div.length; i++) {
        let tmpSrc = (div[i].children[0]).getAttribute('src');
        if (tmpSrc == null) {
            continue;
        }
        let tmpNum = +(tmpSrc.split('img/')[1]).split('.')[0];

        if (tmpNum % 3 === 1) {
            continue;
        }

        $(div[i]).fadeTo("slow", 0.5, function () {
            // Animation complete.
        });
    }
})();
