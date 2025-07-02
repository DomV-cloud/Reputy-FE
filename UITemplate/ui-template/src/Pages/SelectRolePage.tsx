// src/Pages/Auth/Register/SelectRolePage.tsx

import { useNavigate } from "react-router-dom";

function SelectRolePage() {
  const navigate = useNavigate();

  const handleSelect = (role: "Tenant" | "Landlord") => {
    navigate(`/register/${role}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Zaregistrujte se jako
      </h1>

      <div className="flex gap-4">
        <button
          onClick={() => handleSelect("Tenant")}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark">
          Nájemce
        </button>

        <button
          onClick={() => handleSelect("Landlord")}
          className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark">
          Pronajímatel
        </button>
      </div>
    </div>
  );
}

export default SelectRolePage;
