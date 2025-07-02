import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userRegister } from "../Api/Client/Endpoints/Authentication/RegistrationUser";
import { RegisterPayload } from "../Types/RegisterPayload";

type UserRole = "Landlord" | "Tenant";

function RegisterForm() {
  const { role: routeRole } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>(
    routeRole === "Landlord" ? "Landlord" : "Tenant"
  );
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      return setError("Hesla se neshodují.");
    }
    const registerRequest: RegisterPayload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      role: role,
    };

    try {
      const response = await userRegister(registerRequest);
      console.log("Request", Request);
      console.log("Response", response);

      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err: any) {
      console.error(err);
      setError("Registrace se nezdařila. Zkuste to znovu.");
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="space-y-4 bg-white p-6 rounded-xl shadow max-w-sm mx-auto">
      <h2 className="text-xl font-bold text-center">Registrace</h2>

      {error && <p className="text-sm text-red-600 text-center">{error}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-700">Jméno</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Příjmení
        </label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Heslo</label>
        <input
          type="password"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Potvrdit heslo
        </label>
        <input
          type="password"
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as UserRole)}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2">
          <option value="Tenant">Nájemce</option>
          <option value="Landlord">Pronajímatel</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary-dark">
        Registrovat se
      </button>
    </form>
  );
}

export default RegisterForm;
