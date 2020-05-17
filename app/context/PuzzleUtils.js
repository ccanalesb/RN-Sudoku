import AsyncStorage from '@react-native-community/async-storage';

export const getLastPuzzle = async (dificulty) =>
  JSON.parse(await AsyncStorage.getItem(`lastPuzzle-${dificulty}`)) || null;

export const getLastBasePuzzle = async (dificulty) =>
  JSON.parse(await AsyncStorage.getItem(`lastBasePuzzle-${dificulty}`)) || null;

export const setLastPuzzle = (dificulty, newCurrentPuzzle) =>
  AsyncStorage.setItem(
    `lastPuzzle-${dificulty}`,
    JSON.stringify(newCurrentPuzzle),
  );

export const setLastBasePuzzle = (dificulty, newCurrentPuzzle) =>
  AsyncStorage.setItem(
    `lastBasePuzzle-${dificulty}`,
    JSON.stringify(newCurrentPuzzle),
  );
