import type { IFormValues } from "../types/form"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const login = async (data: IFormValues) => {
    const response = await fetch(`${BACKEND_URL}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    const result = await response.json();
    return result;
}

const signup = async (data: IFormValues) => {
    const response = await fetch(`${BACKEND_URL}/users/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error("Signup failed");
    }

    const result = await response.json();
    return result;
}

const getUserProfile = async () => {
    const response = await fetch(`${BACKEND_URL}/users/profile`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user profile");
    }

    const result = await response.json();
    return result;
}

export { login, signup, getUserProfile };