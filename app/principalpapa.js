import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BarraNavegacion from "../components/BarraNavegacion";
import { Colors, Fonts, Shadows } from "../styles/globalStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function PrincipalPapa() {
    const router = useRouter();

    const handleAdminPerfilesPress = () => {
        router.push('/administrarperfiles');
    };
    const handleAdminTareasPress = () => {
        router.push('/admintareas');
    };
    const handleBotonPerfilPress = (name, avatar) => {
        router.push({
            pathname: '/perfildehijo',
            params: { name, avatar }
        });
    };

    return (
        <View style={styles.container}>
            {/* Header Section with Decorative Circles */}
            <View style={styles.header}>
                <View style={[styles.circle, styles.circlePink]} />
                <View style={[styles.circle, styles.circleCyan]} />
                <View style={[styles.circle, styles.circleOrange]} />

                <View style={styles.headerContent}>
                    <Image
                        source={require("../assets/images/TASK_KEY.png")}
                        style={styles.logo}
                        tintColor="white"
                        resizeMode="contain"
                    />

                    <View style={styles.welcomeRow}>
                        <View style={styles.welcomeTextColumn}>
                            <Text style={styles.welcomeText}>¡Hola,</Text>
                            <Text style={styles.userNameText}>Gaby Pacheco!</Text>
                        </View>
                        <View style={styles.parentAvatarWrapper}>
                            <Image
                                source={require("../assets/images/capinombre.png")}
                                style={styles.parentAvatar}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.content}>
                {/* Admin Quick Actions */}
                <View style={styles.quickActions}>
                    <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#FF824C' }]} onPress={handleAdminTareasPress}>
                        <View style={styles.actionIconContainer}>
                            <Image source={require("../assets/images/tareas.png")} style={styles.actionIcon} resizeMode="contain" />
                        </View>
                        <Text style={styles.actionText}>Administrar{"\n"}<Text style={styles.actionBold}>Tareas</Text></Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#00AEEB' }]} onPress={handleAdminPerfilesPress}>
                        <View style={styles.actionIconContainer}>
                            <Image source={require("../assets/images/ninos.png")} style={styles.actionIcon} resizeMode="contain" />
                        </View>
                        <Text style={styles.actionText}>Administrar{"\n"}<Text style={styles.actionBold}>Perfiles</Text></Text>
                    </TouchableOpacity>
                </View>

                {/* Profiles Section */}
                <View style={styles.profilesSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Perfiles</Text>
                        <TouchableOpacity onPress={handleAdminPerfilesPress}>
                            <Text style={styles.seeAllText}>Ver todos</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.profilesList}>
                        {/* Profile Cons */}
                        <TouchableOpacity
                            style={styles.profileCard}
                            onPress={() => handleBotonPerfilPress('Cons', require("../assets/images/capicons.png"))}
                        >
                            <View style={[styles.avatarCircle, { backgroundColor: '#DDD6FE' }]}>
                                <Image
                                    source={require("../assets/images/capicons.png")}
                                    style={styles.profileAvatar}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={styles.profileName}>Cons</Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
                        </TouchableOpacity>

                        {/* Profile Angel */}
                        <TouchableOpacity
                            style={styles.profileCard}
                            onPress={() => handleBotonPerfilPress('Angel', require("../assets/images/capiangel.png"))}
                        >
                            <View style={[styles.avatarCircle, { backgroundColor: '#FEF3C7' }]}>
                                <Image
                                    source={require("../assets/images/capiangel.png")}
                                    style={styles.profileAvatar}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={styles.profileName}>Angel</Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
                        </TouchableOpacity>

                        {/* Profile Fer */}
                        <TouchableOpacity
                            style={styles.profileCard}
                            onPress={() => handleBotonPerfilPress('Fer', require("../assets/images/capifer.png"))}
                        >
                            <View style={[styles.avatarCircle, { backgroundColor: '#DCFCE7' }]}>
                                <Image
                                    source={require("../assets/images/capifer.png")}
                                    style={styles.profileAvatar}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={styles.profileName}>Fer</Text>
                            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ height: 100 }} />
            </View>

            <BarraNavegacion activeTab="inicio" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    header: {
        height: SCREEN_HEIGHT * 0.32,
        backgroundColor: Colors.primary,
        overflow: 'hidden',
        justifyContent: 'center',
        paddingTop: 20,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        ...Shadows.button,
    },
    circle: {
        position: 'absolute',
        borderRadius: 1000,
    },
    circlePink: {
        width: 140,
        height: 140,
        backgroundColor: Colors.pink,
        top: -40,
        left: -40,
        opacity: 0.6,
    },
    circleCyan: {
        width: 100,
        height: 100,
        backgroundColor: '#06B6D4',
        bottom: -20,
        right: 40,
        opacity: 0.6,
    },
    circleOrange: {
        width: 60,
        height: 60,
        backgroundColor: '#F59E0B',
        top: 40,
        right: -10,
        opacity: 0.6,
    },
    headerContent: {
        paddingHorizontal: 25,
        zIndex: 10,
    },
    logo: {
        width: 150,
        height: 40,
        alignSelf: 'center',
        marginBottom: 20,
    },
    welcomeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    welcomeTextColumn: {
        flex: 1,
    },
    welcomeText: {
        fontSize: 22,
        fontFamily: Fonts.figtreeRegular,
        color: Colors.white,
        opacity: 0.9,
    },
    userNameText: {
        fontSize: 28,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        color: Colors.white,
    },
    parentAvatarWrapper: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderWidth: 2,
        borderColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    parentAvatar: {
        width: 50,
        height: 50,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 25,
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    actionCard: {
        width: (SCREEN_WIDTH - 55) / 2,
        height: 120,
        borderRadius: 24,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.button,
        elevation: 4,
    },
    actionIconContainer: {
        width: 45,
        height: 45,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    actionIcon: {
        width: 28,
        height: 28,
        tintColor: Colors.white,
    },
    actionText: {
        color: Colors.white,
        fontSize: 14,
        fontFamily: Fonts.figtreeRegular,
        textAlign: 'center',
    },
    actionBold: {
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        fontSize: 16,
    },
    profilesSection: {
        flex: 1,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 22,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        color: Colors.black,
    },
    seeAllText: {
        fontSize: 14,
        fontFamily: Fonts.figtreebold,
        color: Colors.primary,
        fontWeight: 'bold',
    },
    profilesList: {
        gap: 12,
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        padding: 12,
        borderRadius: 20,
        ...Shadows.button,
        shadowOpacity: 0.05,
        elevation: 2,
    },
    avatarCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    profileAvatar: {
        width: 35,
        height: 35,
    },
    profileName: {
        flex: 1,
        fontSize: 18,
        fontFamily: Fonts.figtreebold,
        fontWeight: 'bold',
        color: Colors.black,
    }
});