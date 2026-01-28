import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../styles/globalStyles';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function BackgroundDecorations({ ellipseTop = 0.15 }) {
  return (
    <>
      {/* Círculos decorativos en zona morada */}
      <View style={[styles.circle, styles.circlePinkTop]} />
      <View style={[styles.circle, styles.circleOrangeLeft]} />
      <View style={[styles.circle, styles.circleGreenMiddle]} />
      <View style={[styles.circle, styles.circlePurpleBottom]} />
      <View style={[styles.circle, styles.circlePurpleTop]} />
      <View style={[styles.circle, styles.circlePurpleTop]} />
      <View style={[styles.circle, styles.circleGreenBottom]} />
      <View style={[styles.circle, styles.circlePinkBottomRight]} />
      <View style={[styles.circle, styles.circleCyanBottom]} />
      
      {/* Forma blanca curva */}
      <View style={styles.ellipseIcon} />
    </>
  );
}

const styles = StyleSheet.create({
  // Forma blanca curva
  ellipseIcon: {
    zIndex: 0,
    position: 'absolute',
    width: SCREEN_WIDTH * 1.8,
    height: SCREEN_HEIGHT * 0.53,
    transform: [{ rotate: '-30deg' }],
    maxWidth: SCREEN_WIDTH * 1.8,
    left: SCREEN_WIDTH * -0.5,
    top: SCREEN_HEIGHT * 0.275,
    backgroundColor: Colors.white,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
  },

  // Círculos decorativos
  circle: {
    position: 'absolute',
    borderRadius: 1000,
  },

  circlePurpleTop: {
    position: 'absolute',
    width: 180,
    height: 167,
    backgroundColor: Colors.primaryDark,
    bottom: SCREEN_HEIGHT * 0.82,
    right: -SCREEN_WIDTH * 0.2,
    zIndex: 5,
    top: SCREEN_HEIGHT * -0.08,
  },
  
  // Rosa arriba centro
  circlePinkTop: {
    position: 'absolute',
    width: 70,
    height: 70,
    backgroundColor: Colors.pink,
    left: SCREEN_WIDTH * 0.3,
    top: -SCREEN_HEIGHT * 0.04,
    bottom: SCREEN_HEIGHT * 0.95,
    zIndex: 2,
  },
  
  // Naranja izquierda arriba
  circleOrangeLeft: {
    width: 105,
    height: 103,
    backgroundColor: Colors.orange,
    bottom: SCREEN_HEIGHT * 0.83,
    top: SCREEN_HEIGHT * 0.04,
    left: -SCREEN_WIDTH * 0.14,
    zIndex: 2,
  },
  
  // Verde medio izquierda
  circleGreenMiddle: {
    position: 'absolute',
    width: 55,
    height: 55,
    backgroundColor: Colors.green,
    top: 231,
    left: 46,
    zIndex: 10,
  },
  
  // Morado oscuro abajo izquierda
  circlePurpleBottom: {
    width: 253,
    height: 220,
    backgroundColor: Colors.primaryDark,
    bottom: -140,
    left: -73,
    zIndex: 1,
    borderRadius: "150%"
  },
  
  // Verde abajo medio
  circleGreenBottom: {
    position: 'absolute',
    width: 40,
    height: 40,
    backgroundColor: Colors.green,
    top: SCREEN_HEIGHT * 0.8,
    left: 188,
    zIndex: 10,
  },
  
  // Rosa grande abajo derecha
  circlePinkBottomRight: {
    width: 105,
    height: 103,
    backgroundColor: Colors.pink,
    bottom: 148,
    right: -70,
    zIndex: 2,
  },
  
  // Cyan abajo derecha
  circleCyanBottom: {
    width: 67,
    height: 64,
    backgroundColor: Colors.cyan,
    bottom: -15,
    right: 50,
    zIndex: 3,
  },
});
