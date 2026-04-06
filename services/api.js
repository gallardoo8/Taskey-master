import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

// Registro del padre
export async function registerPadre(nombre, apellido, email, password) {
    // Hace una peticion POST a la API para registrar un usuario
    const response = await fetch(`${API_URL}/auth_padres/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido, email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail || "Error al registrarse");
    }
    return data;
}

// Login del padre
export async function loginPadre(email, password) {
    // Hace una peticion POST a la API para iniciar sesión
    const response = await fetch(`${API_URL}/auth_padres/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail || "Correo o contraseña incorrectos");
    }
    return data;
}

// Obtener perfil del padre
export async function obtenerPerfilPapa(token) {
    // Hace una peticion GET a la API para obtener el perfil del usuario
    const response = await fetch(`${API_URL}/auth_padres/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail || "No autorizado");
    }
    return data;
}

// Actualizar perfil del padre
export async function actualizarPerfilPapa(token, datos) {
    // Hace una peticion PUT a la API para actualizar el perfil del usuario
    const response = await fetch(`${API_URL}/auth_padres/me`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(datos),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail || "Error al actualizar perfil");
    }
    return data;
}

// Crear hijo
export async function crearHijo(token, datos) {
    // Hace una peticion POST a la API para crear un hijo
    const response = await fetch(`${API_URL}/hijos/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(datos),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail || "Error al crear hijo");
    }
    return data;
}

// Listar hijos
export async function listarHijos(token) {
    // Hace una peticion GET a la API para obtener la lista de hijos
    const response = await fetch(`${API_URL}/hijos/`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail || "Error al obtener hijos");
    }
    return data;
}

// Obtener detalle de un hijo
export async function obtenerHijo(token, hijoId) {
    // Hace una peticion GET a la API para obtener el detalle de un hijo
    const response = await fetch(`${API_URL}/hijos/${hijoId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail || "Error al obtener hijo");
    }
    return data;
}

// Editar hijo
export async function editarHijo(token, hijoId, datos) {
    // Hace una peticion PUT a la API para editar un hijo
    const response = await fetch(`${API_URL}/hijos/${hijoId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(datos),
    });
    const text = await response.text();
    let data;
    try {
        data = JSON.parse(text);
    } catch (e) {
        console.error('[editarHijo] Respuesta no-JSON del servidor:', text);
        throw new Error("Error del servidor al editar hijo");
    }
    if (!response.ok) {
        throw new Error(data.detail || "Error al editar hijo");
    }
    return data;
}

// Eliminar hijo
export async function eliminarHijo(token, hijoId) {
    // Hace una peticion DELETE a la API para eliminar un hijo
    const response = await fetch(`${API_URL}/hijos/${hijoId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Error al eliminar hijo");
    }
    return true;
}

// Generar codigo de vinculacion
export async function generarCodigoVinculacion(token, hijoId) {
    // Hace una peticion POST a la API para generar un codigo de vinculacion
    const response = await fetch(`${API_URL}/hijos/${hijoId}/codigo`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail || "Error al generar código");
    }
    return data;
}

// Obtener perfil del hijo
export async function obtenerPerfilHijo(token) {
    // Hace una peticion GET a la API para obtener el perfil del hijo
    const response = await fetch(`${API_URL}/auth_hijos/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail || "No autorizado");
    }
    return data;
}
