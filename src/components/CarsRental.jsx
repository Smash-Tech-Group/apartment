import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreditCard from "../assets/icons/9.svg";
import Shield from "../assets/icons/12.svg";
import HelpCircle from "../assets/icons/5.svg";
import Navbar from "./Navbar";
import Lock from "../assets/icons/2.svg";
import Calender from "../assets/icons/35.svg";
import Location from "../assets/icons/37.svg";
import ReviewModal from "./ReviewModal";
import RatingModal from "./RatingModal";
import SuccessToast from "./SuccessToast";
import { getCarRentals } from "../lib/car_rental";
import { submitReview, getReviews } from "../lib/review";
import { useAuth } from "../context/AuthContext";
import { Heart, ChevronDown } from "lucide-react";
import { getMediaUrl } from "../lib/api";
import { getFavorites, addFavorite, removeFavoriteByItem } from "../lib/favorite";

export default function CarsRental() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [selectedRental, setSelectedRental] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [toast, setToast] = useState(null);
  const [reviewedRentalIds, setReviewedRentalIds] = useState([]);
  const { loading: authLoading } = useAuth();
  const [favoritedIds, setFavoritedIds] = useState([]);

  useEffect(() => {
    if (!authLoading) {
      fetchRentals();
      fetchReviews();
      fetchFavorites();
    }
  }, [page, authLoading]);

  const fetchFavorites = async () => {
    try {
      const res = await getFavorites("car_rental", 1, 100);
      const ids = res.data.items.map((f) => f.item_id);
      setFavoritedIds(ids);
    } catch (err) {
      // fail silently
    }
  };

  const handleToggleFavorite = async (rental) => {
    const isFavorited = favoritedIds.includes(rental.id);
    try {
      if (isFavorited) {
        await removeFavoriteByItem("car_rental", rental.id);
        setFavoritedIds((prev) => prev.filter((id) => id !== rental.id));
      } else {
        await addFavorite({
          item_id: rental.id,
          item_type: "car_rental",
          item_name: rental.car_name,
          item_location: rental.location,
          item_image: rental.car_image,
          item_rating: rental.car_rating,
          item_price: rental.total_price,
        });
        setFavoritedIds((prev) => [...prev, rental.id]);
      }
    } catch (err) {
      console.error("Failed to toggle favorite", err);
    }
  };

  const fetchRentals = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getCarRentals(page);
      setRentals(res.data.items);
      setTotalPages(res.data.pages);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await getReviews();
      const ids = res.data.map((r) => r.booking_id);
      setReviewedRentalIds(ids);
    } catch (err) {
      // fail silently
    }
  };

  const handleOpenReviewModal = (rental) => {
    setSelectedRental(rental);
    setReviewText("");
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
    setSelectedRental(null);
    setReviewText("");
  };

  const handleSubmitReview = (text) => {
    setReviewText(text);
    setIsReviewModalOpen(false);
    setIsRatingModalOpen(true);
  };

  const handleConfirmRating = async (ratingValue) => {
    try {
      await submitReview(selectedRental.id, reviewText, ratingValue, "car_rental", selectedRental.car_image, selectedRental.car_name);
      setToast("Your review has been submitted successfully!");
      setReviewedRentalIds((prev) => [...prev, selectedRental.id]);
    } catch (err) {
      setToast("Failed to submit review. Please try again.");
    } finally {
      setIsRatingModalOpen(false);
      setSelectedRental(null);
      setReviewText("");
    }
  };

  const handleCloseRatingModal = () => {
    setIsRatingModalOpen(false);
    setSelectedRental(null);
    setReviewText("");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar showNavLinks={false} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 pt-20 sm:pt-28 flex-1 w-full">
        {/* Breadcrumb */}
        <div className="mb-4 sm:mb-6 text-xs sm:text-sm text-gray-600 bg-[#FF7D011A] w-fit px-3 sm:px-4 py-2 rounded-full flex items-center">
          <Link to="/dashboard" className="font-semibold underline cursor-pointer hover:text-gray-900">
            Booking Activity
          </Link>
          <span className="mx-1 sm:mx-2">|</span>
          <span className="text-gray-900">Car Rentals</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2 mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900">Car Rentals</h1>
              <div className="hidden sm:block h-9 w-px bg-[#333333]/50"></div>
              <button className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 bg-white rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition border border-gray-200 sm:border-0">
                <span>Filter By Date</span>
                <img src={Calender} alt="Filter By Date" className="w-4 h-4" />
              </button>
            </div>

            {/* Loading Skeleton */}
            {loading && (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 animate-pulse">
                    <div className="w-[140px] h-[140px] rounded-2xl bg-gray-200 flex-shrink-0"></div>
                    <div className="flex-1 space-y-3 py-2">
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-16">
                <p className="text-red-500 mb-4">{error}</p>
                <button onClick={fetchRentals} className="text-[#FF7D01] font-medium underline">
                  Try again
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && rentals.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">You have no car rentals yet.</p>
              </div>
            )}

            {/* Rentals List */}
            {!loading && !error && rentals.length > 0 && (
              <div className="space-y-6 sm:space-y-10">
                {rentals.map((rental) => (
                  <CarRentalItem
                    key={rental.id}
                    rental={rental}
                    onReviewClick={() => handleOpenReviewModal(rental)}
                    hasReviewed={reviewedRentalIds.includes(rental.id)}
                    isFavorited={favoritedIds.includes(rental.id)}
                    onToggleFavorite={() => handleToggleFavorite(rental)}
                  />
                ))}

                {/* Pagination */}
                {page < totalPages && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => {
                        const nextPage = page + 1;
                        setPage(nextPage);
                        getCarRentals(nextPage).then((res) => {
                          setRentals((prev) => [...prev, ...res.data.items]);
                          setTotalPages(res.data.pages);
                        });
                      }}
                      className="bg-[#FF7D01] text-xs text-white px-8 py-3 rounded-full font-medium hover:bg-orange-500 transition-colors duration-200 flex items-center gap-2 mx-auto"
                    >
                      Show More
                      <ChevronDown className="w-4 h-4 text-white" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* More Actions */}
          <div className="w-full lg:w-80 mt-6 lg:mt-0 lg:flex-shrink-0">
            <h2 className="text-lg sm:text-xl font-light text-gray-900 mb-4 sm:mb-6">More Actions</h2>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              <ActionItem link="/details" icon={Lock} text="Personal Details" />
              <ActionItem link="/payment" icon={CreditCard} text="Payment Methods" />
              <ActionItem link="/privacy" icon={Shield} text="Privacy Policy" />
              <ActionItem link="/contact" icon={HelpCircle} text="Contact Customer Support" />
            </div>
          </div>
        </div>
      </main>

      {selectedRental && (
        <>
          <ReviewModal
            isOpen={isReviewModalOpen}
            onClose={handleCloseReviewModal}
            onSubmit={handleSubmitReview}
            bookingTitle={selectedRental.car_name}
            reviewText={reviewText}
            onReviewChange={setReviewText}
          />
          <RatingModal
            isOpen={isRatingModalOpen}
            onClose={handleCloseRatingModal}
            onConfirm={handleConfirmRating}
          />
        </>
      )}

      {toast && (
        <SuccessToast
          message={toast}
          onClose={() => setToast(null)}
        />
      )}

      <footer className="mt-auto text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
            <p><b>©</b> 2025 Smash Apartments. All Rights Reserved</p>
            <span className="hidden sm:inline">•</span>
            <p className="hover:text-gray-900 transition-colors cursor-pointer">Privacy Policy</p>
            <span className="hidden sm:inline">•</span>
            <p className="hover:text-gray-900 transition-colors cursor-pointer">Terms of Use</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CarRentalItem({ rental, onReviewClick, hasReviewed, isFavorited, onToggleFavorite }) {
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "2-digit" });
  };

  const formatPrice = (price) => {
    return `₦${Number(price).toLocaleString()}`;
  };

  return (
    <div className="mb-6 sm:mb-10">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Image */}
        <div className="w-full sm:w-[140px] h-[200px] sm:h-[140px] md:w-[160px] md:h-[160px] rounded-2xl overflow-hidden flex-shrink-0">
          {rental.car_image ? (
            <img
              src={getMediaUrl(rental.car_image)}
              alt={rental.car_name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-xs">No image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col w-full">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0 mb-3">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">{rental.car_name}</h3>
              <div className="flex gap-2 items-center text-sm text-gray-500">
                <img src={Location} alt="Location" className="w-3.5 h-3.5" />
                <p>{rental.location}</p>
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-semibold text-gray-900">{formatPrice(rental.total_price)}</div>
          </div>

          {rental.car_rating && (
            <div className="mb-4">
              <span className="text-sm font-normal bg-[#FFF1E6] text-[#FF7D01] rounded-full px-3 py-1 inline-block">
                Rating <span className="font-semibold">{rental.car_rating}</span>
              </span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="grid grid-cols-2 gap-4 sm:flex sm:items-center sm:gap-6 sm:overflow-x-auto text-sm">
              <div className="flex-shrink-0">
                <span className="text-[#333333] block text-xs font-semibold mb-1">Pick Up Date</span>
                <span className="font-normal text-xs text-gray-900">{formatDate(rental.pick_up_date)}</span>
              </div>
              <div className="hidden sm:block h-9 w-px bg-[#333333]/50 flex-shrink-0"></div>
              <div className="flex-shrink-0">
                <span className="text-[#333333] font-semibold block text-xs mb-1">Pick Up Time</span>
                <span className="font-normal text-xs text-gray-900">{rental.pick_up_time}</span>
              </div>
              <div className="hidden sm:block h-9 w-px bg-[#333333]/50 flex-shrink-0"></div>
              <div className="flex-shrink-0">
                <span className="text-[#333333] font-semibold block text-xs mb-1">Return Date</span>
                <span className="font-normal text-xs text-gray-900">{formatDate(rental.return_date)}</span>
              </div>
              <div className="hidden sm:block h-9 w-px bg-[#333333]/50 flex-shrink-0"></div>
              <div className="flex-shrink-0">
                <span className="text-[#333333] font-semibold block text-xs mb-1">Return Time</span>
                <span className="font-normal text-xs text-gray-900">{rental.return_time}</span>
              </div>
            </div>

            {rental.status === "completed" || rental.status === "cancelled" ? (
              <Link to="#" className="text-black text-sm font-medium hover:underline underline flex-shrink-0">
                Re-Book
              </Link>
            ) : (
              <span className={`text-xs font-medium px-3 py-1 rounded-full flex-shrink-0 ${rental.status === "confirmed" ? "bg-green-100 text-green-700" :
                rental.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                  "bg-gray-100 text-gray-600"
                }`}>
                {rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
        <button
          onClick={onToggleFavorite}
          className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-[#FFF3E6] transition-all duration-300 transform hover:scale-110 flex-shrink-0"
          style={{ animation: isFavorited ? "heartBeat 0.6s ease-in-out" : "none" }}
        >
          <Heart
            className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 transform ${isFavorited
              ? "fill-[#FF7D01] text-[#FF7D01] scale-110"
              : "text-gray-400 hover:text-[#FF7D01] hover:scale-105"
              }`}
          />
        </button>

        <style>{`
  @keyframes heartBeat {
    0%   { transform: scale(1); }
    25%  { transform: scale(1.3); }
    50%  { transform: scale(0.9); }
    75%  { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
`}</style>

        {hasReviewed ? (
          <div className="flex-1 sm:flex-initial px-4 sm:px-5 py-3 sm:py-4 bg-[#FFF1E6] text-[#FF7D01] rounded-full font-medium text-sm sm:text-base flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8L6.5 11.5L13 5" stroke="#FF7D01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Review Submitted
          </div>
        ) : (
          <button
            onClick={onReviewClick}
            className="flex-1 sm:flex-initial px-4 sm:px-5 py-3 sm:py-4 bg-[#FF7D01]/10 text-[#FF7D01] rounded-full font-medium shadow-sm hover:shadow transition text-sm sm:text-base"
          >
            Make a Review
          </button>
        )}
      </div>
    </div>
  );
}

function ActionItem({ icon, text, link = "#" }) {
  return (
    <Link to={link} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3333330D]">
          <img src={icon} alt={text} className="w-4 h-4" />
        </div>
        <span className="text-gray-700 font-extralight text-sm sm:text-base">{text}</span>
      </div>
    </Link>
  );
}