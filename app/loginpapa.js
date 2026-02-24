import { loginUser } from '../services/api';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "../styles/globalStyles";
import { useState } from 'react';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function LoginPapa() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Redirige a la pantalla de registro
    const handleRegistrarsePress = () => {
        router.push('/registropapa');
    };

    // Funcion para iniciar sesión
    const handleLogin = async () => {
        // Validar campos
        if (!email || !password) {
            Alert.alert("Error", "Todos los campos son obligatorios");
            return;
        }
        // Pone el estado de loading en true para mostrar el indicador de carga en lo que espera al servidor
        setLoading(true);
        // Intenta iniciar sesión
        try {
            const data = await loginUser(email, password);
            router.replace('/principalpapa');
        } catch (error) {
            // Si hay un error, muestra un alert con el error
            Alert.alert("Error", error.message);
        } finally {
            // Pone el estado de loading en false para ocultar el indicador de carga
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="chevron-back" size={32} color="white" />
            </TouchableOpacity>

            <Text style={styles.header}>Iniciar Sesión</Text>
            <Text style={styles.texto}>Utiliza el correo con el que te registraste</Text>

            <View style={styles.cardContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Correo"
                    placeholderTextColor={Colors.darkgraytext}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor={Colors.darkgraytext}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} disabled={loading} onPress={handleLogin}>
                    <Text style={styles.buttonText}>{loading ? "Cargando..." : "Iniciar Sesión"}</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.textobelow}>¿No tienes cuenta?</Text>
            <TouchableOpacity style={styles.buttonTransparent} onPress={handleRegistrarsePress}>
                <Text style={styles.buttonregistrarse}>Registrarse</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.gray,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 20,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.1)', // Subtle background to see white on gray
        borderRadius: 20,
    },
    header: {
        width: SCREEN_WIDTH * 0.8,
        fontSize: 38,
        fontWeight: 'figtreebold',
        fontFamily: Fonts.figtreebold,
        textAlign: 'center',
        marginBottom: SCREEN_HEIGHT * 0.01,
    },
    texto: {
        width: SCREEN_WIDTH * 0.72,
        fontSize: 18,
        textAlign: 'center',
        fontFamily: Fonts.figtree,
        marginTop: SCREEN_HEIGHT * 0.02,
        marginBottom: SCREEN_HEIGHT * 0.03,
        lineHeight: 24,
        zIndex: 10,
    },
    cardContainer: {
        backgroundColor: Colors.white,
        paddingHorizontal: 25,
        paddingVertical: 40,
        borderRadius: 15, // Esquinas redondeadas del contenedor
        width: 318,     // Ajusta al ancho que necesites
        height: 294,

        alignSelf: 'center',
        top: SCREEN_HEIGHT * 0.005,
        shadowColor: Colors.darkgraytext,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },

    input: {
        backgroundColor: Colors.gray,
        borderRadius: 30, // Bordes redondeados de los inputs
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 18,
        marginBottom: 20
    },

    button: {
        backgroundColor: Colors.primary,
        borderRadius: 30, // Bordes bien redondeados
        paddingVertical: 15,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',

        // Elevación para darle un poco de 'pop'
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    buttonDisabled: {
        backgroundColor: Colors.darkgraytext,
        opacity: 0.5,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 20,
        fontWeight: 'figtreebold',
        fontFamily: Fonts.figtreebold,
    },
    textobelow: {
        color: Colors.black,
        fontSize: 18,
        top: SCREEN_HEIGHT * 0.05,
        fontFamily: Fonts.figtreeRegular,
        textAlign: 'center',
    },
    buttonregistrarse: {
        color: Colors.green,
        fontSize: 21,
        fontWeight: 'figtreebold',
        fontFamily: Fonts.figtreebold,
        textAlign: 'center',
        top: SCREEN_HEIGHT * 0.03,
    },
    buttonTransparent: {
        backgroundColor: 'transparent',
        paddingVertical: 10,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
})