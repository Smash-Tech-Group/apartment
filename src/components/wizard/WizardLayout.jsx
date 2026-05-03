import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import Logo from "../../assets/icons/logo.svg";

const steps = [
  "/upload/basic",
  "/upload/location",
  "/upload/photos",
  "/upload/features",
  "/upload/review",
  "/upload/complete",
];
const rideSteps = [
  "/upload-rides/basic",
  "/upload-rides/location",
  "/upload-rides/photos",
  "/upload-rides/features",
  "/upload-rides/review",
  "/upload-rides/complete",
];

function computeProgress(pathname) {
  const inStay = steps.findIndex((s) => pathname.startsWith(s));
  if (inStay !== -1) return ((inStay + 1) / steps.length) * 100;
  const inRide = rideSteps.findIndex((s) => pathname.startsWith(s));
  if (inRide !== -1) return ((inRide + 1) / rideSteps.length) * 100;
  return 0;
}

export default function WizardLayout({ title, subtitle, children, rightCta }) {
  const location = useLocation();
  const navigate = useNavigate();
  const progress = computeProgress(location.pathname);

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-6 px-6">
        <div className="max-w-[1040px] mx-auto">
          <ProgressBar progress={progress} />
        </div>
      </div>
      <div className="px-6">
        <div className="max-w-[1040px] mx-auto flex items-start justify-between mt-6">
          <div className="flex flex-col items-start gap-5">
            <div><img src={Logo} /></div>
            <button onClick={() => navigate(-1)} className="text-md font-semibold text-gray-700 hover:text-gray-900">Back</button>
          </div>
          {rightCta}
        </div>
        <div className="max-w-[1040px] mx-auto mt-6">
          {title && (
            <div className="mb-6 flex flex-col items-center">
              <div className="text-left">
                <h1 className="text-4xl font-semibold tracking-tight text-gray-800">{title}</h1>
                {subtitle && (
                  <p className=" mt-2 text-md font-extralight text-black max-w-[480px] self-auto leading-relaxed">{subtitle}</p>
                )}

              </div>
              
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}



