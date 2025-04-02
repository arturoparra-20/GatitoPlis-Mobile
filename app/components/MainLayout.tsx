import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import TabBar from './TabBar';
import Header from './Header';

const MainLayout = () => {
  return (
    <View style={styles.container}>
      <Header />  
      <View style={styles.content}>
    
        {/* <Slot />   */}
      </View>
      <TabBar  />
    </View>
  )
}

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
