import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  getItem: async (key: string): Promise<string | null> => {
    // TODO: Implementar wrapper para AsyncStorage.getItem
    return null;
  },
  setItem: async (key: string, value: string): Promise<void> => {
    // TODO: Implementar wrapper para AsyncStorage.setItem
  },
  removeItem: async (key: string): Promise<void> => {
    // TODO: Implementar wrapper para AsyncStorage.removeItem
  }
};
