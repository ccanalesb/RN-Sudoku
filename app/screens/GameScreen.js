import React, { useContext } from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import Grid from '../components/Grid';
import NumberSelector from '../components/NumberSelector';
import { PuzzleContext } from '../context/PuzzleHandler';

const GameScreen = () => {
  const { resetPuzzle, currentGrid } = useContext(PuzzleContext);
  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <Grid currentGrid={currentGrid} />
      </View>
      <NumberSelector />
      <Button title="Reiniciar" onPress={() => resetPuzzle()} />
    </SafeAreaView>
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
