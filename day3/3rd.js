const fs = require('fs');
const input = fs.readFileSync('./input.txt', 'utf-8').split('\n')

let tree = 0;
let currentX = 0;
let currentY = 0;
const totalLength = input[0].length;

function slide(moveRight, moveDown) {
    
    currentX = moveRight;
    currentY = moveDown;
    
    do {
        if (input[currentY][currentX] === "#") {
            tree++;
        }
        currentY += moveDown;
        currentX = (currentX + moveRight) % totalLength;
    } while (currentY < input.length);
    console.log(tree);
    return tree;
}

slide(3, 1)
