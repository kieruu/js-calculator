document.addEventListener('keydown', function(event) {
	
	/* User press 0 */
    if(event.key == '0') { getOperand('0'); }
	
	/* User press 1 */
    else if(event.key == '1') { getOperand('1'); }
	
	/* User press 2 */
    else if(event.key == '2') { getOperand('2'); }

	/* User press 3 */
    else if(event.key == '3') { getOperand('3'); }

	/* User press 4 */
    else if(event.key == '4') { getOperand('4'); }

	/* User press 5 */
    else if(event.key == '5') { getOperand('5'); }

	/* User press 6 */
    else if(event.key == '6') { getOperand('6'); }

	/* User press 7 */
    else if(event.key == '7') { getOperand('7'); }

	/* User press 8 */
    else if(event.key == '8') { getOperand('8'); }

	/* User press 9 */
    else if(event.key == '9') { getOperand('9'); }

	/* User press . */
    else if(event.key == '.') { getOperand('.'); }

	/* User press '+' */
    else if(event.key == '+') { getOperator('+'); }

	/* User press '-' */
    else if(event.key == '-') { getOperator('-'); }

	/* User press '*' */
    else if(event.key == '*') { getOperator('*'); }

	/* User press '/' */
    else if(event.key == '/') { getOperator('/'); }
    
	/* User press Enter */
    else if(event.key == 'Enter') { getEqual(); }    

	/* User press '(' */
    else if(event.key == '(') { getParenthesis('('); }    

	/* User press ')' */
    else if(event.key == ')') { getParenthesis(')'); }

	/* User press Backspace, clear operation */
    else if(event.key == 'Backspace') { getClear(); }

	/* User press F9, plus minus sign */
    else if(event.key == 'F9') { getPlusMinus() }

});