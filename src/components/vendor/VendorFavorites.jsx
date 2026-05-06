import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import { useAuth } from "../../context/AuthContext";
import { apiFetch, getMediaUrl } from "../../lib/api";
import { ChevronDown } from "lucide-react";

export default function VendorFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const { loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading) fetchFavorites();
  }, [authLoading]);

  const fetchFavorites = async (append = false) => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiFetch(`/favorites/vendor/listings?page=${page}&size=10`);
      setFavorites(prev => append ? [...prev, ...res.data.items] : res.data.items);
      setTotalPages(res.data.pages);
      setTotal(res.data.total);
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
          <Link to="/dashboard" className="font-semibold underline hover:text-gray-900">Dashboard</Link>
          <span className="mx-2">|</span>
          <span className="text-gray-900">My Favorited Listings</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900">
            Favorited Listings
          </h1>
          <div className="bg-[#FFF1E6] px-4 py-2 rounded-full">
            <span className="text-[#FF7D01] font-semibold">{total}</span>
            <span className="text-gray-500 text-sm ml-1">total favorites</span>
          </div>
        </div>

        {/* Loading */}
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

        {/* Error */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-500 mb-4">{error}</p>
            <button onClick={() => fetchFavorites()} className="text-[#FF7D01] underline">Try again</button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && favorites.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">None of your listings have been favorited yet.</p>
          </div>
        )}

        {/* List */}
        {!loading && !error && favorites.length > 0 && (
          <div>
            <div className="space-y-6">
              {favorites.map((fav) => (
                <div key={fav.id} className="flex items-start gap-4 pb-6 border-b border-gray-100">
                  <div className="w-[120px] h-[110px] sm:w-[150px] sm:h-[150px] rounded-2xl overflow-hidden flex-shrink-0">
                    {fav.item_image ? (
                      <img src={getMediaUrl(fav.item_image)} alt={fav.item_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No image</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{fav.item_name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{fav.item_location}</p>
                    <div className="mt-2">
                      <span className="text-xs bg-[#FFF1E6] text-[#FF7D01] px-2 py-1 rounded-full capitalize">
                        {fav.item_type.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Favorited on {new Date(fav.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>

                  <div className="text-xl font-semibold text-gray-900 flex-shrink-0">
                    ₦{Number(fav.item_price).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Show More */}
            {page < totalPages && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => {
                    const nextPage = page + 1;
                    setPage(nextPage);
                    apiFetch(`/favorites/vendor/listings?page=${nextPage}&size=10`).then(res => {
                      setFavorites(prev => [...prev, ...res.data.items]);
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
      </main>

      <footer className="mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
            <p><b>©</b> 2025 Smash Apartments. All Rights Reserved</p>
            <span className="hidden sm:inline">•</span>
            <p className="cursor-pointer hover:text-gray-900">Privacy Policy</p>
            <span className="hidden sm:inline">•</span>
            <p className="cursor-pointer hover:text-gray-900">Terms of Use</p>
          </div>
        </div>
      </footer>
    </div>
  );
}