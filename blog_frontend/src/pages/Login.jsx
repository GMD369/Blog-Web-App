// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import AuthFormLayout from "../components/AuthFormLayout";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(form.username, form.password);
      toast.success("Logged in successfully!");
      navigate("/Home");
    } catch (err) {
      toast.error("Invalid credentials.");
    }
    setLoading(false);
  };

  return (
    <AuthFormLayout title="Sign In to Your Account">
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          name="username"
          onChange={handleChange}
          value={form.username}
          required
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Username"
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          value={form.password}
          required
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Password"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-indigo-600 text-white py-2 rounded-md ${loading ? "opacity-60" : "hover:bg-indigo-700"}`}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </AuthFormLayout>
  );
};

export default Login;
