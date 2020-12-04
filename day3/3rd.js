const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8').split('\n')

let currentX = 0;
let currentY = 0;
const totalLength = input[0].length;

function slide(moveRight, moveDown) {
    
    let tree = 0;
    currentX = moveRight;
    currentY = moveDown;
    
    do {
        if (input[currentY][currentX] === "#") {
            tree++;
        }
        currentY += moveDown;
        currentX = (currentX + moveRight) % totalLength;
    } while (currentY < input.length);
    console.log(tree)
    return tree;
}

let total = 1;
const test = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
]

test.map(location => {
    total *= slide(...location)
})
console.log(total)