import React, { useEffect, useState } from 'react';
// import './EightPuzzle.css'; // Import CSS file for styling

export default function EightPuzzle(props) {
    // Define initial state for the puzzle
    const [puzzle, setPuzzle] = useState(props.initial);
    const [solution, setSolution] = useState(null);

    // Function to solve the puzzle
    useEffect(() => {
        const size = Math.sqrt(props.initial.length);
        const goal = props.final;

        // Function to check if the puzzle is solved
        const isSolved = (currentPuzzle) => currentPuzzle.toString() === goal.toString();

        // Function to calculate the Manhattan distance heuristic
        const manhattanDistance = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

        // Function to find the index of a value in the puzzle array
        const findIndex = (puzzle, value) => puzzle.findIndex(element => element === value);

        // Function to get neighboring indices
        const getNeighbors = (zeroIndex) => {
            const zeroX = zeroIndex % size;
            const zeroY = Math.floor(zeroIndex / size);
            const neighbors = [];

            if (zeroX > 0) neighbors.push(zeroIndex - 1);
            if (zeroX < size - 1) neighbors.push(zeroIndex + 1);
            if (zeroY > 0) neighbors.push(zeroIndex - size);
            if (zeroY < size - 1) neighbors.push(zeroIndex + size);

            return neighbors;
        };

        // Function to solve the puzzle using Best-First Search algorithm
        const solvePuzzle = (initialPuzzle) => {
            const queue = [{ puzzle: initialPuzzle, g: 0 }];
            const visited = new Set();
            const parentMap = new Map();

            while (queue.length > 0) {
                queue.sort((a, b) => a.g - b.g);
                const current = queue.shift();

                if (isSolved(current.puzzle)) {
                    const path = [];
                    let temp = current;
                    while (temp) {
                        path.unshift(temp.puzzle);
                        temp = parentMap.get(temp.puzzle.toString());
                    }
                    return path;
                }

                visited.add(current.puzzle.toString());

                const zeroIndex = findIndex(current.puzzle, 0);
                const neighbors = getNeighbors(zeroIndex);

                for (const neighborIndex of neighbors) {
                    const newPuzzle = [...current.puzzle];
                    [newPuzzle[zeroIndex], newPuzzle[neighborIndex]] = [newPuzzle[neighborIndex], newPuzzle[zeroIndex]];
                    const newPuzzleString = newPuzzle.toString();
                    if (!visited.has(newPuzzleString)) {
                        queue.push({ puzzle: newPuzzle, g: current.g + 1 });
                        parentMap.set(newPuzzleString, current);
                    }
                }
            }

            return null; // Puzzle unsolvable
        };

        // Solve the puzzle
        const solution = solvePuzzle(props.initial);
        setSolution(solution);
    }, [props]);

    return (
        <div id="puzzle-container">
            {solution !== null ? (
                solution.map((step, index) => (
                    <div key={index}>
                        <PuzzleGrid puzzle={step} />
                        <br />
                    </div>
                ))
            ) : (
                <div>No solution found.</div>
            )}
        </div>
    );

    // Component for rendering the puzzle grid
    function PuzzleGrid({ puzzle }) {
        return (
            <table className="puzzle-table">
                {[0, 1, 2].map(i => (
                    <tr key={i}>
                        {[0, 1, 2].map(j => {
                            const value = puzzle[i * 3 + j];
                            return (
                                <td key={j} className={`tile ${value === 0 ? 'empty' : ''}`}>
                                    {value !== 0 && value}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </table>
        );
    }
}
