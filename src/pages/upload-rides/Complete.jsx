import React from "react";
import WizardLayout from "../../components/wizard/WizardLayout";
import { useNavigate, Link } from "react-router-dom";

export default function CompleteRide() {
  const navigate = useNavigate();
  function goNext() { navigate("/upload-rides/success"); }

  return (
    <WizardLayout
      title="Review and Go Live"
      subtitle="Confirm all details and publish your ride so renters can discover it."
      rightCta={<button onClick={goNext} className="rounded-full bg-orange-400 text-white px-5 py-2.5 text-sm hover:bg-orange-500">Publish Ride</button>}
    >
      <div className="max-w-[560px] mx-auto">
        <div className="rounded-2xl shadow-sm border border-gray-100 p-6">
          <p className="text-sm font-medium text-gray-700 mb-4">Final Checks</p>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
            <li>Pickup location is accurate</li>
            <li>Ride photos are clear and recent</li>
            <li>Features and price are correct</li>
          </ul>
        </div>
      </div>
    </WizardLayout>
  );
}