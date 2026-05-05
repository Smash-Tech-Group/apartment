import { apiFetch } from './api';

export const getBookings = async (page = 1, size = 10) => {
    return await apiFetch(`/bookings?page=${page}&size=${size}`);
};

export const getBookingById = async (id) => {
    return await apiFetch(`/bookings/${id}`);
};

export const cancelBooking = async (id) => {
    return await apiFetch(`/bookings/cancel/${id}`, {
        method: 'PATCH',
    });
};