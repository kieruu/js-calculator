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

    /* if the user immediately click the equal without 2nd operand, take the 1st operand value or previous result
    and use it instead */
    if(!operand){
        operand = prevResult || prevOperand;
    }

    // push the last operand
    Push(infix, Operand());            
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
    prevResult = res;                                   
    operand = "";
    parenthesisCounter = 0;
    parenthesisOperation = false;
    // store result to prevResult
}

