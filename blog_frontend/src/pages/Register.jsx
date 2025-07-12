// src/pages/Register.jsx
import React, { useState } from "react";
import AuthFormLayout from "../components/AuthFormLayout";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({ username: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post("register/", {
        username: form.username,
        password: form.password,
      });
      toast.success("Registered successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Username already taken or invalid.");
    }
    setLoading(false);
  };

  return (
    <AuthFormLayout title="Create a New Account">
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
        <input
          name="confirm"
          type="password"
          onChange={handleChange}
          value={form.confirm}
          required
          className="w-full px-4 py-2 border rounded-md"
          placeholder="Confirm Password"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-purple-600 text-white py-2 rounded-md ${loading ? "opacity-60" : "hover:bg-purple-700"}`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </AuthFormLayout>
  );
};

export default Register;
