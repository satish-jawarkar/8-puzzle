import React, { useState } from 'react';
import EightPuzzle from './EightPuzzle';
import './App.css';

function App() {

  const [initialArray1, setInitialArray1] = useState([2, 1, 3, 4, 5, 6, 7, 0, 8]);
  const [finalArray1, setFinalArray1] = useState([2, 1, 3, 4, 5, 6, 7, 8, 0]);
  const [showPuzzle, setShowPuzzle] = useState(false);

  // console.log(initialArray1);
  function validateInput(input) {
    return /^\d$/.test(input) && parseInt(input) >= 0 && parseInt(input) <= 8;
  }

  function validateUnique(array) {
    return new Set(array).size === array.length;
  }

  function convertToInitial() {
    // console.log(initialArray1);
    var initialArray = initialArray1.map(item => item.toString().trim());
    console.log(initialArray)

    // console.log(initialArray)  

    if (initialArray.length !== 9 || !initialArray.every(validateInput) || !validateUnique(initialArray)) {
      alert("Please enter exactly 9 unique numbers between 0 and 8, separated by commas, for the initial puzzle.");
      return;
    }

    var tableHtml = "<table>";
    for (var i = 0; i < 3; i++) {
      tableHtml += "<tr>";
      for (var j = 0; j < 3; j++) {
        var index = i * 3 + j;
        tableHtml += "<td>" + initialArray[index] + "</td>";
      }
      tableHtml += "</tr>";
    }
    tableHtml += "</table>";

    document.getElementById("initialContainer").innerHTML = tableHtml;

    const initial = initialArray.map(Number);
    console.log("Initial Puzzle: ", initial);
    // return initialArray
  }


  function convertToFinal() {
    var finalArray = finalArray1.map(item => item.toString().trim());

    if (finalArray.length !== 9 || !finalArray.every(validateInput) || !validateUnique(finalArray)) {
      alert("Please enter exactly 9 unique numbers between 0 and 8, separated by commas, for the final puzzle.");
      return;
    }

    var tableHtml = "<table>";
    for (var i = 0; i < 3; i++) {
      tableHtml += "<tr>";
      for (var j = 0; j < 3; j++) {
        var index = i * 3 + j;
        tableHtml += "<td>" + finalArray[index] + "</td>";
      }
      tableHtml += "</tr>";
    }
    tableHtml += "</table>";

    document.getElementById("finalContainer").innerHTML = tableHtml;

    const final = finalArray.map(Number);
    console.log("Final Puzzle: ", final);
    // return finalArray
  }

console.log(initialArray1);
console.log(finalArray1);

  function handlingSolve(){
    setShowPuzzle(true);
  }

  function showValues(){
    convertToInitial();
    convertToFinal();
  }

  return (
    <div className="App">
      <div className='container'>
      <h2>Enter Initial State</h2>
      <input className='inputTag' type='text' value={initialArray1.join(',')} placeholder="Enter initial puzzle array" onChange={(e) => { setInitialArray1(e.target.value.split(',').map(item => parseInt(item.trim()))); }} />
      {/* <button onClick={convertToInitial}>Convert</button> */}
      <div id="initialContainer"></div>

      <h2>Enter Final State</h2>
        <input className='inputTag' type="text" value={finalArray1.join(',')} placeholder="Enter final puzzle array" onChange={(e) => { setFinalArray1(e.target.value.split(',').map(item => parseInt(item.trim()))); }} />
      {/* <button onClick={convertToFinal}>Convert</button> */}
      <div id="finalContainer"></div>
      <br/>
      <span style={{margin:20}}>
      <button onClick={showValues}>See Puzzle</button>
        </span>
        <span style={{ margin: 20 }}>
      <button onClick={handlingSolve}>Solve</button>
        </span>
      {showPuzzle && <EightPuzzle initial={initialArray1} final={finalArray1} />}
      {/* <EightPuzzle initial={initialArray1} final={finalArray1}/>     */}
      </div>
    </div>
  );
}

export default App;









// import React from 'react';
// import { createMuiTheme, ThemeProvider, useMediaQuery } from '@material-ui/core';
// import CssBaseline from '@material-ui/core/CssBaseline';

// function App() {
//   const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

//   const theme = React.useMemo(
//     () =>
//       createMuiTheme({
//         palette: {
//           type: prefersDarkMode ? 'dark' : 'light',
//         },
//       }),
//     [prefersDarkMode],
//   );

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       {/* Your app content goes here */}
//     </ThemeProvider>
//   );
// }

// export default App;

