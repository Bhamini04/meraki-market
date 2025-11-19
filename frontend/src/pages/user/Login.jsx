import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";
import { loginUser } from "@/services/authService";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await loginUser(form);
      toast({ title: "Login successful" });
      navigate("/");
    } catch (error) {
      toast({ title: "Login failed", description: "Invalid credentials" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-purple-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl p-8 rounded-2xl border border-purple-500/30 shadow-xl"
      >
        <h1 className="text-3xl font-bold text-center text-purple-300 mb-6">
          Meraki Market
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-slate-800/60 text-white border border-purple-500/20"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-slate-800/60 text-white border border-purple-500/20"
          />

          <button
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* ---- OR Divider ---- */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-purple-500/20"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-purple-500/20"></div>
        </div>

        {/* ---- Admin Login Button ---- */}
        <button
          onClick={() => navigate("/admin/login")}
          className="w-full border border-purple-500/40 text-purple-300 py-2 rounded-lg hover:bg-purple-600/20"
        >
          Login as Admin
        </button>

        {/* Signup Link */}
        <p className="text-center text-gray-400 mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-pink-400 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
