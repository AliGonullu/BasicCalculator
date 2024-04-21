
const calculator = { totalSum: 0, idx: 0, fraction_idx: Infinity, mtp: 1, frac_mtp: 1 };
let num = [];
let curr_op = "";
let resultElement = document.getElementById("result");

function buttonPush(x) {
    num[calculator.idx] = x;
    calculator.idx++;
    resultElement.textContent += x;
}

function equal() {
    manage_numbers();
    curr_op = "";
    resultElement.textContent = calculator.totalSum.toFixed(6);
}

function number_fraction() {
    calculator.fraction_idx = calculator.idx;
    resultElement.textContent += ".";
}

function operation(_op) {
    manage_numbers();
    curr_op = _op;
    resultElement.textContent += " " + _op + " ";
}

function manage_numbers() {
    if (curr_op == "" || curr_op == "+")
        calculator.totalSum += adjust_number();
    else if (curr_op == "-")
        calculator.totalSum -= adjust_number();
    else if (curr_op == "x")
        calculator.totalSum *= adjust_number();
    else if (curr_op == "/")
        calculator.totalSum /= adjust_number();
}

function adjust_number() {
    let number = 0, last_idx = calculator.idx - 1;

    if (calculator.fraction_idx <= last_idx) {
        if ((last_idx - calculator.fraction_idx) != 0)
            calculator.frac_mtp = 1 / (10 ** (calculator.idx - calculator.fraction_idx));
        else
            calculator.frac_mtp = 0.1;
    }

    for (let i = last_idx; i >= 0; i--) {
        if (i < calculator.fraction_idx) {
            number += num[i] * calculator.mtp;
            calculator.mtp *= 10;
        }
        else {
            number += num[i] * calculator.frac_mtp;
            calculator.frac_mtp *= 10;
        }
    }
    resetCalc();
    return number;
}

function clear_all_op() {
    calculator.totalSum = 0
    resetCalc();
    curr_op = "";
    resultElement.textContent = "";
}

function resetCalc() {
    calculator.idx = 0;
    calculator.fraction_idx = Infinity;
    calculator.mtp = 1;
    calculator.frac_mtp = 1;
    num = [];
}