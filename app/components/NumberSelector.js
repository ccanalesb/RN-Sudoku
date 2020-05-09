import React, { useContext } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { PuzzleContext } from '../context/PuzzleHandler';

const NumberSelectorButton = ({ value, setValue }) => (
  <Button
    style={styles.button}
    title={String(value)}
    onPress={() => setValue(value)}
    color="black"
  />
);

const NumberSelector = () => {
  const { setValue } = useContext(PuzzleContext);
  return (
    <View style={styles.content}>
      <View style={styles.firstRow}>
        {[1, 2, 3, 4, 5].map((value) => {
          return <NumberSelectorButton value={value} setValue={setValue} />;
        })}
      </View>
      <View style={styles.dividerStyle} />
      <View style={styles.secondRow}>
        {[6, 7, 8, 9, 'X'].map((value) => {
          return <NumberSelectorButton value={value} setValue={setValue} />;
        })}
      </View>
    </View>
  );
};

export default NumberSelector;

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 50,
  },
  firstRow: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  secondRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    color: 'black',
  },
  dividerStyle: {
    height: 10,
  },
});