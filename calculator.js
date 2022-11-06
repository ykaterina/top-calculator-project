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
        case "add":
        case "+":
            result = add(num1, num2);
            break;
        case "subtract":
        case "-":
            result = subtract(num1, num2);
            if(!Number.isInteger(result))
                result = result.toFixed(2);
            break;
        case "multiply":
        case "*":
            result = Math.round(multiply(num1, num2) * 100) / 100;
            break;
        case "divide":
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
    history.textContent = '';
    num1 = 0, num2 = 0, prevOp = false;
}

function deleteLast(text){
    if(text !== '0'){
        if(text.length == 1) {
            display.textContent = '0';
            updateOperation();
        } else {
            display.textContent = text.slice(0, text.length - 1);
            updateOperation();
        }
    }
}

function setPositiveNegative(){
    if(display.textContent.includes("-")){
        display.textContent = display.textContent.slice(1);
        updateOperation();
    } else {
        display.textContent = "-" + display.textContent;
        updateOperation();
    }
}

function setDecimalPoint(numtext){
    if(!numtext.includes("."))
        numtext += ".";
        
    return numtext;
}

function updateOperation(){   //this will update the history in display

}

function evaluate(numtext){
    // console.log("L81 num2: "+numtext);
    // console.log("L82 op: "+operator);

    let result = operate(Number(num1), Number(numtext), operator);
    // console.log("L82 result: "+result);
    if (typeof result === "undefined")
        display.textContent = "0";
    else 
        display.textContent = result;
   
    num1 = result;
}

const grid = document.querySelector('.keys-grid');
const display = document.querySelector('#display');
const history = document.querySelector('#history');

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
            // console.log("L107 num1: "+num1);
            evaluate(display.textContent);
            lastKeyIsOperator = true;
            prevOp = false;
        } else if (e.target.id == "posNeg") {
            setPositiveNegative();
        } else if(e.target.className.includes("key")){ //operators
            if(lastKeyIsOperator){
                operator = e.target.id;
            } else {
                if (prevOp) {
                    // console.log("L118 num1: "+num1);
                    evaluate(display.textContent);
                    // console.log("L120 num1: "+num1);
                } else
                    num1 = display.textContent;

                lastKeyIsOperator = true;
                operator = e.target.id;
                // console.log(operator);
                prevOp = true;
            }
        } else if (e.target.id == "decipoint") {
            display.textContent = setDecimalPoint(display.textContent);
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

document.addEventListener('keydown', function(e){        
    if (e.key == 'Backspace') {
            deleteLast(display.textContent);
    } else if(e.key == '-' || e.key == '+' || e.key == '/' || e.key == '*'){ //operators
        if(lastKeyIsOperator){
            operator = e.key;
        } else {
            if (prevOp) {
                evaluate(display.textContent);
                console.log("L120 num1: "+num1);
            } else {
                num1 = display.textContent;
            }
            lastKeyIsOperator = true;
            operator = e.key;
            prevOp = true;
        }
    } else if (e.key == ".") {
        display.textContent = setDecimalPoint(display.textContent);
    } else if ((Number(e.key) >= 0 && Number(e.key) <= 9)) {
        if(display.textContent === "0" || lastKeyIsOperator){
            display.textContent = e.key;
            lastKeyIsOperator = false;
        } else {
            display.textContent += e.key;
        }
    } else if (e.key == "=" || e.key == "Enter") {
        console.log("L107 num1: "+num1);
        evaluate(display.textContent);
        lastKeyIsOperator = true;
        prevOp = false;
     } else {
        e.preventDefault();
    }
});
