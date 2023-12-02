const { open } = require('node:fs/promises');

main();

async function main() {
    // Create an accumulator
    let sum = 0;

    // Read through the lines and accumulate the first and last
    // digits of each one
    await (async () => {
        const file = await open('./day1_data.txt');

        for await (const line of file.readLines()) {
            sum += getDigits(line);
        }
    })();

    // Print the result
    console.log(sum);
}

function getDigits(s) {
    const arr = Array.from(s);
    const digits = arr.filter((char) => char >= '0' && char <= '9');
    if (digits.length >= 2)
        return parseInt(digits[0] + digits[digits.length -1]);
    return parseInt(digits[0] + digits[0]);
}