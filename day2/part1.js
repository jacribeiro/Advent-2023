const { open } = require('node:fs/promises');

const limits = {
    'red': 12,
    'green': 13,
    'blue': 14
};

main();

async function main() {
    // Create an accumulator
    let sum = 0, count = 1;

    // Read through the lines and check if the game is possible
    // with the given dice limits
    await (async () => {
        const file = await open('./day2_data.txt');

        for await (const line of file.readLines()) {
            if (isPossible(toArray(line)))
                sum += count;
            count++;
        }
    })();

    // Print the result
    console.log(sum);
}

// Takes a line and returns an array with the different sets of dice from that game
function toArray(s) {
    const start = s.indexOf(':');
    return s.slice(start+1, s.length).trim().split('; ');
}

// Returns a boolean indicating if the game is possible given the dice limits
function isPossible(arr) {
    // Creates a regular expression with the keys from limits
    const pattern = new RegExp(`(${Object.keys(limits).join('|')})`, 'g');
    // Reduces the array of arrays twice into a single boolean
    return value = arr.reduce((accumulator, currentValue) => {
        return accumulator && currentValue.split(', ').reduce((accumulator, currentValue) => {
            return accumulator && (getValue(currentValue) <= limits[currentValue.match(pattern)[0]]);
        }, true);
    }, true);
}

// Takes a string and returns the int at the start
function getValue(s) {
    let result = '', i = 0;
    while (s[i] >= '0' && s[i] <= '9') {
        result += s[i++];
    }
    return parseInt(result);
}

module.exports = { isPossible }
