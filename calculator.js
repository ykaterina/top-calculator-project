function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, num2, operation){
    let result;
    switch(operation){
        case "+":
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            if(!Number.isInteger(result))
                result = result.toFixed(2);
            break;
        case "x":
            result = Math.round(multiply(num1, num2) * 100) / 100;
            break;
        case "/":
            if(num2 === 0){
                result = "But why?";
                break;
            }
            result = Math.round(divide(num1, num2) * 100) / 100;
    }
    return result;
}

function clearDisplay(){
    display.textContent = '0';
    num1 = 0, num2 = 0, prevOp = false;
}

function deleteLast(text){
    if(text !== '0'){
        if(text.length == 1)
            display.textContent = '0';
        else
            display.textContent = text.slice(0, text.length - 1);
    }
}

function setPositiveNegative(){
    if(display.textContent.includes("-"))
                display.textContent = display.textContent.slice(1);
    else
        display.textContent = "-" + display.textContent;
}

const grid = document.querySelector('.keys-grid');
const display = document.querySelector('#display');

let num1 = 0, num2 = 0;
let operator;
let lastKeyIsOperator = false, prevOp = false;

grid.addEventListener('click', e => {
    if(e.target.nodeName === 'BUTTON'){
        if(e.target.textContent === 'AC'){   //C
            clearDisplay();
        } else if (e.target.textContent === 'C') {
            deleteLast(display.textContent);
        } else if (e.target.id == "eval") { // equal
            num2 = display.textContent;
            let result = operate(Number(num1), Number(num2), operator);
            if (typeof result === "undefined")
                display.textContent = "0";
            else 
                display.textContent = result;
            lastKeyIsOperator = true;
            prevOp = false;
        } else if (e.target.id == "posNeg") {
            setPositiveNegative();
        } else if(e.target.className.includes("key")){ //operators
            if(lastKeyIsOperator)
                operator = e.target.textContent;
            else {
                if (prevOp) {
                    num2 = display.textContent;
                    display.textContent = operate(Number(num1), Number(num2), operator);
                }
                lastKeyIsOperator = true;
                num1 = display.textContent;
                operator = e.target.textContent;
                
                prevOp = true;
            }
        } else if (e.target.id == "decipoint") {
            if(!display.textContent.includes("."))
                display.textContent += e.target.textContent;
        } else {
            if(display.textContent === "0" || lastKeyIsOperator){
                display.textContent = e.target.textContent;
                lastKeyIsOperator = false;
            } else {
                display.textContent += e.target.textContent;
            }
        }
    }
});
