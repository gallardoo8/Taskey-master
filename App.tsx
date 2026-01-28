// taskey/hola/App.tsx

import React from 'react';
// Importa tu componente de pantalla. La ruta es relativa a App.tsx.
import WelcomeScreen from './app/(tabs)/PrimeraPantalla'; 

export default function App() {
  return (
    // Renderiza tu componente
    <WelcomeScreen />
  );
}