export const RecompensasRepository = {
  getRecompensas: async (): Promise<any[]> => {
    // TODO: lógica offline-first (leer local, luego si es necesario de API)
    return [];
  },
  syncRecompensas: async (): Promise<void> => {
    // TODO: sincronizar información local con la API
  }
};
