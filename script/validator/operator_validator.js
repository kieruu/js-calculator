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
        console.log(operand);
    }

    /* if the operation complete inside the parethesis, prevent the result from showing
    but only show the operator. The previous operation in parenthesis retain.
    e.g (1+1)+ 1 =  2+1(would look like in array) = (1+1)+1(would look like in operation text)
    */
    if(parenthesisOperation && infix.length >= 0){
        boolShowOperator = true;
        parenthesisOperation = false;
    }

    /* if the operand is the first and not an operator, just push the operand and the operator. */
    if(!IsOperator(Peek(infix))){
        Push(infix, Operand());
        Push(infix, operator);
    }
    else {
        /* if the previous operation is HigherPrecedence(Mul/Div), immediately perform 
            those operation and then store the result and the next operation
            respectively. e.g 2*3 + 1 = 6 + 1
            */
        if(IsHigherPrecedence(Peek(infix))){
            Push(infix, Operand());
            getResult();
            Push(infix, operator);
        }
        /* else(Add/Sub), just push the operand. If the next operation is HigherPrecedence(Mul/Div), 
        push the operator(Mul/Div). if not HigherPrecedence(Add/Sub), immediately perform operation
        and store result and the next operation respectively.  */
        else if(!IsHigherPrecedence(Peek(infix))){
            Push(infix, Operand());
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