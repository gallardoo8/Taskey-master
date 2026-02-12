import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Fonts, Shadows } from '../styles/globalStyles';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const PopupNotificacionBloqueo = ({
    visible,
    onClose
}) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                {/* Simulated Blur Background */}
                <View style={styles.blurBackground} />

                <View style={styles.container}>
                    {/* Image Area */}
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../assets/images/capicons.png')}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        {/* ZZZ indicators */}
                        <Text style={[styles.zzz, { top: 0, right: 30, fontSize: 32 }]}>Z</Text>
                        <Text style={[styles.zzz, { top: 20, right: 10, fontSize: 24 }]}>Z</Text>
                        <Text style={[styles.zzz, { top: 45, right: -5, fontSize: 18 }]}>Z</Text>
                    </View>

                    {/* Text Area */}
                    <Text style={styles.title}>Límite de tiempo alcanzado</Text>
                    <Text style={styles.message}>
                        Es hora de un descanso{"\n"}¡Vuelve más tarde!
                    </Text>

                    {/* Button */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onClose}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>Salir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    blurBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark semi-transparent
    },
    container: {
        width: SCREEN_WIDTH * 0.85,
        backgroundColor: '#7101CC', // Purple background from globalStyles.Colors.primary
        borderRadius: 32,
        padding: 30,
        alignItems: 'center',
        ...Shadows.button,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        elevation: 10,
    },
    imageContainer: {
        width: 180,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    image: {
        width: 140,
        height: 140,
    },
    zzz: {
        position: 'absolute',
        color: '#000',
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        opacity: 0.7,
    },
    title: {
        fontSize: 24,
        fontFamily: Fonts.figtreebold,
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    message: {
        fontSize: 18,
        fontFamily: Fonts.figtreeRegular,
        color: '#FFFFFF',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 30,
        opacity: 0.9,
    },
    button: {
        backgroundColor: '#E5E7EB', // Light grey button
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 12,
        ...Shadows.button,
        elevation: 4,
    },
    buttonText: {
        fontSize: 18,
        fontFamily: Fonts.figtreebold,
        color: '#7101CC', // Purple text
        fontWeight: 'bold',
    }
});

export default PopupNotificacionBloqueo;
