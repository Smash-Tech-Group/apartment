import { getAccessToken, refreshToken, clearAuth } from './auth';

export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:7001/api/v1";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

async function handleResponse(response) {
    let data;
    try {
        data = await response.json();
    } catch (e) {
        throw new Error("Something went wrong. Try again.");
    }

    if (!response.ok || !data?.success) {
        if (response.status === 401) {
            const err = new Error("Invalid credentials");
            err.status = response.status;
            throw err;
        }
        if (response.status === 422) {
            const err = new Error(data?.message || "Validation Error");
            err.status = response.status;
            err.validationErrors = data?.data;
            throw err;
        }
        const error = new Error(data?.message || "Something went wrong. Try again.");
        error.status = response.status;
        throw error;
    }

    return data;
}

export const apiFetch = async (url, options = {}) => {
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    const token = getAccessToken();
    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    let response;
    try {
        response = await fetch(`${BASE_URL}${url}`, config);
    } catch (error) {
        throw new Error("Something went wrong. Try again.");
    }

    if (response.status === 401 && !options._retry) {
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then(newToken => {
                    config.headers['Authorization'] = `Bearer ${newToken}`;
                    return fetch(`${BASE_URL}${url}`, config);
                })
                .then(res => handleResponse(res))
                .catch(err => {
                    throw err;
                });
        }

        config._retry = true;
        isRefreshing = true;

        try {
            const newToken = await refreshToken();
            isRefreshing = false;
            processQueue(null, newToken);
            config.headers['Authorization'] = `Bearer ${newToken}`;
            response = await fetch(`${BASE_URL}${url}`, config);
        } catch (refreshError) {
            isRefreshing = false;
            processQueue(refreshError, null);
            clearAuth();
            throw refreshError;
        }
    }

    return handleResponse(response);
};
