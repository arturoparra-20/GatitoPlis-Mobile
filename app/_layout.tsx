import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { router, Slot } from 'expo-router';

import { AuthProvider, useAuth } from '../context/AuthContext';
import MainLayout from './mainLayout';
import LoginScreen from './auth/Login';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}

function InitialLayout() {
  return (
    <View style={{ flex: 1 }}>
      <RootLayoutNav />
    </View>
  );
}

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    
    setIsReady(true);
  }, []);

  if (!isReady || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (user) {
    return <MainLayout />;
  } else {
    return <LoginScreen />;
  }
}
