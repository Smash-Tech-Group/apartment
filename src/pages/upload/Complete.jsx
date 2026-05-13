import React from "react";
import WizardLayout from "../../components/wizard/WizardLayout";
import { Input, Select } from "../../components/wizard/Field";
import { useWizard } from "../../context/WizardContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/Toast";
import { apiFetch } from "../../lib/api";


const BANKS = ["Select Bank","Access Bank","GTBank","UBA","Zenith Bank","First Bank"];

export default function Complete() {
  const { state, dispatch } = useWizard();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function finish() {
    const e = {};
    if (!state.payout.accountNumber) e.accountNumber = "Required";
    if (!state.payout.bank || state.payout.bank === "Select Bank") e.bank = "Required";
    if (!state.payout.accountName) e.accountName = "Required";
    setErrors(e);

    if (Object.keys(e).length === 0) {
      setIsSubmitting(true);
      try {
        const payload = {
          name: state.basicInfo.name || `${state.basicInfo.type.charAt(0).toUpperCase() + state.basicInfo.type.slice(1)} in ${state.basicInfo.location || 'Unknown'}`,
          type: state.basicInfo.type,
          location: state.basicInfo.location,
          description: state.basicInfo.description,
          beds: state.basicInfo.beds,
          baths: state.basicInfo.baths,
          adults: state.basicInfo.guests?.adults || 0,
          children: state.basicInfo.guests?.children || 0,
          infants: state.basicInfo.guests?.infants || 0,
          images: state.photos.map(p => p.url),
          video: state.video,
          features: state.features,
          price: state.price,
          account_number: state.payout.accountNumber,
          bank: state.payout.bank,
          account_name: state.payout.accountName
        };

        const res = await apiFetch('/apartments', {
          method: 'POST',
          body: JSON.stringify(payload)
        });

        if (res.success) {
          showToast("Apartment listing created successfully!");
          dispatch({ type: "RESET" });
          navigate("/upload/success");
        } else {
          showToast(res.message || "Failed to create listing", "error");
        }
      } catch (err) {
        showToast(err.message || "An error occurred while submitting", "error");
      } finally {
        setIsSubmitting(false);
      }
    }
  }


  return (
    <WizardLayout
      title="Complete Your Setup"
      subtitle="Just one last step! Enter your account details so we can send you your earnings."
      rightCta={<button onClick={finish} className="rounded-full bg-orange-400 text-white px-5 py-2.5 text-sm hover:bg-orange-500">Finish Setup</button>}
    >
      <div className="max-w-[460px] mx-auto">
        <div className="rounded-2xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm font-medium text-gray-700 mb-4">Account Information</p>
          <div className="space-y-4">
            <Input
              placeholder="Enter Account Number"
              value={state.payout.accountNumber}
              invalid={!!errors.accountNumber}
              onChange={(e)=>dispatch({ type: "SET_PAYOUT", payload: { accountNumber: e.target.value } })}
            />
            <Select
              value={state.payout.bank || "Select Bank"}
              invalid={!!errors.bank}
              onChange={(e)=>dispatch({ type: "SET_PAYOUT", payload: { bank: e.target.value } })}
            >
              {BANKS.map((b)=> <option key={b} value={b}>{b}</option>)}
            </Select>
            <Input
              placeholder="Enter Account Name"
              value={state.payout.accountName}
              invalid={!!errors.accountName}
              onChange={(e)=>dispatch({ type: "SET_PAYOUT", payload: { accountName: e.target.value } })}
            />
          </div>
        </div>
      </div>
    </WizardLayout>
  );
}


