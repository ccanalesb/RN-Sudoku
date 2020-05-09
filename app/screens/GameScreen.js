import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Grid from '../components/Grid';
import NumberSelector from '../components/NumberSelector';
import { PuzzleHandler } from '../context/PuzzleHandler';

const GameScreen = () => {
  return (
    <PuzzleHandler>
      <SafeAreaView>
        <View style={styles.wrapper}>
          <Grid />
        </View>
        <NumberSelector />
      </SafeAreaView>
    </PuzzleHandler>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
});
