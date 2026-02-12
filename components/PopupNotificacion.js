import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { Fonts, Shadows } from '../styles/globalStyles';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PopupNotificacion = ({
    title = "Task Key",
    message = "El tiempo de pantalla está por terminar en 5 minutos",
    time = "Ahora"
}) => {
    return (
        <View style={styles.container}>
            {/* Purple Icon Box */}
            <View style={styles.iconBox}>
                <Image
                    source={require('../assets/images/capihijo.png')}
                    style={styles.icon}
                    resizeMode="contain"
                />
            </View>

            {/* Text Content */}
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.time}>{time}</Text>
                </View>
                <Text style={styles.message} numberOfLines={2}>
                    {message}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH * 0.92,
        backgroundColor: '#E5E7EB', // Light grey background
        borderRadius: 24,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        ...Shadows.button,
        shadowOpacity: 0.15,
        elevation: 8,
    },
    iconBox: {
        width: 60,
        height: 60,
        backgroundColor: '#7E22CE', // Purple background
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    icon: {
        width: 50,
        height: 50,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
    },
    title: {
        fontSize: 18,
        fontFamily: Fonts.figtreebold,
        color: '#000000',
        fontWeight: 'bold',
    },
    time: {
        fontSize: 14,
        fontFamily: Fonts.figtreeRegular,
        color: '#6B7280', // Gray text
    },
    message: {
        fontSize: 16,
        fontFamily: Fonts.figtreeRegular,
        color: '#1F2937', // Dark gray/black
        lineHeight: 20,
    }
});

export default PopupNotificacion;
