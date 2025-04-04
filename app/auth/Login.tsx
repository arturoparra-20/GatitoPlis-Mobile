import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
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
import { styles } from "./_loginstyles"
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

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
            await login(form.email, form.password, form.rememberMe, () => router.replace('/'));
        } catch (err) {
            setError("Correo electrónico o contraseña incorrectos");
            setIsLoading(false);
        }
    };

    return (
        <ImageBackground source={require("../assets/background1.png")} style={styles.container} contentFit="cover">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <LinearGradient
                        colors={['#e0e0e0', '#f0f0f0', '#ffffff']}
                        start={{ x: 0.5, y: 1 }}  
                        end={{ x: 0.5, y: 0 }}    
                        style={styles.formContainer}
                    >
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
                            onChangeText={(text) => setForm({ ...form, email: text })}
                            placeholder="Correo electrónico"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            style={styles.input}
                        />

                        <View style={styles.passwordContainer}>
                            <TextInput
                                value={form.password}
                                onChangeText={(text) => setForm({ ...form, password: text })}
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
                                onPress={() => setForm({ ...form, rememberMe: !form.rememberMe })}
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
                                <Link href='/auth/Recuperar' asChild>
                                    <Text style={styles.forgotPassword}>¿Olvidaste la contraseña?</Text>
                                </Link>
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
                    </LinearGradient>

                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground >
    );
}

