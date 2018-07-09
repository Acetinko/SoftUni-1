function subtract() {
    let num1Str = document.getElementById("firstNumber").value;
    let num2Str = document.getElementById("secondNumber").value;
    document.getElementById("result").textContent = Number(num1Str) - Number(num2Str);
}