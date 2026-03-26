import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BarraNavegacion from "../../components/BarraNavegacion";
import { Colors, Fonts, Shadows } from "../../styles/globalStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Mock Data simulating the notifications
const INITIAL_NOTIFICATIONS = [
    {
        id: '1',
        type: 'evidence_review',
        user: 'Angel',
        task: 'Tender la cama',
        time: 'Hace 10 minutos',
        status: 'pending', // pending, confirmed, rejected
        evidenceImage: 'https://via.placeholder.com/300x150/E5E7EB/9CA3AF?text=Evidence+Image', // Placeholder for the generic mountain image
    },
    {
        id: '2',
        type: 'time_warning',
        user: 'Fer',
        time: 'Hace 1 hora',
        message: 'El tiempo de desbloqueo de aplicaciones de Fer finalizará en 10 minutos'
    },
    {
        id: '3',
        type: 'task_failed',
        user: 'Cons',
        task: 'Tender la cama',
        time: 'Ayer',
        status: 'failed',
        message: 'Cons no realizó "Tender la cama" en el tiempo límite'
    },
    {
        id: '4',
        type: 'weekly_goal',
        user: 'Angel',
        time: 'Semana pasada',
        message: '¡Angel cumplió con todas sus tareas esta semana! Se le hará entrega de sus recompensas'
    },
    {
        id: '5',
        type: 'evidence_simple',
        user: 'Fer',
        task: 'Tarea de la escuela',
        time: 'Semana pasada',
        status: 'confirmed_view', // Just a view of a confirmed task
    }
];

export default function NotificacionesPapa() {
    const router = useRouter();
    const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

    const handleConfirm = (id) => {
        setNotifications(prev => prev.map(notif =>
            notif.id === id ? { ...notif, status: 'confirmed' } : notif
        ));
    };

    const handleReject = (id) => {
        setNotifications(prev => prev.map(notif =>
            notif.id === id ? { ...notif, status: 'rejected' } : notif
        ));
    };

    const renderNotificationCard = (item) => {
        return (
            <View key={item.id} style={styles.card}>
                <View style={styles.cardHeader}>
                    {/* Icon based on type */}
                    <View style={styles.iconContainer}>
                        {item.type.includes('evidence') && (
                            <View style={[styles.iconCircle, { backgroundColor: '#FFD700' }]}>
                                <FontAwesome5 name="clipboard-check" size={20} color="white" />
                            </View>
                        )}
                        {item.type === 'time_warning' && (
                            <View style={[styles.iconCircle, { backgroundColor: '#FCD34D' }]}>
                                <MaterialIcons name="timer" size={24} color="#EF4444" />
                            </View>
                        )}
                        {item.type === 'task_failed' && (
                            <View style={[styles.iconCircle, { backgroundColor: '#EF4444' }]}>
                                <Ionicons name="close" size={24} color="white" />
                            </View>
                        )}
                        {item.type === 'weekly_goal' && (
                            <View style={[styles.iconCircle, { backgroundColor: '#FFD700' }]}>
                                <FontAwesome5 name="shield-alt" size={20} color="white" />
                            </View>
                        )}
                    </View>

                    <View style={styles.textContainer}>
                        {item.type.includes('evidence') ? (
                            <Text style={styles.notificationText}>
                                <Text style={styles.boldText}>{item.user}</Text> ha marcado "<Text style={styles.boldText}>{item.task}</Text>" como completada
                            </Text>
                        ) : (
                            <Text style={styles.notificationText}>
                                {item.message}
                            </Text>
                        )}
                        <Text style={styles.timeText}>{item.time}</Text>
                    </View>
                </View>

                {/* Evidence Image Content */}
                {item.type === 'evidence_review' && (
                    <View style={styles.evidenceContainer}>
                        {item.status === 'pending' && (
                            <View style={styles.evidenceImageWrapper}>
                                {/* Using a View to simulate the placeholder image from the screenshot (Sun and Mountains) */}
                                <View style={styles.imagePlaceholder}>
                                    <View style={styles.sun} />
                                    <View style={styles.mountainLeft} />
                                    <View style={styles.mountainRight} />
                                </View>
                            </View>
                        )}

                        {/* Action Buttons or Status Message */}
                        {item.status === 'pending' && (
                            <View style={styles.actionButtons}>
                                <TouchableOpacity
                                    style={[styles.actionButton, styles.confirmButton]}
                                    onPress={() => handleConfirm(item.id)}
                                >
                                    <Text style={styles.buttonText}>Confirmar finalización</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.actionButton, styles.rejectButton]}
                                    onPress={() => handleReject(item.id)}
                                >
                                    <Text style={styles.buttonText}>Rechazar finalización</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {item.status === 'confirmed' && (
                            <View style={styles.statusMessageContainer}>
                                <Ionicons name="checkmark-circle" size={24} color="#84CC16" />
                                <Text style={styles.successText}>Finalización confirmada</Text>
                            </View>
                        )}

                        {item.status === 'rejected' && (
                            <View style={styles.statusMessageContainerRejected}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                    <View style={styles.smallRedX}>
                                        <Ionicons name="close" size={12} color="white" />
                                    </View>
                                    <Text style={styles.rejectedTitle}>Finalización rechazada.</Text>
                                </View>
                                <Text style={styles.rejectedSubtitle}>
                                    Se le enviará una notificación a {item.user} para que vuelva a enviar evidencia
                                </Text>
                            </View>
                        )}
                    </View>
                )}

                {/* Task Failed Action */}
                {item.type === 'task_failed' && (
                    <View style={styles.failedActionContainer}>
                        <TouchableOpacity style={styles.assignButton}>
                            <Text style={styles.assignButtonText}>Asignar otra tarea</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Simple View for already confirmed items in list (like the last item in screenshot 2/3) */}
                {item.type === 'evidence_simple' && (
                    <View style={styles.statusMessageContainer}>
                        <Ionicons name="checkmark-circle" size={24} color="#84CC16" />
                        <Text style={styles.successText}>Finalización confirmada</Text>
                    </View>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header Section with Decorative Circles */}
            <View style={styles.header}>
                <View style={[styles.circle, styles.circlePink]} />
                <View style={[styles.circle, styles.circleCyan]} />
                <View style={[styles.circle, styles.circleOrange]} />

                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Notificaciones</Text>
                    <View style={styles.bellBadge}>
                        <FontAwesome5 name="bell" size={24} color="#FACC15" />
                        <View style={styles.redDot} />
                    </View>
                </View>
            </View>

            <View style={styles.content}>
                <FlatList
                    data={notifications}
                    renderItem={({ item }) => renderNotificationCard(item)}
                    keyExtractor={(item) => item.id}
                    style={styles.list}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            <BarraNavegacion activeTab="notificaciones" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    header: {
        height: SCREEN_HEIGHT * 0.22,
        backgroundColor: Colors.primary,
        overflow: 'hidden',
        justifyContent: 'center',
        paddingTop: 30,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        ...Shadows.button,
    },
    circle: {
        position: 'absolute',
        borderRadius: 1000,
    },
    circlePink: {
        width: 120,
        height: 120,
        backgroundColor: Colors.pink,
        top: -30,
        left: -30,
        opacity: 0.6,
    },
    circleCyan: {
        width: 80,
        height: 80,
        backgroundColor: '#06B6D4',
        bottom: -10,
        right: 30,
        opacity: 0.6,
    },
    circleOrange: {
        width: 50,
        height: 50,
        backgroundColor: '#F59E0B',
        top: 20,
        right: -5,
        opacity: 0.6,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 25,
        zIndex: 10,
    },
    headerTitle: {
        fontSize: 32,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        color: Colors.white,
        marginRight: 15,
    },
    bellBadge: {
        width: 50,
        height: 50,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    redDot: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#EF4444',
        borderWidth: 2,
        borderColor: Colors.white,
    },
    content: {
        flex: 1,
    },
    list: {
        flex: 1,
        marginTop: 15,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100, // Space for navigation bar
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        ...Shadows.button,
        shadowOpacity: 0.05,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    iconCircle: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    notificationText: {
        fontFamily: Fonts.figtreeRegular,
        fontSize: 15,
        color: Colors.black,
        lineHeight: 20,
        marginBottom: 4,
    },
    boldText: {
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
    },
    timeText: {
        fontFamily: Fonts.figtreeRegular,
        fontSize: 12,
        color: '#9CA3AF',
    },
    evidenceContainer: {
        marginTop: 5,
    },
    evidenceImageWrapper: {
        height: 140,
        width: '100%',
        marginVertical: 12,
        borderRadius: 12,
        overflow: 'hidden',
    },
    imagePlaceholder: {
        flex: 1,
        backgroundColor: '#E0F2FE',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    sun: {
        position: 'absolute',
        top: 20,
        right: 40,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FACC15',
    },
    mountainLeft: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: '40%',
        height: 60,
        backgroundColor: '#0EA5E9',
        borderTopRightRadius: 60,
        transform: [{ skewX: '-20deg' }]
    },
    mountainRight: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: '30%',
        height: 80,
        backgroundColor: '#22D3EE',
        borderTopLeftRadius: 80,
        opacity: 0.8,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 10,
    },
    actionButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.button,
    },
    confirmButton: {
        backgroundColor: '#84CC16',
    },
    rejectButton: {
        backgroundColor: '#EF4444',
    },
    buttonText: {
        color: Colors.white,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        fontSize: 13,
    },
    statusMessageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        gap: 8,
    },
    successText: {
        color: '#84CC16',
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        fontSize: 16,
    },
    statusMessageContainerRejected: {
        marginTop: 10,
        backgroundColor: '#FEF2F2',
        padding: 12,
        borderRadius: 15,
    },
    smallRedX: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#EF4444',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    rejectedTitle: {
        color: '#EF4444',
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        fontSize: 14,
    },
    rejectedSubtitle: {
        color: '#EF4444',
        fontFamily: Fonts.figtreeRegular,
        fontSize: 13,
        paddingLeft: 26,
        lineHeight: 18,
    },
    failedActionContainer: {
        alignItems: 'flex-end',
        marginTop: 10,
    },
    assignButton: {
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        ...Shadows.button,
    },
    assignButtonText: {
        color: Colors.white,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        fontSize: 14,
    }
});
