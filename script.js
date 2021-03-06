const operation = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b === 0) {
      return "Cannot divide by zero‬";
    } else {
      return a / b;
    }
  },
};

const operate = (operator, num1, num2) => {
  num1 = +num1;
  num2 = +num2;
  switch (operator) {
    case '+': return operation.add(num1, num2);
    case '-': return operation.subtract(num1, num2);
    case '*': return operation.multiply(num1, num2);
    case '/': return operation.divide(num1, num2);
  }
}
function populateDisplay(display, texts) {
  display.textContent = texts;
}
const display = document.querySelector('.display');
 
const totaldisplay = document.querySelector('.total');
const resultdisplay = document.querySelector('.result');


const buttons = document.querySelectorAll('.buttons div');
const decimalButton = document.querySelector('#decimal');
 
let temp = "";
let operator = "";  //current operator
let nextOperator = ""; 
let num1 = "";
let num2 = "";
let pair = 1;

  
buttons.forEach(button => {
   button.addEventListener('click', (event) => {
    if (event.target.id !== 'backspace'){
      totaldisplay.textContent += event.target.textContent;
    }
    populateDisplay(resultdisplay, event.target.textContent);
    if (event.target.classList.contains('digit')) {
       if (event.target.id === 'decimal') {
        console.log(decimalButton);
        decimalButton.style.pointerEvents = 'none';
      }
      temp += event.target.textContent;
      console.log("digit-temp: " + temp);
      
    } else if (event.target.classList.contains('operator')) {
      decimalButton.style.pointerEvents = 'auto';
      operator = nextOperator;
      if (pair >= 2) {
        num2 = temp;
        temp = "";
        console.log("num2 inside operator: " + num2);
        console.log("num1 before operation: " + num1);
        console.log("operator before operation: " + operator);
        let result = operate(operator, num1, num2);
        num1 = result;
        console.log("num1 inside operator: " + num1);
        console.log(result);
        populateDisplay(resultdisplay, result);
      } else {
        if (temp !== "") {
        num1 = temp;
        console.log("num1 for me: " + num1);
      }
      temp = "";
      console.log("num1: " + num1);
      }
      nextOperator = event.target.textContent; 
      pair++;
    }  else if (event.target.id === 'clear') {
      totaldisplay.textContent = "";
      resultdisplay.textContent = "";
      num1 = "";
      num2 = "";
      operator = "";
      temp = "";
      console.clear();
      pair = 1;
      decimalButton.style.pointerEvents = 'auto';
      
    } else if (event.target.id === 'equal') {
      decimalButton.style.pointerEvents = 'auto';
      num2 = temp;
      temp = "";
      console.log("num1 check: " + num1);
      console.log("num2: " + num2);
      console.log("operator check: " + operator);
      let result = operate(nextOperator, num1, num2);
      if (result !== 'Cannot divide by zero‬')
        num1 = result;
      console.log("num1 inside equal: " + num1);
      console.log(result);
      populateDisplay(resultdisplay, result);
      pair = 1;
    } else if (event.target.id === 'backspace') {
      let lastDigit = temp.charAt(temp.length - 1);
      temp = temp.substring(0, temp.length - 1);
      resultdisplay.textContent = resultdisplay.textContent.substring(0, resultdisplay.length - 1);
      totaldisplay.textContent = totaldisplay.textContent.substring(0, totaldisplay.textContent.length - 1);
      // console.log("digit-temp-backspace: " + temp);
      if (lastDigit === '.') {
        decimalButton.style.pointerEvents = 'auto';
      }
    }
  })
})
