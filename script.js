const operation = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b === 0) {
      return "Division not possible";
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
let temp = "";
let operator = "";  //current operator
let nextOperator = ""; 
let num1 = "";
let num2 = "";
let pair = 1;
buttons.forEach(button => {
   button.addEventListener('click', (event) => {
    totaldisplay.textContent += event.target.textContent;
    populateDisplay(resultdisplay, event.target.textContent);
    if (event.target.classList.contains('digit')) {
      temp += event.target.textContent;
      console.log("digit-temp: " + temp);
    } else if (event.target.classList.contains('operator')) {
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
      
    } else if (event.target.id === 'equal') {
      num2 = temp;
      temp = "";
      console.log("num1 check: " + num1);
      console.log("num2: " + num2);
      console.log("operator check: " + operator);
      let result = operate(nextOperator, num1, num2);
      num1 = result;
      console.log("num1 inside equal: " + num1);
      console.log(result);
      populateDisplay(resultdisplay, result);
      pair = 1;
    } 

  })
})
