import React from "react";
import WizardLayout from "../../components/wizard/WizardLayout";
import { useWizard } from "../../context/WizardContext";
import { useNavigate } from "react-router-dom";

export default function ReviewRide() {
  const { state, dispatch } = useWizard();
  const navigate = useNavigate();

  function goNext() { navigate("/upload-rides/complete"); }

  return (
    <WizardLayout
      title="Set Your Ride Price"
      subtitle="Set a fair and competitive rate that reflects your ride's value."
      rightCta={<button onClick={goNext} className="rounded-full bg-orange-400 text-white px-5 py-2.5 text-sm hover:bg-orange-500">Next Stage</button>}
    >
      <div className="max-w-[440px] mt-8 mx-auto">
        <div className="rounded-2xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm font-medium text-gray-700 mb-4">Ride Price</p>
          <div className="rounded-full border border-gray-200 flex items-center px-4 py-2.5 mb-4">
            <span className="text-gray-600 mr-2">₦</span>
            <input
              type="number"
              min={0}
              value={state.price || 0}
              onChange={(e)=>dispatch({ type: "SET_PRICE", payload: e.target.value })}
              placeholder="Enter Price"
              className="w-full rounded-full outline-none px-2 py-1 bg-transparent"
            />
          </div>
          <div className="divide-y divide-gray-100">
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-gray-600">VAT <span title="VAT in NG is 10%" className="ml-1">ⓘ</span></span>
              <span className="text-sm text-gray-900">₦{Math.round((state.price || 0) * 0.1).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-gray-600">Total With VAT</span>
              <span className="text-sm font-medium text-gray-900">₦{Math.round((state.price || 0) * 1.1).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </WizardLayout>
  );
}