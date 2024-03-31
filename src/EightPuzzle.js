import React from 'react'
 
export default function EightPuzzle(props) {
    // const {initialInput, finalInput} = require('./script.js');

    function manhattanDistance(x1, y1, x2, y2) {
        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }

    // Function to find the index of a value in the puzzle array
    function findIndex(puzzle, value) {
        for (let i = 0; i < puzzle.length; i++) {
            if (puzzle[i] === value) {
                return i; 
            }
        }
        return -1; // Value not found
    }

    // Function to perform A* search to solve the puzzle
    function solvePuzzle(puzzle, goal) {
        const size = Math.sqrt(puzzle.length);
        const openSet = [{ puzzle: puzzle, g: 0, h: manhattanDistance(0, 0, findIndex(puzzle, goal[0]) % size, Math.floor(findIndex(puzzle, goal[0]) / size)), parent: null }];
        const closedSet = [];

        while (openSet.length > 0) {
            openSet.sort((a, b) => a.g + a.h - (b.g + b.h));
            const current = openSet.shift();

            if (current.puzzle.toString() === goal.toString()) {
                const path = [];
                let temp = current;
                while (temp !== null) {
                    path.unshift(temp.puzzle);
                    temp = temp.parent;
                }
                return path;
            }

            closedSet.push(current);

            const zeroIndex = findIndex(current.puzzle, 0);
            const zeroX = zeroIndex % size;
            const zeroY = Math.floor(zeroIndex / size);

            const neighbors = [];
            if (zeroX > 0) neighbors.push({ x: zeroX - 1, y: zeroY });
            if (zeroX < size - 1) neighbors.push({ x: zeroX + 1, y: zeroY });
            if (zeroY > 0) neighbors.push({ x: zeroX, y: zeroY - 1 });
            if (zeroY < size - 1) neighbors.push({ x: zeroX, y: zeroY + 1 });

            for (const neighbor of neighbors) {
                const neighborIndex = neighbor.y * size + neighbor.x;
                const newPuzzle = [...current.puzzle];
                newPuzzle[zeroIndex] = newPuzzle[neighborIndex];
                newPuzzle[neighborIndex] = 0;
                const g = current.g + 1;
                const h = manhattanDistance(neighbor.x, neighbor.y, findIndex(newPuzzle, goal[0]) % size, Math.floor(findIndex(newPuzzle, goal[0]) / size));
                const newNode = { puzzle: newPuzzle, g: g, h: h, parent: current };
                if (!closedSet.find(node => node.puzzle.toString() === newPuzzle.toString()) && !openSet.find(node => node.puzzle.toString() === newPuzzle.toString())) {
                    openSet.push(newNode);
                }
            }
        }

        return null; // Puzzle unsolvable
    }

    function printPuzzle(puzzle) {
        document.write(`<style>
        .puzzle-table {
            border-collapse: collapse;
            margin: 0 auto;
        }
        .puzzle-table td {
            border: 1px solid black;
            width: 50px;
            height: 50px;
            text-align: center;
            vertical-align: middle;
            font-size: 1.5em;
        }
        .arrow {
            font-size: 2em;
        }
    </style>
    <table class="puzzle-table">`);
        for (let i = 0; i < 3; i++) {
            document.write("<tr>");
            for (let j = 0; j < 3; j++) {
                const index = i * 3 + j;
                document.write(`<td>${puzzle[index]}</td>`);
            }
            document.write("</tr>");
        }
        // Add row with arrow to indicate direction to the next 3x3 matrix
        document.write(`<tr><td class="arrow" colspan="3">⬇️</td></tr>`);
        document.write("</table>");
    }


    // Example puzzle and goal
    // const puzzle = [1, 2, 3, 4, 5, 6, 7, 0, 8];
    // const goal = [1, 2, 3, 4, 5, 6, 7, 8, 0];

    // Solve the puzzle

    // console.log(props.name);
    // console.log(finalInput);
    console.log(props.initial);
    console.log(props.final);

    let a = props.initial;
    let b = props.final;
    const solution = solvePuzzle(a, b);

    // Output the solution
    if (solution !== null) {
        console.log("Solution found:");
        for (const step of solution) {
            printPuzzle(step);
            // console.log("");
            document.write("<br>");
        }
    } else {
        console.log("No solution found.");
    }

  return (
      <div id="puzzle-container"></div>

  )
}
