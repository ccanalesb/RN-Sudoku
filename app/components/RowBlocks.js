import React from 'react';
import { StyleSheet, View } from 'react-native';
import Block from './Block';

const RowBlocks = ({ rowBlocks = [[], [], []], rowIndex }) => {
  return (
    <View style={styles.rowContainer}>
      {rowBlocks.map((blockData) => {
        return <Block blockData={blockData} />;
      })}
    </View>
  );
};

export default RowBlocks;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
});
