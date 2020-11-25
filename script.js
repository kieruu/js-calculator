var array = [ "(","(", "2", "+" ,"2",")","*","(","2","+","2",")",")", "*" , "2","*","(","1","+","1",")"];

postfixCompute(infixToPostfix(array));

function postfixCompute(array){
    var postfixStack = new Array();
    for (i = 0; i < array.length; i++) {

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
    return console.log("Final Answer: "+postfixStack[postfixStack.length - 1]);
}

function infixToPostfix(array){
    var postfixStack = new Array();
    var operatorStack = new Array();

    for (i = 0; i < array.length; i++) {

        var temp = parseFloat(array[i]);
        var index = array[i];

        var isOpenParethesis = compareValueTo(index, "(");
        var isCloseParethesis = compareValueTo(index, ")");
        if(!isNaN(temp)){
            Push(postfixStack, index);
        }
        else if(isOperator(index)){
            var boolTemp = isHigherPrecedence(operatorStack[operatorStack.length - 1]);
            while(boolTemp && operatorStack.length != 0){
                Push(postfixStack, Pop(operatorStack));
            }

            Push(operatorStack, index);
        }
        else if(isOpenParethesis){
            Push(operatorStack, index);
        }
        else if(isCloseParethesis){
            while(operatorStack.length != 0){
                if(!compareValueTo(operatorStack[operatorStack.length - 1],"(")){
                    Push(postfixStack, Pop(operatorStack));
                }
                else {
                    Pop(operatorStack);
                }
            }
        }
    }

    while(operatorStack.length != 0){
        Push(postfixStack, Pop(operatorStack));
    }

    Print(postfixStack);
    return postfixStack;
}


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

function isOperator(value){
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
function isHigherPrecedence(value){
    switch (value)
    {
        case "*":
        case "/":
            return true;
    }
    return false;
}
function compareValueTo(value, compareTo){
    if (value === compareTo)
        {
            return true;
        }
    return false;
}

function Print(array){
    var temp = "";
    array.forEach(x => {
        temp += x;
    });
    console.log(temp);
}
function Push(array, value){ array.push(value); }
function Pop(array){ return array.pop(); }
function Peek(array){ return array[array.length - 1]; }