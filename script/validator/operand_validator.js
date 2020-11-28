function getOperand(value) {
    /* if the previous operation is complete and new operation is perform, reset the operation-text display */
    if(boolOperationComplete){
        boolOperationComplete = false;
        UpdateOperation("", true);
    }

    if(Peek(operand) === "." && value === "."){
        return;
    }

    if(operand === "0"){
        if(value === "."){
            operand = "0.";
        }
        else {
            operand = value;
        }
    }
    else if(operand === "" && value === "."){
        operand = "0.";
    }
    else {
        operand += value;
    }

    UpdateResult(operand);
}

/* return value removing unnecessary 0 and last index of dot
   e.g: 12.00000000 = 12, 53. = 53
*/
function Operand(){
    operand = operand.replace(/(\.0*)$/, '');
    return operand;
}