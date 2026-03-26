import { useRouter } from 'expo-router';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Fonts, Shadows } from "../../styles/globalStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function Dormir() {
    const router = useRouter();

    const handleAccept = () => {
        // Typically this would just close the app or stay on this screen
        // but for demo purposes we can go back
        router.back();
    };

    return (
        <View style={styles.container}>
            {/* Background decorative elements to mimic gradient/depth */}
            <View style={styles.glowTop} />
            <View style={styles.glowBottom} />

            <View style={styles.content}>
                <View style={styles.imageContainer}>
                    {/* Placeholder for the sleeping capybara image */}
                    <Image
                        source={require('../../assets/images/capicons.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    {/* Small Z's to indicate sleeping */}
                    <Text style={[styles.zzz, { top: -20, right: 10, fontSize: 30 }]}>Z</Text>
                    <Text style={[styles.zzz, { top: 0, right: -10, fontSize: 20 }]}>Z</Text>
                    <Text style={[styles.zzz, { top: 20, right: -25, fontSize: 15 }]}>Z</Text>
                </View>

                <Text style={styles.title}>¡Hora de dormir!</Text>

                <Text style={styles.message}>
                    Tu horario de sueño ya ha comenzado, podrás volver cuando termine
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleAccept}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Aceptar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1B4B', // Very dark indigo/blue
        justifyContent: 'center',
        alignItems: 'center',
    },
    glowTop: {
        position: 'absolute',
        top: -100,
        width: SCREEN_WIDTH * 1.5,
        height: SCREEN_WIDTH * 1.5,
        borderRadius: SCREEN_WIDTH,
        backgroundColor: '#312E81',
        opacity: 0.5,
    },
    glowBottom: {
        position: 'absolute',
        bottom: -200,
        width: SCREEN_WIDTH * 2,
        height: SCREEN_WIDTH * 2,
        borderRadius: SCREEN_WIDTH,
        backgroundColor: '#4338CA',
        opacity: 0.3,
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 40,
        zIndex: 10,
    },
    imageContainer: {
        position: 'relative',
        marginBottom: 40,
    },
    image: {
        width: 200,
        height: 200,
        // Optional: darken the image slightly to fit the night theme
        opacity: 0.9,
    },
    zzz: {
        position: 'absolute',
        color: '#A5B4FC',
        fontFamily: Fonts.figtreebold,
        opacity: 0.8,
    },
    title: {
        fontSize: 32,
        fontFamily: Fonts.figtreebold,
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
    },
    message: {
        fontSize: 18,
        fontFamily: Fonts.figtreeRegular,
        color: '#E0E7FF',
        textAlign: 'center',
        lineHeight: 28,
        marginBottom: 50,
        opacity: 0.9,
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 14,
        paddingHorizontal: 60,
        borderRadius: 30,
        ...Shadows.button,
    },
    buttonText: {
        color: '#4338CA',
        fontFamily: Fonts.figtreebold,
        fontSize: 18,
    }
});
