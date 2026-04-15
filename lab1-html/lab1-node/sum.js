const sum = process.argv.slice(2).map(Number).reduce((a, b) => a + b, 0);
console.log("Sum = " + sum);