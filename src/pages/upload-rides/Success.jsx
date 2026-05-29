import React from "react";
import WizardLayout from "../../components/wizard/WizardLayout";
import { useNavigate, Link } from "react-router-dom";

export default function SuccessRide() {
  const navigate = useNavigate();
  return (
    <WizardLayout title="Ride Submitted for Review!" subtitle="Your ride is pending approval. We'll notify you once it's reviewed.">
      <div className="max-w-[560px] mx-auto text-center">
        <div className="rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block"></span>
              Pending Approval
            </span>
          </div>
          <p className="text-sm text-gray-700 mb-4">Our team will review your listing and approve it shortly. You'll be notified once it goes live.</p>
          <div className="flex items-center justify-center gap-3">
            <Link className="rounded-full bg-gray-900 text-white px-5 py-2.5 text-sm hover:bg-gray-800" to="/manage-rides">Go to Manage Rides</Link>
            <button className="rounded-full bg-orange-400 text-white px-5 py-2.5 text-sm hover:bg-orange-500" onClick={()=>navigate("/upload-rides/basic")}>List Another Ride</button>
          </div>
        </div>
      </div>
    </WizardLayout>
  );
}