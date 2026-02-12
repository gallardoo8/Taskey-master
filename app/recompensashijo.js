import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BarraNavegacion from "../components/BarraNavegacion";
import { Colors, Fonts, Shadows } from "../styles/globalStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const DUMMY_REWARDS = [
    {
        id: '1',
        title: 'Tender cama',
        keys: '+35',
        minutes: '+25 minutos',
        timeAgo: 'Hace 45 minutos',
        color: '#FF8A3D'
    },
    {
        id: '2',
        title: 'Hacer ejercicio',
        keys: '+35',
        minutes: '+25 minutos',
        timeAgo: 'Hace 45 minutos',
        color: '#00AEEF'
    },
    {
        id: '3',
        title: 'Tarea de Español',
        keys: '+20',
        minutes: '+15 minutos',
        timeAgo: 'Hace 1 hora',
        color: '#ADD633'
    },
    {
        id: '4',
        title: 'Tarea de Matemáticas',
        keys: '+20',
        minutes: '+10 minutos',
        timeAgo: 'Hace 2 horas',
        color: '#FF009B'
    }
];

export default function RecompensasHijo() {
    const router = useRouter();
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(() => {
        // Mostrar la alerta al entrar
        const timer = setTimeout(() => {
            setIsPopupVisible(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const handleBackPress = () => router.back();

    return (
        <View style={styles.container}>
            {/* Header Decorativo */}
            <View style={styles.headerDecor}>
                <View style={[styles.circle, styles.circlePink]} />
                <View style={[styles.circle, styles.circleCyan]} />
                <View style={[styles.circle, styles.circleGreen]} />
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.titleRow}>
                    <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={32} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Recompensas</Text>
                </View>

                {/* Summary Row */}
                <View style={styles.summaryRow}>
                    <View style={styles.summaryBoxTime}>
                        <View style={styles.iconCircleTime}>
                            <Ionicons name="time" size={24} color="#00AEEF" />
                            <View style={styles.checkMini}>
                                <Ionicons name="checkmark" size={10} color="white" />
                            </View>
                        </View>
                        <Text style={styles.summaryTextTime}>50 min</Text>
                    </View>

                    <View style={styles.summaryBoxKeys}>
                        <Image
                            source={require('../assets/images/capillave.png')}
                            style={styles.keyIconSummary}
                            resizeMode="contain"
                        />
                        <Text style={styles.summaryTextKeys}>160</Text>
                    </View>
                </View>

                {/* Rewards List */}
                <View style={styles.rewardList}>
                    {DUMMY_REWARDS.map((reward) => (
                        <View key={reward.id} style={styles.rewardCard}>
                            <Text style={[styles.rewardTitle, { color: reward.color }]}>{reward.title}</Text>

                            <View style={styles.rewardDetails}>
                                <View style={styles.detailItem}>
                                    <Image
                                        source={require('../assets/images/capillave.png')}
                                        style={styles.detailIcon}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.detailText}>{reward.keys}</Text>
                                </View>

                                <View style={styles.detailItem}>
                                    <View style={styles.iconCircleTimeSmall}>
                                        <Ionicons name="time" size={16} color="#00AEEF" />
                                        <View style={styles.checkMiniSmall}>
                                            <Ionicons name="checkmark" size={6} color="white" />
                                        </View>
                                    </View>
                                    <Text style={styles.detailText}>{reward.minutes}</Text>
                                </View>
                            </View>

                            <Text style={styles.timeAgoText}>{reward.timeAgo}</Text>
                        </View>
                    ))}
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Modal de ¡Felicidades! */}
            <Modal
                transparent={true}
                visible={isPopupVisible}
                animationType="fade"
                onRequestClose={() => setIsPopupVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Image
                            source={require('../assets/images/capicons.png')}
                            style={styles.congratsImage}
                            resizeMode="contain"
                        />
                        <Text style={styles.congratsTitle}>¡Felicidades!</Text>

                        <View style={styles.popupRewardRow}>
                            <View style={[styles.rewardStrip, { backgroundColor: '#4C1D95' }]}>
                                <Text style={styles.rewardStripText}>+20 Keys</Text>
                                <Image
                                    source={require('../assets/images/capillave.png')}
                                    style={styles.keyIconPopup}
                                    resizeMode="contain"
                                />
                            </View>

                            <View style={[styles.rewardStrip, { backgroundColor: '#7E22CE' }]}>
                                <Text style={styles.rewardStripText}>+30 Minutos</Text>
                                <View style={styles.iconCircleTimePopup}>
                                    <Ionicons name="time" size={24} color="#00AEEF" />
                                    <View style={styles.checkMiniPopup}>
                                        <Ionicons name="checkmark" size={12} color="white" />
                                    </View>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.acceptButton}
                            onPress={() => setIsPopupVisible(false)}
                        >
                            <Text style={styles.acceptButtonText}>Aceptar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <BarraNavegacion activeTab="inicio" userType="hijo" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    headerDecor: {
        height: SCREEN_HEIGHT * 0.15,
        backgroundColor: Colors.primary,
        overflow: 'hidden',
    },
    circle: {
        position: 'absolute',
        borderRadius: 1000,
    },
    circlePink: {
        width: 80,
        height: 80,
        backgroundColor: '#FF009B',
        top: 20,
        left: -30,
    },
    circleCyan: {
        width: 50,
        height: 50,
        backgroundColor: '#00AEEF',
        top: 50,
        left: 150,
    },
    circleGreen: {
        width: 70,
        height: 70,
        backgroundColor: '#ADD633',
        bottom: -20,
        right: 80,
    },
    content: {
        flex: 1,
        marginTop: -40,
        backgroundColor: Colors.white,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 20,
    },
    scrollContent: {
        paddingTop: 30,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    backButton: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 38,
        fontFamily: Fonts.figtreebold,
        color: Colors.black,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    summaryBoxTime: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00AEEF',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        width: '48%',
        ...Shadows.button,
    },
    summaryBoxKeys: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEF9C3',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        width: '48%',
        ...Shadows.button,
    },
    iconCircleTime: {
        backgroundColor: Colors.white,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        position: 'relative',
    },
    checkMini: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        backgroundColor: '#ADD633',
        width: 16,
        height: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.white,
    },
    summaryTextTime: {
        color: Colors.white,
        fontSize: 18,
        fontFamily: Fonts.figtreebold,
    },
    keyIconSummary: {
        width: 36,
        height: 36,
        marginRight: 10,
    },
    summaryTextKeys: {
        color: '#E67E22',
        fontSize: 18,
        fontFamily: Fonts.figtreebold,
    },
    rewardList: {
        gap: 15,
    },
    rewardCard: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        padding: 20,
        ...Shadows.button,
        shadowOpacity: 0.1,
    },
    rewardTitle: {
        fontSize: 20,
        fontFamily: Fonts.figtreebold,
        marginBottom: 15,
    },
    rewardDetails: {
        flexDirection: 'row',
        gap: 25,
        marginBottom: 15,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    detailText: {
        fontSize: 18,
        fontFamily: Fonts.figtreebold,
        color: Colors.black,
    },
    iconCircleTimeSmall: {
        backgroundColor: '#F3F4F6',
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        position: 'relative',
    },
    checkMiniSmall: {
        position: 'absolute',
        bottom: -1,
        right: -1,
        backgroundColor: '#ADD633',
        width: 10,
        height: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeAgoText: {
        fontSize: 14,
        fontFamily: Fonts.figtreeRegular,
        color: '#9CA3AF',
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: Colors.white,
        width: '85%',
        borderRadius: 40,
        padding: 30,
        alignItems: 'center',
        ...Shadows.button,
    },
    congratsImage: {
        width: 150,
        height: 150,
        marginBottom: 10,
    },
    congratsTitle: {
        fontSize: 32,
        fontFamily: Fonts.figtreebold,
        color: '#7E22CE',
        marginBottom: 25,
    },
    popupRewardRow: {
        width: '100%',
        gap: 15,
        marginBottom: 30,
    },
    rewardStrip: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 30,
        width: '100%',
        height: 80,
    },
    rewardStripText: {
        color: Colors.white,
        fontSize: 32,
        fontFamily: Fonts.figtreebold,
    },
    keyIconPopup: {
        width: 50,
        height: 50,
    },
    iconCircleTimePopup: {
        backgroundColor: Colors.white,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    checkMiniPopup: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        backgroundColor: '#ADD633',
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.white,
    },
    acceptButton: {
        backgroundColor: '#ADD633',
        paddingVertical: 15,
        paddingHorizontal: 60,
        borderRadius: 30,
        ...Shadows.button,
    },
    acceptButtonText: {
        color: Colors.white,
        fontSize: 22,
        fontFamily: Fonts.figtreebold,
    }
});
