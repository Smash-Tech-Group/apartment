import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreditCard from "../assets/icons/9.svg";
import Shield from "../assets/icons/12.svg";
import HelpCircle from "../assets/icons/5.svg";
import Navbar from "./Navbar";
import Lock from "../assets/icons/2.svg";
import Home from "../assets/icons/32.svg";
import Car from "../assets/icons/33.svg";
import { StarRating } from "./StarRating";
import { getReviews } from "../lib/review";
import { useAuth } from "../context/AuthContext";
import { getMediaUrl } from "../lib/api";

export default function Reviews() {
  const [activeTab, setActiveTab] = useState("stays");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading) {
      fetchReviews(activeTab === "stays" ? "stay" : "car_rental");
    }
  }, [authLoading, activeTab]);

  const fetchReviews = async (bookingType) => {
    try {
      setLoading(true);
      setError(null);
      const res = await getReviews(bookingType);
      setReviews(res.data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar showNavLinks={false} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-20 sm:pt-28 flex-1 w-full">
        {/* Breadcrumb */}
        <div className="mb-6 text-xs sm:text-sm text-gray-600 bg-[#FF7D011A] w-fit px-3 sm:px-4 py-2 rounded-full flex items-center">
          <Link to="/dashboard" className="font-semibold underline cursor-pointer hover:text-gray-900">Booking Activity</Link>
          <span className="mx-1 sm:mx-2">|</span>
          <span className="text-gray-900">My Reviews</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left */}
          <div className="flex-1">
            <div className="flex gap-x-10">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-6 sm:mb-8">My Reviews</h1>
              {/* Tabs */}
              <div className="flex items-center gap-6 mb-8">
                <div className="flex flex-col items-center">
                  <div><img src={Home} /></div>
                  <button
                    onClick={() => setActiveTab("stays")}
                    className={`pb-2 px-4 text-xs font-normal ${activeTab === "stays" ? "border-b-2 border-[#FF7D01]" : "text-gray-500"}`}
                  >
                    Stays
                  </button>
                </div>
                <div className="flex flex-col items-center">
                  <div><img src={Car} /></div>
                  <button
                    onClick={() => setActiveTab("cars")}
                    className={`pb-2 px-2 text-xs font-normal ${activeTab === "cars" ? "text-[#FF7D01] border-b-2 border-[#FF7D01] font-medium" : "text-gray-500"}`}
                  >
                    Car Rentals
                  </button>
                </div>
              </div>
            </div>

            {/* Loading Skeleton */}
            {loading && (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 animate-pulse">
                    <div className="w-[150px] h-[150px] rounded-2xl bg-gray-200 flex-shrink-0"></div>
                    <div className="flex-1 space-y-3 py-2">
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-16">
                <p className="text-red-500 mb-4">{error}</p>
                <button onClick={fetchReviews} className="text-[#FF7D01] font-medium underline">Try again</button>
              </div>
            )}

            {/* Content */}
            {!loading && !error && (
              <div className="space-y-8">
                {activeTab === "stays" && (
                  <div>
                    {reviews.length === 0 ? (
                      <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">You have no reviews yet.</p>
                      </div>
                    ) : (
                      reviews.map((review) => (
                        <ReviewItem key={review.id} review={review} />
                      ))
                    )}
                  </div>
                )}

                {activeTab === "cars" && (
                  <div>
                    {reviews.length === 0 ? (
                      <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">No car rental reviews yet.</p>
                      </div>
                    ) : (
                      reviews.map((review) => (
                        <ReviewItem key={review.id} review={review} />
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* More Actions */}
          <div className="w-full lg:w-80 mt-8 lg:mt-0 lg:flex-shrink-0">
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

function ReviewItem({ review }) {
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  };

  return (
    <div className="mb-8">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-[120px] h-[110px] sm:w-[150px] sm:h-[150px] rounded-2xl overflow-hidden flex-shrink-0">
          {review.item_image ? (
            <img
              src={getMediaUrl(review.item_image)}
              alt={review.item_name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-xs text-center px-2">No image</span>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-gray-900 pt-5 text-xs font-semibold">{formatDate(review.created_at)}</h3>
          <p className="pt-7 font-extralight">{review.review_text}</p>
        </div>

        <div className="flex flex-col items-center flex-shrink-0 pr-2">
          <div className="text-2xl font-semibold text-gray-900">{review.rating}.0</div>
          <div><StarRating rating={Math.round(review.rating / 2)} /></div>
        </div>
      </div>
      <hr className="my-8" />
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
        <span className="text-gray-700 font-extralight">{text}</span>
      </div>
    </Link>
  );
}