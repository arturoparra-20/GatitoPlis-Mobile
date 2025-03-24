import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const navigation = useNavigation();

  // Obtiene el contexto de autenticación
//   const authContext = useContext(AuthContext);
//   if (!authContext) {
//     throw new Error("AuthContext debe estar dentro de AuthProvider");
//   }
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await login(email, password, rememberMe, () => router.push('/(tabs)'));
    } catch (err) {
      setError("Correo electrónico o contraseña incorrectos");
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Inicio de Sesión</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Correo Electrónico" onChangeText={setEmail} value={email} keyboardType="email-address" />
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry={!showPassword} onChangeText={setPassword} value={password} />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? "eye-slash" : "eye"} size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.rememberContainer}>
        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
          <Text style={styles.rememberText}>{rememberMe ? "✅" : "⬜️"} No cerrar sesión</Text>
        </TouchableOpacity>
        <Text style={styles.link}>¿Olvidaste la contraseña?</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      {isLoading && <ActivityIndicator size="large" color="#464543" style={{ marginTop: 10 }} />}

      <View style={{ marginTop: 20 }}>
        <Text style={styles.link}>Regístrate aquí!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
  },
  logo: { width: 300, height: 200, resizeMode: "contain", alignSelf: "center", marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  inputContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 10, borderRadius: 8, marginBottom: 15 },
  input: { flex: 1, fontSize: 16 },
  button: { backgroundColor: "#464543", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontWeight: "bold" },
  error: { backgroundColor: "#f8d7da", color: "#721c24", padding: 10, borderRadius: 5, textAlign: "center", marginBottom: 10 },
  rememberContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  rememberText: { fontSize: 14 },
  link: { color: "#464543", fontWeight: "bold", fontSize: 14 },
});
