import React from 'react';
import { View } from 'react-native';
import RowBlocks from './RowBlocks';

const Grid = ({ currentGrid }) => {
  return (
    <View>
      {currentGrid.map((rowData, index) => (
        <RowBlocks rowBlocks={rowData} key={`${index}-row`} />
      ))}
    </View>
  );
};

export default Grid;
