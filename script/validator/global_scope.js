// store operation
var infix = new Array();

// store operand
var operand = "0";

 // store previous result after the operation
var prevResult;                       
// store previous operands
var prevOperand;           
// var used to determine if operation is complete(when user click equal)
var boolOperationComplete;              

// counts how many open parenth are there.
var parenthesisCounter = 0;      
// bool value, determine if operation inside parenth is complete.       
var parenthesisOperation = false;       

UpdateResult(operand);

/* The following functions are put in global scope simply because they get called up many times in the validator */

/* reset everything in the calculator */
function getClear(){
    operand = "0";
    infix = [];
    parenthesisCounter = 0;
    parenthesisOperation = false;
    UpdateOperation("", true);
    UpdateResult(operand);
    prevResult = 0;
    prevOperand = 0;
}

/* update the result in the calculator */
function UpdateResult(value){
    document.getElementById("total-text").innerHTML = value;
}

/* update the operation display in the calculator, if isClear is true, replace all the text with new value */
function UpdateOperation(value, isClear){
    if(!isClear){
        document.getElementById("operation-text").innerHTML += value;
    }
    else {
        document.getElementById("operation-text").innerHTML = value;
    }
}

function IsMatchRegex(value, pattern){
    return pattern.test(value);
}