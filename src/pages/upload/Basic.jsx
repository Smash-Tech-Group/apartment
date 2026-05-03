import React from "react";
import WizardLayout from "../../components/wizard/WizardLayout";
import { Select } from "../../components/wizard/Field";
import { useWizard } from "../../context/WizardContext";
import { useNavigate } from "react-router-dom";
import Studio from "../../assets/icons/22.svg";
import Duplex from "../../assets/icons/23.svg";
import Bungalow from "../../assets/icons/24.svg";
export default function Basic() {
  const { state, dispatch } = useWizard();
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState({});

  function next() {
    const e = {};
    if (!state.basicInfo.type) e.type = "Required";
    setErrors(e);
    if (Object.keys(e).length === 0) navigate("/upload/location");
  }

  return (
    <WizardLayout
      title="Describe Your Space"
      subtitle="Select the property type and provide details like room and bathroom count to accurately represent your space."
      rightCta={<button onClick={next} className="rounded-full bg-orange-400 text-white px-5 py-2.5 text-sm hover:bg-orange-500">Next Stage</button>}
    >
      <div className="max-w-[620px] mx-auto">
        <div className="grid grid-cols-3 gap-2 mb-6 max-[900px]:grid-cols-2 max-[520px]:grid-cols-1">
          {[
            { key: "studio", label: "Studio Apartments", icon: Studio },
            { key: "duplex", label: "Duplex", icon: Duplex },
            { key: "bungalow", label: "Bungalow", icon: Bungalow },
          ].map((t) => (
            
            <button
              key={t.key}
              type="button"
              onClick={() => dispatch({ type: "SET_BASIC", payload: { type: t.key } })}
              className={`rounded-xl border px-6 py-6 flex flex-col items-start text-center text-xs font-semibold text-gray-800 hover:border-orange-300 transition ${
                state.basicInfo.type === t.key ? "border-orange-400 bg-orange-50" : "border-gray-200"
              }`}
            >
              <img src={t.icon} alt={t.label} className="w-8 h-8 mb-3" />
              {t.label}
            </button>
          ))}
        </div>

        <div className="max-w-[480px]  mx-auto rounded-2xl shadow-sm border border-gray-100 p-5">
          <p className="text-md font-semibold text-gray-700 mb-3">Provide Space Information</p>
          <div className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Select value={state.basicInfo.beds} onChange={(e)=>dispatch({type:"SET_BASIC", payload:{ beds: Number(e.target.value) }})}>
                  {Array.from({length:6}).map((_,i)=> <option key={i+1} value={i+1}>{i+1} Bed</option>)}
                </Select>
              </div>
              <div>
                <Select value={state.basicInfo.baths} onChange={(e)=>dispatch({type:"SET_BASIC", payload:{ baths: Number(e.target.value) }})}>
                  {Array.from({length:6}).map((_,i)=> <option key={i+1} value={i+1}>{i+1} Bath</option>)}
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WizardLayout>
  );
}



