function Print(array){
    var temp = "";
    array.forEach(x => {
        temp += x +",";
    });
    console.log(temp);
    return temp;
}
function Push(array, value){ array.push(value); }
function Pop(array){ return array.pop(); }
function Peek(array){ return array[array.length - 1]; }