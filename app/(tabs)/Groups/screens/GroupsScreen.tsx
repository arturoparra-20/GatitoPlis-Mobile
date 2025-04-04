import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GroupsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Groups Screen</Text>
    </View>
  );
};

export default GroupsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
