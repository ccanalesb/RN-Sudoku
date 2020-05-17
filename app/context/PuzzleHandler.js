import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import { Alert } from 'react-native';
import { determinePossibleValues, generatePuzzle, getCurrentGrid, isPossibleNumber, isSolvedSudoku, showSudoku2 } from '../utils/puzzleUtils';
import { getLastBasePuzzle, getLastPuzzle, setLastBasePuzzle, setLastPuzzle } from './PuzzleUtils';

export const PuzzleContext = React.createContext();

const insertInArray = (array, index, value) => [
  ...array.slice(0, index),
  value,
  ...array.slice(index + 1),
];

export class PuzzleHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basePuzzle: [],
      currentPuzzle: [],
      currentGrid: [],
      currentCell: {
        cellNumber: null,
        currentValue: null,
      },
      currentDificult: 'easy',
    };
  }

  newPuzzle = async () => {
    const { currentDificult } = this.state;
    const puzzle = [...generatePuzzle(currentDificult)];
    this.setState({ basePuzzle: puzzle, currentPuzzle: puzzle });
    await setLastPuzzle(currentDificult, puzzle);
    await setLastBasePuzzle(currentDificult, puzzle);
    this.setState({ currentGrid: getCurrentGrid(puzzle, puzzle) });
    showSudoku2(puzzle);
  };

  checkOldPuzzle = async () => {
    const { currentDificult } = this.state;
    const lastPuzzle = await getLastPuzzle(currentDificult);
    if (lastPuzzle !== null) {
      return true;
    }
    return false;
  };

  loadOldPuzzle = async () => {
    console.log('loadOldPuzzle');
    const { currentDificult } = this.state;
    const lastPuzzle = await getLastPuzzle(currentDificult);
    const lastBasePuzzle = await getLastBasePuzzle(currentDificult);

    this.setState({
      currentPuzzle: lastPuzzle,
      basePuzzle: lastBasePuzzle,
      currentGrid: getCurrentGrid(lastPuzzle, lastBasePuzzle),
    });
  };

  setValue = async (number) => {
    await this.loadOldPuzzle();
    const {
      basePuzzle,
      currentPuzzle,
      currentCell,
      currentDificult,
    } = this.state;
    if (number === 'X' || number === 'x') {
      const newCurrentPuzzle = insertInArray(
        currentPuzzle,
        currentCell.cellNumber,
        0,
      );
      this.setState({
        currentPuzzle: newCurrentPuzzle,
        currentGrid: getCurrentGrid(newCurrentPuzzle, basePuzzle),
      });
      await AsyncStorage.setItem(
        `lastPuzzle-${currentDificult}`,
        JSON.stringify(newCurrentPuzzle),
      );
      return;
    }

    console.log(
      'isPossibleNumber',
      isPossibleNumber(currentCell.cellNumber, number, currentPuzzle),
    );

    const newCurrentPuzzle = insertInArray(
      currentPuzzle,
      currentCell.cellNumber,
      number,
    );

    this.setState({
      currentPuzzle: newCurrentPuzzle,
      currentGrid: getCurrentGrid(newCurrentPuzzle, basePuzzle),
      currentCell: currentCell,
    });
    await setLastPuzzle(currentDificult, newCurrentPuzzle);
    console.log('Is resolved', isSolvedSudoku(newCurrentPuzzle));
    await this.loadOldPuzzle();
    // }
  };

  selectCell = async (cellNumber, currentValue = 0) => {
    await this.loadOldPuzzle();
    const { currentPuzzle, currentCell, currentDificult } = this.state;
    console.log(
      'setValue',
      currentPuzzle.length,
      (await getLastPuzzle(currentDificult)).length,
    );
    console.log(determinePossibleValues(cellNumber, currentPuzzle));
    this.setState({ currentCell: { cellNumber, currentValue } }, () =>
      console.log(this.state.currentCell),
    );
    await this.loadOldPuzzle();
  };

  resetPuzzle = async () => {
    const { currentDificult } = this.state;
    const lastBasePuzzle = await getLastBasePuzzle(currentDificult);

    this.setState({
      currentPuzzle: lastBasePuzzle,
      currentGrid: getCurrentGrid(lastBasePuzzle, lastBasePuzzle),
    });

    await setLastPuzzle(currentDificult, lastBasePuzzle);
  };

  loadOrCreatePuzzle = async (dificult, navigation) => {
    this.setState({
      currentDificult: dificult,
    });
    if (await this.checkOldPuzzle()) {
      Alert.alert('Existe una partida antigua', '¿Desea cargar el anterior?', [
        {
          text: 'Cargar la antigua',
          onPress: async () => {
            console.log('old');
            await this.loadOldPuzzle();
            navigation.navigate('Game');
          },
        },
        {
          text: 'Deseo una nueva',
          onPress: async () => {
            console.log('new');
            await this.newPuzzle();
            navigation.navigate('Game');
          },
          style: 'cancel',
        },
      ]);
    } else {
      console.log('else');
      await this.newPuzzle();
      navigation.navigate('Game');
    }
  };

  render() {
    const { currentPuzzle, currentGrid, currentCell } = this.state;
    const { children } = this.props;
    return (
      <PuzzleContext.Provider
        value={{
          currentPuzzle: currentPuzzle,
          currentGrid: currentGrid,
          currentCell: currentCell,
          setCurrentCell: this.setCurrentCell,
          selectCell: this.selectCell,
          setValue: this.setValue,
          resetPuzzle: this.resetPuzzle,
          loadOrCreatePuzzle: this.loadOrCreatePuzzle,
        }}>
        {children}
      </PuzzleContext.Provider>
    );
  }
}
