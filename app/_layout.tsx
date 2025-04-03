import FontAwesome from '@expo/vector-icons/FontAwesome';
 import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
 import { useFonts } from 'expo-font';
 import { Stack } from 'expo-router';
 import * as SplashScreen from 'expo-splash-screen';
 import { useEffect } from 'react';
 import 'react-native-reanimated';
 // ¡Esta es la importación que faltaba!
 import { ActivityIndicator, View } from 'react-native'; 
 
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
   const { user, isLoading } = useAuth();
 
   if (isLoading) {
     return (
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <ActivityIndicator size="large" />
       </View>
     );
   }
 
   return (
 
       <Stack screenOptions={{ headerShown: false }}>
         {user ? (
           <>
             <Stack.Screen name="/" />
             <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
           </>
         ) : (
           <Stack.Screen name="auth/Login" />
         )}
       </Stack>

   );
  }