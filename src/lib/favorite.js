import { apiFetch } from './api';

export const getFavorites = async (itemType = null, page = 1, size = 10) => {
    const typeParam = itemType ? `&item_type=${itemType}` : '';
    return await apiFetch(`/favorites?page=${page}&size=${size}${typeParam}`);
};

export const getFavoriteById = async (id) => {
    return await apiFetch(`/favorites/${id}`);
};

export const addFavorite = async ({ item_id, item_type, item_name, item_location, item_image, item_rating, item_price }) => {
    return await apiFetch('/favorites', {
        method: 'POST',
        body: JSON.stringify({ item_id, item_type, item_name, item_location, item_image, item_rating, item_price }),
    });
};

export const removeFavorite = async (id) => {
    return await apiFetch(`/favorites/remove/${id}`, {
        method: 'PATCH',
    });
};

export const removeFavoriteByItem = async (itemType, itemId) => {
    return await apiFetch(`/favorites/remove/${itemType}/${itemId}`, {
        method: 'DELETE',
    });
};