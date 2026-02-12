import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Colors, Fonts, Shadows } from "../styles/globalStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function LoginHijo() {
    const router = useRouter();

    const handleBackPress = () => {
        router.back();
    };

    const handleIniciarSesion = () => {
        // En una app real, aquí se validaría el código
        router.push('/perfilhijo');
    };

    return (
        <View style={styles.container}>
            {/* Botón de regreso */}
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                <Ionicons name="chevron-back" size={32} color="white" />
            </TouchableOpacity>

            <View style={styles.content}>
                <Text style={styles.header}>Iniciar sesión</Text>
                <Text style={styles.texto}>
                    Ingresa el código proporcionado en la cuenta de tu madre, padre o tutor
                </Text>

                <View style={styles.cardContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Usuario"
                        placeholderTextColor={Colors.darkgraytext}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Código"
                        placeholderTextColor={Colors.darkgraytext}
                        keyboardType="numeric"
                    />

                    <TouchableOpacity style={styles.button} onPress={handleIniciarSesion}>
                        <Text style={styles.buttonText}>Iniciar sesión</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6', // Gris muy claro como el fondo de la imagen
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 20,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 32,
        fontFamily: Fonts.figtreebold,
        color: Colors.black,
        textAlign: 'center',
        marginBottom: 20,
    },
    texto: {
        fontSize: 16,
        color: '#4B5563',
        textAlign: 'center',
        fontFamily: Fonts.figtreeRegular,
        marginBottom: 30,
        paddingHorizontal: 10,
        lineHeight: 22,
    },
    cardContainer: {
        backgroundColor: Colors.white,
        paddingHorizontal: 25,
        paddingVertical: 35,
        borderRadius: 25,
        width: SCREEN_WIDTH * 0.85,
        ...Shadows.button,
        shadowOpacity: 0.1,
        alignItems: 'center',
    },
    input: {
        backgroundColor: '#E5E7EB',
        borderRadius: 20,
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 12,
        fontSize: 16,
        fontFamily: Fonts.figtreeRegular,
        marginBottom: 15,
        color: Colors.black,
    },
    button: {
        backgroundColor: Colors.primary,
        borderRadius: 30,
        paddingVertical: 14,
        paddingHorizontal: 40,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.button,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 18,
        fontFamily: Fonts.figtreebold,
    }
});