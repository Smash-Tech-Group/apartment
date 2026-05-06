import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreditCard from "../assets/icons/9.svg";
import Shield from "../assets/icons/12.svg";
import HelpCircle from "../assets/icons/5.svg";
import Navbar from "./Navbar";
import Lock from "../assets/icons/2.svg";
import Home from "../assets/icons/32.svg";
import Car from "../assets/icons/33.svg";
import Heart from "../assets/icons/34.svg";
import { getMediaUrl } from "../lib/api";
import { getFavorites, removeFavoriteByItem } from "../lib/favorite";
import { useAuth } from "../context/AuthContext";
import { ChevronDown } from "lucide-react";

export default function Favourites() {
  const [activeTab, setActiveTab] = useState("stays");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading) {
      fetchFavorites(false);
    }
  }, [authLoading, activeTab]);


  const fetchFavorites = async (append = false) => {
    try {
      setLoading(true);
      setError(null);
      const itemType = activeTab === "stays" ? "stay" : "car_rental";
      const res = await getFavorites(itemType, page, 4);
      setFavorites((prev) => append ? [...prev, ...res.data.items] : res.data.items);
      setTotalPages(res.data.pages);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (itemType, itemId) => {
    try {
      await removeFavoriteByItem(itemType, itemId);
      setFavorites((prev) => prev.filter((f) => f.item_id !== itemId));
    } catch (err) {
      console.error("Failed to remove favorite", err);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1);
  };

  const ShowMoreArrow = () => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.29659 12.079V0.500007C6.29659 0.358007 6.34425 0.239007 6.43959 0.143007C6.53492 0.047007 6.65392 -0.00065977 6.79659 6.89653e-06C6.93926 0.000673563 7.05826 0.0483404 7.15359 0.143007C7.24892 0.237674 7.29659 0.356674 7.29659 0.500007V12.079L12.7356 6.64001C12.8329 6.54267 12.9476 6.49167 13.0796 6.48701C13.2116 6.48301 13.3326 6.53634 13.4426 6.64701C13.5493 6.75634 13.6036 6.87401 13.6056 7.00001C13.6069 7.12534 13.5526 7.24334 13.4426 7.35401L7.36259 13.434C7.27459 13.5213 7.18526 13.5827 7.09459 13.618C7.00392 13.6533 6.90459 13.671 6.79659 13.671C6.68859 13.671 6.58925 13.6533 6.49859 13.618C6.40792 13.5833 6.31892 13.5223 6.23159 13.435L0.150588 7.35401C0.057255 7.26067 0.0072549 7.14701 0.000588234 7.01301C-0.00607843 6.87834 0.0439217 6.75601 0.150588 6.64601C0.260588 6.53601 0.379588 6.48101 0.507588 6.48101C0.635588 6.48101 0.754255 6.53601 0.863588 6.64601L6.29659 12.079Z" fill="#FF7D01" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar showNavLinks={false} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-20 sm:pt-28 flex-1 w-full">
        {/* Breadcrumb */}
        <div className="mb-6 text-xs sm:text-sm text-gray-600 bg-[#FF7D011A] w-fit px-3 sm:px-4 py-2 rounded-full flex items-center">
          <Link to="/dashboard" className="font-semibold underline cursor-pointer hover:text-gray-900">Booking Activity</Link>
          <span className="mx-1 sm:mx-2">|</span>
          <span className="text-gray-900">Favorites</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex gap-x-10">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-6 sm:mb-8">Favorites</h1>
              {/* Tabs */}
              <div className="flex items-center gap-6 mb-8">
                <div className="flex flex-col items-center">
                  <img src={Home} />
                  <button
                    onClick={() => handleTabChange("stays")}
                    className={`pb-2 px-4 text-xs font-normal ${activeTab === "stays" ? "border-b-2 border-[#FF7D01]" : "text-gray-500"}`}
                  >
                    Stays
                  </button>
                </div>
                <div className="flex flex-col items-center">
                  <img src={Car} />
                  <button
                    onClick={() => handleTabChange("cars")}
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
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-16">
                <p className="text-red-500 mb-4">{error}</p>
                <button onClick={fetchFavorites} className="text-[#FF7D01] font-medium underline">Try again</button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && favorites.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No favorites yet.</p>
              </div>
            )}

            {/* Content */}
            {!loading && !error && favorites.length > 0 && (
              <div>
                {favorites.map((item) => (
                  <FavoriteItem
                    key={item.id}
                    item={item}
                    type={item.item_type}
                    onRemove={() => handleRemoveFavorite(item.item_type, item.item_id)}
                  />
                ))}

                {/* Show More */}
                {page < totalPages && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => {
                        const nextPage = page + 1;
                        setPage(nextPage);
                        const itemType = activeTab === "stays" ? "stay" : "car_rental";
                        getFavorites(itemType, nextPage, 4).then((res) => {
                          setFavorites((prev) => [...prev, ...res.data.items]);
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

function FavoriteItem({ item, type, onRemove }) {
  const [isRemoving, setIsRemoving] = useState(false);
  const formatPrice = (price) => `₦${Number(price).toLocaleString()}`;

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove();
    }, 400);
  };

  return (
    <div className="mb-8">
      <div className="flex items-start gap-4 mb-4">
        {/* Image */}
        <div className="w-[120px] h-[110px] sm:w-[150px] sm:h-[150px] rounded-2xl overflow-hidden flex-shrink-0">
          {item.item_image ? (
            <img
              src={getMediaUrl(item.item_image)}
              alt={item.item_name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-xs">No image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-gray-900 font-semibold">{item.item_name}</h3>
          <div className="text-sm text-gray-500 mt-1">
            <span>{item.item_location}</span>
          </div>
          {item.item_rating && (
            <div className="mt-2">
              <span className="text-sm font-normal bg-[#FFF1E6] text-[#FF7D01] rounded-full px-2 py-1">
                Rating <span className="font-semibold">{item.item_rating}</span>
              </span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="flex-shrink-0 pr-2">
          <div className="text-2xl font-semibold text-gray-900">{formatPrice(item.item_price)}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleRemove}
          className={`w-14 h-14 flex items-center justify-center rounded-full bg-[#FFF3E6] transition-all duration-300 hover:scale-110 ${isRemoving ? "scale-125" : ""}`}
          style={{ animation: isRemoving ? "heartBeat 0.4s ease-in-out" : "none" }}
          title="Remove from favorites"
        >
          <img
            src={Heart}
            alt="Remove favorite"
            className={`w-5 h-5 transition-all duration-300 ${isRemoving ? "scale-125 opacity-50" : "scale-100 opacity-100"}`}
          />
        </button>

        <button className="px-5 py-5 bg-[#FF7D01]/10 text-[#FF7D01] rounded-full font-medium shadow-sm hover:shadow transition">
          {type === "stay" ? "Reserve This Place" : "Rent Ride"}
        </button>
      </div>

      <style>{`
        @keyframes heartBeat {
          0%   { transform: scale(1); }
          25%  { transform: scale(1.3); }
          50%  { transform: scale(0.9); }
          75%  { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      `}</style>
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