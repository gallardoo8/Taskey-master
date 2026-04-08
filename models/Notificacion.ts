export interface ExtraDataNotification {
    assignment_id?: string;
    tarea_id?: string;
    foto_url?: string;
    [key: string]: any;
}

export interface Notificacion {
    id: string; 
    usuario_id: string;
    tipo: 'TAREA_COMPLETADA' | 'TIEMPO_LIMITE' | 'TAREA_FALLIDA' | 'META_SEMANAL' | 'TAREA_CONFIRMADA';
    titulo: string;
    mensaje: string;
    data_extra?: ExtraDataNotification;
    leida: boolean;
    fecha_creacion: string;
}
