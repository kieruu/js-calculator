/* Solve the problem, during the opration */
function getResult(){
    var res, formattedResult;

    /* if counter remain, push the close parenth, without decrementing the counter */
    for (let i = 0; i < parenthesisCounter; i++) {
        Push(infix, ")");
    }
    res = PostfixCompute(InfixToPostfix(infix));
    formattedResult = FormatNumberWithComma(res.toString());
    UpdateResult(formattedResult);

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
    var res, formattedResult, formattedOperand;
    
    /* execute when user click/press Equal twice */
    if(boolOperationComplete){
        UpdateOperation("", true);
        /* execute if user input is operand only */
        if(!prevOperator){
            UpdateOperation(FormatNumberWithComma(prevOperand.toString()));
            UpdateOperation("=");
            return;
        }

        /* perform operation of previous result and previous operand */
        Push(infix, prevResult);
        Push(infix, prevOperator);
        UpdateOperation(FormatNumberWithComma(prevResult.toString()));
        UpdateOperation(prevOperator);
        operand = prevOperand;
    }
    
    /* if the user immediately click the equal without 2nd operand, take the 1st operand value or previous result
    and use it instead */
    if(!operand){
        operand = prevResult || prevOperand;
    }

    // push the last operand
    Push(infix, FormattedOperand());            
    // if counter still remain, push the close parenth                  
    for (let i = 0; i < parenthesisCounter; i++) {      
        Push(infix, ")");
    }
    res = PostfixCompute(InfixToPostfix(infix));
    formattedResult = FormatNumberWithComma(res.toString());

    /* prevent showing operand, when operation is complete inside parenth, because the problem is already solved
       when user input the close parenth, which leaves only one value in array, the result. Thus, this prevent it
       from showing.
    */
    if(!parenthesisOperation){
        formattedOperand = FormatNumberWithComma(operand.toString());
        UpdateOperation(formattedOperand);
    }
    
    for (let i = 0; i < parenthesisCounter; i++) {
        UpdateOperation(")");
    }

    UpdateOperation("=");
    UpdateResult(formattedResult);
    prevOperand = operand;
    boolOperationComplete = true;               

    // reset the array
    infix = [];    
    prevResult = res;                                   
    operand = "";
    parenthesisCounter = 0;
    parenthesisOperation = false;
}

