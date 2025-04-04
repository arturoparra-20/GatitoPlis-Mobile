import Loader from '@/components/Loader';
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter';
import { FontAwesome } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { styles } from './_recuperadostyles';
import { LinearGradient } from 'expo-linear-gradient';

export default function RecuperadoScreen() {
  const { token: initialToken } = useLocalSearchParams();
  const [token, setToken] = useState(initialToken?.toString() || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{10,}$/;
    return regex.test(password);
  };

  const handleResetPassword = async () => {
    setError("");
    setIsLoading(true);

    // VALIDACIONES 
    if (!token) {
      setError("El token de recuperación es requerido");
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setError("La contraseña debe tener al menos 10 caracteres, una mayúscula y un número");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://192.168.100.85:5000/auth/reset', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resetToken: token,
          clave: password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setModalOpen(true);
      } else {
        setError(data.message || "Error al cambiar la contraseña");
      }
    } catch (error) {
      console.error('Error al restablecer contraseña:', error);
      setError('Hubo un problema al procesar tu solicitud');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground source={require("../assets/background1.png")} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <LinearGradient
            colors={['#e0e0e0', '#f0f0f0', '#ffffff']}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
            style={styles.formContainer}
          >
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
            />

            <Text style={styles.title}>Recuperación Exitosa</Text>
            <Text style={styles.subtitle}>
              Crea una nueva contraseña segura
            </Text>

            {error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <TextInput
              value={token}
              onChangeText={setToken}
              placeholder="Token de recuperación"
              style={styles.input}
            />

            <View style={styles.passwordContainer}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Nueva contraseña"
                secureTextEntry={!showPassword}
                style={[styles.input, styles.passwordInput]}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <FontAwesome
                  name={showPassword ? 'eye-slash' : 'eye'}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
            <PasswordStrengthMeter password={password} />

            <View style={styles.passwordContainer}>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirmar nueva contraseña"
                secureTextEntry={!showCPassword}
                style={[styles.input, styles.passwordInput]}
              />
              <TouchableOpacity
                onPress={() => setShowCPassword(!showCPassword)}
                style={styles.eyeIcon}
              >
                <FontAwesome
                  name={showCPassword ? 'eye-slash' : 'eye'}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
            <PasswordStrengthMeter password={confirmPassword} />

            <TouchableOpacity
              onPress={handleResetPassword}
              style={styles.mainButton}
              disabled={isLoading}
            >
              <Text style={styles.mainButtonText}>Cambiar Contraseña</Text>
            </TouchableOpacity>

            {isLoading && <Loader />}
          </LinearGradient>
        </ScrollView>

        {/* MODAL DE EXITO */}
        <Modal
          visible={modalOpen}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalOpen(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>¡Contraseña Actualizada!</Text>
              <Text style={styles.modalSubtitle}>
                Tu contraseña ha sido cambiada exitosamente.
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setModalOpen(false);
                  router.replace('/auth/Login');
                }}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Ir al Inicio de Sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </ImageBackground >
  );
}

