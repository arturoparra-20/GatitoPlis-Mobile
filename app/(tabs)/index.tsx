import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useAuth } from '@/context/AuthContext';

export default function TabOneScreen() {
  const {user} = useAuth();
  return (
   <> 
    <View style={styles.container}>
      <Text style={styles.title}>Estado de Autenticación</Text>
      {user ? (
        <>
          <Text>✅ Usuario AUTENTICADO</Text>
          <Text style={styles.text}>Nombre: {user.nombres}</Text>
        </>
      ) : (
        <Text>❌ Usuario NO autenticado</Text>
      )}
    </View>
    {/* <View style={styles.container}>

      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginVertical: 4
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
