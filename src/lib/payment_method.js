import { apiFetch } from './api';

export const getPaymentMethods = async () => {
    return await apiFetch('/payment-methods');
};

export const addPaymentMethod = async (payload) => {
    return await apiFetch('/payment-methods', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
};

export const removePaymentMethod = async (id) => {
    return await apiFetch(`/payment-methods/${id}`, {
        method: 'DELETE',
    });
};