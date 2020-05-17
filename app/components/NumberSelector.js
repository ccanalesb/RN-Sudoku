import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { PuzzleContext } from '../context/PuzzleHandler';

const NumberSelectorButton = ({ value, setValue }) => (
  <Chip onPress={() => setValue(value)} mode="outlined">
    {String(value)}
  </Chip>
);

const NumberSelector = () => {
  const { setValue } = useContext(PuzzleContext);
  return (
    <View style={styles.content}>
      <View style={styles.firstRow}>
        {[1, 2, 3, 4, 5].map((value) => {
          return (
            <NumberSelectorButton
              value={value}
              setValue={setValue}
              key={value}
            />
          );
        })}
      </View>
      <View style={styles.dividerStyle} />
      <View style={styles.secondRow}>
        {[6, 7, 8, 9, 'X'].map((value) => {
          return (
            <NumberSelectorButton
              value={value}
              setValue={setValue}
              key={value}
            />
          );
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
