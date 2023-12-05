const fs = require("fs");

const grid = loadData("./day3_data.txt");
const rows = grid.length;
const columns = grid[0].length;

const gears = [];
let j = 0;

for (let i = 0; i < rows; i++) {
    j = 0;
    while (j < columns) {
        if (isNumber(grid[i][j])) {
            if (i > 0 && isGear(grid[i-1][j])) {
                let [res, shift] = getValue(grid[i].slice(j));
                updateGears([i-1, j, res]); j += shift;
            } else if (i < rows - 1 && isGear(grid[i+1][j])) {
                let [res, shift] = getValue(grid[i].slice(j));
                updateGears([i+1, j, res]); j += shift;
            } else if (j > 0 && isGear(grid[i][j-1])) {
                let [res, shift] = getValue(grid[i].slice(j));
                updateGears([i, j-1, res]); j += shift;
            } else if (i > 0 && j > 0 && isGear(grid[i-1][j-1])) {
                let [res, shift] = getValue(grid[i].slice(j));
                updateGears([i-1, j-1, res]); j += shift;
            } else if (i < rows - 1 && j > 0 && isGear(grid[i+1][j-1])) {
                let [res, shift] = getValue(grid[i].slice(j));
                updateGears([i+1, j-1, res]); j += shift;
            } else if (i > 0 && j < columns - 1 && isGear(grid[i-1][j+1])) {
                const y = j + 1
                while (isNumber(grid[i][j])) j--;
                let [res, shift] = getValue(grid[i].slice(j+1));
                updateGears([i-1, y, res]); j+= shift + 1;
            } else if (i < rows - 1 && j < columns - 1 && isGear(grid[i+1][j+1])) {
                const y = j + 1;
                while (isNumber(grid[i][j])) j--;
                let [res, shift] = getValue(grid[i].slice(j+1));
                updateGears([i+1, y, res]); j += shift + 1;
            } else if (j < columns - 1 && isGear(grid[i][j+1])) {
                const y = j + 1;
                while (isNumber(grid[i][j])) j--;
                let [res, shift] = getValue(grid[i].slice(j+1));
                updateGears([i, y, res]); j += shift + 1;
            } else j++;
        }
        else j++;
    }
}

const product = getGearProduct(gears);
console.log(product);

function isNumber(n) {
    return n >= '0' && n <= '9';
}

function isGear(c) {
    return c === '*';
}

// Takes a string or array and returns the int at the start
function getValue(s) {
    let result = '', i = 0;
    while (s[i] >= '0' && s[i] <= '9') {
        result += s[i++];
    }
    return [parseInt(result), result.length];
}

// Loads the grid of data into a list of lists
function loadData(filename) {
    const data = fs.readFileSync(filename, 'utf-8');
    const grid = data.split('\n').map(line => line.split(''));
    return grid;
}

function updateGears(array) {
    let exists = gears.some((gear, index) => {
        if (gear[0] === array[0] && gear[1] === array[1]) {
            gears[index].push(array[2]);
            return true;
        }   
        return false;
    });
    if (!exists) gears.push(array);
}

function getGearProduct(gears) {
    return gears.filter((gear) => {
        return gear.length === 4
    }).reduce((accumulator, currentValue) => {
        return accumulator + (currentValue[2] * currentValue[3]);
    }, 0)
}