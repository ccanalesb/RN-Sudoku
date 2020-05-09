import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { PuzzleContext } from '../context/PuzzleHandler';
import RowBlocks from './RowBlocks';

const Grid = () => {
  const { currentGrid } = useContext(PuzzleContext);
  if (currentGrid === []) {
    return null;
  }
  return (
    <View>
      {currentGrid.map((rowData) => (
        <RowBlocks rowBlocks={rowData} />
      ))}
    </View>
  );
};

export default Grid;

const styles = StyleSheet.create({});
