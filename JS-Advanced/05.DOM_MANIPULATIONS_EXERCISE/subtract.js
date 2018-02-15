function subtract() {
    let firstNumber = document.getElementById("firstNumber");
    let secondNumber = document.getElementById("secondNumber");
    let result = document.getElementById("result");
    result.textContent = +firstNumber.value - +secondNumber.value;
}