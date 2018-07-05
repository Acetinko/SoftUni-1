function productOfThreeNumbers(inpit) {
    if (Number(inpit[0]) * Number(inpit[1]) * Number(inpit[2]) < 0) {
        return "Negative";
    }

    return "Positive";
}