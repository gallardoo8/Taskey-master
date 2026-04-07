import { STORAGE_KEYS } from '../storage/keys';
import { storage } from '../storage/storage';
import { listarTareas, crearTarea, editarTarea, eliminarTarea, asignarTarea } from '../services/api';
import { Tarea } from '../models/Tarea';

export const TareasRepository = {
  getTareas: async (token: string): Promise<Tarea[]> => {
    try {
      // Intenta obtener datos de la API
      const apiTareas = await listarTareas(token);
      
      // Actualiza la caché
      await storage.setItem(STORAGE_KEYS.TAREAS, apiTareas);
      return apiTareas;
    } catch (error) {
      console.log('[TareasRepository] Fallo la API, leyendo de Storage Local');
      const cachedTareas = await storage.getItem<Tarea[]>(STORAGE_KEYS.TAREAS);
      return cachedTareas || [];
    }
  },

  crearTarea: async (token: string, datos: any): Promise<Tarea> => {
    const nuevaTarea = await crearTarea(token, datos);
    
    // Actualiza la caché local
    const currentTareas = await storage.getItem<Tarea[]>(STORAGE_KEYS.TAREAS) || [];
    await storage.setItem(STORAGE_KEYS.TAREAS, [nuevaTarea, ...currentTareas]);
    
    return nuevaTarea;
  },

  editarTarea: async (token: string, id: string, datos: any): Promise<Tarea> => {
    const tareaEditada = await editarTarea(token, id, datos);
    
    const currentTareas = await storage.getItem<Tarea[]>(STORAGE_KEYS.TAREAS) || [];
    const updatedTareas = currentTareas.map(t => t.id === id ? { ...t, ...datos, ...tareaEditada } : t);
    await storage.setItem(STORAGE_KEYS.TAREAS, updatedTareas);
    
    return tareaEditada;
  },

  eliminarTarea: async (token: string, id: string): Promise<boolean> => {
    await eliminarTarea(token, id);
    
    const currentTareas = await storage.getItem<Tarea[]>(STORAGE_KEYS.TAREAS) || [];
    const updatedTareas = currentTareas.filter(t => t.id !== id);
    await storage.setItem(STORAGE_KEYS.TAREAS, updatedTareas);
    
    return true;
  },

  asignarTarea: async (token: string, tareaId: string, childId: string): Promise<any> => {
    const assignment = await asignarTarea(token, tareaId, childId);
    
    // Actualizar cache local anidada
    const currentTareas = await storage.getItem<Tarea[]>(STORAGE_KEYS.TAREAS) || [];
    const updatedTareas = currentTareas.map(t => {
      if (t.id === tareaId) {
         const currentAssignments = t.assignments || [];
         return { ...t, assignments: [...currentAssignments, assignment] };
      }
      return t;
    });
    await storage.setItem(STORAGE_KEYS.TAREAS, updatedTareas);
    
    return assignment;
  }
};
