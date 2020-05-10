import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import { determinePossibleValues, generatePuzzle, getCurrentGrid, isPossibleNumber, isSolvedSudoku, showSudoku2 } from '../utils/puzzleUtils';

export const PuzzleContext = React.createContext();

const insertInArray = (array, index, value) => [
  ...array.slice(0, index),
  value,
  ...array.slice(index + 1),
];

export const PuzzleHandler = (props) => {
  const [basePuzzle, setBasePuzzle] = useState([]);
  const [currentPuzzle, setCurrentPuzzle] = useState([]);
  const [currentGrid, setCurrentGrid] = useState([]);
  const [currentCell, setCurrentCell] = useState({
    cellNumber: null,
    currentValue: null,
  });

  useEffect(() => {
    (async function () {
      const lastPuzzle =
        JSON.parse(await AsyncStorage.getItem('lastPuzzle')) || null;
      const lastBasePuzzle =
        JSON.parse(await AsyncStorage.getItem('lastBasePuzzle')) || null;
      if (lastPuzzle !== null) {
        console.log('here in async');
        setCurrentPuzzle(lastPuzzle);
        setBasePuzzle(lastBasePuzzle);
        setCurrentGrid(getCurrentGrid(lastPuzzle, lastBasePuzzle));
      } else {
        const puzzle = [...generatePuzzle('easy')];
        setBasePuzzle(puzzle);
        setCurrentPuzzle(puzzle);
        setCurrentGrid(getCurrentGrid(puzzle, puzzle));
        await AsyncStorage.setItem('lastPuzzle', JSON.stringify(puzzle));
        await AsyncStorage.setItem('lastBasePuzzle', JSON.stringify(puzzle));
      }
      showSudoku2(lastPuzzle);
      showSudoku2(lastBasePuzzle);
    })();
  }, []);

  const setValue = async (number) => {
    if (number === 'X' || number === 'x') {
      const newCurrentPuzzle = insertInArray(
        currentPuzzle,
        currentCell.cellNumber,
        0,
      );
      setCurrentPuzzle(newCurrentPuzzle);
      setCurrentGrid(getCurrentGrid(newCurrentPuzzle, basePuzzle));
      await AsyncStorage.setItem(
        'lastPuzzle',
        JSON.stringify(newCurrentPuzzle),
      );
      return;
    }
    console.log(
      'setValue',
      isPossibleNumber(currentCell.cellNumber, number, currentPuzzle),
    );
    // if (isPossibleNumber(currentCell, number, currentPuzzle)) {
    console.log(
      'try to put ',
      number,
      ' in ',
      currentPuzzle[currentCell.cellNumber],
    );
    const newCurrentPuzzle = insertInArray(
      currentPuzzle,
      currentCell.cellNumber,
      number,
    );
    setCurrentPuzzle(newCurrentPuzzle);
    setCurrentGrid(getCurrentGrid(newCurrentPuzzle, basePuzzle));
    await AsyncStorage.setItem('lastPuzzle', JSON.stringify(newCurrentPuzzle));
    console.log('Is resolved', isSolvedSudoku(newCurrentPuzzle));
    // }
  };

  const selectCell = (cellNumber, currentValue = 0) => {
    console.log(determinePossibleValues(cellNumber, currentPuzzle));
    setCurrentCell({ cellNumber, currentValue });
  };

  const resetPuzzle = async () => {
    const lastBasePuzzle =
      JSON.parse(await AsyncStorage.getItem('lastBasePuzzle')) || null;
    setCurrentPuzzle(lastBasePuzzle);
    setCurrentGrid(getCurrentGrid(lastBasePuzzle, lastBasePuzzle));
    await AsyncStorage.setItem('lastPuzzle', JSON.stringify(lastBasePuzzle));
  };

  return (
    <PuzzleContext.Provider
      value={{
        currentPuzzle: currentPuzzle,
        currentGrid: currentGrid,
        currentCell: currentCell,
        setCurrentCell: setCurrentCell,
        selectCell: selectCell,
        setValue: setValue,
        resetPuzzle: resetPuzzle,
      }}>
      {props.children}
    </PuzzleContext.Provider>
  );
};
