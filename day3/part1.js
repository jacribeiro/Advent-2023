const fs = require("fs");

const grid = loadData("./day3_data.txt");
const rows = grid.length;
const columns = grid[0].length;

const reg = new RegExp('[!--/:-@\[-_{-}]');

let sum = 0;
let j = 0;

for (let i = 0; i < rows; i++) {
    j = 0;
    while (j < columns) {
        if (isNumber(grid[i][j])) {
            if ((i > 0 && reg.test(grid[i-1][j])) || (i < rows - 1 && reg.test(grid[i+1][j])) || (j > 0 && reg.test(grid[i][j-1]))
            || (i > 0 && j > 0 && reg.test(grid[i-1][j-1])) || (i < rows - 1 && j > 0 && reg.test(grid[i+1][j-1])) ) {
                let [res, shift] = getValue(grid[i].slice(j));
                sum += res; j += shift;
            }
            else if ((i > 0 && j < columns - 1 && reg.test(grid[i-1][j+1])) 
                    || (i < rows - 1 && j < columns - 1 && reg.test(grid[i+1][j+1]))
                    || (j < columns - 1 && reg.test(grid[i][j+1]))) {
                while (isNumber(grid[i][j])) {
                    j--;
                }
                let [res, shift] = getValue(grid[i].slice(j+1));
                sum += res; j += shift + 1;
            }
            else j++;
        }
        else j++;
    }
}

console.log(sum);

function isNumber(n) {
    return n >= '0' && n <= '9';
}

// Loads the grid of data into a list of lists
function loadData(filename) {
    const data = fs.readFileSync(filename, 'utf-8');
    const grid = data.split('\n').map(line => line.split(''));
    return grid;
}

// Takes a string and returns the int at the start
function getValue(s) {
    let result = '', i = 0;
    while (s[i] >= '0' && s[i] <= '9') {
        result += s[i++];
    }
    return [parseInt(result), result.length];
}