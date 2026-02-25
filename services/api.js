import { API_URL } from "@env";

// REGISTRO
export async function registerUser(username, email, password) {
    // Hace una peticion POST a la API para registrar un usuario
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
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
