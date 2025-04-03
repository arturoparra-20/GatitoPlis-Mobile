import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '@/context/AuthContext';
import MainLayout from './mainLayout';

const App = () => {
  return (
 
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
  );
};

export default App;
