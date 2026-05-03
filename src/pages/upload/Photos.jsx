import React from "react";
import WizardLayout from "../../components/wizard/WizardLayout";
import PhotoUploader from "../../components/wizard/PhotoUploader";
import VideoUploader from "../../components/wizard/VideoUploader";
import { useWizard } from "../../context/WizardContext";
import { useNavigate } from "react-router-dom";
import Upload from "../../assets/icons/25.svg";

export default function Photos() {
  const { state, dispatch } = useWizard();
  const navigate = useNavigate();
  const [showError, setShowError] = React.useState(false);

  function next() {
    if (state.photos.length === 0) { setShowError(true); return; }
    navigate("/upload/features");
  }

  return (
    <WizardLayout
      title="Showcase Its Best Features"
      subtitle="Capture your space's best angles with at most five high-quality photos. Then, add some amenities that make it special. We'll guide you every step of the way."
      rightCta={<button onClick={next} className="rounded-full bg-orange-400 text-white px-5 py-2.5 text-sm hover:bg-orange-500">Next Stage</button>}
    >
      <div className="max-w-[500px] mx-auto">
        <div className="flex py-5 ">
          <img className="w-6 h-10 pr-1" src={Upload} />
          <p className="mt-2 text-sm font-medium text-black">Upload Photos of Your Stay <span className="bg-[#FF7D011A]/10 rounded-full px-2 py-1.5">Max 5MB</span></p>
        </div>
        
        <PhotoUploader
          value={state.photos}
          onChange={(val)=>dispatch({type:"REORDER_PHOTOS", payload: val})}
          showError={showError}
        />

        <div className="flex py-5 ">
          <img className="w-6 h-10 pr-1" src={Upload} />
          <p className="mt-2 text-sm font-medium text-black">Upload a Short Video Tour <span className="bg-[#FF7D011A]/10 rounded-full px-2 py-1.5">Max 20s</span></p>
        </div>

        <VideoUploader
          value={state.video}
          onChange={(val)=>dispatch({ type: "SET_VIDEO", payload: val })}
          showError={false}
        />
      </div>
    </WizardLayout>
  );
}



