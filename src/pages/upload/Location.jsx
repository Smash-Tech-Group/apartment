import React from "react";
import WizardLayout from "../../components/wizard/WizardLayout";
import { Input } from "../../components/wizard/Field";
import { useWizard } from "../../context/WizardContext";
import { useNavigate } from "react-router-dom";

export default function Location() {
  const { state, dispatch } = useWizard();
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState({});

  function next() {
    const e = {};
    if (!state.basicInfo.location) e.location = "Required";
    setErrors(e);
    if (Object.keys(e).length === 0) navigate("/upload/photos");
  }

  function inc(key, delta) {
    const next = Math.max(0, (state.basicInfo.guests?.[key] || 0) + delta);
    dispatch({ type: "SET_BASIC", payload: { guests: { ...state.basicInfo.guests, [key]: next } } });
  }

  return (
    <WizardLayout
      title="Describe Your Space"
      subtitle="Kindly share the exact location of your stay, along with details on how many guests it can comfortably accommodate."
      rightCta={<button onClick={next} className="rounded-full bg-orange-400 text-white px-5 py-2.5 text-sm hover:bg-orange-500">Next Stage</button>}
    >
      <div className="max-w-[500px] mx-auto">
  <div className="rounded-2xl shadow-sm border border-gray-100 p-6 bg-white">
    <div className="flex items-center justify-between mb-4">
      <p className="text-sm font-semibold text-gray-800">Confirm Your Location</p>
      <button type="button" className="text-gray-400 hover:text-gray-600">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>

    <div className="relative mb-6 w-full">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10.625C11.0355 10.625 11.875 9.78553 11.875 8.75C11.875 7.71447 11.0355 6.875 10 6.875C8.96447 6.875 8.125 7.71447 8.125 8.75C8.125 9.78553 8.96447 10.625 10 10.625Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 17.5C10 17.5 16.25 13.125 16.25 8.75C16.25 5.29822 13.4518 2.5 10 2.5C6.54822 2.5 3.75 5.29822 3.75 8.75C3.75 13.125 10 17.5 10 17.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <input
        type="text"
        id="location"
        placeholder="Enter Stay Location"
        value={state.basicInfo.location}
        aria-invalid={!!errors.location}
        onChange={(e)=>dispatch({type:"SET_BASIC", payload:{ location: e.target.value }})}
        className={`placeholder:text-xs text-xs md:text-base w-full pl-10 sm:pl-12 pr-32 sm:pr-44 py-4 sm:py-5 rounded-full border ${errors.location ? 'border-red-300' : 'border-gray-200'} bg-white text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all`}
      />
      <button 
        type="button" 
        className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 rounded-full px-3 py-2 sm:px-5 sm:py-3 bg-gray-900 text-white text-[10px] sm:text-xs font-medium hover:bg-gray-800 transition-colors whitespace-nowrap"
      >
        Use Current Location
      </button>
    </div>

    <div className="border-t border-gray-100 pt-6">
      <p className="text-sm font-semibold text-gray-800 mb-4">Select Number of Guests</p>
      <div className="grid grid-cols-3 gap-1 max-[640px]:grid-cols-1">
        {[
          { key: "adults", label: "Adult", hint: "12+ Years" },
          { key: "children", label: "Children", hint: "2-12 Years" },
          { key: "infants", label: "Infant", hint: "< 2 Years" },
        ].map((g) => (
          <div key={g.key} className=" p-1">
            <div className="flex gap-x-2 justify-center items-center text-center mb-3">
              <p className="text-sm font-medium text-gray-800 mb-0.5">{g.label}</p>
              <p className="text-xs text-gray-500">{g.hint}</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <button 
                type="button" 
                onClick={()=>inc(g.key,-1)} 
                className="h-10 w-10 rounded-full bg-[#FFF1E7] text-gray-700 flex items-center justify-center hover:bg-[#FFE5D2] transition-colors"
              >
                −
              </button>
              <span className="w-6 text-center text-sm font-medium text-gray-800">{state.basicInfo.guests?.[g.key] || 0}</span>
              <button 
                type="button" 
                onClick={()=>inc(g.key,1)} 
                className="h-10 w-10 rounded-full bg-[#FFF1E7] text-gray-700 flex items-center justify-center hover:bg-[#FFE5D2] transition-colors"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
    </WizardLayout>
  );
}


