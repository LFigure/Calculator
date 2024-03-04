//Declare expression list
var expressionList = [];

let previouslyClickedButton = null;
let inputNumber = "";


function buttonClick(currentButton){
    
    if(numOrOperator(currentButton) === "number"){
        
        inputNumber += currentButton;

    }else if (numOrOperator(currentButton) === "operator" && numOrOperator(previouslyClickedButton) === "number"){
        
        expressionList.push(inputNumber);
        expressionList.push(currentButton);
        inputNumber = "";

    }
    previouslyClickedButton = currentButton;
    
    console.log(expressionList);
}



function numOrOperator(value){
    //check if the value is an operator, returns an operator
    if(["+", "-", "*", "/", "√", "%", "^", "="].includes(value)){
        return "operator";
    }
    //check if the value is a number, returns a number
    else if(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(value)){
        return "number";
    }
}

function evaluate(expressionList) {
    const result = evaluatingRPN(expressionList);
    console.log(result);
}

function evaluatingRPN(expressionList) {
//Making the order of operations for my operators
    const operator = {
        '^': {
            prec: 4,
            assoc: 'right',
        },
        '√': {
            prec: 4,
            assoc: 'right',
        },
        '*':{
            prec: 3,
            assoc: 'left',
        },
        '/':{
            prec: 3,
            assoc: 'left',
        },
        '%':{
            prec: 3,
            assoc: 'left',
        },
        '+': {
            prec: 2,
            assoc: 'left',
        },
        '-': {
            prec: 2,
            assoc: 'left',
        }
    };
    const stackOperator = new Stack();
    const stackOperand = new Stack();

//if character is operand push to operandStack, if character is operator push to operatorStack
    for(const token of expressionList){
        if(numOrOperator(token) == "operator"){
            stackOperator.push(token);
        }
        if(numOrOperator(token) == "number"){
            stackOperand.push(token);
        }
    }
//while the top of the operator stack is not of smaller precedence than this character
    while(!stackOperator.isEmpty() && [stackOperator.peek()].prec >= operator[token].prec || stackOperator('+', '-', '*', '/')){
        //pop operator from operator stack
        stackOperator.pop();
        //pop two operands from operand stack
        stackOperand.pop();
        stackOperand.pop();
        //store operand1, operator, operand2 on operandStack
        stackOperand.push(token);
        stackOperand.push(operator);
        stackOperand.push(token);
    }
    //no more characters left to read
    if(stackOperator.length > 0){
        //make variable to pop operators until operator stack is not empty.
        const oper = stackOperator.pop();
        //make variables topop top 2 operands and push operand1, operator, operand2 on the operand stack
        const op1 = stackOperand.pop();
        const op2 = stackOperand.pop();
    }


};

// Define a stack class
class Stack{
    constructor() {
      this.items = [];
    }
  
    // Push element onto the stack
    push(element) {
      this.items.push(element);
    }
  
    // Pop element from the stack
    pop() {
      if (this.items.length === 0) {
        return "Underflow";
      }
      return this.items.pop();
    }
  
    // Peek the top element without removing it
    peek() {
      return this.items[this.items.length - 1];
    }
  
    // Check if the stack is empty
    isEmpty() {
      return this.items.length === 0;
    }
  
    // Return the size of the stack
    size() {
      return this.items.length;
    }
  
    // Clear the stack
    clear() {
      this.items = [];
    }
}