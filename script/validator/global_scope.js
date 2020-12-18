var infix = new Array();

var operand = "0";

 // store previous result after the operation
var prevResult;                       
// store previous operands
var prevOperand;           
var prevOperator;
var boolOperationComplete = false;              

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
    prevOperator = "";
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

function FormatNumberWithComma(operand){
    let operandWithComma = operand;
    if(IsMatchRegex(operand, /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/)){
        operandWithComma = operand.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
    return operandWithComma;
}