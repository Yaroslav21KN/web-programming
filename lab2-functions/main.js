function average(...args) {
    if (args.length === 0) return 0;

    const sum = args.reduce((acc, val) => acc + val, 0);
    return sum / args.length;
}

// перевірка
console.log(average(1, 2, 3, 4)); // 2.5

function values(f, low, high) {
    const result = [];

    for (let i = low; i <= high; i++) {
        result.push(f(i));
    }

    return result;
}

// перевірка
console.log(values(x => x * x, 1, 5)); // [1,4,9,16,25]

function callWithContext(obj, callback) {
    callback.call(obj);
}

const person = {
    name: "Ярослав",
    age: 20
};

function вітання() {
    const date = new Date().toLocaleDateString();
    console.log(`Today is ${date}! Happy birthday ${this.name}`);
}

callWithContext(person, вітання);

function createCounter() {
    let value = 0;

    return {
        increment() {
            value++;
        },
        getValue() {
            return value;
        }
    };
}

// перевірка
const counter = createCounter();
counter.increment();
counter.increment();
console.log(counter.getValue()); // 2

function getGreeting() {
    let lastName = null;
    let lastResult = null;

    return function(name) {
        if (name === lastName) {
            return lastResult;
        }

        lastName = name;
        lastResult = `Hello ${name}`;
        return lastResult;
    };
}

const greet = getGreeting();

console.log(greet("Ярослав"));
console.log(greet("Ярослав")); // кеш

function sum(a) {
    return function(b) {
        return a + b;
    };
}

// перевірка
console.log(sum(5)(3)); // 8
console.log(sum(10)(2)); // 12

function createChecker(arr) {
    return function(str) {
        return arr.includes(str);
    };
}

// перевірка
const check = createChecker(["apple", "banana"]);

console.log(check("apple")); // true
console.log(check("grape")); // false

const capitalize = (arr, prop) =>
    arr.map(obj => ({
        ...obj,
        [prop]: obj[prop].toUpperCase()
    }));

// перевірка
const data = [
    { name: "ivan" },
    { name: "petro" }
];

console.log(capitalize(data, "name"));

function sayHello(city) {
    console.log(`Hello ${this.name} from ${city}`);
}

const user = { name: "Ярослав" };

// call
sayHello.call(user, "Kyiv");

// apply
sayHello.apply(user, ["Lviv"]);

// bind
const bound = sayHello.bind(user);
bound("Odesa");

function logCall(callback, ...args) {
    const time = new Date().toLocaleTimeString();

    console.log("Function:", callback.name);
    console.log("Args:", args);
    console.log("Time:", time);

    return callback(...args);
}

// перевірка
function add(a, b) {
    return a + b;
}

console.log(logCall(add, 2, 3));

function cacheFor10Sec(fn) {
    let lastArgs = null;
    let lastResult = null;
    let lastTime = 0;

    return function(...args) {
        const now = Date.now();

        if (
            lastArgs &&
            JSON.stringify(args) === JSON.stringify(lastArgs) &&
            now - lastTime < 10000
        ) {
            console.log("Беремо з кешу");
            return lastResult;
        }

        lastArgs = args;
        lastResult = fn(...args);
        lastTime = now;

        return lastResult;
    };
}

// перевірка
function multiply(a, b) {
    return a * b;
}

const cachedMultiply = cacheFor10Sec(multiply);

console.log(cachedMultiply(2, 3)); // рахує
console.log(cachedMultiply(2, 3)); // кеш