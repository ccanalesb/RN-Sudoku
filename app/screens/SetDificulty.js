import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Headline } from 'react-native-paper';
import DificultSelector from '../components/DificultSelector';
import { PuzzleContext } from '../context/PuzzleHandler';

const SetDificulty = ({ navigation }) => {
  const { loadOrCreatePuzzle } = useContext(PuzzleContext);
  return (
    <View style={styles.container}>
      <Headline>Elige tu nivel de Dificultad</Headline>
      <View style={styles.containerWithoutMargin}>
        {[
          {
            text: 'Fácil',
            value: 'easy',
            action: () => loadOrCreatePuzzle('easy', navigation),
            color: '#AED581',
          },
          {
            text: 'Mediano',
            value: 'medium',
            action: () => loadOrCreatePuzzle('medium', navigation),
            color: '#FFF176',
          },
          {
            text: 'Difícil',
            value: 'hard',
            action: () => loadOrCreatePuzzle('hard', navigation),
            color: '#E57373',
          },
          {
            text: 'Muy Dificil',
            value: 'very-hard',
            action: () => loadOrCreatePuzzle('very-hard', navigation),
            color: '#E53935',
          },
          {
            text: 'Imposible',
            value: 'insane',
            action: () => loadOrCreatePuzzle('insane', navigation),
            color: '#AD1457',
          },
          {
            text: 'Solo Robots',
            value: 'inhuman',
            action: () => loadOrCreatePuzzle('inhuman', navigation),
            color: '#424242',
          },
        ].map((dificulty) => (
          <View style={styles.buttonsContainer} key={dificulty.value}>
            <DificultSelector
              text={dificulty.text}
              action={dificulty.action}
              color={dificulty.color}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default SetDificulty;

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', marginTop: 100 },
  containerWithoutMargin: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});
