const { open } = require('node:fs/promises');

main();

async function main() {
    // Create an accumulator
    let sum = 0;

    // Read through the lines and accumulate the game powers
    await (async () => {
        const file = await open('./day2_data.txt');

        for await (const line of file.readLines()) {
            sum += gamePower(toArray(line));
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

// Takes a string and returns the int at the start
function getValue(s) {
    let result = '', i = 0;
    while (s[i] >= '0' && s[i] <= '9') {
        result += s[i++];
    }
    return parseInt(result);
}

// Obtain the game power as the product of the minimum number
// of dice required for that game to be possible
function gamePower(items) {
    // Auxiliary data struture
    const c = {
        'blue': 0,
        'green': 0,
        'red': 0
    };
    // Create a regular expression with the keys of the c object
    const pattern = new RegExp(`(${Object.keys(c).join('|')})`, 'g');
    for (let i of items) {
        const arr = i.split(', ');
        // For each set of dice in a game, update the minimum number of dice
        // of a certain colour that must exist in the bag
        for (let d of arr) {
            let key = d.match(pattern)[0];
            let incoming = getValue(d); 
            if (c[key] < incoming)
                c[key] = incoming;
        }
    }
    return c['blue'] * c['green'] * c['red'];
}


