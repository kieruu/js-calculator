/* on click 0-9 */
var num0 = document.getElementById("num0");
num0.onclick = function(){ getOperand("0"); }

var num1 = document.getElementById("num1");
num1.onclick = function(){ getOperand("1"); }

var num2 = document.getElementById("num2");
num2.onclick = function(){ getOperand("2"); }

var num3 = document.getElementById("num3");
num3.onclick = function(){ getOperand("3"); }

var num4 = document.getElementById("num4");
num4.onclick = function(){ getOperand("4"); }

var num5 = document.getElementById("num5");
num5.onclick = function(){ getOperand("5"); }

var num6 = document.getElementById("num6");
num6.onclick = function(){ getOperand("6"); }

var num7 = document.getElementById("num7");
num7.onclick = function(){ getOperand("7"); }

var num8 = document.getElementById("num8");
num8.onclick = function(){ getOperand("8"); }

var num9 = document.getElementById("num9");
num9.onclick = function(){ getOperand("9"); }

/* on click '.' */
var dot = document.getElementById("dot");
dot.onclick = function(){ getOperand('.'); }

/* on click Operators */
var add = document.getElementById("add");
add.onclick = function(){ getOperator('+'); }

var minus = document.getElementById("minus");
minus.onclick = function(){ getOperator('-'); }

var multiply = document.getElementById("multiply");
multiply.onclick = function(){ getOperator('*'); }

var divide = document.getElementById("divide");
divide.onclick = function(){ getOperator('/'); }

/* on click Equal(=) */
var equal = document.getElementById("equal");
equal.onclick = function(){ getEqual(); }

/* on click clear */
var clear = document.getElementById("clear");
clear.onclick = function(){ getClear(); }

/* on click parenthesis */
var openParenth = document.getElementById("open-parenthesis");
openParenth.onclick = function(){ getParenthesis('('); }

var closeParenth = document.getElementById("close-parenthesis");
closeParenth.onclick = function(){ getParenthesis(')'); }

/* on click plus-minus sign */
var plusminus = document.getElementById("plusminus");
plusminus.onclick = function(){ getPlusMinus(); }