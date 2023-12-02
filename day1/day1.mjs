import { open } from 'node:fs/promises';

const file = await open('day1_data.txt');
let sum = 0;

for await (const line of file.readLines()) {
    sum += getDigits(line);
}

console.log(sum);

function getDigits(s) {
    const arr = Array.from(s);
    const digits = arr.filter((char) => char >= '0' && char <= '9');
    if (digits.length >= 2)
        return parseInt(digits[0] + digits[digits.length -1]);
    return parseInt(digits[0] + digits[0]);
}