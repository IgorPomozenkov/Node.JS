const colors = require("colors");

const [arg1, arg2] = process.argv.slice(2);
const arrNumbers = [];
const arrDivided =[];

if(isNaN(arg1) || isNaN(arg2)) {
    console.log(colors.red('Введены не числа!'));
    return
}

nextPrime:
for (let i = arg1; i <= arg2; i++) {
    for (let j = 2; j < i; j++) {
        if (i % j == 0) continue nextPrime;
    }
    if(i > 1) arrNumbers.push(i);
}

if(arrNumbers.length == 0) {
    console.log(colors.red('Простых чисел в диапазоне нет!'));
    return
}

const arrNow = [...arrNumbers];
while(arrNow.length > 0) {
    let chunk = arrNow.splice(0, 3);
    arrDivided.push(chunk);
}

function changeColor(arr) {
    if(!!arr[0]) console.log(colors.green(arr[0]));
    if(!!arr[1]) console.log(colors.yellow(arr[1]));
    if(!!arr[2]) console.log(colors.red(arr[2]));
}

arrDivided.forEach((arr) => {
    changeColor(arr);
});