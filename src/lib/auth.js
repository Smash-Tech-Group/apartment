import { apiFetch, BASE_URL } from './api';

let accessToken = null;

export const setAccessToken = (token) => {
    accessToken = token;
};

export const getAccessToken = () => {
    return accessToken;
};

const setRefreshTokenCookie = (token) => {
    document.cookie = `rt=${token}; path=/; secure; samesite=strict; max-age=2592000`; // 30 days
};

export const getRefreshTokenCookie = () => {
    return document.cookie.split('; ').find(row => row.startsWith('rt='))?.split('=')[1] || null;
};

const eraseRefreshTokenCookie = () => {
    document.cookie = `rt=; path=/; secure; samesite=strict; max-age=0`;
};

export const clearAuth = () => {
    accessToken = null;
    eraseRefreshTokenCookie();
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('auth:clear'));
    }
};

export const refreshToken = async () => {
    const rt = getRefreshTokenCookie();
    if (!rt) {
        throw new Error("No refresh token available");
    }

    let response;
    try {
        response = await fetch(`${BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh_token: rt }),
        });
    } catch (err) {
        throw new Error("Something went wrong. Try again.");
    }

    let data;
    try {
        data = await response.json();
    } catch (err) {
        throw new Error("Something went wrong. Try again.");
    }

    if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Refresh failed");
    }

    const newAccessToken = data?.data?.access_token;
    const newRefreshToken = data?.data?.refresh_token;

    if (newAccessToken) {
        setAccessToken(newAccessToken);
    }
    if (newRefreshToken) {
        setRefreshTokenCookie(newRefreshToken);
    }

    return newAccessToken;
};

export const login = async (credentials) => {
    let response;
    try {
        response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
    } catch (err) {
        throw new Error("Something went wrong. Try again.");
    }

    let data;
    try {
        data = await response.json();
    } catch (err) {
        throw new Error("Something went wrong. Try again.");
    }

    if (!response.ok || !data?.success) {
        if (response.status === 401) {
            const err = new Error("Invalid email/username or password");
            err.status = response.status;
            throw err;
        }
        if (response.status === 422) {
            const err = new Error(data?.message || "Validation Error");
            err.status = response.status;
            err.validationErrors = data?.data;
            throw err;
        }
        const err = new Error(data?.message || "Login failed");
        err.status = response.status;
        throw err;
    }

    const newAccessToken = data?.data?.access_token;
    const newRefreshToken = data?.data?.refresh_token;

    if (newAccessToken) {
        setAccessToken(newAccessToken);
    }
    if (newRefreshToken) {
        setRefreshTokenCookie(newRefreshToken);
    }

    return data;
};

export const register = async (userData) => {
    let response;
    try {
        response = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
    } catch (err) {
        throw new Error("Something went wrong. Try again.");
    }

    let data;
    try {
        data = await response.json();
    } catch (err) {
        throw new Error("Something went wrong. Try again.");
    }

    if (!response.ok || !data?.success) {
        if (response.status === 422) {
            const err = new Error(data?.message || "Validation Error");
            err.status = response.status;
            err.validationErrors = data?.data;
            throw err;
        }
        const err = new Error(data?.message || "Registration failed");
        err.status = response.status;
        throw err;
    }

    const newAccessToken = data?.data?.access_token;
    const newRefreshToken = data?.data?.refresh_token;

    if (newAccessToken) {
        setAccessToken(newAccessToken);
    }
    if (newRefreshToken) {
        setRefreshTokenCookie(newRefreshToken);
    }

    return data;
};

export const logout = async () => {
    const rt = getRefreshTokenCookie();
    if (rt) {
        try {
            await fetch(`${BASE_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAccessToken()}`
                },
                body: JSON.stringify({ refresh_token: rt }),
            });
        } catch (e) {
            // Ignore failure on logout network issues
        }
    }
    clearAuth();
};

export const getCurrentUser = async () => {
    return await apiFetch('/auth/me', {
        method: 'GET',
    });
};

export const forgotPassword = async (email) => {
    let response;
    try {
        response = await fetch(`${BASE_URL}/auth/forgot-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
    } catch (err) {
        throw new Error("Something went wrong. Try again.");
    }

    let data;
    try {
        data = await response.json();
    } catch (err) {
        throw new Error("Something went wrong. Try again.");
    }

    return data;
};

export const resetPassword = async (resetToken, newPassword) => {
    let response;
    try {
        response = await fetch(`${BASE_URL}/auth/reset-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reset_token: resetToken, new_password: newPassword }),
        });
    } catch (err) {
        throw new Error("Something went wrong. Try again.");
    }

    let data;
    try {
        data = await response.json();
    } catch (err) {
        throw new Error("Something went wrong. Try again.");
    }

    if (!response.ok || !data?.success) {
        if (response.status === 422) {
            const err = new Error(data?.message || "Validation Error");
            err.status = response.status;
            err.validationErrors = data?.data;
            throw err;
        }
        const err = new Error(data?.message || "Reset failed");
        err.status = response.status;
        throw err;
    }

    return data;
};
