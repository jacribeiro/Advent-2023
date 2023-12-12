const fs = require("fs");

const cards = loadData("day4_data.txt");

const result = cards.map((line) => {
    return commonInts(line[0], line[1])
}).reduce((accumulator, currentValue) => {
    if (currentValue > 0) {
        return accumulator + 2**(currentValue-1);
    }
    return accumulator;
}, 0);

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

function commonInts(arr1, arr2) {
    const common = arr2.filter(item => arr1.includes(item));
    return common.length;
}