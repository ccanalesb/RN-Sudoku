import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PuzzleContext } from '../context/PuzzleHandler';

const setColor = (item, currentCell) => {
  if (item.baseValue) {
    if (item.value === currentCell.currentValue) {
      return '#B2DFDB';
    }
    return '#E0E0E0';
  }
  if (item.value === 0) {
    if (item.cellNumber === currentCell.cellNumber) {
      return '#26A69A';
    }
    return 'white';
  }
  if (item.value === currentCell.currentValue) {
    if (item.cellNumber === currentCell.cellNumber) {
      return '#26A69A';
    }
    return '#B2DFDB';
  }

  return 'white';
};

const Block = ({ blockData }) => {
  const { selectCell, currentCell } = useContext(PuzzleContext);
  const newblockData = blockData.map((value) => {
    if (!value) {
      return 0;
    }
    return value;
  });
  return (
    <View style={styles.blockContainer}>
      <FlatList
        data={newblockData}
        scrollEnabled={false}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                console.log('press cell', item.cellNumber, item.blockCell);
                selectCell(item.cellNumber, item.value);
              }}
              disabled={item.baseValue}>
              <View
                style={[
                  styles.blockContent,
                  { backgroundColor: setColor(item, currentCell) },
                ]}>
                <Text key={`${item}-${index}`} style={styles.textColor}>
                  {item.value ? item.value : ' '}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        numColumns={3}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default Block;

const styles = StyleSheet.create({
  blockContainer: {
    borderColor: 'black',
    borderWidth: 1,
  },
  blockContent: {
    margin: 2,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    padding: 10,
    width: 30,
    height: 40,
  },
  textColor: {
    color: '#212121',
  },
});
