import React from "react";
import {View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, TextInput} from "react-native";
import {useRouter} from 'expo-router';
import {Colors, Fonts, FontSizes, Spacing, BorderRadius, Shadows} from "../styles/globalStyles";
import BackgroundDecorations from "../components/BackgroundDecorations";

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function LoginHijo() {
    const router = useRouter();
    
    const handlePerfilDeHijoPress = () => {
        router.push('/perfildehijo');
    };
    
    return (
        <View style = {styles.container}>
            <Text style = {styles.header}>Iniciar Sesión</Text>
            <Text style = {styles.texto}>Ingresa el código proporcionado en la cuenta de tu madre, padre o tutor</Text>

            <View style = {styles.cardContainer}>
            <TextInput
                style = {styles.input}
                placeholder = "Usuario"
                placeholderTextColor = {Colors.darkgraytext}
            />

            <TextInput
                style = {styles.input}
                placeholder = "Código"
                placeholderTextColor = {Colors.darkgraytext}
            />

            <TouchableOpacity style = {styles.button} onPress={handlePerfilDeHijoPress}>
                <Text style = {styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.gray,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        width: SCREEN_WIDTH * 0.8,
        fontSize: 38,
        fontWeight: 'figtreebold',
        fontFamily: Fonts.figtreebold,
        textAlign: 'center',
        marginBottom: SCREEN_HEIGHT * 0.01,
    },
    texto: {
        width: SCREEN_WIDTH * 0.72,
        fontSize: 18,
        textAlign: 'center',
        fontFamily: Fonts.figtree,
        marginTop: SCREEN_HEIGHT * 0.02,
        marginBottom: SCREEN_HEIGHT * 0.03,
        lineHeight: 24,
        zIndex: 10,
    },
    cardContainer:{
        backgroundColor: Colors.white,
        paddingHorizontal: 25,
        paddingVertical: 40,
        borderRadius: 15, // Esquinas redondeadas del contenedor
        width: 318,     // Ajusta al ancho que necesites
        height:294,
        
        alignSelf: 'center',
        top: SCREEN_HEIGHT * 0.005,
        shadowColor: Colors.darkgraytext,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,        
    },

    input:{
        backgroundColor: Colors.gray,
        borderRadius: 30, // Bordes redondeados de los inputs
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 18,
        marginBottom: 20
    },

    button:{
        backgroundColor: Colors.primary,
        borderRadius: 30, // Bordes bien redondeados
        paddingVertical: 15,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        
        // Elevación para darle un poco de 'pop'
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    buttonText:{
        color: Colors.white,
        fontSize: 20,
        fontWeight: 'figtreebold',
        fontFamily: Fonts.figtreebold,
    }
})