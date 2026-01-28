import { AntDesign, Entypo, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BarraNavegacion from "../components/BarraNavegacion";
import { Colors, Fonts, Shadows } from "../styles/globalStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const INITIAL_APPS = [
    { id: '1', name: 'YouTube', category: 'Entretenimiento', restricted: true, icon: 'youtube', type: 'FontAwesome5', color: '#FF0000' },
    { id: '2', name: 'Netflix', category: 'Entretenimiento', restricted: true, icon: 'netflix', type: 'MaterialCommunityIcons', color: '#E50914' },
    { id: '3', name: 'TikTok', category: 'Entretenimiento', restricted: true, icon: 'note', type: 'Entypo', color: '#000000' },
    { id: '4', name: 'Disney+', category: 'Entretenimiento', restricted: false, icon: 'play-circle', type: 'MaterialCommunityIcons', color: '#006E99' },
    { id: '5', name: 'HBO Max', category: 'Entretenimiento', restricted: false, icon: 'play-box', type: 'MaterialCommunityIcons', color: '#5821E4' },

    { id: '6', name: 'Instagram', category: 'Redes sociales', restricted: true, icon: 'instagram', type: 'FontAwesome5', color: '#E1306C' },
    { id: '7', name: 'Facebook', category: 'Redes sociales', restricted: false, icon: 'facebook', type: 'FontAwesome5', color: '#4267B2' },

    { id: '8', name: 'Roblox', category: 'Juegos', restricted: true, icon: 'square-rounded', type: 'MaterialCommunityIcons', color: '#3B82F6' },
    { id: '9', name: 'Subway Surfers', category: 'Juegos', restricted: true, icon: 'gamepad-variant', type: 'MaterialCommunityIcons', color: '#F59E0B' },
    { id: '10', name: 'Geometry Dash', category: 'Juegos', restricted: true, icon: 'cube-outline', type: 'MaterialCommunityIcons', color: '#0369A1' },
];

export default function AppsRestringidas() {
    const router = useRouter();
    const [apps, setApps] = useState(INITIAL_APPS);

    const handleBackPress = () => router.back();

    const toggleRestriction = (id) => {
        setApps(prev => prev.map(app =>
            app.id === id ? { ...app, restricted: !app.restricted } : app
        ));
    };

    const renderAppItem = (app) => (
        <View key={app.id} style={styles.appItem}>
            <View style={styles.appInfo}>
                <View style={[styles.iconWrapper, { backgroundColor: app.color }]}>
                    {app.type === 'FontAwesome5' && <FontAwesome5 name={app.icon} size={20} color="white" />}
                    {app.type === 'MaterialCommunityIcons' && <MaterialCommunityIcons name={app.icon} size={20} color="white" />}
                    {app.type === 'Entypo' && <Entypo name={app.icon} size={20} color="white" />}
                </View>
                <Text style={styles.appName}>{app.name}</Text>
            </View>

            <TouchableOpacity
                style={[styles.statusButton, app.restricted ? styles.btnRestricted : styles.btnRestrict]}
                onPress={() => toggleRestriction(app.id)}
            >
                <Text style={styles.btnText}>
                    {app.restricted ? 'Restringida' : 'Restringir'}
                </Text>
            </TouchableOpacity>
        </View>
    );

    const categories = ['Entretenimiento', 'Redes sociales', 'Juegos'];

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={32} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Apps restringidas</Text>
                <View style={styles.lockIconContainer}>
                    <AntDesign name="lock" size={24} color="white" />
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.mainCard}>
                    {categories.map(category => (
                        <View key={category} style={styles.categorySection}>
                            <Text style={styles.categoryTitle}>{category}</Text>
                            {apps.filter(app => app.category === category).map(renderAppItem)}
                        </View>
                    ))}
                </View>
                <View style={{ height: 100 }} />
            </ScrollView>

            <BarraNavegacion activeTab="inicio" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.gray,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: SCREEN_HEIGHT * 0.08,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    backButton: {
        marginRight: 15,
    },
    headerTitle: {
        fontSize: SCREEN_WIDTH * 0.07,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        color: Colors.black,
        flex: 1,
    },
    lockIconContainer: {
        backgroundColor: '#FF0032',
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FACC15',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    mainCard: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        padding: 20,
        ...Shadows.button,
        shadowOpacity: 0.1,
    },
    categorySection: {
        marginBottom: 25,
    },
    categoryTitle: {
        fontSize: 18,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        color: Colors.black,
        marginBottom: 15,
    },
    appItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    appInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    appName: {
        fontSize: 16,
        fontFamily: Fonts.figtreeRegular,
        color: '#4B5563',
    },
    statusButton: {
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 10,
        minWidth: 100,
        alignItems: 'center',
    },
    btnRestricted: {
        backgroundColor: '#FF5E5E',
    },
    btnRestrict: {
        backgroundColor: '#9CA3AF',
    },
    btnText: {
        color: Colors.white,
        fontSize: 12,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
    },
});
