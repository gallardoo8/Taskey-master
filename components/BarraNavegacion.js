import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts } from '../styles/globalStyles';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function BarraNavegacion({ activeTab = 'inicio', userType = 'papa' }) {
    const router = useRouter();

    const handleInicioPress = () => {
        if (activeTab === 'inicio') return;
        const route = userType === 'papa' ? '/principalpapa' : '/perfilhijo';
        router.replace(route);
    };
    const handleNotificacionesPress = () => {
        if (activeTab === 'notificaciones') return;
        const route = userType === 'papa' ? '/notificacionespapa' : '/notificacioneshijo';
        router.replace(route);
    };
    const handlePerfilPress = () => {
        if (activeTab === 'perfil') return;
        const route = userType === 'papa' ? '/perfildepapa' : '/perfilconfighijo';
        router.replace(route);
    };

    return (
        <View style={styles.barraBelow}>
            <TouchableOpacity style={styles.botonTab} onPress={handleInicioPress}>
                <Ionicons
                    name={activeTab === 'inicio' ? "home" : "home-outline"}
                    size={28}
                    color={activeTab === 'inicio' ? Colors.primary : Colors.black}
                />
                <Text style={[styles.textBoton, activeTab === 'inicio' && styles.textActive]}>
                    Inicio
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botonTab} onPress={handleNotificacionesPress}>
                <Ionicons
                    name={activeTab === 'notificaciones' ? "notifications" : "notifications-outline"}
                    size={28}
                    color={activeTab === 'notificaciones' ? Colors.primary : Colors.black}
                />
                <Text style={[styles.textBoton, activeTab === 'notificaciones' && styles.textActive]}>
                    Notificaciones
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botonTab} onPress={handlePerfilPress}>
                <Ionicons
                    name={activeTab === 'perfil' ? "person" : "person-outline"}
                    size={28}
                    color={activeTab === 'perfil' ? Colors.primary : Colors.black}
                />
                <Text style={[styles.textBoton, activeTab === 'perfil' && styles.textActive]}>
                    Perfil
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    barraBelow: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 90,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 20, // To account for safe areas or just modern look
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 10,
        zIndex: 100,
    },
    botonTab: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    textBoton: {
        color: Colors.black,
        fontSize: 14,
        fontFamily: Fonts.figtreebold,
        fontWeight: '600',
        marginTop: 4,
    },
    textActive: {
        color: Colors.primary,
        fontWeight: '700',
    },
});
