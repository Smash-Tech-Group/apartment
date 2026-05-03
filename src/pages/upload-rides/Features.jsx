import React from "react";
import WizardLayout from "../../components/wizard/WizardLayout";
import AmenityGrid from "../../components/wizard/AmenityGrid";
import { useWizard } from "../../context/WizardContext";
import { useNavigate } from "react-router-dom";

import Airconditioner from "../../assets/feature/airconditioner.svg";
import Wifi from "../../assets/feature/wifi.svg";
import Tv from "../../assets/feature/tv.svg";
import Wardrobe from "../../assets/feature/wardrobe.svg";
import Parker from "../../assets/feature/parker.svg";
import Fan from "../../assets/feature/fan.svg";

const ALL_FEATURES = [
  { key: "ac", label: "Air Conditioning", icon: <img src={Airconditioner} alt="AC" className="w-6 h-6" /> },
  { key: "wifi", label: "Wi‑Fi", icon: <img src={Wifi} alt="Wi‑Fi" className="w-6 h-6" /> },
  { key: "infotainment", label: "Infotainment", icon: <img src={Tv} alt="Infotainment" className="w-6 h-6" /> },
  { key: "extra_storage", label: "Extra Storage", icon: <img src={Wardrobe} alt="Storage" className="w-6 h-6" /> },
  { key: "free_parking", label: "Free Parking", icon: <img src={Parker} alt="Free Parking" className="w-6 h-6" /> },
  { key: "fan", label: "Cabin Fan", icon: <img src={Fan} alt="Fan" className="w-6 h-6" /> },
];

export default function FeaturesRide() {
  const { state, dispatch } = useWizard();
  const navigate = useNavigate();
  const [tab, setTab] = React.useState("All");

  function next() { navigate("/upload-rides/review"); }

  const categories = {
    All: ALL_FEATURES,
    Comfort: ALL_FEATURES.filter(a => ["ac","fan"].includes(a.key)),
    Connectivity: ALL_FEATURES.filter(a => ["wifi","infotainment"].includes(a.key)),
    Utility: ALL_FEATURES.filter(a => ["extra_storage","free_parking"].includes(a.key)),
  };
  const tabs = Object.keys(categories);

  return (
    <WizardLayout
      title="Highlight Ride Features"
      subtitle="Add features that make your ride comfortable, connected, and reliable."
      rightCta={<button onClick={next} className="rounded-full bg-orange-400 text-white px-5 py-2.5 text-sm hover:bg-orange-500">Next Stage</button>}
    >
      <div className="max-w-[500px] mx-auto">
        <p className="text-base font-medium text-gray-700 mb-4">Add Ride Features</p>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`px-1 py-1.5 text-xs transition ${tab===t ? " text-[#FF7D01] font-semibold" : " text-[#333333]/50 font-light"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <AmenityGrid
          items={categories[tab]}
          value={state.features}
          onChange={(val)=>dispatch({type:"SET_FEATURES", payload: val})}
        />
      </div>
    </WizardLayout>
  );
}

