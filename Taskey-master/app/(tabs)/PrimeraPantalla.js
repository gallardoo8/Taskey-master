import React from 'react';
import {useRouter} from 'expo-router';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts } from '../../styles/globalStyles';
import BackgroundDecorations from '../../components/BackgroundDecorations';


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');


export default function PrimeraPantalla() {
  const router = useRouter();
  const handleContinue = () => {
    router.push('/quienEres');
  }
  return (
    <View style={styles.container}>
      {/* Decoraciones de fondo */}
      <BackgroundDecorations />

      {/* Encabezado */}
      <Image source={require("../../assets/images/TASK_KEY.png")}
        style={styles.headerimage}
        resizeMode="contain"
      />

      

      {/* Capillave */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/capillave.png')} 
          style={styles.capillaveImage}
          resizeMode="contain"
        />
      </View>

      {/* Capibara */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/capibara.png')} 
          style={styles.capibaraImage}
          resizeMode="contain"
        />
      </View>

      {/* Botón */}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continuar</Text>
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

  // Header
  headerimage: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.02,
    zIndex: 10,
    alignSelf: 'center',
    width: 266.4,
    height: 222
  },
  
  // Imagen del capibara
  capillaveImage: {
    position: 'absolute',
    zIndex: 5,
    alignSelf: 'center',
    top: SCREEN_HEIGHT * 0.13,
    left: SCREEN_WIDTH * 0.485
  },
  capibaraImage: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.32,
    zIndex: 5,
    alignSelf: 'center',
    
  },
 
  // Botón
  button: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.25,
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 10,
  },
  buttonText: {
    color: Colors.textSecondary,
    fontSize: 24,
    fontWeight: '700',
  },
});
