var array = [ "(","(", "2", "+" ,"2",")","*","2",")","+","(","3","*","(","2","+","7",")",")"];

PostfixCompute(InfixToPostfix(array));

function PostfixCompute(array){
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
    console.log("Final Answer: "+postfixStack[postfixStack.length - 1]);
    return postfixStack[postfixStack.length - 1];
}

function InfixToPostfix(array){
    var postfixStack = new Array();
    var operatorStack = new Array();

    for (i = 0; i < array.length; i++) {

        var temp = parseFloat(array[i]);
        var index = array[i];

        var isOpenParethesis = CompareValueTo(index, "(");
        var isCloseParethesis = CompareValueTo(index, ")");
        
        if(!isNaN(temp)){
            Push(postfixStack, index);
        }
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
function IsHigherPrecedence(value){
    switch (value)
    {
        case "*":
        case "/":
            return true;
    }
    return false;
}
function CompareValueTo(value, compareTo){
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
    return temp;
}
function Push(array, value){ array.push(value); }
function Pop(array){ return array.pop(); }
function Peek(array){ return array[array.length - 1]; }