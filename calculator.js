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
            break;
        case "x":
            result = Math.round(multiply(num1, num2) * 100) / 100;
            break;
        case "/":
            if(num2 === 0){
                result = "What sorcery is this?!";
                break;
            }
            result = Math.round(divide(num1, num2) * 100) / 100;
            break;
        default:
            console.log("ERR");
    }
    return result;
}

function clearDisplay(){
    display.textContent = '0';
    num1 = 0, num2 = 0;
}

const grid = document.querySelector('.keys-grid');
const display = document.querySelector('#display');

let num1 = 0, num2 = 0;
let operator;
let lastKeyIsOperator = false;

grid.addEventListener('click', e => {
    if(e.target.nodeName === 'BUTTON'){
        if(e.target.textContent === 'C'){
            clearDisplay();
        } else if (e.target.id == "eval") {
            num2 = display.textContent;
            display.textContent = operate(Number(num1), Number(num2), operator);
            lastKeyIsOperator = true;
        } else {
            if(e.target.className.includes("key")){
                lastKeyIsOperator = true;
                num1 = display.textContent;
                operator = e.target.textContent;
            } else {
                if(display.textContent == 0 || lastKeyIsOperator){
                    display.textContent = e.target.textContent;
                    lastKeyIsOperator = false;
                } else {
                    display.textContent += e.target.textContent;
                }
            }   
        }
    }
});
