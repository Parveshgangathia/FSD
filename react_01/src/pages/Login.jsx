import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    login(name, role);
    navigate("/dashboard/overview");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white shadow-xl rounded-xl p-6 w-80 space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold text-center">Login</h2>

        <input
          className="border p-2 w-full rounded"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="border p-2 w-full rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
