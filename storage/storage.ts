// Este archivo es para guardar, eliminar y purgar totalmente el almacenamiento local de la app
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  // Lee un valor de AsyncStorage y lo deserializa de JSON a su tipo original <T>.  
  getItem: async <T>(key: string): Promise<T | null> => {
    try {
      // AsyncStorage busca el string puro en el dispositivo
      const jsonValue = await AsyncStorage.getItem(key);
      
      // Si no hay nada, devolvemos null directamente
      if (jsonValue === null) {
        return null;
      }
      
      // Deserializa el string a su tipo original <T>
      return JSON.parse(jsonValue) as T;
    } catch (error) {
      console.error(`[Storage Error] Fallo al leer la key: ${key}`, error);
      return null;
    }
  },
  // Serializa el valor pasado a JSON y lo guarda en AsyncStorage.  
  setItem: async <T>(key: string, value: T): Promise<void> => {
    try {
      // Transformamos el tipo TypeScript a un String compatible con SQLite/AsyncStorage
      const jsonValue = JSON.stringify(value);
      
      // Ejecutamos la inserción en el disco
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`[Storage Error] Fallo al guardar en la key: ${key}`, error);
    }
  },
  // Elimina permanentemente un valor específico del storage.  
  removeItem: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`[Storage Error] Fallo al eliminar la key: ${key}`, error);
    }
  },
  // Limpia todo el almacenamiento local de la app  
  clearAll: async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error(`[Storage Error] Fallo al limpiar todo el almacenamiento local.`, error);
    }
  }
};

