import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
        id: '1',
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

export default function NotificacionesPapaTab() {
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
                                <Text style={styles.boldText}>{item.user}</Text> ha marcado &quot;<Text style={styles.boldText}>{item.task}</Text>&quot; como completada
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
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Notificaciones</Text>
                <FontAwesome5 name="bell" size={28} color="#FACC15" style={styles.bellIcon} />
            </View>

            <FlatList
                data={notifications}
                renderItem={({ item }) => renderNotificationCard(item)}
                keyExtractor={(item) => item.id}
                style={styles.contentContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<View style={{ height: 80 }} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6', // Light gray background
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Center title and icon together
        paddingTop: SCREEN_HEIGHT * 0.08,
        paddingBottom: 20,
        backgroundColor: '#F3F4F6',
    },
    headerTitle: {
        fontSize: 28,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        color: Colors.black,
        marginRight: 15,
    },
    bellIcon: {
        transform: [{ rotate: '-15deg' }]
    },
    contentContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
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
    iconContainer: {
        marginRight: 15,
    },
    iconCircle: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    notificationText: {
        fontFamily: Fonts.figtreeRegular,
        fontSize: 16,
        color: Colors.black,
        lineHeight: 22,
        marginBottom: 4,
    },
    boldText: {
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
    },
    timeText: {
        fontFamily: Fonts.figtreeRegular,
        fontSize: 13,
        color: '#9CA3AF',
    },
    evidenceContainer: {
        marginTop: 5,
    },
    evidenceImageWrapper: {
        height: 150,
        width: '80%',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 12,
        overflow: 'hidden',
    },
    imagePlaceholder: {
        flex: 1,
        backgroundColor: '#E0F2FE', // Light blue sky
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    sun: {
        position: 'absolute',
        top: 20,
        right: 40,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#FACC15',
    },
    mountainLeft: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: '40%',
        height: 80,
        backgroundColor: '#0EA5E9', // Blue mountain
        borderTopRightRadius: 80,
        transform: [{ skewX: '-20deg' }]
    },
    mountainRight: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: '30%',
        height: 100,
        backgroundColor: '#22D3EE', // Lighter blue mountain
        borderTopLeftRadius: 100,
        opacity: 0.8,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        gap: 10,
    },
    actionButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.button,
    },
    confirmButton: {
        backgroundColor: '#84CC16', // Lime green
    },
    rejectButton: {
        backgroundColor: '#EF4444', // Red
    },
    buttonText: {
        color: Colors.white,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        fontSize: 12, // Adjusted for space
    },
    statusMessageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
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
        padding: 10,
        borderRadius: 12,
    },
    smallRedX: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#EF4444',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    rejectedTitle: {
        color: '#EF4444',
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        fontSize: 15,
    },
    rejectedSubtitle: {
        color: '#EF4444',
        fontFamily: Fonts.figtreeRegular,
        fontSize: 14,
        paddingLeft: 28, // Indent to align with text
        lineHeight: 20,
    },
    failedActionContainer: {
        alignItems: 'flex-end',
        marginTop: 10,
    },
    assignButton: {
        backgroundColor: '#7E22CE', // Purple
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    assignButtonText: {
        color: Colors.white,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        fontSize: 14,
    }
});
