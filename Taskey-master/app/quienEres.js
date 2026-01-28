import React from "react";
import {View, Text, Image, TouchableOpacity, StyleSheet, Dimensions} from "react-native";
import {useRouter} from 'expo-router';
import {Colors, Fonts, FontSizes, Spacing, BorderRadius, Shadows} from "../styles/globalStyles";
import BackgroundDecorations from "../components/BackgroundDecorations";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function QuienEres() {
    const router = useRouter();
    
    const handleHijoPress = () => {
        router.push('/loginhijo');
    };
    
    const handlePapaPress = () => {
        router.push('/iniciopapa');
    };
    
    return (
        <View style = {styles.container}>
            {/* Decoraciones de fondo */}
            <BackgroundDecorations />
            
            <Text style = {styles.preguntatext}>
                Este dispositivo{'\n'}pertenece a...
            </Text>

            <Image
            source = {require("../assets/images/TASK_KEY.png")}
            style = {styles.headerimage}
            resizeMode="contain"
            />
            <Image
            source = {require("../assets/images/capillave.png")}
            style = {styles.capillaveImage}
            resizeMode="contain"
            />

            {/*botones*/}
            {/*boton hijo*/}
            <TouchableOpacity style = {[styles.boton, styles.ninoboton]} onPress={handleHijoPress}>
                
                <Image
                source = {require("../assets/images/capihijo.png")}
                style = {styles.botonimagen}
                resizeMode="contain"
                />
                <Text style = {styles.botonText}>
                    Hijo, hija o niñ@
                </Text>
            </TouchableOpacity>

            {/*boton papa*/}
            <TouchableOpacity style = {[styles.boton, styles.adultoboton]} onPress={handlePapaPress}>
                <Image
                source = {require("../assets/images/capipapa.png")}
                style = {styles.botonimagen}
                resizeMode="contain"
                />
                <Text style = {styles.botonText}>
                    Papá, mamá o tutor
                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        position: 'relative',
    },

    capillaveImage: {
        position: 'absolute',
        width: 28,
        height: 28,
        top: SCREEN_HEIGHT * 0.1,
        left: '49%',
        zIndex: 10,
        top: SCREEN_HEIGHT * 0.113,
    },
    preguntatext: {
        position: 'absolute',
        top: SCREEN_HEIGHT * 0.27,
        
        flex: 1,
        alignSelf: "center",
        fontSize: 20,
        color: Colors.black,
        fontWeight: 600,
        fontFamily: Fonts.figtreeSemiBold,
        textAlign: "center",
        zIndex: 10,
    },
    headerimage: {
        position: "absolute",
        width: 180,
        height: 50,
        top: SCREEN_HEIGHT * 0.1,
        alignSelf: 'center',
        zIndex: 10,
    },
    boton: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        height: 125,
        paddingVertical: 20,
        paddingHorizontal: 25,
        borderRadius: 20,
        width: '75%',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        zIndex: 10,
    },
    ninoboton: {
        backgroundColor: Colors.green,
        top: SCREEN_HEIGHT * 0.37,
    },
    adultoboton: {
        backgroundColor: Colors.cyan,
        top: SCREEN_HEIGHT * 0.54,
    },
    botonimagen: {
        width: 70,
        height: 70,
        marginRight: 15,
    },
    botonText: {
        color: Colors.textPrimary,
        fontSize: 21,
        fontWeight: 700,
        flex: 1,
        fontFamily: Fonts.figtreebold,
        textAlign: "center",
    }
})