import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/auth/login",
        form,
      );
      setUser(res.data.user);
      navigate("/");
    } catch (error) {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <form className="shadow-md bg-white rounded p-6 w-full max-w-lg">
        <h2 className="text-xl mb-4">Login</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="email"
          className="border p-3 w-full mb-4 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 w-full mb-4 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="w-full bg-blue-500 h-10 text-white rounded hover:cursor-grab" onClick={onSubmit}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
