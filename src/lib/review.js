import { apiFetch } from './api';

export const submitReview = async (bookingId, reviewText, rating, bookingType = "stay", itemImage = null, itemName = null) => {
    return await apiFetch('/reviews', {
        method: 'POST',
        body: JSON.stringify({
            booking_id: bookingId,
            booking_type: bookingType,
            review_text: reviewText,
            rating: rating,
            item_image: itemImage,
            item_name: itemName,
        }),
    });
};

export const getReviews = async (bookingType = null) => {
    const query = bookingType ? `?booking_type=${bookingType}` : '';
    return await apiFetch(`/reviews${query}`);
};