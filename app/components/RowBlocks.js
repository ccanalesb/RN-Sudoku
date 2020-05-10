import React from 'react';
import { StyleSheet, View } from 'react-native';
import Block from './Block';

const RowBlocks = ({ rowBlocks = [[], [], []] }) => {
  return (
    <View style={styles.rowContainer}>
      {rowBlocks.map((blockData, index) => {
        return <Block blockData={blockData} key={`${index}-block`} />;
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
