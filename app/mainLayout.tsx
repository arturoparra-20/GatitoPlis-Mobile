import { View } from 'react-native';
import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';
import Header from './components/Header';
import TabBar from './components/TabBar';

export default function MainLayout() {
  const router = useRouter();

  useEffect(() => {
    // Realizamos la navegación una vez montado
    router.replace('/features/home'); 
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header/>  
      <Slot />
      <TabBar/> 
    </View>
  );
}
