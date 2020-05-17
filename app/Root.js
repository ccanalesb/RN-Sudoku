import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { PuzzleHandler } from './context/PuzzleHandler';
import GameScreen from './screens/GameScreen';
import SetDificulty from './screens/SetDificulty';

const Stack = createStackNavigator();

const Root = () => {
  return (
    <PuzzleHandler>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#26A69A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen name="Dificultad" component={SetDificulty} />
          <Stack.Screen name="Game" component={GameScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PuzzleHandler>
  );
};

export default Root;
