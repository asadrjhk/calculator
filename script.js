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
    display.textContent += texts;
  }
  const display = document.querySelector('.display');
  display.textContent = "";
  
  const buttons = document.querySelectorAll('.buttons div');
  let temp = "";
  let operator = "";
  let nextOperator = "";
  let num1 = "";
  let num2 = "";
  let pair = 1;
  buttons.forEach(button => {
     button.addEventListener('click', (event) => {
      populateDisplay(display, event.target.textContent);
      if (event.target.classList.contains('digit')) {
        temp += event.target.textContent;
        console.log("digit-temp: " + temp);
      } else if (event.target.classList.contains('operator') && pair !== 2) {
        pair++;
        if (temp !== "") {
          num1 = temp;
        }
        temp = "";
        console.log("num1: " + num1);
        operator = event.target.textContent;
      } else if (event.target.id === 'equal' || pair === 2) {
        pair--;
        num2 = temp;
        temp = "";
        console.log("num2: " + num2);
        let result = operate(operator, num1, num2);
        num1 = result;
        console.log("num1 inside equal: " + num1);
        console.log(result);
        display.textContent = "";
        populateDisplay(display, result);
      } else if (event.target.id === 'clear') {
        display.textContent = "";
        num1 = "";
        num2 = "";
        operator = "";
        temp = "";
        console.clear();
      }
  
  
    })
  })
  