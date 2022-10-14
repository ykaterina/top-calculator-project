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
        case "*":
            result = multiply(num1, num2);
            break;
        case "/":
            result = divide(num1, num2);
            break;
        default:
            console.log("ERR");
        return result;
    }
}

const grid = document.querySelector('.keys-grid');
const display = document.querySelector('#display');

grid.addEventListener('click', e => {
    if(e.target.textContent === 'C')
        display.textContent = '0';
    else{
        if(display.textContent == 0){
            display.textContent = e.target.textContent;
        } else {
            display.textContent += e.target.textContent;
        }

        if(/[0-9]/.test(e.target.textContent))
            console.log("num");
    }
});
