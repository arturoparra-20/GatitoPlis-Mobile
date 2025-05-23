import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FriendScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Friend Screen</Text>
    </View>
  );
};

export default FriendScreen;

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
