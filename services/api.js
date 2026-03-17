import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

// REGISTRO PADRE
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

// LOGIN PADRE
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

// OBTENER PERFIL PADRE
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

// OBTENER PERFIL HIJO
export async function obtenerPerfilHijo(token) {
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
