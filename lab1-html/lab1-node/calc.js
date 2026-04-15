const [op, a, b] = process.argv.slice(2);

const x = Number(a);
const y = Number(b);

let result;

if (op === "add") result = x + y;
if (op === "sub") result = x - y;
if (op === "mul") result = x * y;
if (op === "div") result = x / y;

console.log("Result = " + result);