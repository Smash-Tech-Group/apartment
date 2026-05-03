import React from "react";
import Exclaim from "../assets/icons/38.svg";
export default function ReviewModal({
  isOpen,
  onClose,
  onSubmit,
  bookingTitle,
  reviewText,
  onReviewChange,
}) {
  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (reviewText.trim()) {
      onSubmit(reviewText.trim());
    }
  };

  const wordCount = reviewText
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-1 md:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[900px] relative my-auto max-h-[98vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-black hover:text-gray-600 transition-colors"
          aria-label="Close review modal"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <form className="p-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mt-1">
              Make a Review
            </h2>
          </div>

          <div className="space-y-3">
            <div className="flex">
              <img src={Exclaim} alt="Note" className="w-5 h-5 mr-2 mt-1" />
              <label
                htmlFor="review-textarea"
                className="text-xs font-light text-gray-700"
              >
                To keep reviews clear and helpful for all users, please note that each review must not exceed 100 words. Reviews over this limit may be trimmed or not published.
              </label>
            </div>
            
            <textarea
              id="review-textarea"
              className="w-full min-h-[120px] rounded-2xl border border-gray-200  px-5 py-4 text-gray-800 placeholder:text-gray-400 focus:border-[#FF7D01] focus:ring-1 focus:ring-[#FF7D01] resize-none"
              placeholder=""
              value={reviewText}
              onChange={(event) => onReviewChange?.(event.target.value)}
              maxLength={700}
            />
            {/* <p className="text-xs text-gray-400">{`${wordCount}/100 words`}</p> */}
          </div>

          <button
            type="submit"
            disabled={!reviewText.trim()}
            className="w-full bg-[#FF7D01] hover:bg-orange-500 text-white font-medium py-3.5 rounded-full transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}

