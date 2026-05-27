import React from 'react';

function CriteriaRow({ label, met, temporaryAutoPass = false }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-gray-100 px-3 py-3">
      <div
        className={`mt-0.5 h-5 w-5 flex-shrink-0 rounded-full border flex items-center justify-center ${
          met ? 'bg-[#EBFDF5] border-[#12B76A]/40' : 'bg-[#FEF3F2] border-[#F04438]/30'
        }`}
      >
        {met ? (
          <svg className="h-3.5 w-3.5 text-[#12B76A]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.414 0l-3.25-3.25a1 1 0 111.414-1.42l2.543 2.544 6.543-6.544a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg className="h-3.5 w-3.5 text-[#F04438]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-[#1a174d]">{label}</p>
        {temporaryAutoPass && (
          <p className="mt-1 text-xs text-gray-400">Temporarily auto-passing until Personal Details is completed.</p>
        )}
      </div>
    </div>
  );
}

export default function VendorEligibilityModal({
  isOpen,
  onClose,
  onProceed,
  onGoToDetails,
  onGoToIdVerification,
  criteria = [],
  isVendorVerified = false,
  isPendingApproval = false,
}) {
  if (!isOpen) return null;

  const hasUnmetId = criteria.some((c) => c.key === 'id_verification' && !c.met);
  const hasUnmetEmail = criteria.some((c) => c.key === 'email_verified' && !c.met);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/55 p-4">
      <div className="relative w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl sm:p-7">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
          aria-label="Close vendor eligibility modal"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2 className="pr-8 text-xl font-semibold text-[#1a174d]">Vendor Eligibility Criteria</h2>
        <p className="mt-2 text-sm text-gray-500">
          You must meet these requirements and receive Super Admin approval before listing a stay.
        </p>

        <div className="mt-5 space-y-3">
          {criteria.map((criterion) => (
            <CriteriaRow key={criterion.key} {...criterion} />
          ))}
        </div>

        {!isVendorVerified && (
          <div className="mt-5 rounded-xl border border-[#FFF4ED] bg-[#FFF9F5] p-3">
            <p className="text-xs font-semibold text-[#FF6B00]">
              {isPendingApproval
                ? 'Your vendor request is pending Super Admin approval.'
                : 'You cannot access listing pages until vendor verification is approved.'}
            </p>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {hasUnmetId && (
            <button
              onClick={onGoToIdVerification}
              className="rounded-full border border-[#FF6B00]/30 bg-white px-4 py-2 text-xs font-semibold text-[#FF6B00] hover:bg-[#FFF4ED]"
            >
              Upload ID
            </button>
          )}
          {(hasUnmetEmail || !criteria.find((c) => c.key === 'address_updated')?.met || !criteria.find((c) => c.key === 'phone_updated')?.met) && (
            <button
              onClick={onGoToDetails}
              className="rounded-full border border-[#1a174d]/20 bg-white px-4 py-2 text-xs font-semibold text-[#1a174d] hover:bg-gray-50"
            >
              Update Personal Details
            </button>
          )}
          <div className="ml-auto">
            <button
              onClick={onProceed}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                isVendorVerified ? 'bg-[#FF7D01] text-white hover:bg-[#e76e00]' : 'bg-gray-100 text-gray-400'
              }`}
            >
              {isVendorVerified ? 'Proceed To List Stay' : 'Listing Locked'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
