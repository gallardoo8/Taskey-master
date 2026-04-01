import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { obtenerPerfilHijo } from '../../services/api';
import BarraNavegacion from "../../components/BarraNavegacion";
import { Colors, Fonts, Shadows } from "../../styles/globalStyles";

const TUTORIAL_SHOWN_KEY = 'tutorial_shown_hijo';

const TUTORIAL_STEPS = [
    {
        icon: '🎯',
        title: 'Misiones',
        description: 'Aquí encontrarás las tareas que tu papá, mamá o tutor te asignó. ¡Complétalas y gana recompensas!',
        color: '#F97316',
        bg: '#FFF7ED',
    },
    {
        icon: '🎁',
        title: 'Recompensas',
        description: 'Con tus keys puedes canjear recompensas. ¡Completa misiones para ganar más!',
        color: '#DB2777',
        bg: '#FDF2F4',
    },
    {
        icon: '🏆',
        title: 'Logros',
        description: 'Desbloquea logros especiales al completar retos. ¡Colecciónalos todos!',
        color: '#2563EB',
        bg: '#EFF6FF',
    },
    {
        icon: '🔥',
        title: 'Racha',
        description: 'Tu racha muestra cuántos días seguidos has completado tus misiones. ¡No la pierdas!',
        color: '#65A30D',
        bg: '#F7FEE7',
    },
];

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function PerfilHijo() {
    const router = useRouter();
    const [childData, setChildData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rachaModalVisible, setRachaModalVisible] = useState(false);
    const [tutorialVisible, setTutorialVisible] = useState(false);
    const [tutorialStep, setTutorialStep] = useState(0);

    useEffect(() => {
        const cargarPerfil = async () => {
            try {
                // Leer datos guardados en AsyncStorage (cache)
                const cachedData = await AsyncStorage.getItem('child_data');
                if (cachedData) {
                    setChildData(JSON.parse(cachedData));
                }

                // Intentar obtener datos frescos del servidor
                const token = await AsyncStorage.getItem('child_token');
                if (token) {
                    const perfil = await obtenerPerfilHijo(token);
                    setChildData(perfil);
                    // Actualizar cache
                    await AsyncStorage.setItem('child_data', JSON.stringify(perfil));
                }
            } catch (error) {
                // Si falla el API, se queda con los datos del cache
                console.log('Error al cargar perfil:', error.message);
            } finally {
                setLoading(false);
            }
        };

        const verificarTutorial = async () => {
            try {
                const tutorialMostrado = await AsyncStorage.getItem(TUTORIAL_SHOWN_KEY);
                if (!tutorialMostrado) {
                    setTutorialVisible(true);
                }
            } catch (error) {
                console.log('Error al verificar tutorial:', error.message);
            }
        };

        cargarPerfil();
        verificarTutorial();
    }, []);

    const cerrarTutorial = async () => {
        try {
            await AsyncStorage.setItem(TUTORIAL_SHOWN_KEY, 'true');
        } catch (error) {
            console.log('Error al guardar estado del tutorial:', error.message);
        }
        setTutorialVisible(false);
        setTutorialStep(0);
    };

    const siguientePaso = () => {
        if (tutorialStep < TUTORIAL_STEPS.length - 1) {
            setTutorialStep(tutorialStep + 1);
        } else {
            cerrarTutorial();
        }
    };

    const anteriorPaso = () => {
        if (tutorialStep > 0) {
            setTutorialStep(tutorialStep - 1);
        }
    };

    const step = TUTORIAL_STEPS[tutorialStep];

    if (loading && !childData) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#7C3AED" />
                <Text style={{ marginTop: 10, fontFamily: Fonts.figtreeRegular, color: '#6B7280' }}>Cargando perfil...</Text>
            </View>
        );
    }

    const childName = childData?.nombre || 'Hijo';

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                {/* Decorative Circles */}
                <View style={[styles.circle, styles.circleLime]} />
                <View style={[styles.circle, styles.circlePink]} />
                <View style={[styles.circle, styles.circleDarkPurple]} />
                <View style={[styles.circle, styles.circleCyan]} />
                <View style={[styles.circle, styles.circleOrange]} />

                <View style={styles.headerContent}>
                    <View style={styles.profileRow}>
                        <View style={styles.avatarWrapper}>
                            <Image
                                source={require('../../assets/images/capicons.png')}
                                style={styles.avatar}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={styles.nameBadge}>
                            <Text style={styles.nameText}>{childName}</Text>
                        </View>
                    </View>

                    <View style={styles.timeContainer}>
                        <Text style={styles.timeLabel}>1h 20min</Text>
                        <Text style={styles.timeSubtext}>Límite de tiempo</Text>
                    </View>
                </View>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.grid}>
                    {/* Misiones Card */}
                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: '#FFF7ED' }]}
                        onPress={() => router.push('/tareashijo')}
                    >
                        <Text style={[styles.cardTitle, { color: '#EA580C' }]}>Misiones</Text>
                        <Text style={styles.cardSubtitle}>5 pendientes</Text>
                        <View style={[styles.indicator, { backgroundColor: '#F97316' }]} />
                    </TouchableOpacity>

                    {/* Recompensas Card */}
                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: '#FDF2F4' }]}
                        onPress={() => router.push('/recompensashijo')}
                    >
                        <Text style={[styles.cardTitle, { color: '#DB2777' }]}>Recompensas</Text>
                        <Text style={styles.cardSubtitle}>¡Has ganado 2 nuevas recompensas!</Text>
                        <View style={[styles.indicator, { backgroundColor: '#EC4899' }]} />
                    </TouchableOpacity>

                    {/* Logros Card */}
                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: '#EFF6FF' }]}
                        onPress={() => router.push('/logroshijo')}
                    >
                        <Text style={[styles.cardTitle, { color: '#2563EB' }]}>Logros</Text>
                        <Text style={styles.cardSubtitle}>Haz desbloqueado un nuevo logro ¡Felicidades!</Text>
                        <View style={[styles.indicator, { backgroundColor: '#3B82F6' }]} />
                    </TouchableOpacity>

                    {/* Racha Card */}
                    <TouchableOpacity
                        style={[styles.card, { backgroundColor: '#F7FEE7' }]}
                        onPress={() => setRachaModalVisible(true)}
                    >
                        <Text style={[styles.cardTitle, { color: '#65A30D' }]}>Racha</Text>
                        <View style={styles.rachaContainer}>
                            <Image
                                source={require('../../assets/images/tareas.png')}
                                style={styles.rachaImage}
                                resizeMode="contain"
                            />
                            <View>
                                <Text style={styles.rachaCount}>0</Text>
                                <Text style={styles.rachaLabel}>días</Text>
                            </View>
                        </View>
                        <View style={[styles.indicator, { backgroundColor: '#84CC16' }]} />
                    </TouchableOpacity>
                </View>

                <View style={{ height: 120 }} />
            </ScrollView>

            <BarraNavegacion activeTab="inicio" userType="hijo" />

            {/* Modal de Racha */}
            <Modal
                transparent={true}
                visible={rachaModalVisible}
                animationType="fade"
                onRequestClose={() => setRachaModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.rachaModalEmoji}>🔥</Text>
                        <Text style={styles.modalTitle}>¿Qué es la Racha?</Text>
                        <Text style={styles.modalBody}>
                            Tu racha muestra cuántos días seguidos has completado tus misiones.
                            {'\n\n'}
                            ¡Cuantos más días cumplas sin fallar, más larga será tu racha! Mantenerla activa te ayuda a ganar logros especiales.
                        </Text>
                        <TouchableOpacity
                            style={styles.modalCloseButton}
                            onPress={() => setRachaModalVisible(false)}
                        >
                            <Text style={styles.modalCloseText}>¡Entendido!</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal de Tutorial */}
            <Modal
                transparent={true}
                visible={tutorialVisible}
                animationType="fade"
                onRequestClose={cerrarTutorial}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.tutorialContent}>
                        <Text style={styles.tutorialHeaderText}>¡Bienvenido a Taskey! 🎉</Text>
                        <View style={[styles.tutorialStepBox, { backgroundColor: step.bg }]}>
                            <Text style={styles.tutorialIcon}>{step.icon}</Text>
                            <Text style={[styles.tutorialStepTitle, { color: step.color }]}>{step.title}</Text>
                            <Text style={styles.tutorialStepDesc}>{step.description}</Text>
                        </View>
                        <View style={styles.tutorialDots}>
                            {TUTORIAL_STEPS.map((_, i) => (
                                <View
                                    key={i}
                                    style={[
                                        styles.dot,
                                        { backgroundColor: i === tutorialStep ? Colors.primary : '#D1D5DB' },
                                    ]}
                                />
                            ))}
                        </View>
                        <View style={styles.tutorialButtons}>
                            {tutorialStep > 0 && (
                                <TouchableOpacity style={styles.tutorialBackBtn} onPress={anteriorPaso}>
                                    <Ionicons name="chevron-back" size={20} color={Colors.primary} />
                                    <Text style={styles.tutorialBackText}>Anterior</Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity
                                style={[styles.tutorialNextBtn, tutorialStep === 0 && { flex: 1 }]}
                                onPress={siguientePaso}
                            >
                                <Text style={styles.tutorialNextText}>
                                    {tutorialStep < TUTORIAL_STEPS.length - 1 ? 'Siguiente' : '¡Empezar!'}
                                </Text>
                                {tutorialStep < TUTORIAL_STEPS.length - 1 && (
                                    <Ionicons name="chevron-forward" size={20} color={Colors.white} />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4FB', // Gris azulado más limpio
    },
    header: {
        height: SCREEN_HEIGHT * 0.36,
        backgroundColor: '#7C3AED',
        overflow: 'hidden',
        justifyContent: 'center',
        paddingTop: 10,
    },
    circle: {
        position: 'absolute',
        borderRadius: 1000,
    },
    circleLime: {
        width: 140,
        height: 140,
        backgroundColor: '#AAD62D',
        top: -60,
        left: '20%',
        opacity: 0.9,
    },
    circlePink: {
        width: 160,
        height: 160,
        backgroundColor: '#EC4899',
        bottom: 20,
        left: -70,
        opacity: 0.9,
    },
    circleDarkPurple: {
        width: 180,
        height: 180,
        backgroundColor: '#4C1D95',
        top: -50,
        right: -40,
        opacity: 0.7,
    },
    circleCyan: {
        width: 60,
        height: 60,
        backgroundColor: '#06B6D4',
        bottom: 40,
        right: 30,
        opacity: 0.8,
    },
    circleOrange: {
        width: 120,
        height: 120,
        backgroundColor: '#FB923C',
        top: 130,
        right: -50,
        opacity: 0.9,
    },
    headerContent: {
        paddingHorizontal: 25,
        zIndex: 10,
        marginTop: 15,
    },
    profileRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    avatarWrapper: {
        width: 86,
        height: 86,
        borderRadius: 43,
        backgroundColor: '#DDD6FE',
        borderWidth: 4,
        borderColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        ...Shadows.button,
        shadowOpacity: 0.1,
    },
    avatar: {
        width: 65,
        height: 65,
    },
    nameBadge: {
        backgroundColor: Colors.white,
        paddingVertical: 8,
        paddingHorizontal: 35,
        paddingLeft: 45,
        borderRadius: 16,
        marginLeft: -35,
        zIndex: 1,
        ...Shadows.button,
        shadowOpacity: 0.05,
    },
    nameText: {
        fontSize: 28,
        fontFamily: Fonts.figtreebold,
        color: '#6D28D9',
        fontWeight: 'bold',
    },
    timeContainer: {
        alignItems: 'center',
        marginTop: 5,
    },
    timeLabel: {
        fontSize: 42,
        fontFamily: Fonts.figtreebold,
        color: Colors.white,
        letterSpacing: -1,
    },
    timeSubtext: {
        fontSize: 16,
        fontFamily: Fonts.figtreeRegular,
        color: 'rgba(255, 255, 255, 0.9)',
        marginTop: -4,
    },
    content: {
        flex: 1,
        marginTop: -30,
        backgroundColor: '#F3F4F6',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    scrollContent: {
        paddingTop: 30,
        paddingHorizontal: 20,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center', // Centrar las tarjetas
        gap: 15, // Usar Gap para espaciado limpio
    },
    card: {
        width: (SCREEN_WIDTH - 55) / 2, // Cálculo exacto para dos columnas con gap
        borderRadius: 24,
        padding: 18,
        minHeight: 150,
        ...Shadows.button,
        shadowOpacity: 0.06,
        elevation: 3,
        position: 'relative',
        overflow: 'hidden',
    },
    cardTitle: {
        fontSize: 20,
        fontFamily: Fonts.figtreebold,
        marginBottom: 8,
    },
    cardSubtitle: {
        fontSize: 13,
        fontFamily: Fonts.figtreeRegular,
        color: '#4B5563',
        lineHeight: 18,
    },
    indicator: {
        position: 'absolute',
        bottom: 14,
        right: 14,
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    rachaContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    rachaImage: {
        width: 55,
        height: 55,
        marginRight: 8,
        tintColor: '#84CC16',
    },
    rachaCount: {
        fontSize: 24,
        fontFamily: Fonts.figtreebold,
        color: Colors.black,
        textAlign: 'center',
    },
    rachaLabel: {
        fontSize: 13,
        fontFamily: Fonts.figtreeRegular,
        color: Colors.black,
    },
    // Modal de Racha
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: Colors.white,
        width: '85%',
        borderRadius: 28,
        padding: 28,
        alignItems: 'center',
        ...Shadows.button,
    },
    rachaModalEmoji: {
        fontSize: 52,
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 22,
        fontFamily: Fonts.figtreebold,
        color: Colors.black,
        marginBottom: 14,
        textAlign: 'center',
    },
    modalBody: {
        fontSize: 15,
        fontFamily: Fonts.figtreeRegular,
        color: '#4B5563',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24,
    },
    modalCloseButton: {
        backgroundColor: '#65A30D',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 40,
        ...Shadows.button,
        shadowOpacity: 0.1,
    },
    modalCloseText: {
        color: Colors.white,
        fontFamily: Fonts.figtreebold,
        fontSize: 16,
    },
    // Modal de Tutorial
    tutorialContent: {
        backgroundColor: Colors.white,
        width: '88%',
        borderRadius: 28,
        padding: 24,
        alignItems: 'center',
        ...Shadows.button,
    },
    tutorialHeaderText: {
        fontSize: 20,
        fontFamily: Fonts.figtreebold,
        color: Colors.black,
        marginBottom: 18,
        textAlign: 'center',
    },
    tutorialStepBox: {
        width: '100%',
        borderRadius: 20,
        padding: 22,
        alignItems: 'center',
        marginBottom: 18,
    },
    tutorialIcon: {
        fontSize: 48,
        marginBottom: 10,
    },
    tutorialStepTitle: {
        fontSize: 22,
        fontFamily: Fonts.figtreebold,
        marginBottom: 8,
        textAlign: 'center',
    },
    tutorialStepDesc: {
        fontSize: 14,
        fontFamily: Fonts.figtreeRegular,
        color: '#4B5563',
        textAlign: 'center',
        lineHeight: 20,
    },
    tutorialDots: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 20,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    tutorialButtons: {
        flexDirection: 'row',
        width: '100%',
        gap: 10,
    },
    tutorialBackBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: Colors.primary,
        borderRadius: 18,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    tutorialBackText: {
        color: Colors.primary,
        fontFamily: Fonts.figtreebold,
        fontSize: 15,
        marginLeft: 4,
    },
    tutorialNextBtn: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        borderRadius: 18,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    tutorialNextText: {
        color: Colors.white,
        fontFamily: Fonts.figtreebold,
        fontSize: 15,
    },
});
