import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({ setUser }) {

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/auth/register",
        form,
      );
      setUser(res.data.user);
      navigate("/");
    } catch (error) {
      setError("Register failed");
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <form className="shadow-md bg-white rounded p-6 w-full max-w-lg">
        <h2 className="text-xl mb-4">Register</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="username"
          className="border p-3 w-full mb-4 rounded"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
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
        <button className="w-full h-10 bg-blue-500 text-white rounded hover:cursor-grab" onClick={onSubmit}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
