import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const DificultSelector = ({ text, action, color }) => {
  return (
    <Button
      mode="contained"
      onPress={() => action()}
      compact
      color={color}
      contentStyle={styles.buttonStyle}>
      {text}
    </Button>
  );
};

export default DificultSelector;

const styles = StyleSheet.create({
  buttonStyle: {
    width: 130,
    height: 40,
  },
});
