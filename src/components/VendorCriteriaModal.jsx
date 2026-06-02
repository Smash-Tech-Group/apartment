import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../lib/api";
import { useToast } from "./Toast";

/**
 * VendorCriteriaModal
 *
 * Props:
 *   isOpen   : boolean
 *   onClose  : () => void
 */
export default function VendorCriteriaModal({ isOpen, onClose, onVerified }) {
  const navigate   = useNavigate();
  const { showToast } = useToast();

  const [vendorStatus, setVendorStatus] = useState(null);
  const [loading, setLoading]           = useState(true);
  const [submitting, setSubmitting]     = useState(false);

  // Fetch vendor status on open
  const onError = useCallback(() => showToast("Failed to load verification status.", "error"), [showToast]);
  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    apiFetch("/users/me/vendor-status")
      .then((res) => setVendorStatus(res?.data || res))
.catch(onError)
      .finally(() => setLoading(false));
  }, [isOpen, onError]);

  if (!isOpen) return null;

  // -------------------------------------------------------------------------
  // Criteria checks
  // -------------------------------------------------------------------------
  const idUploaded    = !!(vendorStatus?.id_verification_url);
  const emailVerified = !!(vendorStatus?.is_verified);
  const phoneOk       = true;   // auto-pass — Personal Details task pending
  const addressOk     = true;   // auto-pass — Personal Details task pending

  const allCriteriaMet  = idUploaded && emailVerified && phoneOk && addressOk;
  const alreadyPending  = vendorStatus?.id_verification_status === "pending";
  const alreadyApproved = vendorStatus?.vendor_verified === true;

  // -------------------------------------------------------------------------
  // Submit verification request
  // -------------------------------------------------------------------------
  async function handleSubmit() {
    if (!idUploaded) {
      navigate("/upload-id");
      onClose();
      return;
    }
    setSubmitting(true);
    try {
      await apiFetch("/users/request-vendor", { method: "POST" });
      showToast("Verification request submitted! Awaiting admin approval.");
      setVendorStatus((prev) => ({ ...prev, id_verification_status: "pending" }));
    } catch (err) {
      if (err.status === 409) {
        showToast("You are already a verified vendor.", "error");
      } else {
        showToast(err.message || "Submission failed. Please try again.", "error");
      }
    } finally {
      setSubmitting(false);
    }
  }

  // -------------------------------------------------------------------------
  // Render helpers
  // -------------------------------------------------------------------------
  const Tick = ({ ok }) =>
    ok ? (
      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
        <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
    ) : (
      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center">
        <span className="w-2 h-2 rounded-full bg-orange-400" />
      </span>
    );

  const criteria = [
    {
      label: "Government ID uploaded",
      description: "Upload a valid passport, driver's license, or national ID.",
      ok: idUploaded,
      action: !idUploaded ? (
        <button
          onClick={() => { navigate("/upload-id"); onClose(); }}
          className="text-xs text-[#FF7D01] underline font-medium mt-1 inline-block"
        >
          Upload ID →
        </button>
      ) : null,
    },
    {
      label: "Email address verified",
      description: "Check your inbox and click the verification link.",
      ok: emailVerified,
    },
    {
      label: "Phone number added",
      description: "Available once Personal Details is completed.",
      ok: phoneOk,
    },
    {
      label: "Address added",
      description: "Available once Personal Details is completed.",
      ok: addressOk,
    },
  ];

  // -------------------------------------------------------------------------
  // CTA section
  // -------------------------------------------------------------------------
  function renderCTA() {
    if (loading) return null;

    if (alreadyApproved) {
      return (
        <div className="mt-6 p-4 bg-green-50 rounded-2xl text-center">
          <p className="text-green-700 font-medium text-sm">✓ You are a verified vendor!</p>
          <button
            onClick={() => { onClose(); if (onVerified) onVerified(); }}
            className="mt-3 px-6 py-2.5 bg-[#FF7D01] text-white text-sm font-semibold rounded-full hover:bg-[#e76e00] transition-colors"
          >
            Continue to Listing
          </button>
        </div>
      );
    }

    if (alreadyPending) {
      return (
        <div className="mt-6 p-4 bg-orange-50 rounded-2xl text-center">
          <p className="text-orange-700 font-medium text-sm">⏳ Verification Pending</p>
          <p className="text-orange-600 text-xs mt-1">
            Your request has been submitted and is awaiting admin approval. You'll be notified once reviewed.
          </p>
        </div>
      );
    }

    if (allCriteriaMet) {
      return (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-8 py-3 bg-[#FF7D01] text-white text-sm font-semibold rounded-full hover:bg-[#e76e00] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? "Submitting…" : "Submit Verification Request"}
          </button>
        </div>
      );
    }

    return (
      <p className="mt-6 text-center text-xs text-gray-400">
        Complete all requirements above to submit your verification request.
      </p>
    );
  }

  // -------------------------------------------------------------------------
  // Modal
  // -------------------------------------------------------------------------
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 relative shadow-xl max-h-[95vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-900 pr-8 mb-1">
          Become a Verified Vendor
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Complete the following requirements before listing a ride on Smash Apartments.
        </p>

        {/* Criteria list */}
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-7 h-7 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {criteria.map(({ label, description, ok, action }) => (
              <div key={label} className="flex gap-3 items-start p-3 rounded-xl bg-gray-50">
                <Tick ok={ok} />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${ok ? "text-gray-700" : "text-gray-900"}`}>
                    {label}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{description}</p>
                  {action}
                </div>
              </div>
            ))}
          </div>
        )}

        {renderCTA()}
      </div>
    </div>
  );
}