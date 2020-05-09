import sudokuUMD from 'sudoku-umd';
/**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} Array to split
 * @param chunkSize {Integer} Size of every group
 */
export const chunkArray = (myArray, chunk_size) => {
  var results = [];

  while (myArray.length) {
    results.push(myArray.splice(0, chunk_size));
  }

  return results;
};

export const gridSplit = (gridData) => {
  const [firstBlocks, secondBlocks, thirdBlocks] = [[], [], []];
  firstBlocks.push(gridData[0]);
  firstBlocks.push(gridData[1]);
  firstBlocks.push(gridData[2]);
  secondBlocks.push(gridData[3]);
  secondBlocks.push(gridData[4]);
  secondBlocks.push(gridData[5]);
  thirdBlocks.push(gridData[6]);
  thirdBlocks.push(gridData[7]);
  thirdBlocks.push(gridData[8]);
  return [firstBlocks, secondBlocks, thirdBlocks];
};

export const generatePuzzle = (dificulty = 'easy') => {
  const puzzle = [...sudokuUMD.generate(dificulty)];
  return puzzle.map((value) => {
    if (value === '.' || value === ',') {
      return 0;
    }
    return parseInt(value, 10);
  });
};

const isBaseValue = (baseValue, value) => {
  if (value === 0) {
    return false;
  }
  if (baseValue === value) {
    return true;
  }
  return false;
};

export const getCurrentGrid = (puzzle, basePuzzle) => {
  const gridSudoku = puzzle.map((value, index) => {
    return {
      value,
      cellNumber: index,
      blockCell: value !== 0,
      baseValue: isBaseValue(basePuzzle[index], value),
    };
  });

  const puzzleInArray = chunkArray(gridSudoku, 9);
  const splitPuzzle = gridSplit(puzzleInArray);
  return splitPuzzle;
};

// given a sudoku cell, returns the row
export const returnRow = (cell) => Math.floor(cell / 9);

// given a sudoku cell, returns the column
export const returnCol = (cell) => cell % 9;

// given a sudoku cell, returns the 3x3 block
export const returnBlock = (cell) =>
  Math.floor(returnRow(cell) / 3) * 3 + Math.floor(returnCol(cell) / 3);

// given a number, a row and a sudoku, returns true if the number can be placed in the row
export const isPossibleRow = (number, row, sudoku) => {
  for (let i = 0; i <= 8; i++) {
    if (sudoku[row * 9 + i] === number) {
      return false;
    }
  }
  return true;
};

// given a number, a column and a sudoku, returns true if the number can be placed in the column
export const isPossibleCol = (number, col, sudoku) => {
  for (let i = 0; i <= 8; i++) {
    if (sudoku[col + 9 * i] === number) {
      return false;
    }
  }
  return true;
};

// given a number, a 3x3 block and a sudoku, returns true if the number can be placed in the block
export const isPossibleBlock = (number, block, sudoku) => {
  for (let i = 0; i <= 8; i++) {
    if (
      sudoku[
      Math.floor(block / 3) * 27 +
      (i % 3) +
      9 * Math.floor(i / 3) +
      3 * (block % 3)
      ] === number
    ) {
      return false;
    }
  }
  return true;
};

// given a cell, a number and a sudoku, returns true if the number can be placed in the cell
export const isPossibleNumber = (cell, number, sudoku) => {
  const row = returnRow(cell);
  const col = returnCol(cell);
  const block = returnBlock(cell);
  return (
    isPossibleRow(number, row, sudoku) &&
    isPossibleCol(number, col, sudoku) &&
    isPossibleBlock(number, block, sudoku)
  );
};

// given a row and a sudoku, returns true if it's a legal row
export const isCorrectRow = (row, sudoku) => {
  const rightSequence = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let rowTemp = [];
  for (let i = 0; i <= 8; i++) {
    rowTemp[i] = sudoku[row * 9 + i];
  }
  rowTemp.sort();
  return rowTemp.join() === rightSequence.join();
};

// given a column and a sudoku, returns true if it's a legal column
export const isCorrectCol = (col, sudoku) => {
  const rightSequence = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let colTemp = [];
  for (let i = 0; i <= 8; i++) {
    colTemp[i] = sudoku[col + i * 9];
  }
  colTemp.sort();
  return colTemp.join() === rightSequence.join();
};

// given a 3x3 block and a sudoku, returns true if it's a legal block
export const isCorrectBlock = (block, sudoku) => {
  const rightSequence = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let blockTemp = [];
  for (let i = 0; i <= 8; i++) {
    blockTemp[i] =
      sudoku[
      Math.floor(block / 3) * 27 +
      (i % 3) +
      9 * Math.floor(i / 3) +
      3 * (block % 3)
      ];
  }
  blockTemp.sort();
  return blockTemp.join() === rightSequence.join();
};

// given a sudoku, returns true if the sudoku is solved
export const isSolvedSudoku = (sudoku) => {
  for (let i = 0; i <= 8; i++) {
    if (
      !isCorrectBlock(i, sudoku) ||
      !isCorrectRow(i, sudoku) ||
      !isCorrectCol(i, sudoku)
    ) {
      return false;
    }
  }
  return true;
};

// given a cell and a sudoku, returns an array with all possible values we can write in the cell
export const determinePossibleValues = (cell, sudoku) => {
  let possible = [];
  for (let i = 1; i <= 9; i++) {
    if (isPossibleNumber(cell, i, sudoku)) {
      possible.unshift(i);
    }
  }
  return possible;
};

// given an array of possible values assignable to a cell, returns a random value picked from the array
export const determineRandomPossibleValue = (possible, cell) => {
  const randomPicked = Math.floor(Math.random() * possible[cell].length);
  return possible[cell][randomPicked];
};

// given a sudoku, returns a two dimension array with all possible values
export const scanSudokuForUnique = (sudoku) => {
  let possible = [];
  for (let i = 0; i <= 80; i++) {
    if (sudoku[i] === 0) {
      possible[i] = [];
      possible[i] = determinePossibleValues(i, sudoku);
      if (possible[i].length === 0) {
        return false;
      }
    }
  }
  return possible;
};

// given an array and a number, removes the number from the array
export const removeAttempt = (attemptArray, number) => {
  let newArray = [];
  for (let i = 0; i < attemptArray.length; i++) {
    if (attemptArray[i] !== number) {
      newArray.unshift(attemptArray[i]);
    }
  }
  return newArray;
};

// given a two dimension array of possible values, returns the index of a cell where there are the less possible numbers to choose from
export const nextRandom = (possible) => {
  let max = 9;
  let minChoices = 0;
  for (let i = 0; i <= 80; i++) {
    if (possible[i] !== undefined) {
      if (possible[i].length <= max && possible[i].length > 0) {
        max = possible[i].length;
        minChoices = i;
      }
    }
  }
  return minChoices;
};

// given a sudoku, solves it
export const solve = (sudoku) => {
  var saved = [];
  var savedSudoku = [];
  var i = 0;
  var nextMove;
  var whatToTry;
  var attempt;
  while (!isSolvedSudoku(sudoku)) {
    i++;
    nextMove = scanSudokuForUnique(sudoku);
    if (nextMove === false) {
      nextMove = saved.pop();
      sudoku = savedSudoku.pop();
    }
    whatToTry = nextRandom(nextMove);
    attempt = determineRandomPossibleValue(nextMove, whatToTry);
    if (nextMove[whatToTry].length > 1) {
      nextMove[whatToTry] = removeAttempt(nextMove[whatToTry], attempt);
      saved.push(nextMove.slice());
      savedSudoku.push(sudoku.slice());
    }
    sudoku[whatToTry] = attempt;
  }
  console.log(sudoku, i);
  return showSudoku(sudoku, i);
};

// given a solved sudoku and the number of steps, prints out the sudoku
export const showSudoku = (sudoku, i) => {
  var sudokuText = '\n---+---+---+---+---+---+---+---+---\n';
  var solved = '\n\nSolved in ' + i + ' steps';
  for (var i = 0; i <= 8; i++) {
    for (var j = 0; j <= 8; j++) {
      sudokuText += ' ';
      sudokuText += sudoku[i * 9 + j];
      sudokuText += ' ';
      if (j !== 8) {
        sudokuText += '|';
      }
    }
    if (i !== 8) {
      sudokuText += '\n---+---+---+---+---+---+---+---+---\n';
    }
  }
  console.log('sudokuText', sudokuText);
  sudokuText += solved;
  return sudokuText;
};
