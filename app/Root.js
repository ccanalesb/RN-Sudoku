import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { PuzzleHandler } from './context/PuzzleHandler';
import GameScreen from './screens/GameScreen';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Game')}
      />
    </View>
  );
};

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
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PuzzleHandler>
  );
};

export default Root;
