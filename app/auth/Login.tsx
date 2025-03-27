import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { useAuth } from "@/context/AuthContext";
import Icon from "react-native-vector-icons/FontAwesome";
import { Link, useRouter } from "expo-router";
import SocialLogosSection from "@/components/SocialLinks";

export default function LoginScreen() {
    const router = useRouter();
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: "",
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setError(null);
        setIsLoading(true);
        try {
            await login(form.email, form.password, form.rememberMe, () => router.push('/(tabs)'));
        } catch (err) {
            setError("Correo electrónico o contraseña incorrectos");
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.formContainer}>
                    <Image 
                        source={require("../assets/logo.png")} 
                        style={styles.logo} 
                    />
                    
                    <Text style={styles.title}>Inicio de Sesión</Text>
                    <Text style={styles.subtitle}>Bienvenido de vuelta</Text>

                    {error && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}

                    <TextInput
                        value={form.email}
                        onChangeText={(text) => setForm({...form, email: text})}
                        placeholder="Correo electrónico"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                    />

                    <View style={styles.passwordContainer}>
                        <TextInput
                            value={form.password}
                            onChangeText={(text) => setForm({...form, password: text})}
                            placeholder="Contraseña"
                            secureTextEntry={!showPassword}
                            style={styles.passwordInput}
                        />
                        <TouchableOpacity 
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.eyeIcon}
                        >
                            <Icon 
                                name={showPassword ? "eye-slash" : "eye"} 
                                size={20} 
                                color="#666" 
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.rememberContainer}>
                        <TouchableOpacity 
                            onPress={() => setForm({...form, rememberMe: !form.rememberMe})}
                            style={styles.rememberCheckbox}
                        >
                            <View style={[
                                styles.checkbox, 
                                form.rememberMe && styles.checkboxChecked
                            ]}>
                                {form.rememberMe && (
                                    <Icon name="check" size={12} color="#fff" />
                                )}
                            </View>
                            <Text style={styles.rememberText}>No cerrar sesión</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity>
                            <Text style={styles.forgotPassword}>¿Olvidaste la contraseña?</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity 
                        onPress={handleLogin}
                        style={styles.loginButton}
                        disabled={isLoading}
                    >
                        <Text style={styles.loginButtonText}>
                            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </Text>
                    </TouchableOpacity>

                    {isLoading && (
                        <ActivityIndicator 
                            size="large" 
                            color="#464543" 
                            style={styles.loader} 
                        />
                    )}

                    <View style={styles.registerContainer}>
                        <Text style={styles.registerText}>¿No tienes una cuenta?</Text>
                        <Link href="/auth/Registro" asChild>
                            <TouchableOpacity>
                                <Text style={styles.registerLink}>Regístrate</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                    <SocialLogosSection />
                </View>
                
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 20,
    },
    formContainer: {
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 20,
        marginTop: 30,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    logo: {
        width: 200,
        height: 150,
        alignSelf: 'center',
        marginBottom: 10,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#666',
        marginBottom: 20,
    },
    errorContainer: {
        backgroundColor: '#ffebee',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    errorText: {
        color: '#d32f2f',
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
    },
    passwordContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    passwordInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        paddingRight: 40,
    },
    eyeIcon: {
        position: 'absolute',
        right: 12,
        top: 12,
    },
    rememberContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    rememberCheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#666',
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#464543',
        borderColor: '#464543',
    },
    rememberText: {
        fontSize: 14,
        color: '#333',
    },
    forgotPassword: {
        color: '#464543',
        fontWeight: 'bold',
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: '#464543',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loader: {
        marginTop: 15,
    },
    registerContainer: {
        marginTop: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    registerText: {
        color: '#666',
        fontSize: 14,
        marginRight: 5,
    },
    registerLink: {
        color: '#464543',
        fontWeight: 'bold',
        fontSize: 14,
    },
});