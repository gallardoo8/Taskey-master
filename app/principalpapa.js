import { useRouter } from 'expo-router';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BarraNavegacion from "../components/BarraNavegacion";
import { Colors, Fonts } from "../styles/globalStyles";

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
            <Image
                source={require("../assets/images/TKFNegro.png")}
                style={styles.headerimage}
                resizeMode="contain"
            />
            {/* nombre papa */}
            <View style={[styles.rectangulo, styles.rectNombre]}>
                <Image
                    source={require("../assets/images/capinombre.png")}
                    style={styles.imagenpapa}
                    resizeMode="contain"
                />
                <Text style={styles.nombrepapa}>Gaby Pacheco</Text>
            </View>
            <Text style={styles.welcome}>Bienvenid@!</Text>
            {/* botones de administrar perfiles y tareas */}
            <TouchableOpacity style={[styles.boton, styles.adminTareasBoton]} onPress={handleAdminTareasPress}>
                <Image
                    source={require("../assets/images/tareas.png")}
                    style={styles.imagentarea}
                    resizeMode="contain"
                />
                <Text style={styles.tarea}>Administrar <Text style={styles.highlightTareas}>Tareas</Text></Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.boton, styles.adminPerfilesBoton]} onPress={handleAdminPerfilesPress}>
                <Image
                    source={require("../assets/images/ninos.png")}
                    style={styles.imagenpefiles}
                    resizeMode="contain"
                />
                <Text style={styles.tarea}>Administrar <Text style={styles.highlightTareas}>Perfiles</Text></Text>
            </TouchableOpacity>

            <Text style={styles.perfiles}>Perfiles</Text>
            {/* perfil cons */}
            <TouchableOpacity
                style={[styles.botonPerfiles, styles.botoncons]}
                onPress={() => handleBotonPerfilPress('Cons', require("../assets/images/capicons.png"))}
            >
                <Image
                    source={require("../assets/images/capicons.png")}
                    style={styles.imagenperfilcons}
                    resizeMode="contain"
                />
                <Text style={styles.textcons}>Cons</Text>
                <Image
                    source={require("../assets/images/arrow.png")}
                    style={styles.arrow1}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            {/* perfil angel */}
            <TouchableOpacity
                style={[styles.botonPerfiles, styles.botonangel]}
                onPress={() => handleBotonPerfilPress('Angel', require("../assets/images/capiangel.png"))}
            >
                <Image
                    source={require("../assets/images/capiangel.png")}
                    style={styles.imagenperfilangel}
                    resizeMode="contain"
                />
                <Text style={styles.textcons}>Angel</Text>
                <Image
                    source={require("../assets/images/arrow.png")}
                    style={styles.arrow2}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            {/* perfil fer */}
            <TouchableOpacity
                style={[styles.botonPerfiles, styles.botonfer]}
                onPress={() => handleBotonPerfilPress('Fer', require("../assets/images/capifer.png"))}
            >
                <Image
                    source={require("../assets/images/capifer.png")}
                    style={styles.imagenperfilfer}
                    resizeMode="contain"
                />
                <Text style={styles.textcons}>Fer</Text>
                <Image
                    source={require("../assets/images/arrow.png")}
                    style={styles.arrow3}
                    resizeMode="contain"
                />
            </TouchableOpacity>

            {/* barra de navegación inferior */}
            <BarraNavegacion activeTab="inicio" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.gray,
        position: 'relative',
    },

    headerimage: {
        top: SCREEN_HEIGHT * 0.07,
        left: SCREEN_WIDTH * 0.25,
        width: SCREEN_WIDTH * 0.5,
        height: SCREEN_HEIGHT * 0.04,
    },

    rectangulo: {

        alignItems: 'center',
        justifyContent: 'center',
    },

    rectNombre: {
        top: SCREEN_HEIGHT * 0.08,
        width: SCREEN_WIDTH * 0.9,
        height: SCREEN_HEIGHT * 0.085,
        left: SCREEN_WIDTH * 0.05,
        borderRadius: 20,
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    nombrepapa: {
        color: Colors.white,
        fontSize: 24,
        fontWeight: '700',
        fontFamily: Fonts.figtreebold,
        marginLeft: 15,
    },

    imagenpapa: {
        width: SCREEN_WIDTH * 0.15,
        height: SCREEN_HEIGHT * 0.06,
    },
    welcome: {
        color: Colors.black,
        fontSize: 27,
        fontWeight: '700',
        fontFamily: Fonts.figtreebold,
        left: SCREEN_WIDTH * 0.05,
        top: SCREEN_HEIGHT * 0.11,
    },
    boton: {
        position: 'absolute',
        width: SCREEN_WIDTH * 0.43,
        height: SCREEN_WIDTH * 0.35,
        backgroundColor: Colors.white,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    adminTareasBoton: {
        top: SCREEN_HEIGHT * 0.3,
        left: SCREEN_WIDTH * 0.05,
        backgroundColor: '#FF824C',
    },
    adminPerfilesBoton: {
        top: SCREEN_HEIGHT * 0.3,
        right: SCREEN_WIDTH * 0.05,
        backgroundColor: '#00AEEB',
    },
    imagentarea: {
        width: SCREEN_WIDTH * 0.15,
        height: SCREEN_WIDTH * 0.15,
        marginBottom: 10,
    },
    imagenpefiles: {
        width: SCREEN_WIDTH * 0.15,
        height: SCREEN_WIDTH * 0.15,
        marginBottom: 10,
    },
    tarea: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '600',
        fontFamily: Fonts.figtreeSemiBold,
        textAlign: 'center',
    },
    highlightTareas: {
        backgroundColor: Colors.pink,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    perfiles: {
        position: 'absolute',
        color: Colors.black,
        fontSize: 25,
        fontWeight: '700',
        fontFamily: Fonts.figtreebold,
        top: SCREEN_HEIGHT * 0.49,
        left: SCREEN_WIDTH * 0.05,
    },
    botonPerfiles: {
        position: 'absolute',
        width: SCREEN_WIDTH * 0.9,
        height: SCREEN_HEIGHT * 0.065,
        backgroundColor: Colors.white,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    botoncons: {
        top: SCREEN_HEIGHT * 0.55,
        left: SCREEN_WIDTH * 0.05,
    },
    botonangel: {
        top: SCREEN_HEIGHT * 0.625,
        left: SCREEN_WIDTH * 0.05,
    },
    botonfer: {
        top: SCREEN_HEIGHT * 0.7,
        left: SCREEN_WIDTH * 0.05,
    },
    imagenperfilcons: {
        width: 50,
        height: 50,
        marginRight: 15,
    },
    imagenperfilangel: {
        width: 50,
        height: 50,
        marginRight: 15,
    },
    imagenperfilfer: {
        width: 50,
        height: 50,
        marginRight: 15,
    },
    textcons: {
        color: Colors.black,
        fontSize: 20,
        fontWeight: '600',
        fontFamily: Fonts.figtreeSemiBold,
        flex: 1,
    },
    arrow1: {
        width: 20,
        height: 20,
    },
    arrow2: {
        width: 20,
        height: 20,
    },
    arrow3: {
        width: 20,
        height: 20,
    },
})