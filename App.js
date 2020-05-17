import React from 'react';
import 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import Root from './app/Root';

const App = () => (
  <PaperProvider>
    <Root />
  </PaperProvider>
);

export default App;
