import React from "react";
import WizardLayout from "../../components/wizard/WizardLayout";
import { useNavigate, Link } from "react-router-dom";

export default function SuccessRide() {
  const navigate = useNavigate();
  return (
    <WizardLayout title="Your Ride Is Live!" subtitle="Great job—your ride is now published and ready to be booked.">
      <div className="max-w-[560px] mx-auto text-center">
        <div className="rounded-2xl shadow-sm border border-gray-100 p-8">
          <p className="text-sm text-gray-700 mb-4">We’ll notify you when someone books your ride.</p>
          <div className="flex items-center justify-center gap-3">
            <Link className="rounded-full bg-gray-900 text-white px-5 py-2.5 text-sm hover:bg-gray-800" to="/manage-rides">Go to Manage Rides</Link>
            <button className="rounded-full bg-orange-400 text-white px-5 py-2.5 text-sm hover:bg-orange-500" onClick={()=>navigate("/upload-rides/basic")}>List Another Ride</button>
          </div>
        </div>
      </div>
    </WizardLayout>
  );
}


