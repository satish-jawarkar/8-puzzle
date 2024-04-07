import React, { useState } from 'react';
import EightPuzzle from './EightPuzzle';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [initialArray, setInitialArray] = useState([1,2,3,4,5,6,7,8,0]);
  const [finalArray, setFinalArray] = useState([1,2,3,4,5,6,7,0,8]);
  const [showPuzzle, setShowPuzzle] = useState(false);

  function validatePuzzleArray(array) {
    if (!Array.isArray(array) || array.length !== 9) {
      return false;
    }
    const uniqueSet = new Set(array);
    if (uniqueSet.size !== 9 || uniqueSet.has(NaN) || uniqueSet.has(null) || uniqueSet.has(undefined)) {
      return false;
    }
    return array.every(num => num >= 0 && num <= 8);
  }

  function handleInputChange(index, value, setArray) {
    const newValue = parseInt(value, 10);
    if (isNaN(newValue) || newValue < 0 || newValue > 8) {
      return;
    }
    const newArray = [...initialArray];
    if (newArray.includes(newValue)) {
      toast.warning('Repeated value detected!');
    } else {
      toast.success('New value added!');
    }
    newArray[index] = newValue;
    setArray(newArray);
  }

  function handleInitialInputChange(index, value) {
    handleInputChange(index, value, setInitialArray);
  }

  function handleFinalInputChange(index, value) {
    const newValue = parseInt(value, 10);
    if (isNaN(newValue) || newValue < 0 || newValue > 8) {
      return;
    }
    const newArray = [...finalArray];
    if (newArray.includes(newValue)) {
      toast.warning('Repeated value detected!');
    } else {
      toast.success('New value added!');
    }
    newArray[index] = newValue;
    setFinalArray(newArray); // Update final state array
  }

  function handleSubmit() {
    if (validatePuzzleArray(initialArray) && validatePuzzleArray(finalArray)) {
      // Here you can perform actions with initialArray and finalArray
      console.log("Initial State:", initialArray);
      console.log("Final State:", finalArray);
      setShowPuzzle(true);
    } else {
      alert("Please enter exactly 9 unique numbers between 0 and 8 for both initial and final states.");
    }
  }

  return (
    <div className="App">
      <div className='container'>
        <h2>Enter Initial State</h2>
        <table className="inputTable">
          <tbody>
            {[0, 1, 2].map(row => (
              <tr key={row}>
                {[0, 1, 2].map(col => (
                  <td key={col}>
                    <input
                      type="number"
                      value={initialArray[row * 3 + col]}
                      onChange={e => handleInitialInputChange(row * 3 + col, e.target.value)}
                      min="0"
                      max="8"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Enter Final State</h2>
        <table className="inputTable">
          <tbody>
            {[0, 1, 2].map(row => (
              <tr key={row}>
                {[0, 1, 2].map(col => (
                  <td key={col}>
                    <input
                      type="number"
                      value={finalArray[row * 3 + col]}
                      onChange={e => handleFinalInputChange(row * 3 + col, e.target.value)}
                      min="0"
                      max="8"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <br />
        <button onClick={handleSubmit}>Submit</button>

        {showPuzzle && <EightPuzzle initial={initialArray} final={finalArray} />}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
