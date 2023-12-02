const { open } = require('node:fs/promises');

// Define a map of numbers as strings and their corresponding value
const numbers = {
    'one': '1',
    'two': '2',
    'three': '3',
    'four': '4',
    'five': '5',
    'six': '6',
    'seven': '7',
    'eight': '8',
    'nine': '9'
};

main();

async function main() {
    // Create an accumulator
    let sum = 0;

    // Read through the lines and accumulate the first and last
    // digits of each one
    await (async () => {
        const file = await open('./day1_data.txt');

        for await (const line of file.readLines()) {
            sum += firstAndLast(getDigits(line));
        }
    })();

    // Print the result
    console.log(sum);
}

function getDigits(s) {
    // Create an empty array
    const digits = [];
    // Loop through the string
    let i = 0;
    while (i <= s.length) {
        let matched = false;
        // Check, for each position in the string, if it starts with
        // one of the keys in numbers
        for (const key of Object.keys(numbers)) {
            if (s.startsWith(key, i)) {
                // If it does, add the value to the result
                digits.push(numbers[key]);
                matched = true;
                // Jump to the next position where a key might be found
                i += key.length - 2;
                break;
            }
        }
        // If the character is a digit, add it to the result
        if (!matched && s[i] >= '0' && s[i] <= '9') {
            digits.push(s[i]);
        }
        i++;
    }
    return digits;
}

// Returns the first and last digit of an array as a two-digit int
function firstAndLast(array) {
    const l = array.length;
    if (l >= 2)
        return parseInt(array[0] + array[l - 1]);
    // If the array has a single digit, returns an int with the duplicated digit
    return parseInt(array[0] + array[0]);
} 

module.exports = {getDigits, firstAndLast}