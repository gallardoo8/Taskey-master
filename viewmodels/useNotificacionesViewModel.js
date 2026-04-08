import { useState, useCallback } from 'react';
import { NotificacionesRepository } from '../repositories/NotificacionesRepository';
import { AuthRepository } from '../repositories/AuthRepository';

export const useNotificacionesViewModel = () => {
    const [notificaciones, setNotificaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const noLeidasCount = notificaciones.filter(n => !n.leida).length;

    const fetchNotificaciones = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Intentar con token de padre primero, luego token de hijo
            let token = await AuthRepository.getParentToken();
            if (!token) token = await AuthRepository.getChildToken();
            if (!token) throw new Error('No hay sesión activa');

            const data = await NotificacionesRepository.getNotificaciones(token);
            setNotificaciones(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const marcarLeidas = async (ids) => {
        // Actualización optimista: reflejar el cambio en UI de inmediato
        setNotificaciones(prev =>
            prev.map(n => ids.includes(n.id) ? { ...n, leida: true } : n)
        );

        try {
            let token = await AuthRepository.getParentToken();
            if (!token) token = await AuthRepository.getChildToken();
            if (!token) return;

            await NotificacionesRepository.marcarLeidas(token, ids);
        } catch (err) {
            console.error('[useNotificacionesViewModel] Error al marcar leídas:', err.message);
            // Revertir la actualización optimista si falla
            await fetchNotificaciones();
        }
    };

    const marcarTodasLeidas = async () => {
        const idsNoLeidas = notificaciones.filter(n => !n.leida).map(n => n.id);
        if (idsNoLeidas.length === 0) return;
        await marcarLeidas(idsNoLeidas);
    };

    return {
        notificaciones,
        noLeidasCount,
        loading,
        error,
        fetchNotificaciones,
        marcarLeidas,
        marcarTodasLeidas,
    };
};
