import React, { useEffect, useState } from "react";
import Star from "../assets/icons/39.svg";
const getActiveClasses = (value) => {
  if (value <= 4) return "bg-[#EF4444] border-[#EF4444]";
  if (value <= 6) return "bg-[#F97316] border-[#F97316]";
  return "bg-[#22C55E] border-[#22C55E]";
};

export default function RatingModal({ isOpen, onClose, onConfirm }) {
  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedRating(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (selectedRating) {
      onConfirm(selectedRating);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-1 md:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[900px] relative my-auto max-h-[98vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-black hover:text-gray-600 transition-colors"
          aria-label="Close rating modal"
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

        <div className="p-8 space-y-6 text-left">
          <div>
            
            <h3 className="text-2xl font-semibold text-gray-900">
              Don't Forget to Rate Your Stay!
            </h3>
    
            <p className="text-xs text-gray-500 my-5">
              It looks like you haven’t rated your last stay with us. Your feedback helps us improve and helps other guests make informed choices.
            </p>
            <div className="flex gap-3 mt-3 items-center">
              <img src={Star} alt="Star Icon" className="inline-block w-5 h-5" />
              <p>
                Take a moment to rate your previous stay, we’d love to hear what you think!
              </p>
              
            </div>
            
          </div>

          <div className="flex flex-wrap items-center justify-between border rounded-full gap-1 p-4">
            {Array.from({ length: 10 }, (_, index) => {
              const value = index + 1;
              const isSelected = selectedRating === value;
              return (
                <button
                  key={value}
                  onClick={() => setSelectedRating(value)}
                  className={`w-12 h-12 rounded-full border text-sm flex items-center justify-center transition-colors ${
                    isSelected
                      ? `${getActiveClasses(value)} font-semibold text-white`
                      : "font-normal text-black border-gray-200 bg-gray-100"
                  }`}
                  aria-label={`Select rating ${value}`}
                >
                  {value}
                </button>
              );
            })}
          </div>

          <div className="pt-16">
            <button
              onClick={handleConfirm}
              disabled={!selectedRating}
              className=" w-full bg-[#FF7D01] hover:bg-orange-500 text-white font-medium py-5 rounded-full transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit Rating
            </button>
          </div>

          
        </div>
      </div>
    </div>
  );
}

