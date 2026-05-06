import { apiFetch } from './api';

export const getPayments = async (page = 1, size = 5) => {
    return await apiFetch(`/payments?page=${page}&size=${size}`);
};

export const getPaymentById = async (id) => {
    return await apiFetch(`/payments/${id}`);
};

export const createPayment = async (payload) => {
    return await apiFetch('/payments', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
};

export const verifyPayment = async (reference) => {
    return await apiFetch('/payments/verify', {
        method: 'POST',
        body: JSON.stringify({ reference }),
    });
};