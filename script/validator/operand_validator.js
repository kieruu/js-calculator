function getOperand(value) {
    /*reset the operation-text display */
    if(boolOperationComplete){
        boolOperationComplete = false;
        UpdateOperation("", true);
    }

    if(operand.length >= 20){
        return;
    }

    /* prevent double dot */
    if(Peek(operand) === "." && value === "."){
        return;
    }

    if(operand === "0"){
        if(value === "."){
            operand = "0.";
        }
        /* if operand start at zero, replace it with numbers except 0 */
        else {
            operand = value;
        }
    }
    /* add 0 at the start if operands start at '.' */
    else if(operand === "" && value === "."){
        operand = "0.";
    }
    else {
        operand += value;
    }

    let formattedOperand = FormatNumberWithComma(operand);
    UpdateResult(formattedOperand);
}

function FormattedOperand(){
    /* does not apply replace if operand only value is 0 */
    if(!(operand.length == 1 && operand[operand.length - 1] === "0")){
        // execute statement if operand ends with dot or dot with trailing zero
        if(IsMatchRegex(operand, /(\.0*)$/)){
            operand = operand.replace(/(\.0*)$/, '');
        }
        // execute statement if operand ends with trailing zero after the decimal
        else if(IsMatchRegex(operand, /^(\d+\.\d*?[1-9])0+$/)){
            operand = operand.replace(/^(\d+\.\d*?[1-9])0+$/, "$1");
        }
    }
    return operand;
}

function getPlusMinus(){
    var operandHolder = operand || prevResult || prevOperand ;
    var firstIndexOperand = operandHolder.toString().charAt(0);
    var isNegativeAlready = CompareValueTo(firstIndexOperand, "-");
    var newOperand = "";

    if(CompareValueTo(operandHolder, "0")){
        return;
    }

    if(isNegativeAlready){
        newOperand = operandHolder.toString().substring(1, operandHolder.length);
    }
    else {
        newOperand = "-" + operandHolder;
    }

    if(prevResult){
        prevResult = newOperand;
    }
    else{
        operand = newOperand;
    }

    UpdateResult(FormatNumberWithComma(newOperand));

}