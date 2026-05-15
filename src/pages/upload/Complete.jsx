import React, { useState } from "react";
import WizardLayout from "../../components/wizard/WizardLayout";
import { Input, Select } from "../../components/wizard/Field";
import { useWizard } from "../../context/WizardContext";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../lib/api";
import { useToast } from "../../components/Toast";
import { Loader2 } from "lucide-react";

const BANKS = [
  "Select Bank", "Access Bank", "GTBank", "UBA", "Zenith Bank",
  "First Bank", "Fidelity Bank", "Sterling Bank", "Wema Bank", "Polaris Bank",
];

export default function Complete() {
  const { state, dispatch } = useWizard();
  const navigate            = useNavigate();
  const { showToast }       = useToast();
  const [errors, setErrors]         = useState({});
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const e = {};
    if (!state.payout.accountNumber) e.accountNumber = "Required";
    if (!state.payout.bank || state.payout.bank === "Select Bank") e.bank = "Required";
    if (!state.payout.accountName) e.accountName = "Required";
    return e;
  }

  function buildPayload() {
    const { basicInfo, features, photos, video, price, payout } = state;
    return {
      name:        basicInfo.name || basicInfo.location,
      type:        basicInfo.type,
      location:    basicInfo.location,
      description: basicInfo.description || "",
      beds:        basicInfo.beds  || 1,
      baths:       basicInfo.baths || 1,
      guests:      basicInfo.guests || { adults: 0, children: 0, infants: 0 },
      price:       Number(price || 0),
      // photos is now [{id, url, filename}] where url = Cloudinary URL
      photos:      photos.map((p) => p.url),
      video_url:   video?.url || null,
      // features is { amenity_key: true/false } — send only truthy keys
      amenities:   Object.entries(features || {}).filter(([, v]) => v).map(([k]) => k),
      payout_account: payout.accountNumber,
      payout_bank:    payout.bank,
      payout_name:    payout.accountName,
    };
  }

  async function finish() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSubmitting(true);
    try {
      await apiFetch("/properties", {
        method: "POST",
        body:   JSON.stringify(buildPayload()),
      });

      dispatch({ type: "RESET" });
      showToast("Your listing is live! 🎉");
      navigate("/upload/success");
    } catch (err) {
      if (err.status === 409) {
        showToast("You already have a listing with this name and location.", "error");
      } else {
        showToast(err.message || "Something went wrong. Please try again.", "error");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <WizardLayout
      title="Complete Your Setup"
      subtitle="Just one last step! Enter your account details so we can send you your earnings."
      rightCta={
        <button
          onClick={finish}
          disabled={submitting}
          className="rounded-full bg-orange-400 text-white px-5 py-2.5 text-sm hover:bg-orange-500 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
        >
          {submitting ? <><Loader2 size={16} className="animate-spin" /> Saving…</> : "Finish Setup"}
        </button>
      }
    >
      <div className="max-w-[460px] mx-auto">
        <div className="rounded-2xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm font-medium text-gray-700 mb-4">Account Information</p>
          <div className="space-y-4">
            <Input
              placeholder="Enter Account Number"
              value={state.payout.accountNumber}
              invalid={!!errors.accountNumber}
              onChange={(e) => dispatch({ type: "SET_PAYOUT", payload: { accountNumber: e.target.value } })}
            />
            {errors.accountNumber && <p className="text-xs text-red-500 -mt-2">{errors.accountNumber}</p>}

            <Select
              value={state.payout.bank || "Select Bank"}
              invalid={!!errors.bank}
              onChange={(e) => dispatch({ type: "SET_PAYOUT", payload: { bank: e.target.value } })}
            >
              {BANKS.map((b) => <option key={b} value={b}>{b}</option>)}
            </Select>
            {errors.bank && <p className="text-xs text-red-500 -mt-2">{errors.bank}</p>}

            <Input
              placeholder="Enter Account Name"
              value={state.payout.accountName}
              invalid={!!errors.accountName}
              onChange={(e) => dispatch({ type: "SET_PAYOUT", payload: { accountName: e.target.value } })}
            />
            {errors.accountName && <p className="text-xs text-red-500 -mt-2">{errors.accountName}</p>}
          </div>
        </div>
      </div>
    </WizardLayout>
  );
}