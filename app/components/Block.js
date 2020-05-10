import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PuzzleContext } from '../context/PuzzleHandler';

const setColor = (item, currentCell) => {
  // console.log(item.baseValue);
  if (item.currentCell === currentCell) {
    // console.log('HERE');
    return '#0288D1';
  }
  if (!item.baseValue && item.currentCell !== currentCell) {
    // console.log('HERE');
    return 'white';
  }
  if (item.baseValue) {
    return '#BDBDBD';
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
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                console.log('press cell', item.cellNumber, item.blockCell);
                selectCell(item.cellNumber);
                console.log(
                  'asdf',
                  currentCell,
                  item.cellNumber === currentCell,
                );
              }}
              disabled={item.blockCell}>
              <View
                style={[
                  styles.blockContent,
                  { backgroundColor: setColor(item, currentCell) },
                ]}>
                <Text key={`${item}-${index}`} style={styles.textColor}>
                  {item.value ? item.value : 0}
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
    borderWidth: 2,
  },
  blockContent: {
    margin: 2,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    padding: 10,
  },
  textColor: {
    color: '#212121',
  },
});
