const colors = require("colors");

const [arg1, arg2] = process.argv.slice(2);

if(isNaN(arg1) || isNaN(arg2)) {
    console.log(colors.red('Введены не числа!'));
    return
} 

nextPrime:
for (let i = arg1; i <= arg2; i++) {
    for (let j = 2; j < i; j++) {
        if (i % j == 0) continue nextPrime;
    }
    console.log(colors.green(i));
}