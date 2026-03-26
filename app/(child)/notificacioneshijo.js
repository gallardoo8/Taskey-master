import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BarraNavegacion from "../../components/BarraNavegacion";
import { Colors, Fonts, Shadows } from "../../styles/globalStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const NOTIFICACIONES = [
    {
        id: '1',
        type: 'mision_nueva',
        content: '¡Nueva misión asignada! Completa \'Tender la cama\'',
        time: 'Hace 5 minutos',
        icon: require('../../assets/images/tareas.png'),
        hasAction: true,
    },
    {
        id: '2',
        type: 'mision_cumplida',
        content: '¡Misión cumplida! Has completado \'Hacer ejercicio\'',
        time: 'Hace 20 minutos',
        icon: 'checkmark-circle',
        iconColor: '#ADD633',
    },
    {
        id: '3',
        type: 'tiempo_alerta',
        content: 'El tiempo en pantalla está por terminar en 5 minutos',
        time: 'Hace 5 horas',
        icon: 'warning',
        iconColor: '#FACC15',
    },
    {
        id: '4',
        type: 'tiempo_inicio',
        content: '¡Tu tiempo en pantalla ha comenzado! Tienes 30 minutos a partir de ahora',
        time: 'Hace 6 horas',
        icon: 'time',
        iconColor: '#00AEEF',
    },
    {
        id: '5',
        type: 'felicidades',
        content: '¡FELICIDADES! Has dominado todas las misiones de la semana. Tu recompensa te está esperando',
        time: 'Hace 6 horas',
        icon: 'star',
        iconColor: '#FACC15',
        hasAction: true,
    }
];

export default function NotificacionesHijo() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Text style={styles.headerTitle}>Notificaciones</Text>

                <View style={styles.notisList}>
                    {NOTIFICACIONES.map((noti) => (
                        <View key={noti.id} style={styles.notiCard}>
                            <View style={styles.notiHeader}>
                                <View style={styles.iconWrapper}>
                                    {noti.type === 'mision_nueva' ? (
                                        <Image source={noti.icon} style={styles.miniIcon} resizeMode="contain" tintColor={Colors.primary} />
                                    ) : (
                                        <Ionicons name={noti.icon} size={40} color={noti.iconColor} />
                                    )}
                                </View>
                                <View style={styles.textWrapper}>
                                    <Text style={styles.notiText}>{noti.content}</Text>
                                    <Text style={styles.notiTime}>{noti.time}</Text>
                                </View>
                            </View>

                            {noti.hasAction && (
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => {
                                        if (noti.type === 'mision_nueva') router.push('/tareashijo');
                                        if (noti.type === 'felicidades') router.push('/recompensashijo');
                                    }}
                                >
                                    <Text style={styles.actionButtonText}>Mostrar detalles</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            <BarraNavegacion activeTab="notificaciones" userType="hijo" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    scrollContent: {
        paddingTop: 60,
    },
    headerTitle: {
        fontSize: 38,
        fontFamily: Fonts.figtreebold,
        color: Colors.black,
        textAlign: 'center',
        marginBottom: 30,
    },
    notisList: {
        gap: 15,
    },
    notiCard: {
        backgroundColor: Colors.white,
        borderRadius: 15,
        padding: 15,
        ...Shadows.button,
        shadowOpacity: 0.1,
    },
    notiHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconWrapper: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    miniIcon: {
        width: 40,
        height: 40,
    },
    textWrapper: {
        flex: 1,
    },
    notiText: {
        fontSize: 16,
        fontFamily: Fonts.figtreebold,
        color: Colors.black,
        marginBottom: 4,
        lineHeight: 20,
    },
    notiTime: {
        fontSize: 14,
        fontFamily: Fonts.figtreeRegular,
        color: '#9CA3AF',
    },
    actionButton: {
        backgroundColor: Colors.primary,
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 25,
        alignSelf: 'flex-end',
        marginTop: 10,
        ...Shadows.button,
    },
    actionButtonText: {
        color: Colors.white,
        fontSize: 14,
        fontFamily: Fonts.figtreebold,
    }
});
