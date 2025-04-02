import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Slot, usePathname, useRouter } from 'expo-router';
import Header from './components/Header';
import TabBar from './components/TabBar';

const MainLayout = () => {
  
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Si la ruta es exactamente 'mainLayout', redirigir a Home
    if (pathname === '/mainLayout' || pathname === '/') {
      router.replace('/features/home');
    }

    // Evitar renderizar MainLayout dentro de sí mismo
    if (pathname && pathname.includes('mainLayout')) {
      router.replace('/features/home');
    }
  }, [pathname]);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Slot />  
      </View>
      <TabBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default MainLayout;
