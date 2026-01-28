import React, { useState } from "react";
import {View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, TextInput} from "react-native";
import Checkbox from 'expo-checkbox';
import {useRouter} from 'expo-router';
import {Colors, Fonts, FontSizes, Spacing, BorderRadius, Shadows} from "../styles/globalStyles";
import BackgroundDecorations from "../components/BackgroundDecorations";

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function RegistroPapa(){
    const router = useRouter();
    const [isChecked, setIsChecked] = useState(false);
    
    const handlePrincipalPapaPress = () => {
        router.push('/principalpapa');
    };
    
    const handleIniciarSesion = () => {
        router.push('/loginpapa');
    };
    
    return(
        <View style = {styles.container}>
            
            <Text style = {styles.header}>Registrarse</Text>
            
            <View style = {styles.cardContainer}>
            <TextInput
                style = {styles.input}
                placeholder = "Cree un usuario"
                placeholderTextColor = {Colors.darkgraytext}
            />
            
             <TextInput
                style = {styles.input}
                placeholder = "Correo"
                placeholderTextColor = {Colors.darkgraytext}
            />

            <TextInput
                style = {styles.input}
                placeholder = "Contraseña"
                placeholderTextColor = {Colors.darkgraytext}
                secureTextEntry={true}
            />
            
            {/* Checkbox para términos y condiciones */}
            <View style = {styles.checkboxContainer}>
                <Checkbox
                    style = {styles.checkbox}
                    value = {isChecked}
                    onValueChange = {setIsChecked}
                    color = {isChecked ? Colors.primary : Colors.darkgraytext}
                />
                <Text style = {styles.checkboxLabel}>
                    Acepto los términos y condiciones
                </Text>
            </View>
            
            <TouchableOpacity 
                style = {[styles.button, !isChecked && styles.buttonDisabled] }
                disabled = {!isChecked}
                onPress={handlePrincipalPapaPress}
            >
                <Text style = {styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
            </View>
            
            <Text style = {styles.textobelow}>¿Ya tienes cuenta?</Text>
            <TouchableOpacity style = {styles.buttonTransparent} onPress={handleIniciarSesion}>
                <Text style = {styles.buttonIniciarSesion}>Inicia sesión</Text>
            </TouchableOpacity>
        </View>
    )
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
    cardContainer:{
        backgroundColor: Colors.white,
        paddingHorizontal: 25,
        paddingVertical: 30,
        borderRadius: 15,
        width: 318,
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
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 18,
        marginBottom: 15
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 5,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        marginRight: 10,
    },
    checkboxLabel: {
        fontSize: 14,
        color: Colors.black,
        fontFamily: Fonts.figtreeRegular,
        flex: 1,
    },
    button:{
        backgroundColor: Colors.primary,
        borderRadius: 30,
        paddingVertical: 15,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    buttonDisabled: {
        backgroundColor: Colors.darkgraytext,
        opacity: 0.5,
    },
    buttonText:{
        color: Colors.white,
        fontSize: 20,
        fontWeight: 'figtreebold',
        fontFamily: Fonts.figtreebold,
    },
    textobelow:{
        color: Colors.black,
        fontSize: 18,
        top: SCREEN_HEIGHT * 0.05,
        fontFamily: Fonts.figtreeRegular,
        textAlign: 'center',
    },
    buttonIniciarSesion:{
        color: Colors.green,
        fontSize: 21,
        fontWeight: 'figtreebold',
        fontFamily: Fonts.figtreebold,
        textAlign: 'center',
        top: SCREEN_HEIGHT * 0.03,
    },
    buttonTransparent:{
        backgroundColor: 'transparent',
        paddingVertical: 10,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
})