var infix = new Array();

var operand = "0";

 // store previous result after the operation
var prevResult;                       
// store previous operands
var prevOperand;           
var boolOperationComplete;              

var parenthesisCounter = 0;      
var parenthesisOperation = false;       

UpdateResult(operand);


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

/* if isClear is true, replace all the text with new value */
function UpdateOperation(value, isClear){
    if(!isClear){
        document.getElementById("operation-text").innerHTML += value;
    }
    else {
        document.getElementById("operation-text").innerHTML = value;
    }
}

/* return true if value match the pattern */
function IsMatchRegex(value, pattern){
    return pattern.test(value);
}