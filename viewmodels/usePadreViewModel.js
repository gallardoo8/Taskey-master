import { useState, useCallback } from 'react';
import { PadreRepository } from '../repositories/PadreRepository';
import { AuthRepository } from '../repositories/AuthRepository';

export const usePadreViewModel = () => {
  const [parentData, setParentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPerfil = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Intenta cargar desde el cache local para mostrar la UI rápido
      const cachedData = await AuthRepository.getParentData();
      if (cachedData) {
        setParentData(cachedData);
        // Detiene la carga para que la UI se muestre desde el cache
        setLoading(false); 
      }

      const token = await AuthRepository.getParentToken();
      if (!token) throw new Error('No token found');

      // Busca en la API para actualizar con datos frescos
      const data = await PadreRepository.getPerfil(token);
      setParentData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const actualizarPerfil = async (datosActualizados) => {
    setLoading(true);
    setError(null);
    try {
      const token = await AuthRepository.getParentToken();
      if (!token) throw new Error('No token found');

      const data = await PadreRepository.actualizarPerfil(token, datosActualizados);
      setParentData(data); // Actualiza el estado con los datos actuales
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    parentData,
    loading,
    error,
    fetchPerfil,
    actualizarPerfil
  };
};
