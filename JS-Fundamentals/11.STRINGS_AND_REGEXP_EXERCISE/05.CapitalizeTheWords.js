function capitalizeTheWords(text) {
    console.log(text
        .toLowerCase()
        .replace(/\w+/g,
                word => word.charAt(0)
                    .toUpperCase() + word.substring(1))
    );
}

capitalizeTheWords('Capitalize thEse woRds');
capitalizeTheWords('Was that Easy? tRY thIs onE for SiZe!');