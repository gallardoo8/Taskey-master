export const HijosRepository = {
  getHijos: async (): Promise<any[]> => {
    // TODO: lógica offline-first (leer local, luego si es necesario de API)
    return [];
  },
  syncHijos: async (): Promise<void> => {
    // TODO: sincronizar información local con la API
  }
};
