import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;

console.log("API_URL:", API_URL);

// Funcion auxiliar para procesar la respuesta del servidor
async function handleResponse(response, errorMsg) {
    const text = await response.text();
    let data;
    try {
        data = JSON.parse(text);
    } catch {
        // El servidor no devolvio JSON, muestra la URL y la respuesta real
        throw new Error(`${errorMsg} (Status: ${response.status}, URL: ${response.url})`);
    }
    if (!response.ok) {
        throw new Error(data.detail || errorMsg);
    }
    return data;
}

// REGISTRO
export async function registerUser(username, email, password) {
    // Hace una peticion POST a la API para registrar un usuario
    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });
    return handleResponse(response, "Error al registrarse");
}

// LOGIN
export async function loginUser(email, password) {
    // Hace una peticion POST a la API para iniciar sesión
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    return handleResponse(response, "Correo o contraseña incorrectos");
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
    return handleResponse(response, "No autorizado");
}
