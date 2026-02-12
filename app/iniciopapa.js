import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackgroundDecorations from "../components/BackgroundDecorations";
import { Colors, Fonts } from "../styles/globalStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function InicioPapa() {
    const router = useRouter();
    const handleIniciarSesion = () => {
        router.push('/loginpapa');
    }

    const handleRegistrarse = () => {
        router.push('/registropapa');
    }

    return (
        <View style={styles.container}>
            <BackgroundDecorations ellipseTop={0.12} />

            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="chevron-back" size={32} color="white" />
            </TouchableOpacity>

            <Text style={styles.header}>¡Te damos la bienvenida!</Text>

            <Image
                source={require("../assets/images/TASK_KEY.png")}
                style={styles.headerimage}
                resizeMode="contain"
            />
            <Image
                source={require("../assets/images/capillave.png")}
                style={styles.capillaveImage}
                resizeMode="contain"
            />

            <TouchableOpacity style={[styles.button, styles.buttonIniciarSesion]} onPress={handleIniciarSesion}>
                <Text style={styles.IniciarSesion}>Iniciar Sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.buttonRegistrarse]} onPress={handleRegistrarse}>
                <Text style={styles.Registrarse}>Registrarse</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 20,
        padding: 10,
    },
    //texto
    header: {
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.35,
        zIndex: 10,
        alignSelf: 'center',
        fontSize: 45,
        fontWeight: '700',
        fontFamily: Fonts.figtreebold,
        textAlign: 'center',
        color: Colors.primaryDark,
    },

    //header
    headerimage: {
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.02,
        zIndex: 10,
        alignSelf: 'center',
        width: 266.4,
        height: 222
    },
    capillaveImage: {
        position: 'absolute',
        zIndex: 5,
        alignSelf: 'center',
        top: SCREEN_HEIGHT * 0.13,
        left: SCREEN_WIDTH * 0.485
    },
    //botones
    button: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: Colors.white,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
        zIndex: 10,
        height: SCREEN_HEIGHT * 0.052,
        width: SCREEN_WIDTH * 0.57,
    },
    //botones posicion
    buttonIniciarSesion: {
        top: SCREEN_HEIGHT * 0.55,

    },
    buttonRegistrarse: {
        top: SCREEN_HEIGHT * 0.63,
    },
    //botones texto
    IniciarSesion: {
        color: Colors.textSecondary,
        fontSize: 23,
        fontWeight: '700',
        zIndex: 10,
    },
    Registrarse: {
        color: Colors.textSecondary,
        fontSize: 23,
        fontWeight: '700',
        zIndex: 10,
    },
})