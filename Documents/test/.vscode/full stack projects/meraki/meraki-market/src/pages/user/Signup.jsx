import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const Signup = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const trimmedForm = {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password.trim(),
      };
      await register(trimmedForm);
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - Meraki Market</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-slate-900/80 border border-purple-500/30 rounded-2xl p-8 shadow-2xl"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400 mb-8">Join Meraki Market and start shopping.</p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-slate-800/80 border border-purple-500/30 rounded-lg pl-9 pr-3 py-2 text-white focus:outline-none focus:border-purple-400"
                  placeholder="Your Name"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-slate-800/80 border border-purple-500/30 rounded-lg pl-9 pr-3 py-2 text-white focus:outline-none focus:border-purple-400"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-300 mb-1 block">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-slate-800/80 border border-purple-500/30 rounded-lg pl-9 pr-3 py-2 text-white focus:outline-none focus:border-purple-400"
                  placeholder="Minimum 6 characters"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-3"
            >
              {submitting ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <p className="text-gray-400 text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-pink-400 hover:underline">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default Signup;
