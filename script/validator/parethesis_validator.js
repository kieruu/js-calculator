function getParenthesis(parethesis) {
    /* if the previous operation is comeplete and new operation is perform reset the operation-text display */
    if (boolOperationComplete) {
        boolOperationComplete = false;
        UpdateOperation("", true);
    }

    /* if open parethesis is click, increment parenthesisCounter to limit the input of close parenthesis.
    if the previous operation inside the parethensis is complete and then immediately followed by open parenthesis,
    clear the previous one and start a new operation. */
    if (CompareValueTo(parethesis, "(")) {
        if (parenthesisOperation) {
            getClear();
        }

        if (!IsOperator(Peek(infix)) && !CompareValueTo(operand, "0")) {
            console.log(operand);
            if (!CompareValueTo(operand, "")) {
                Push(infix, FormattedOperand());
                Push(infix, "*");
                UpdateOperation(FormatNumberWithComma(operand));
                UpdateOperation("*");

                prevOperand = operand;
                prevOperator = "*";
                operand = "";
            }
        }
        Push(infix, parethesis);
        UpdateOperation(parethesis);
        parenthesisCounter++;
    } else {
        /* if the counter is 0, do nothing, it means there are no open parethesis w/o close parenthesis.*/
        if (parenthesisCounter <= 0) {
            return;
        }
        parenthesisCounter--;

        // if no operand, get the prevOperand instead.
        if (IsOperator(Peek(infix)) && !operand) {
            operand = prevOperand;
        }
        // if open parenth, followed by close parenth, add zero in the middle
        else if (CompareValueTo(Peek(infix), "(") && !operand) {
            operand = "0";
        }
        Push(infix, FormattedOperand());
        Push(infix, parethesis);
        UpdateOperation(FormatNumberWithComma(operand));
        UpdateOperation(parethesis);
        getResult();
        operand = "";
        parenthesisOperation = true;
    }
}
