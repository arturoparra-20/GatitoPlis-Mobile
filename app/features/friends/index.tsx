import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Groups = () => {
  return (
    <View style={styles.container}>
      <Text>Bienvenido a la pantalla de Amigos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Groups;
