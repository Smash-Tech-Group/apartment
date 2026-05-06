import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import { useAuth } from "../../context/AuthContext";
import { apiFetch } from "../../lib/api";
import { getMediaUrl } from "../../lib/api";

export default function AdminFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [topItems, setTopItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [filterUserId, setFilterUserId] = useState("");
  const { loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading) {
      fetchFavorites();
      fetchTopItems();
    }
  }, [authLoading, page]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams({ page, size: 10 });
      if (filterUserId) params.append("user_id", filterUserId);
      const res = await apiFetch(`/favorites/admin/all?${params}`);
      setFavorites(res.data.items);
      setTotalPages(res.data.pages);
      setTotal(res.data.total);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTopItems = async () => {
    try {
      const res = await apiFetch("/favorites/admin/top?limit=5");
      setTopItems(res.data);
    } catch (err) {
      // fail silently
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setPage(1);
    fetchFavorites();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar showNavLinks={false} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-20 sm:pt-28 flex-1 w-full">
        {/* Breadcrumb */}
        <div className="mb-6 text-xs sm:text-sm text-gray-600 bg-[#FF7D011A] w-fit px-3 sm:px-4 py-2 rounded-full flex items-center">
          <Link to="/dashboard" className="font-semibold underline hover:text-gray-900">Dashboard</Link>
          <span className="mx-2">|</span>
          <span className="text-gray-900">Admin — Favorites</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-8">
          Favorites Overview
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-[#FFF1E6] rounded-2xl p-6">
            <p className="text-sm text-gray-500 mb-1">Total Favorites</p>
            <p className="text-3xl font-semibold text-[#FF7D01]">{total}</p>
          </div>
          <div className="bg-[#FFF1E6] rounded-2xl p-6">
            <p className="text-sm text-gray-500 mb-1">Total Pages</p>
            <p className="text-3xl font-semibold text-[#FF7D01]">{totalPages}</p>
          </div>
          <div className="bg-[#FFF1E6] rounded-2xl p-6">
            <p className="text-sm text-gray-500 mb-1">Current Page</p>
            <p className="text-3xl font-semibold text-[#FF7D01]">{page}</p>
          </div>
        </div>

        {/* Top Favorited Items */}
        {topItems.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Favorited Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topItems.map((item, index) => (
                <div key={item.item_id} className="border border-gray-100 rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FF7D01] flex items-center justify-center text-white font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{item.item_name}</p>
                    <p className="text-xs text-gray-500 capitalize">{item.item_type.replace("_", " ")}</p>
                  </div>
                  <div className="text-[#FF7D01] font-bold text-lg flex-shrink-0">
                    {item.count} ♥
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filter by User */}
        <div className="mb-6 flex gap-3">
          <input
            type="text"
            value={filterUserId}
            onChange={(e) => setFilterUserId(e.target.value)}
            placeholder="Filter by User ID..."
            className="border border-gray-200 rounded-full px-4 py-2 text-sm flex-1 max-w-sm focus:outline-none focus:border-[#FF7D01]"
          />
          <button
            onClick={handleFilter}
            className="bg-[#FF7D01] text-white text-sm px-6 py-2 rounded-full hover:bg-orange-500 transition"
          >
            Filter
          </button>
          {filterUserId && (
            <button
              onClick={() => { setFilterUserId(""); setPage(1); fetchFavorites(); }}
              className="text-sm text-gray-500 underline"
            >
              Clear
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 animate-pulse">
                <div className="w-16 h-16 rounded-xl bg-gray-200 flex-shrink-0"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
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
            <button onClick={fetchFavorites} className="text-[#FF7D01] underline">Try again</button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && favorites.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No favorites found.</p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && favorites.length > 0 && (
          <div>
            <div className="overflow-x-auto rounded-2xl border border-gray-100">
              <table className="w-full text-sm">
                <thead className="bg-[#FFF1E6] text-left">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-gray-700">Item</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Type</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Location</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Price</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">User ID</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {favorites.map((fav) => (
                    <tr key={fav.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {fav.item_image ? (
                            <img src={getMediaUrl(fav.item_image)} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-gray-200 flex-shrink-0"></div>
                          )}
                          <span className="font-medium text-gray-900">{fav.item_name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 capitalize text-gray-600">{fav.item_type.replace("_", " ")}</td>
                      <td className="px-4 py-3 text-gray-600">{fav.item_location}</td>
                      <td className="px-4 py-3 text-gray-900 font-medium">₦{Number(fav.item_price).toLocaleString()}</td>
                      <td className="px-4 py-3 text-gray-400 text-xs truncate max-w-[120px]">{fav.user_id}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {new Date(fav.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center gap-4">
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                  className="text-[#FF7D01] font-medium disabled:opacity-40">Previous</button>
                <span className="text-gray-500 text-sm">Page {page} of {totalPages}</span>
                <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
                  className="text-[#FF7D01] font-medium disabled:opacity-40">Next</button>
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