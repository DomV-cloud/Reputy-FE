import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../Api/Client/Endpoints/Authentication/LoginUser";
import { useUser } from "../Context/UserContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await userLogin(email, password);

      const {
        firstName,
        lastName,
        userEmail,
        token,
        role,
        rating,
        profileImageUrl,
      } = response.data;

      localStorage.setItem("token", token);
      setUser({
        firstName,
        lastName,
        userEmail,
        role,
        rating,
        profileImageUrl,
      });

      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Neplatný email nebo heslo.");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="space-y-4 bg-white p-6 rounded-xl shadow max-w-sm mx-auto">
      <h2 className="text-xl font-bold text-center">Přihlášení</h2>

      {error && <div className="text-red-500 text-sm text-center">{error}</div>}

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-primary focus:border-primary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Heslo</label>
        <input
          type="password"
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-primary focus:border-primary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary-dark">
        Přihlásit se
      </button>
    </form>
  );
}

export default LoginForm;
