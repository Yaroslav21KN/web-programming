const persons = [
    { name: "John", age: 23, city: "Boston" },
    { name: "Mike", age: 30, city: "Chicago" },
    { name: "Anna", age: 19, city: "NY" },
    { name: "Kate", age: 25, city: "LA" },
    { name: "Tom", age: 40, city: "Miami" }
];

// фільтр
const adults = persons.filter(p => p.age > 20);
console.log(adults);

// map
const texts = persons.map(p =>
    `${p.name} from ${p.city}`
);
console.log(texts);

// reverse
function reverse(str) {
    return str.split("").reverse().join("");
}

console.log(reverse("hello"));

console.log("Adults:", adults);

console.log("Texts:", texts);

console.log("Reverse:", reverse("hello"));

function isJSFile(name) {
    return name.endsWith(".js");
}

console.log("Is JS file:", isJSFile("test.js"));
console.log("Is JS file:", isJSFile("test.txt"));

function replaceWord(text, oldWord, newWord) {
    return text.replace(oldWord, newWord);
}

console.log("Replace:", replaceWord("hello world", "world", "JS"));