import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

// REGISTRO
export async function registerUser(nombre, apellido, email, password) {
    // Hace una peticion POST a la API para registrar un usuario
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, apellido, email, password }),
    });
    // Obtiene la respuesta de la API
    const data = await response.json();
    // Si la respuesta no es exitosa, lanza un error
    if (!response.ok) {
        throw new Error(data.detail || "Error al registrarse");
    }
    // Retorna la respuesta de la API
    return data;
}

// LOGIN
export async function loginUser(email, password) {
    // Hace una peticion POST a la API para iniciar sesión
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    // Obtiene la respuesta de la API
    const data = await response.json();
    // Si la respuesta no es exitosa, lanza un error
    if (!response.ok) {
        throw new Error(data.detail || "Correo o contraseña incorrectos");
    }

    return data;
}

// OBTENER PERFIL
export async function obtenerPerfil(token) {
    // Hace una peticion GET a la API para obtener el perfil del usuario
    const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    // Obtiene la respuesta de la API
    const data = await response.json();
    // Si la respuesta no es exitosa, lanza un error
    if (!response.ok) {
        throw new Error(data.detail || "No autorizado");
    }
    // Retorna la respuesta de la API
    return data;
}

// LOGIN HIJO
export async function loginHijo(codigo) {
    // Hace una peticion POST a la API para autenticar al hijo con su código
    const response = await fetch(`${API_URL}/auth_hijos/auth_codigo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo }),
    });
    // Obtiene la respuesta de la API
    const data = await response.json();
    // Si la respuesta no es exitosa, lanza un error
    if (!response.ok) {
        throw new Error(data.detail || "Código inválido o expirado");
    }
    // Retorna la respuesta de la API
    return data;
}

// OBTENER PERFIL HIJO
export async function obtenerPerfilHijo(token) {
    // Hace una peticion GET a la API para obtener el perfil del hijo autenticado
    const response = await fetch(`${API_URL}/auth_hijos/me_hijo`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    // Obtiene la respuesta de la API
    const data = await response.json();
    // Si la respuesta no es exitosa, lanza un error
    if (!response.ok) {
        throw new Error(data.detail || "No autorizado");
    }
    // Retorna la respuesta de la API
    return data;
}
