const fs = require("fs");

const cards = loadData("day4_data.txt");

const generated = new Map();

// Sets the quantity of each card to 1, at the beginning
const quantity = new Map();
for (let i = 1; i <= cards.length; i++) {
    quantity.set(i, 1);
}

// Calculates how many cards are generated
for (let i = 0; i < cards.length; i++) {
    calculate(cards[i], i+1);
    generate(i+1);
}

// Accumulates the total number of cards
let result = 0;
for ([key, value] of quantity) {
    result += value;
}

console.log(result);

// Loads the grid of data into a list of lists
function loadData(filename) {
    const data = fs.readFileSync(filename, 'utf-8');
    const lines = data.split('\n');
    const cards = lines.map(line => {
        const cardData = line.split(':')[1];
        const parts = cardData.split('|').map(part => part.trim().split(/\s+/).map(Number));
        return parts;
    });
    return cards;
}

// Calculates the number of common ints between two arrays
function commonInts(arr1, arr2) {
    const common = arr2.filter(item => arr1.includes(item));
    return common.length;
}

// Calculates the amount of scratch cards each card generates
// and adds that as an array to the Map generated
function calculate(card, n) {
    let common = commonInts(card[0], card[1]);
    const gen = [];
    let i = 1;
    while (common > 0) {
        gen.push(n + i++)
        common--;
    }
    generated.set(n, gen);
}

// Generates the appropriate amount of cards based on the 
// quantity of the generator, updating the quantity Map
function generate(cardNumber) {
    const g = generated.get(cardNumber);
    const q = quantity.get(cardNumber);
    for (n of g) {
        quantity.set(n, quantity.get(n) + q);
    }
}