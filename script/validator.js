var infix = new Array();
var operand = "";

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

function getOperand(value) {
    /* if the previous operation is complete and new operation is perform, reset the operation-text display */
    if(boolOperationComplete){
        boolOperationComplete = false;
        UpdateOperation("", true);
    }

    operand += value
    UpdateResult(operand);
}

function getOperator(operator){
    // var used to determine whether to display the operands after specific operation
    var boolShowOperator;               

    /* if the previous operation is complete and new operation is perform reset the operation-text display */
    if(boolOperationComplete){
        boolOperationComplete = false;
        UpdateOperation("", true);
    }

    /* if second operand is empty and the last input is operator, when the user click the operator
    once again, do nothing. To prevent double operator. It also replace the previous operator
    if the user click different one.*/
    if(!operand && IsOperator(Peek(infix))){
        var operationText = document.getElementById("operation-text").innerHTML;
        var temp = "";
        for (let index = 0; index < operationText.length - 1; index++) {
            temp += operationText[index];
        }
        temp += operator;
        Pop(infix);
        Push(infix, operator)
        UpdateOperation(temp, true);
        return "";
     }

    /* 
        if user enter operator and did not enter the operand at new or after clear operation, add 0 as operand or if 
        the result from previous operation exist, take the value and add it as an operand.
    */
    if((!operand)){
        var n;
        if(prevResult){
            n = prevResult.toString();
        }
        var temp = n || "0";  
        operand = temp;
    }

    /* if the operation complete inside the parethesis, prevent the result from showing
    but only show the operator. The previous operation in parenthesis retain.
    e.g (1+1)+ 1 =  2+1(would look like in array) = (1+1)+1(would look like in operation text)
    */
    if(parenthesisOperation && infix.length >= 0){
        boolShowOperator = true;
        parenthesisOperation = false;
    }

    /* This is the main function for solving the problem
    if the operand is the first and not an operator, just push the operand and the operator. */
    if(!IsOperator(Peek(infix))){
        Push(infix, operand);
        Push(infix, operator);
    }
    else {
        /* if the previous operation is HigherPrecedence(Mul/Div), immediately perform 
            those operation and then store the result and the next operation
            respectively. e.g 2*3 + 1 = 6 + 1
            */
        if(IsHigherPrecedence(Peek(infix))){
            Push(infix, operand);
            getResult();
            Push(infix, operator);
        }
        /* else(Add/Sub), just push the operand. If the next operation is HigherPrecedence(Mul/Div), 
        push the operator(Mul/Div). if not HigherPrecedence(Add/Sub), immediately perform operation
        and store result and the next operation respectively.  */
        else if(!IsHigherPrecedence(Peek(infix))){
            Push(infix, operand);
            /* if the next operation is HigherPrecedence(Mul/Div), just push it into array */
            if(IsHigherPrecedence(operator)){
                Push(infix, operator);
            }
            else if (!IsHigherPrecedence(operator)){
                getResult();
                Push(infix, operator);
            }
        }
    }
    if(!boolShowOperator){
        UpdateOperation(operand);
    }
    UpdateOperation(operator);
    prevOperand = operand;
    operand = "";
}

function getParenthesis(parethesis){
    /* if the previous operation is comeplete and new operation is perform reset the operation-text display */
    if(boolOperationComplete){
        boolOperationComplete = false;
        UpdateOperation("", true);
    }
    
    /* if open parethesis is click, increment parenthesisCounter to limit the input of close parenthesis.
    if the previous operation inside the parethensis is complete and then immediately followed by open parenthesis,
    clear the previous one and start a new operation. */
    if(CompareValueTo(parethesis, "(")){
        if(parenthesisOperation){
            getClear();
        }
        Push(infix, parethesis);
        UpdateOperation(parethesis);
        parenthesisCounter++;
        console.log("open:" +parenthesisCounter);
    }
    else {
        /* if the counter is 0, do nothing, it means there are no open parethesis w/o close parenthesis.*/
        if(parenthesisCounter <= 0) {
            return;
        }
        parenthesisCounter--;

        // if no operand, get the prevOperand instead.
        if(IsOperator(Peek(infix)) && !operand){        
            operand = prevOperand;
        }
        // if open parenth, followed by close parenth, add zero in the middle
        else if(CompareValueTo(Peek(infix), "(")){      
            operand = "0"
        }
        Push(infix, operand);
        Push(infix, parethesis);
        UpdateOperation(operand);
        UpdateOperation(parethesis);
        getResult();
        operand = "";
        parenthesisOperation = true;
    }
}

/* Solve the problem, during the opration */
function getResult(){
    
    /* if counter remain, push the close parenth, without decrementing the counter */
    for (let i = 0; i < parenthesisCounter; i++) {
        Push(infix, ")");
    }
    var res = PostfixCompute(InfixToPostfix(infix));
    UpdateResult(res);
    // empty the array
    infix = [];                                         
    for (let i = 0; i < parenthesisCounter; i++) {
        // store open parenth, depends on the counter how many times.
        Push(infix, "(");                               
    }
    // push the result
    Push(infix, res);
    // store the result to previous result                                   
    prevResult = res;                                   
}

/* Solve the problem, when user click the equal button */
function getEqual(){
    // true if the operation is complete
    boolOperationComplete = true;                       
    var res

    /* if the user immediately click the equal without 2nd operand, take the 1st operand value 
    and use it instead */
    if(!operand){
        operand = prevResult || prevOperand;
    }

    // push the last operand
    Push(infix, operand);             
    // if counter still remain, push the close parenth                  
    for (let i = 0; i < parenthesisCounter; i++) {      
        Push(infix, ")");
    }
    res = PostfixCompute(InfixToPostfix(infix));
    UpdateResult(res);

    /* prevent showing operand, when operation is complete inside parenth, because the problem is already solved
       when user input the close parenth, which leaves only one value in array, the result. Thus, this prevent it
       from showing.
    */
    if(!parenthesisOperation){
        UpdateOperation(operand);
    }
    
    for (let i = 0; i < parenthesisCounter; i++) {
        UpdateOperation(")");
    }

    UpdateOperation("=");
    // reset the array
    infix = [];                                         
    operand = "";
    parenthesisCounter = 0;
    parenthesisOperation = false;
    // store result to prevResult
    prevResult = res;                                   
}

/* reset everything in the calculator */
function getClear(){
    operand = "";
    infix = [];
    parenthesisCounter = 0;
    parenthesisOperation = false;
    UpdateOperation("", true);
    UpdateResult("");
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
    return value.match(pattern);
}