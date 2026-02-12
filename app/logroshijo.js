import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BarraNavegacion from "../components/BarraNavegacion";
import { Colors, Fonts, Shadows } from "../styles/globalStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const MIOS_ACHIEVEMENTS = [
    {
        id: '1',
        title: '¡Campeón Olímpico!',
        description: 'Cumplimiento de todo el ejercicio por una semana',
        image: require('../assets/images/capicons.png'),
        titleColor: '#ADD633'
    },
    {
        id: '2',
        title: 'Cerebrito',
        description: 'Cumplimiento de 10 actividades educativas en una semana',
        image: require('../assets/images/capifer.png'),
        titleColor: '#00AEEF'
    },
    {
        id: '3',
        title: '¿Flash?',
        description: 'Cumplimiento de 5 misiones en menos de 2 horas',
        image: require('../assets/images/capiangel.png'),
        titleColor: '#FF8A3D'
    }
];

const POR_CUMPLIR_ACHIEVEMENTS = [
    {
        id: '4',
        title: 'Superhéroe',
        description: 'Cumplimiento con una misión social',
        image: require('../assets/images/capihijo.png'),
        titleColor: '#AAD633'
    }
];

export default function LogrosHijo() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Míos');

    const handleBackPress = () => router.back();

    const currentAchievements = activeTab === 'Míos' ? MIOS_ACHIEVEMENTS : POR_CUMPLIR_ACHIEVEMENTS;

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={28} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Logros</Text>
                </View>

                {/* Tabs */}
                <View style={styles.tabsContainer}>
                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'Míos' ? styles.tabActive : styles.tabInactive]}
                        onPress={() => setActiveTab('Míos')}
                    >
                        <Text style={[styles.tabText, activeTab === 'Míos' ? styles.tabTextActive : styles.tabTextInactive]}>Míos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tab, activeTab === 'Por cumplir' ? styles.tabActive : styles.tabInactive]}
                        onPress={() => setActiveTab('Por cumplir')}
                    >
                        <Text style={[styles.tabText, activeTab === 'Por cumplir' ? styles.tabTextActive : styles.tabTextInactive]}>Por cumplir</Text>
                    </TouchableOpacity>
                </View>

                {/* Achievements Content Container */}
                <View style={[
                    styles.achievementsContainer,
                    activeTab === 'Por cumplir' ? { borderTopLeftRadius: 30 } : { borderTopLeftRadius: 0 }
                ]}>
                    {currentAchievements.map((achievement) => (
                        <View key={achievement.id} style={styles.achievementCard}>
                            <View style={styles.imageWrapper}>
                                <Image
                                    source={achievement.image}
                                    style={styles.achievementImage}
                                    resizeMode="contain"
                                />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={[styles.achievementTitle, { color: achievement.titleColor }]}>
                                    {achievement.title}
                                </Text>
                                <Text style={styles.achievementDescription}>
                                    {achievement.description}
                                </Text>
                            </View>
                        </View>
                    ))}
                    <View style={{ height: 40 }} />
                </View>

                <View style={{ height: 100 }} />
            </ScrollView>

            <BarraNavegacion activeTab="inicio" userType="hijo" />
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
    },
    scrollContent: {
        paddingTop: 60,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    backButton: {
        width: 45,
        height: 45,
        backgroundColor: Colors.white,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        ...Shadows.button,
        shadowOpacity: 0.05,
    },
    headerTitle: {
        fontSize: 34,
        fontFamily: Fonts.figtreebold,
        color: Colors.black,
    },
    tabsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        zIndex: 2,
    },
    tab: {
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        minWidth: 120,
        alignItems: 'center',
    },
    tabActive: {
        backgroundColor: '#581C87', // Morado muy oscuro/potente
    },
    tabInactive: {
        backgroundColor: '#E5E7EB',
    },
    tabText: {
        fontSize: 15,
        fontFamily: Fonts.figtreebold,
    },
    tabTextActive: {
        color: Colors.white,
    },
    tabTextInactive: {
        color: '#581C87',
    },
    achievementsContainer: {
        backgroundColor: '#581C87',
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginHorizontal: 10,
        padding: 20,
        minHeight: SCREEN_HEIGHT * 0.65,
        zIndex: 1,
        ...Shadows.button,
        shadowOpacity: 0.2,
    },
    achievementCard: {
        backgroundColor: Colors.white,
        borderRadius: 24,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        ...Shadows.button,
        shadowOpacity: 0.1,
    },
    imageWrapper: {
        width: 90,
        height: 90,
        borderRadius: 12,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    achievementImage: {
        width: 85,
        height: 85,
    },
    textContainer: {
        flex: 1,
    },
    achievementTitle: {
        fontSize: 22,
        fontFamily: Fonts.figtreebold,
        marginBottom: 6,
        letterSpacing: -0.5,
    },
    achievementDescription: {
        fontSize: 15,
        fontFamily: Fonts.figtreeRegular,
        color: '#374151',
        lineHeight: 20,
    }
});
