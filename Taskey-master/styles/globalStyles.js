import { Figtree_700Bold } from "@expo-google-fonts/figtree";

// Paleta de colores global de la aplicación
export const Colors = {
  // Colores principales
  primary: '#7101CC',        // Morado principal
  primaryDark: '#4E008F',    // Morado oscuro
  white: '#FFFFFF',          // Blanco
  black: '#000000',          // Negro
  gray: '#F2F2F2',           // Gris para inputs
  lila: '#d8c2ea',
  naranja: '#d86501',
  // Colores de acento
  pink: '#FF009B',           // Rosa
  orange: '#FF8C42',         // Naranja
  green: '#AAD62D',          // Verde lima
  cyan: '#00AEEB',           // Cyan/Azul claro
  azul: '#0083db',
  
  // Colores para texto
  textPrimary: '#FFFFFF',    // Texto blanco
  textSecondary: '#7101CC',  // Texto morado
  darkgraytext: '#7D7D7D',   // Texto gris oscuro
  
  // Colores para sombras
  shadow: '#000000',         // Sombra negra
};

// Fuentes globales
export const Fonts = {
  figtreeBlack: 'Figtree-900Black',
  figtreeSemiBold: 'Figtree-600SemiBold',
  figtreebold: 'Figtree-700Bold',
  figtree: 'Figtree_700Bold',
  figtreeRegular: 'Figtree-400Regular', 
};

// Tamaños de fuente
export const FontSizes = {
  title: 60,
  button: 24,
};

// Espaciado
export const Spacing = {
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
};

// Bordes redondeados
export const BorderRadius = {
  small: 8,
  medium: 16,
  large: 25,
  circle: 1000,
};

// Sombras
export const Shadows = {
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};
