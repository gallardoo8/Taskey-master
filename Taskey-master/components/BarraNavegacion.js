import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts } from '../styles/globalStyles';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function BarraNavegacion({ activeTab = 'inicio' }) {
    const router = useRouter();

    const handleInicioPress = () => {
        router.push('/principalpapa');
    };

    const handleNotificacionesPress = () => {
        router.push('/notificacionespapa');
    };

    const handlePerfilPress = () => {
        router.push('/perfildepapa');
    };

    return (
        <View style={styles.barraBelow}>
            <TouchableOpacity style={styles.botonInicio} onPress={handleInicioPress}>
                <Image
                    source={require("../assets/images/iniciohome.png")}
                    style={styles.inicioicon}
                    resizeMode="contain"
                />
                <Text style={[styles.textBoton, activeTab === 'inicio' && styles.textActive]}>
                    Inicio
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonNotificaciones} onPress={handleNotificacionesPress}>
                <Image
                    source={require("../assets/images/notis.png")}
                    style={styles.notisicon}
                    resizeMode="contain"
                />
                <Text style={[styles.textBoton, activeTab === 'notificaciones' && styles.textActive]}>
                    Notificaciones
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonPerfil} onPress={handlePerfilPress}>
                <Image
                    source={require("../assets/images/perfiluser.png")}
                    style={styles.perfilicon}
                    resizeMode="contain"
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
        height: SCREEN_HEIGHT * 0.1,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 10,
    },
    botonInicio: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    botonNotificaciones: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    botonPerfil: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    inicioicon: {
        width: 30,
        height: 30,
        marginBottom: 5,
    },
    notisicon: {
        width: 30,
        height: 30,
        marginBottom: 5,
    },
    perfilicon: {
        width: 30,
        height: 30,
        marginBottom: 5,
    },
    textBoton: {
        color: Colors.black,
        fontSize: 12,
        fontFamily: Fonts.figtreeRegular,
    },
    textActive: {
        color: Colors.primary,
        fontWeight: '700',
        fontFamily: Fonts.figtreebold,
    },
});
