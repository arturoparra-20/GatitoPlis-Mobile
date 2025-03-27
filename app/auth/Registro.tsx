import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    Modal,
    Alert,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter';
import Loader from '@/components/Loader';
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

export default function RegistroScreen() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        nombres: "",
        apellidos: "",
        telefono: "",
        pais: "",
        ciudad: "",
        fechaNacimiento: "",
        edad: 0
    });

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showCPassword, setShowCPassword] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [token, setToken] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const router = useRouter();

    const validatePassword = (password: string) => {
        const regex = /^(?=.*[A-Z])(?=.*\d).{10,}$/;
        return regex.test(password);
    };

    const calcularEdad = (fechaNacimiento: string) => {
        if (!fechaNacimiento) return 0;

        const birthDate = new Date(fechaNacimiento);
        // Validar que la fecha sea correcta
        if (isNaN(birthDate.getTime())) return 0;

        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        // Siempre ocultar el DatePicker primero para evitar bucles
        setShowDatePicker(false);

        if (event.type === "dismissed") {
            return;
        }

        if (selectedDate) {
            const fechaISO = selectedDate.toISOString().split("T")[0];
            const edadCalculada = calcularEdad(fechaISO);

            setForm((prev) => ({
                ...prev,
                fechaNacimiento: fechaISO,
                edad: edadCalculada,
            }));

            if (edadCalculada < 13) {
                setError("Debes tener al menos 13 años para registrarte");
            } else if (error === "Debes tener al menos 13 años para registrarte") {
                setError("");
            }
        }
    };

    const handleChange = (name: string, value: string) => {
        if (name === 'nombres' || name === 'apellidos') {
            if (!/^[A-Za-zÀ-ÿ\s]*$/.test(value)) return;
        }

        if (name === 'telefono') {
            if (!/^\d*$/.test(value)) return;
        }

        setForm(prev => ({ ...prev, [name]: value }));
    };

    const register = async () => {
        setIsLoading(true);
        setError("");

        // Validaciones antes del registro
        if (!form.fechaNacimiento) {
            setError("Debes ingresar tu fecha de nacimiento");
            setIsLoading(false);
            return;
        }

        if (form.edad < 13) {
            setError("Debes tener al menos 13 años para registrarte");
            setIsLoading(false);
            return;
        }

        if (!validatePassword(form.password)) {
            setError("La contraseña debe tener al menos 10 caracteres, una mayúscula y un número.");
            setIsLoading(false);
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Las contraseñas no coinciden.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://192.168.100.85:5000/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: form.email,
                    nombres: form.nombres,
                    apellidos: form.apellidos,
                    usuario: form.username,
                    telefono: form.telefono,
                    pais: form.pais,
                    ciudad: form.ciudad,
                    fechaNacimiento: form.fechaNacimiento,
                    clave: form.password,
                    edad: form.edad
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setModalOpen(true);
                Alert.alert('Éxito', 'El usuario se registró exitosamente');
            } else {
                setError(data.message || "Error en el registro");
            }
        } catch (error) {
            console.error('Error al registrar:', error);
            setError("Hubo un problema al registrar la cuenta");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerify = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://192.168.100.85:5000/users/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token }),
            });

            const data = await response.json();

            if (!response.ok) {

                setModalOpen(false);
                throw new Error(data.message || 'Error al verificar usuario');
            }

            setModalOpen(false);


            Alert.alert(
                "Verificación exitosa",
                "Tu cuenta ha sido verificada correctamente. Ahora puedes iniciar sesión.",
                [{ text: 'OK', onPress: () => router.replace('/auth/Login') }]
            );

        } catch (error) {
            console.error('Error en verificación:', error);

            // Mostrar único mensaje de error sin cerrar el modal
            Alert.alert(
                'Error de verificación',
                 'El token parece ser inválido. Por favor verifica:'
                + '\n1. Que el token sea correcto'
                + '\n2. Que no haya expirado'
                + '\n3. Que no lo hayas usado antes',
                [{ text: 'Entendido' }]
            );

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

                    <Text style={styles.title}>Registro</Text>
                    <Text style={styles.subtitle}>Únete a nuestra comunidad</Text>

                    {error ? (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    ) : null}

                    <TextInput
                        value={form.username}
                        onChangeText={(text) => handleChange('username', text)}
                        placeholder="Nombre de usuario"
                        style={styles.input}
                    />

                    <View style={styles.row}>
                        <TextInput
                            value={form.nombres}
                            onChangeText={(text) => handleChange('nombres', text)}
                            placeholder="Nombre"
                            style={[styles.input, styles.halfInput]}
                        />
                        <TextInput
                            value={form.apellidos}
                            onChangeText={(text) => handleChange('apellidos', text)}
                            placeholder="Apellido"
                            style={[styles.input, styles.halfInput]}
                        />
                    </View>

                    <TextInput
                        value={form.email}
                        onChangeText={(text) => handleChange('email', text)}
                        placeholder="Correo electrónico"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                    />

                    <View style={styles.row}>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                value={form.password}
                                onChangeText={(text) => handleChange('password', text)}
                                placeholder="Contraseña"
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

                        <View style={styles.passwordContainer}>
                            <TextInput
                                value={form.confirmPassword}
                                onChangeText={(text) => handleChange('confirmPassword', text)}
                                placeholder="Confirmar"
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
                    </View>

                    <View style={styles.row}>
                        <View style={styles.passwordMeter}>
                            <PasswordStrengthMeter password={form.password} />
                        </View>
                        <View style={styles.passwordMeter}>
                            <PasswordStrengthMeter password={form.confirmPassword} />
                        </View>
                    </View>

                    <TextInput
                        value={form.telefono}
                        onChangeText={(text) => handleChange('telefono', text)}
                        placeholder="Teléfono"
                        keyboardType="phone-pad"
                        style={styles.input}
                    />

                    <View style={styles.row}>
                        <TextInput
                            value={form.pais}
                            onChangeText={(text) => handleChange('pais', text)}
                            placeholder="País"
                            style={[styles.input, styles.halfInput]}
                        />
                        <TextInput
                            value={form.ciudad}
                            onChangeText={(text) => handleChange('ciudad', text)}
                            placeholder="Ciudad"
                            style={[styles.input, styles.halfInput]}
                        />
                    </View>

                    <Text style={styles.label}>Fecha de Nacimiento</Text>
                    <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                        style={styles.dateInput}
                    >
                        <Text style={styles.dateText}>
                            {form.fechaNacimiento ?
                                new Date(form.fechaNacimiento).toLocaleDateString('es-ES') :
                                'Seleccionar fecha'}
                        </Text>
                    </TouchableOpacity>


                    {showDatePicker && (
                        <DateTimePicker
                            value={form.fechaNacimiento ? new Date(form.fechaNacimiento) : new Date()}
                            mode="date"
                            display={Platform.OS === 'android' ? 'default' : 'spinner'}
                            onChange={handleDateChange}
                            maximumDate={new Date()}
                            locale="es-ES"
                        />
                    )}

                    <TouchableOpacity
                        onPress={register}
                        style={styles.registerButton}
                        disabled={isLoading}
                    >
                        <Text style={styles.registerButtonText}>Registrarse</Text>
                    </TouchableOpacity>

                    {isLoading && <Loader />}

                    <View style={styles.LoginContainer}>
                        <Text style={styles.LoginText}>¿Ya tienes una cuenta?</Text>
                        <Link href="/auth/Login" asChild>
                            <TouchableOpacity>
                                <Text style={styles.LoginLink}>Iniciar Sesión</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </ScrollView>

            <Modal
                visible={modalOpen}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Verificar cuenta</Text>
                        <Text style={styles.modalSubtitle}>
                            Ingresa el token que acabamos de enviar a tu correo
                        </Text>

                        <TextInput
                            value={token}
                            onChangeText={setToken}
                            placeholder="Ingrese el token"
                            style={styles.modalInput}
                        />

                        <TouchableOpacity
                            onPress={handleVerify}
                            style={styles.modalButton}
                        >
                            <Text style={styles.modalButtonText}>Verificar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom: 10,
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
        fontSize: 14,
    },
    dateInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
    },
    dateText: {
        fontSize: 14,
        color: '#333',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    halfInput: {
        width: '48%',
    },
    passwordContainer: {
        width: 150,
        height: 60,
        position: 'relative',
    },
    passwordMeter: {
        width: 150,
        position: 'relative'
    },
    passwordInput: {
        paddingRight: 40,
    },
    eyeIcon: {
        position: 'absolute',
        right: 12,
        top: 12,
    },
    label: {
        fontSize: 12,
        color: '#666',
        marginBottom: 5,
        paddingLeft: 5,
    },
    registerButton: {
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    registerButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalSubtitle: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
        color: '#666',
    },
    modalInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        width: '100%',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#333',
        padding: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    LoginContainer: {
        marginTop: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    LoginText: {
        color: '#666',
        fontSize: 14,
        marginRight: 5,
    },
    LoginLink: {
        color: '#464543',
        fontWeight: 'bold',
        fontSize: 14,
    },
});