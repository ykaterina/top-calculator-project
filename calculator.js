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
    clearCurrentOperation();
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
    if(!equalSignIndForDec){
        if(!numtext.includes("."))
            numtext += ".";
    } 
    return numtext;
}

function updateOperation(key) {  
    if(isNaN(key)){
        if(key == '/' || key == '*')
            key = changeOp(key);
        current.textContent = `${num1} ${key}`;
    } else
        current.textContent += ` ${key}`;
}

function changeOp(operator){
    if(operator == "*" || operator == "divide")
        return "\u00d7";
    else if (operator == "/" || operator == "multiply")
        return "\u00f7";
}

function changeBtnOperator(operator){
    let equivalentOp;
    switch(operator){
        case "add":
            equivalentOp = '+';
            break;
        case "subtract":
            equivalentOp = '-';
            break;
        case "multiply":
            equivalentOp = '*';
            break;
        case "divide":
            equivalentOp = '/';
    }
    return equivalentOp;
}

function clearCurrentOperation(){
    current.textContent = "";
    equalSignLast = false;
    equalSignIndForDec = false;
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
        // console.log("L101 result: "+result);
}



const grid = document.querySelector('.keys-grid');
const display = document.querySelector('#display');
const current = document.querySelector('#history');

let num1 = 0, num2 = 0;
let operator, op2;
let lastKeyIsOperator = false, prevOp = false, equalSignLast = false, equalSignIndForDec = false;

grid.addEventListener('click', e => {
    if(e.target.nodeName === 'BUTTON'){
        if(e.target.textContent === 'AC'){   //C
            clearDisplay();
        } else if (e.target.textContent === 'C') {
            deleteLast(display.textContent);
        } else if (e.target.id == "eval") { // equal
            // console.log("L107 num1: "+num1);
            numtext = display.textContent;
            evaluate(numtext);
            updateOperation(numtext);
            equalSignIndForDec = true;
            lastKeyIsOperator = true;
            prevOp = false;
        } else if (e.target.id == "posNeg") {
            setPositiveNegative();
        } else if(e.target.className.includes("key")){ //operators
            if(lastKeyIsOperator){
                operator = e.target.id;
                updateOperation(changeBtnOperator(operator));
            } else {
                if (prevOp) {
                    // console.log("L118 num1: "+num1);
                    evaluate(display.textContent);
                    // console.log("L120 num1: "+num1);
                } else
                    num1 = display.textContent;

                lastKeyIsOperator = true;
                operator = e.target.id;
                updateOperation(changeBtnOperator(operator));
                prevOp = true;
            }
        } else if (e.target.id == "decipoint") {
            display.textContent = setDecimalPoint(display.textContent);
        } else if(equalSignIndForDec) {
            clearCurrentOperation();
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
        if(lastKeyIsOperator) {
            operator = e.key;
            updateOperation(operator);
        } else {
            if (prevOp) {
                evaluate(display.textContent);
                // console.log("L120 num1: "+num1);
            } else {
                num1 = display.textContent;
            }
            lastKeyIsOperator = true;
            operator = e.key;
            updateOperation(operator);
            prevOp = true;
        }
    } else if (e.key == ".") {
        display.textContent = setDecimalPoint(display.textContent);
    } else if ((Number(e.key) >= 0 && Number(e.key) <= 9)) {
        if(equalSignLast)
            clearCurrentOperation();
        if(display.textContent === "0" || lastKeyIsOperator){
            display.textContent = e.key;
            lastKeyIsOperator = false;
        } else {
            display.textContent += e.key;
        }
    } else if (e.key == "=" || e.key == "Enter") {
        numtext = display.textContent;
        evaluate(numtext);
        updateOperation(numtext);
        equalSignLast = true;
        equalSignIndForDec = true;
        lastKeyIsOperator = true;
        prevOp = false;
     } else {
        e.preventDefault();
    }
});
