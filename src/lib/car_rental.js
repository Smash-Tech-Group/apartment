import { apiFetch } from './api';

export const getCarRentals = async (page = 1, size = 10) => {
    return await apiFetch(`/car-rentals?page=${page}&size=${size}`);
};

export const getCarRentalById = async (id) => {
    return await apiFetch(`/car-rentals/${id}`);
};

export const cancelCarRental = async (id) => {
    return await apiFetch(`/car-rentals/cancel/${id}`, {
        method: 'PATCH',
    });
};