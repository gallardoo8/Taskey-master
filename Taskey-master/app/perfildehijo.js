import React from "react";
import {View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, TextInput} from "react-native";
import {useRouter} from 'expo-router';
import {Colors, Fonts, FontSizes, Spacing, BorderRadius, Shadows} from "../styles/globalStyles";
import BackgroundDecorations from "../components/BackgroundDecorations";
import BarraNavegacion from "../components/BarraNavegacion";

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function Perfildehijo() {
    const router = useRouter();

    const handleMisionesPress = () => {
        router.push('/misiones');
    };
    const handleRecompensasPress = () => {
        router.push('/recompensas');
    };
    const handleLogrosPress = () => {
        router.push('/Logros');
    };

    return(
        <View style={styles.container}>
            {/* header */}
            <View style={[styles.circle, styles.circleProfile]} />
            <View style={[styles.circle, styles.circlePinkTop]} />
            <View style={[styles.circle, styles.circlePurpleTop]} />
            <View style={[styles.circle, styles.circleCyanTop]} />

            <View style={[styles.rectangulo, styles.rectmorado]} />
            <View style={[styles.rectangulo, styles.rectnombre]} />
            <Text style = {styles.nombrehijo}>Angel</Text>
            <Image
            source = {require("../assets/images/Union (1).png")}
            style = {styles.imagenhijo}
            resizeMode="contain"
            />

            <Text style = {styles.tiempo}>1h 20min</Text>
            <Text style = {styles.tiempolimite}>Limite de tiempo</Text>
            
            {/* botones */}
            {/* misiones */}
            <TouchableOpacity style = {[styles.boton, styles.misionesboton]} onPress={handleMisionesPress}>
                <Text style = {styles.textoBotonMisiones}>Misiones</Text>
            </TouchableOpacity>

            
            {/* recompensas */}
            <TouchableOpacity style = {[styles.boton, styles.recompensasboton]} onPress={handleRecompensasPress}>
                <Text style = {styles.textoBotonRecompensas}>Recompensas</Text>
            </TouchableOpacity>
            
            
            {/* logros */}
            <TouchableOpacity style = {[styles.boton, styles.logrosboton]} onPress={handleLogrosPress}>
                <Text style = {styles.textoBotonLogros}>Logros</Text>
            </TouchableOpacity>

            
            {/* racha */}
            <TouchableOpacity style = {[styles.boton, styles.rachaboton]}>
                <Text style = {styles.textoBotonRacha}>Racha</Text>
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
    circle: {
        position: 'absolute',
        borderRadius: 70,
        zIndex: 1,
    },
    circleProfile: {
        backgroundColor: Colors.lila,
        width: SCREEN_WIDTH * 0.29,
        height: SCREEN_HEIGHT * 0.13,
        bottom: SCREEN_HEIGHT * 0.75,
        left: SCREEN_WIDTH * 0.07,
        zIndex: 5,
    },
    circlePinkTop: {
        backgroundColor: Colors.pink,
        width: SCREEN_WIDTH * 0.37,
        height: SCREEN_WIDTH * 0.37,
        borderRadius: (SCREEN_WIDTH * 0.37) / 2,
        top: SCREEN_HEIGHT * 0.185,
        left: -SCREEN_WIDTH * 0.1,
    },
    circlePurpleTop: {
        backgroundColor: Colors.primaryDark,
        width: SCREEN_WIDTH * 0.52,
        height: SCREEN_WIDTH * 0.52,
        borderRadius: (SCREEN_WIDTH * 0.52) / 2,
        top: -SCREEN_HEIGHT * 0.05,
        right: -SCREEN_WIDTH * 0.2,
        zIndex: 3,
    },
    circleCyanTop: {
        backgroundColor: Colors.cyan,
        width: SCREEN_WIDTH * 0.12,
        height: SCREEN_HEIGHT * 0.055,
        top: SCREEN_HEIGHT * 0.3,
        right: SCREEN_WIDTH * 0.07,
    },
    rectangulo: {
        position: 'absolute',
        alignItems: 'center',
    },
    rectnombre: {
        bottom: SCREEN_HEIGHT * 0.77,
        width: SCREEN_WIDTH * 0.80,
        height: SCREEN_HEIGHT * 0.09,
        left: SCREEN_WIDTH * 0.12,
        borderRadius: 16,
        backgroundColor: Colors.white,
        zIndex: 4,
    },
    rectmorado: {
        position: 'absolute',
        width: "100%",
        height: SCREEN_HEIGHT * 0.37,
        top: 0,
        backgroundColor: Colors.primary,
        zIndex: 0,
        borderRadius: 0,
    },
    nombrehijo:{
        position: 'absolute',
        bottom: SCREEN_HEIGHT * 0.79,
        left: SCREEN_WIDTH * 0.45,
        fontSize: 38,
        
        color: Colors.primaryDark,
        zIndex: 7,
    },
    imagenhijo:{
        position: 'absolute',
        bottom: SCREEN_HEIGHT * 0.75,
        left: SCREEN_WIDTH * 0.07,
        width: SCREEN_WIDTH * 0.29,
        height: SCREEN_HEIGHT * 0.13,
        borderRadius: 70,
        overflow: 'hidden',
        zIndex: 8,
    },
    tiempo:{
        position: 'absolute',
        bottom: SCREEN_HEIGHT * 0.65,
        alignSelf: 'center',
        fontSize: 38,
        
        color: Colors.white ,
        zIndex: 2,
    },
    tiempolimite:{
        position: 'absolute',
        bottom: SCREEN_HEIGHT * 0.6,
        alignSelf: 'center',
        fontSize: 15,
       
        color: Colors.white ,
        zIndex: 2,
    },

    boton: {
        position: 'absolute',
        borderRadius: 12,
        elevation: 10,
        width: SCREEN_WIDTH * 0.43,
        height: SCREEN_HEIGHT * 0.15,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        
    },

    textoBotonMisiones:{
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.white,
        zIndex: 10,
    },
    textoBotonRecompensas:{
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.white,
    },
    textoBotonLogros:{
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.white,
    },
    textoBotonRacha:{
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.white,
    },

    misionesboton:{
        backgroundColor: Colors.naranja,
        top: SCREEN_HEIGHT * 0.42,
        left: SCREEN_WIDTH * 0.05,
    },
    logrosboton:{
        backgroundColor: Colors.azul,
        top: SCREEN_HEIGHT * 0.42,
        right: SCREEN_WIDTH * 0.05,
    },
    recompensasboton:{
        backgroundColor: Colors.pink,
        top: SCREEN_HEIGHT * 0.59,
        left: SCREEN_WIDTH * 0.05,
    },
    rachaboton:{
        backgroundColor: Colors.green,
        top: SCREEN_HEIGHT * 0.59,
        right: SCREEN_WIDTH * 0.05,
    }
})