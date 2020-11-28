//var array = [ "(","(", "2", "+" ,"2",")","*","2",")","+","(","3","*","(","2","+","7",")",")"];

//PostfixCompute(InfixToPostfix(array));

/* when an operation(infix) is converted to postfix, solve the problem using this function */
function PostfixCompute(array){
    var postfixStack = new Array();
    for (i = 0; i < array.length; i++) {

        /* if operand is found, push it to the stack. else, pop the last two operand and perform
        an operation based on the given operator at the index(i). Then push the result into the stack afterwards. */
        var temp = parseFloat(array[i]);
        if(!isNaN(temp)){
            Push(postfixStack, temp);
        }
        else {
            var x, y;
            y = Pop(postfixStack);
            x = Pop(postfixStack);
            Push(postfixStack,Operation(array[i], x,y));
        }
    }
    console.log("Final Answer: "+postfixStack[postfixStack.length - 1]);

    /* return the last index, which means the total answer */
    return postfixStack[postfixStack.length - 1];
}

/* convert given problem into postfix */
function InfixToPostfix(array){
    /* var used to store the postfix */
    var postfixStack = new Array();
    /* var used to store operator */
    var operatorStack = new Array();

    for (i = 0; i < array.length; i++) {

        var temp = parseFloat(array[i]);
        var index = array[i];

        var isOpenParethesis = CompareValueTo(index, "(");
        var isCloseParethesis = CompareValueTo(index, ")");
        
        /* if the index is operand push it to postfix */
        if(!isNaN(temp)){
            Push(postfixStack, index);
        }

        /* if the index is operator, check first if the top of the operatorStack is HigherPrecedence(Mul/Div) if so,
        push all the operators from the operatorStack to postfix, if not(Add/Sub) do nothing. Then push the index
        into the operatorStack  */
        else if(IsOperator(index)){
            var boolTemp = IsHigherPrecedence(operatorStack[operatorStack.length - 1]);
            while(boolTemp && operatorStack.length != 0){
                Push(postfixStack, Pop(operatorStack));
            }
            Push(operatorStack, index);
        }
        else if(isOpenParethesis){
            Push(operatorStack, index);
        }

        /* close parenthesis can be considered as high precedence because it prioritize the operation inside the 
        parenthesis, thus, it push every operators from operatorStack to postfix except the open parenthesis. */
        else if(isCloseParethesis){
            while(operatorStack.length != 0){
                if(!CompareValueTo(operatorStack[operatorStack.length - 1],"(")){
                    Push(postfixStack, Pop(operatorStack));
                }
                else {
                    Pop(operatorStack);
                }
            }
        }
    }

    /* if there still an operators inside the operatorStack at the end of conversion, push it into postfix */
    while(operatorStack.length != 0){
        Push(postfixStack, Pop(operatorStack));
    }

    Print(postfixStack);
    return postfixStack;
}

/* perform arithmetic operation */
function Operation(operator, x , y){
    switch (operator) {
        case "+":
            return x + y;
        case "-":
            return x - y;
        case "*":
            return x * y;
        case "/":
            return x / y;
        default:
            break;
    }
}

/* boolean operations whether the value is operator or not */
function IsOperator(value){
    switch (value)
    {
        case "+":
        case "-":
        case "*":
        case "/":
            return true;
    }
    return false;
}

/* boolean operations whether an operator is higher precedence or not*/
function IsHigherPrecedence(value){
    switch (value)
    {
        case "*":
        case "/":
            return true;
    }
    return false;
}

/* boolean operators comparing two string */
function CompareValueTo(value, compareTo){
    if (value === compareTo)
        {
            return true;
        }
    return false;
}
