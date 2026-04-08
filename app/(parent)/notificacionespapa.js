import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useEffect } from "react";
import { ActivityIndicator, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BarraNavegacion from "../../components/BarraNavegacion";
import { useNotificacionesViewModel } from "../../viewmodels/useNotificacionesViewModel";
import { Colors, Fonts, Shadows } from "../../styles/globalStyles";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Mapeo entre los tipos del backend y los iconos/colores de la UI
const TIPO_CONFIG = {
    TAREA_COMPLETADA: {
        icon: (size) => <FontAwesome5 name="clipboard-check" size={size} color="white" />,
        color: '#F59E0B',
    },
    TAREA_CONFIRMADA: {
        icon: (size) => <Ionicons name="checkmark-circle" size={size} color="white" />,
        color: '#84CC16',
    },
    TAREA_FALLIDA: {
        icon: (size) => <Ionicons name="close" size={size} color="white" />,
        color: '#EF4444',
    },
    TIEMPO_LIMITE: {
        icon: (size) => <MaterialIcons name="timer" size={size} color="#EF4444" />,
        color: '#FCD34D',
    },
    META_SEMANAL: {
        icon: (size) => <FontAwesome5 name="shield-alt" size={size} color="white" />,
        color: '#F59E0B',
    },
};

// Formatea la fecha de la notificación en texto relativo (ej. "Hace 5 min")
function formatearFecha(fechaStr) {
    try {
        const fecha = new Date(fechaStr);
        const ahora = new Date();
        const diffMs = ahora - fecha;
        const diffMin = Math.floor(diffMs / 60000);
        const diffHrs = Math.floor(diffMin / 60);
        const diffDias = Math.floor(diffHrs / 24);

        if (diffMin < 1) return 'Ahora mismo';
        if (diffMin < 60) return `Hace ${diffMin} min`;
        if (diffHrs < 24) return `Hace ${diffHrs} hora${diffHrs > 1 ? 's' : ''}`;
        if (diffDias === 1) return 'Ayer';
        return `Hace ${diffDias} días`;
    } catch {
        return '';
    }
}

export default function NotificacionesPapa() {
    const {
        notificaciones,
        noLeidasCount,
        loading,
        error,
        fetchNotificaciones,
        marcarLeidas,
        marcarTodasLeidas,
    } = useNotificacionesViewModel();

    useEffect(() => {
        fetchNotificaciones();
    }, [fetchNotificaciones]);

    const handleTocarNoti = (item) => {
        if (!item.leida) {
            marcarLeidas([item.id]);
        }
    };

    const renderNotificationCard = ({ item }) => {
        const config = TIPO_CONFIG[item.tipo] || TIPO_CONFIG['TAREA_COMPLETADA'];
        const tiempoStr = formatearFecha(item.fecha_creacion);
        const extraData = item.data_extra || {};

        return (
            <TouchableOpacity
                key={item.id}
                style={[styles.card, !item.leida && styles.cardNoLeida]}
                onPress={() => handleTocarNoti(item)}
                activeOpacity={0.85}
            >
                {/* Indicador de no leída */}
                {!item.leida && <View style={styles.dotNoLeida} />}

                <View style={styles.cardHeader}>
                    {/* Ícono basado en tipo */}
                    <View style={[styles.iconCircle, { backgroundColor: config.color }]}>
                        {config.icon(20)}
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.notificationTitle}>{item.titulo}</Text>
                        <Text style={styles.notificationText}>{item.mensaje}</Text>
                        {extraData.assignment_id && (
                            <Text style={styles.extraText}>ID asignación: {extraData.assignment_id}</Text>
                        )}
                        <Text style={styles.timeText}>{tiempoStr}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const renderHeader = () => (
        <View style={styles.listHeader}>
            {noLeidasCount > 0 && (
                <TouchableOpacity style={styles.marcarTodasBtn} onPress={marcarTodasLeidas}>
                    <Text style={styles.marcarTodasText}>Marcar todas como leídas ({noLeidasCount})</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    const renderEmpty = () => (
        <View style={styles.emptyContainer}>
            <FontAwesome5 name="bell-slash" size={52} color="#D1D5DB" />
            <Text style={styles.emptyText}>No tienes notificaciones</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header decorativo */}
            <View style={styles.header}>
                <View style={[styles.circle, styles.circlePink]} />
                <View style={[styles.circle, styles.circleCyan]} />
                <View style={[styles.circle, styles.circleOrange]} />

                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Notificaciones</Text>
                    <View style={styles.bellBadge}>
                        <FontAwesome5 name="bell" size={24} color="#FACC15" />
                        {noLeidasCount > 0 && (
                            <View style={styles.badgeCount}>
                                <Text style={styles.badgeText}>
                                    {noLeidasCount > 9 ? '9+' : noLeidasCount}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>

            <View style={styles.content}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={Colors.primary} />
                        <Text style={styles.loadingText}>Cargando notificaciones...</Text>
                    </View>
                ) : error ? (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="cloud-offline-outline" size={52} color="#D1D5DB" />
                        <Text style={styles.emptyText}>No se pudieron cargar</Text>
                        <TouchableOpacity style={styles.retryBtn} onPress={fetchNotificaciones}>
                            <Text style={styles.retryText}>Reintentar</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <FlatList
                        data={notificaciones}
                        renderItem={renderNotificationCard}
                        keyExtractor={(item) => item.id}
                        style={styles.list}
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={renderHeader}
                        ListEmptyComponent={renderEmpty}
                        onRefresh={fetchNotificaciones}
                        refreshing={loading}
                    />
                )}
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
    badgeCount: {
        position: 'absolute',
        top: 6,
        right: 6,
        backgroundColor: '#EF4444',
        borderRadius: 8,
        minWidth: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: Colors.white,
    },
    badgeText: {
        color: Colors.white,
        fontSize: 9,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        paddingHorizontal: 2,
    },
    content: {
        flex: 1,
    },
    list: {
        flex: 1,
        marginTop: 10,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    listHeader: {
        marginBottom: 8,
        alignItems: 'flex-end',
    },
    marcarTodasBtn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
    },
    marcarTodasText: {
        fontSize: 13,
        color: Colors.primary,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
        ...Shadows.button,
        shadowOpacity: 0.06,
        elevation: 2,
        position: 'relative',
    },
    cardNoLeida: {
        borderLeftWidth: 4,
        borderLeftColor: Colors.primary,
        backgroundColor: '#F0F7FF',
    },
    dotNoLeida: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 9,
        height: 9,
        borderRadius: 5,
        backgroundColor: Colors.primary,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
        marginTop: 2,
    },
    textContainer: {
        flex: 1,
    },
    notificationTitle: {
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        fontSize: 15,
        color: Colors.black,
        marginBottom: 3,
    },
    notificationText: {
        fontFamily: Fonts.figtreeRegular,
        fontSize: 14,
        color: '#4B5563',
        lineHeight: 20,
        marginBottom: 4,
    },
    extraText: {
        fontFamily: Fonts.figtreeRegular,
        fontSize: 12,
        color: '#9CA3AF',
        marginBottom: 4,
    },
    timeText: {
        fontFamily: Fonts.figtreeRegular,
        fontSize: 12,
        color: '#9CA3AF',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    loadingText: {
        fontFamily: Fonts.figtreeRegular,
        fontSize: 15,
        color: '#9CA3AF',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 14,
        paddingTop: 80,
    },
    emptyText: {
        fontFamily: Fonts.figtreeRegular,
        fontSize: 16,
        color: '#9CA3AF',
    },
    retryBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 20,
    },
    retryText: {
        color: Colors.white,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        fontSize: 14,
    },
});
