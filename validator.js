var infix = new Array();
var operand = "";

var prevResult;

function getOperand(value) {
    operand += value
    UpdateResult(operand);
}

function getOperator(operator){
    /* 
        if user does not type the operand at new or after clear operation, add 0 as operand or if 
        the result from previous operation exist, take the value and add it as an operand.
    */
    if(infix.length <= 0 && !operand){
        var n;
        if(prevResult){
            n = prevResult.toString();
        }
        var temp = n || "0";  
        operand = temp;
    }

    /* if the previous operation is HigherPrecedence(Mul/Div), immediately perform 
    those operation and then store the result and the next operation
    respectively.
    */
    if(IsHigherPrecedence(Peek(infix))){
        Push(infix, operand);
        getResult();
        Push(infix, operator);
    }
    /* else, push the operand and if the next operation is HigherPrecedence(Mul/Div), push the operator(Mul/Div). 
    if not HigherPrecedence(Add/Sub), immediately perform operation
    and store result and the next operation respectively.  */
    else {
        Push(infix, operand);
        /* if the next operation is HigherPrecedence(Mul/Div), push it into array */
        if(IsHigherPrecedence(operator)){
            Push(infix, operator);
        }
        else {
            getResult();
            Push(infix, operator);
        }
    }
    UpdateOperation();
    operand = "";
   
}
function getResult(){
    var res = PostfixCompute(InfixToPostfix(infix));
    UpdateResult(res);
    infix = [];
    Push(infix, res);
}

function getEqual(){
    var res

    Push(infix, operand);
    res = PostfixCompute(InfixToPostfix(infix));
    UpdateResult(res);
    infix = [];
    UpdateOperation();
    operand = "";
    prevResult = res;
}

function getClear(){
    operand = "";
    infix = [];
    UpdateOperation();
    UpdateResult("");
    prevResult = null;
}

function UpdateResult(value){
    document.getElementById("total-text").innerHTML = value;
}
function UpdateOperation(optionalText){
    optionalText = optionalText || "";
    document.getElementById("operation-text").innerHTML = Print(infix) + optionalText;
}

function IsMatchRegex(value, pattern){
    return value.match(pattern);
}