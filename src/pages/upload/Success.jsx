import { useNavigate } from "react-router-dom";
import Success1 from "../../assets/icons/18.svg";
import Logo from "../../assets/icons/logo.svg";

export default function Success() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      <div className="p-6">
        <img src={Logo} alt="Logo" className="h-10 w-auto" />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-6 h-16 w-16 flex items-center justify-center">
            <img src={Success1} alt="Success" />
          </div>
          <h1 className="text-4xl font-semibold text-gray-800 mb-4">Stay Listing Submitted</h1>
          <p className="mb-6 text-sm text-gray-500">
            Your listing is now pending Super Admin approval. It will appear publicly once approved.
          </p>
          <button 
            onClick={() => navigate('/manage-stays')} 
            className="rounded-full bg-[#FF7D01] text-white px-6 py-3 text-sm hover:bg-orange-500"
          >
            Back To Manage Stays
          </button>
        </div>
      </div>
    </div>
  );
}
