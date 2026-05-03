import React from "react";
import WizardLayout from "../../components/wizard/WizardLayout";
import AmenityGrid from "../../components/wizard/AmenityGrid";
import { useWizard } from "../../context/WizardContext";
import { useNavigate } from "react-router-dom";

import Airconditioner from "../../assets/feature/airconditioner.svg";
import Balcony from "../../assets/feature/balcony.svg";
import Blender from "../../assets/feature/blender.svg";
import Coffee from "../../assets/feature/coffee.svg";
import Cup from "../../assets/feature/cup.svg";
import Cutlery from "../../assets/feature/cutlery.svg";
import Electric from "../../assets/feature/electric.svg";
import Essentials from "../../assets/feature/essentials.svg";
import Fan from "../../assets/feature/fan.svg";
import Fire from "../../assets/feature/fire.svg";
import Fridge from "../../assets/feature/fridge.svg";
import Glass from "../../assets/feature/glass.svg";
import Hair from "../../assets/feature/hair.svg";
import Hanger from "../../assets/feature/hanger.svg";
import Hot from "../../assets/feature/hot.svg";
import Kettle from "../../assets/feature/kettle.svg";
import Microwave from "../../assets/feature/microwave.svg";
import Oven from "../../assets/feature/oven.svg";
import Oven2 from "../../assets/feature/oven2.svg";
import Parker from "../../assets/feature/parker.svg";
import Plates from "../../assets/feature/plates.svg";
import Soap from "../../assets/feature/soap.svg";
import Sweeper from "../../assets/feature/sweeper.svg";
import Swimming from "../../assets/feature/swimming.svg";
import Tissue from "../../assets/feature/tissue.svg";
import Toaster from "../../assets/feature/toaster.svg";
import Towels from "../../assets/feature/towels.svg";
import Tv from "../../assets/feature/tv.svg";
import Wardrobe from "../../assets/feature/wardrobe.svg";
import Washing from "../../assets/feature/washing.svg";
import Wifi from "../../assets/feature/wifi.svg";






const ALL_AMENITIES = [
  { key: "free_parking", label: "Free Parking", icon: <img src={Parker} alt="Free Parking" className="w-6 h-6" /> },
  { key: "hot_water", label: "Hot Water", icon: <img src={Hot} alt="Hot Water" className="w-6 h-6" /> },
  { key: "water_kettle", label: "Water Kettle", icon: <img src={Kettle} alt="Water Kettle" className="w-6 h-6" /> },
  { key: "swimming_pool", label: "Swimming Pool", icon: <img src={Swimming} alt="Swimming Pool" className="w-6 h-6" /> },
  { key: "washing_machine", label: "Washing Machine", icon: <img src={Washing} alt="Washing Machine" className="w-6 h-6" /> },
  { key: "oven", label: "Oven", icon: <img src={Oven} alt="Oven" className="w-6 h-6" /> },
  { key: "towels", label: "Towels", icon: <img src={Towels} alt="Towels" className="w-6 h-6" /> },
  { key: "balcony", label: "Balcony", icon: <img src={Balcony} alt="Balcony" className="w-6 h-6" /> },
  { key: "fan", label: "Fan", icon: <img src={Fan} alt="Fan" className="w-6 h-6" /> },
  { key: "sweeper", label: "Sweeper", icon: <img src={Sweeper} alt="Sweeper" className="w-6 h-6" /> },
  { key: "toaster", label: "Toaster", icon: <img src={Toaster} alt="Toaster" className="w-6 h-6" /> },
  { key: "soap", label: "Soap", icon: <img src={Soap} alt="Soap" className="w-6 h-6" /> },
  { key: "smart_tv", label: "Smart TV", icon: <img src={Tv} alt="Smart TV" className="w-6 h-6" /> },
  { key: "hair_dryer", label: "Hair Dryer", icon: <img src={Hair} alt="Hair Dryer" className="w-6 h-6" /> },
  { key: "microwave", label: "Microwave", icon: <img src={Microwave} alt="Microwave" className="w-6 h-6" /> },
  { key: "coffee_maker", label: "Coffee Maker", icon: <img src={Coffee} alt="Coffee Maker" className="w-6 h-6" /> },
  { key: "essentials", label: "Essentials", icon: <img src={Essentials} alt="Essentials" className="w-6 h-6" /> },
  { key: "wifi", label: "Wifi", icon: <img src={Wifi} alt="Wifi" className="w-6 h-6" /> },
  { key: "fridge", label: "Fridge", icon: <img src={Fridge} alt="Fridge" className="w-6 h-6" /> },
  { key: "blender", label: "Blender", icon: <img src={Blender} alt="Blender" className="w-6 h-6" /> },
  { key: "hangers", label: "Hangers", icon: <img src={Hanger} alt="Hangers" className="w-6 h-6" /> },
  { key: "tissue", label: "Tissue", icon: <img src={Tissue} alt="Tissue" className="w-6 h-6" /> },
  { key: "cutlery", label: "Cutlery", icon: <img src={Cutlery} alt="Cutlery" className="w-6 h-6" /> },
  { key: "wine_glasses", label: "Wine Glasses", icon: <img src={Glass} alt="Wine Glasses" className="w-6 h-6" /> },
  { key: "plates", label: "Plates", icon: <img src={Plates} alt="Plates" className="w-6 h-6" /> },
  { key: "wardrobe", label: "Wardrobe", icon: <img src={Wardrobe} alt="Wardrobe" className="w-6 h-6" /> },
  { key: "air_conditioner", label: "Air Conditioner", icon: <img src={Airconditioner} alt="Air Conditioner" className="w-6 h-6" /> },
  { key: "electric_cooker", label: "Electric Cooker", icon: <img src={Electric} alt="Electric Cooker" className="w-6 h-6" /> },
  { key: "fire_extinguisher", label: "Fire Extinguisher", icon: <img src={Fire} alt="Fire Extinguisher" className="w-6 h-6" /> },
  { key: "tea_cups", label: "Tea Cups", icon: <img src={Cup} alt="Tea Cups" className="w-6 h-6" /> },
];

export default function Features() {
  const { state, dispatch } = useWizard();
  const navigate = useNavigate();
  const [tab, setTab] = React.useState("All");

  function next() { navigate("/upload/review"); }

  const categories = {
    All: ALL_AMENITIES,
    Electronics: ALL_AMENITIES.filter(a => ["smart_tv","microwave","fridge","wifi","fan","air_conditioner"].includes(a.key)),
    Toiletries: ALL_AMENITIES.filter(a => ["towels","soap","tissue","hair_dryer"].includes(a.key)),
    Utensils: ALL_AMENITIES.filter(a => ["toaster","coffee_maker","blender","cutlery","plates","wine_glasses","tea_cups"].includes(a.key)),
    Safety: ALL_AMENITIES.filter(a => ["fire_extinguisher"].includes(a.key)),
    More: ALL_AMENITIES.filter(a => ["balcony","wardrobe","essentials","hangers","sweeper","washing_machine","oven","free_parking","hot_water","water_kettle","swimming_pool","electric_cooker"].includes(a.key)),
  };
  const tabs = Object.keys(categories);

  return (
    <WizardLayout
      title="Showcase Its Best Features"
      subtitle="Capture your space's best angles with at least five high-quality photos. Then, add some amenities that make it special. We'll guide you every step of the way."
      rightCta={<button onClick={next} className="rounded-full bg-orange-400 text-white px-5 py-2.5 text-sm hover:bg-orange-500">Next Stage</button>}
    >
      <div className="max-w-[500px] mx-auto">
        <p className="text-base font-medium text-gray-700 mb-4">Add Stay Amenities</p>
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



