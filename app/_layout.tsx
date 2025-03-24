import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { ActivityIndicator, View } from 'react-native'; // ¡Esta es la importación que faltaba!

import { useColorScheme } from '@/components/useColorScheme';
import { AuthProvider, useAuth } from '../context/AuthContext';

export {
  ErrorBoundary,
} from 'expo-router';

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
  const colorScheme = useColorScheme();
  const { user, isLoading, isReady } = useAuth(); // Añade isReady

  if (!isReady || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </>
        ) : (
          <>
            <Stack.Screen 
              name="auth/Login" 
              options={{ 
                animationTypeForReplace: user ? 'push' : 'pop' 
              }} 
            />
          </>
        )}
      </Stack>
    </ThemeProvider>
  );
}