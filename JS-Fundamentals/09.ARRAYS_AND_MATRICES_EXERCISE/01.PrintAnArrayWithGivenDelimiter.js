function printAnArrayWithGivenDelimiter(arr) {
    console.log(arr
        .slice(0, arr.length - 1)
        .join(`${arr[arr.length - 1]}`));
}

printAnArrayWithGivenDelimiter(["One", "Two", "Three", "Four", "Five", "-"]);