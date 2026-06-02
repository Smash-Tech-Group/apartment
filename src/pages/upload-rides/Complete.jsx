import React, { useState } from "react";
import WizardLayout from "../../components/wizard/WizardLayout";
import { useNavigate } from "react-router-dom";
import { useWizard } from "../../context/WizardContext";
import { apiFetch } from "../../lib/api";
import { ALL_FEATURES } from "./Features";

export default function CompleteRide() {
  const navigate = useNavigate();
  const { state, dispatch } = useWizard();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function goNext() {
    if (loading) return;
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("ride_type", state.basicInfo.type || "sedan");
      formData.append("seat_count", String(state.basicInfo.seats || 1));
      formData.append("door_count", String(state.basicInfo.doors || 4));
      formData.append("pickup_location", state.basicInfo.location || "");
      formData.append("pickup_latitude", String(state.basicInfo.latitude || ""));
      formData.append("pickup_longitude", String(state.basicInfo.longitude || ""));
      
      const guests = state.basicInfo.guests || {};
      formData.append("adult_passenger_count", String(guests.adults || 0));
      formData.append("children_passenger_count", String(guests.children || 0));
      formData.append("infant_passenger_count", String(guests.infants || 0));
      
      const featuresArray = ALL_FEATURES.filter(f => state.features[f.key]).map(f => ({
        name: f.label,
        category: f.category
      }));
      formData.append("features", JSON.stringify(featuresArray));
      formData.append("price", String(state.price || 0));
      formData.append("currency", "NGN");

      // Photos are already uploaded to Cloudinary — send URLs
      const photoUrls = (state.photos || []).map(p => p.url).filter(Boolean);
      if (photoUrls.length === 0) {
        throw new Error("You must upload at least 1 photo.");
      }
      formData.append("photo_urls", JSON.stringify(photoUrls));

      // Video URL (already uploaded to Cloudinary)
      if (state.video?.url) {
        formData.append("video_url", state.video.url);
      }

      await apiFetch("/rides", {
        method: "POST",
        body: formData,
      });

      dispatch({ type: "RESET" });
      navigate("/upload-rides/success");
    } catch (err) {
      console.error("Submission error:", err);
      if (err.status === 409) {
        setError("You have already listed this ride.");
      } else if (err.status === 401) {
        setError("Your session has expired. Please log in again.");
      } else if (err.status === 400) {
        const msg = err.message?.toLowerCase() || "";
        if (msg.includes("photo")) {
          setError("You must upload at-least 1 photo.");
        } else if (msg.includes("media") || msg.includes("format")) {
          setError("Please upload a valid image or video file.");
        } else if (msg.includes("large") || msg.includes("size")) {
          setError("File too large. Maximum size is 5MB for photos.");
        } else {
          setError(err.message || "Invalid submission. Please check your details.");
        }
      } else if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
        setError("Network error. Please check your connection and try again.");
      } else if (err.status >= 500) {
        setError("We couldn't upload your media. Please try again.");
      } else {
        setError(err.message || "An error occurred during submission.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <WizardLayout
      title="Review and Submit"
      subtitle="Confirm all details and submit your ride for admin review."
      rightCta={
        <button 
          onClick={goNext} 
          disabled={loading}
          className="rounded-full bg-orange-400 text-white px-8 py-3 text-sm font-semibold hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : "Submit for Review"}
        </button>
      }
    >
      <div className="max-w-[560px] mx-auto pb-12">
        {error && (
          <div className="mb-6 p-4 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100 flex items-start gap-3 animate-shake">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {error}
          </div>
        )}
        <div className="rounded-2xl shadow-sm border border-gray-100 p-8 bg-white">
          <p className="text-lg font-semibold text-gray-900 mb-6">Final Verification</p>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-green-500 flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Pickup Location</p>
                <p className="text-xs text-gray-500">{state.basicInfo.location || "Not set"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-green-500 flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Ride Photos</p>
                <p className="text-xs text-gray-500">{state.photos?.length || 0} photos uploaded</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-green-500 flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Price and Details</p>
                <p className="text-xs text-gray-500">₦{Number(state.price || 0).toLocaleString()} • {state.basicInfo.type || "sedan"}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-orange-50 rounded-xl border border-orange-100">
            <p className="text-xs text-orange-800 leading-relaxed">
              By clicking "Submit for Review", you agree to our Terms of Use and confirm that you have the legal right to list this vehicle.
            </p>
          </div>
        </div>
      </div>
    </WizardLayout>
  );
}