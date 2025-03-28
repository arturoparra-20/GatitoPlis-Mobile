import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import Loader from '@/components/Loader';
import {styles} from "./_recuperarstyles"

export default function SolicitarTokenScreen() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRequestReset = async () => {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch('http://192.168.100.85:5000/auth/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push({ 
          pathname: '/auth/Recuperado', 
          params: { email } 
        });
      } else {
        setError(data.message || "Ocurrió un error. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error('Error al solicitar recuperación:', error);
      setError('Hubo un problema al procesar tu solicitud.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Image 
            source={require('../assets/logo.png')} 
            style={styles.logo} 
          />
          
          <Text style={styles.title}>Recuperar Contraseña</Text>
          <Text style={styles.subtitle}>
            Ingresa tu correo electrónico para recibir un código de verificación
          </Text>

          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <TouchableOpacity 
            onPress={handleRequestReset}
            style={styles.mainButton}
            disabled={isLoading}
          >
            <Text style={styles.mainButtonText}>Enviar Código</Text>
            
          </TouchableOpacity>

          {isLoading && <Loader />}

          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>¿Recordaste tu contraseña?</Text>
            <Link href="/auth/Login" asChild>
              <TouchableOpacity>
                <Text style={styles.link}>Iniciar Sesión</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

