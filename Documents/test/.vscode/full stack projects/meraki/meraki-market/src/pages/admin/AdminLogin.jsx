import React, { useState, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { loginAdmin, registerAdmin } from "@/services/adminService";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { adminLogin, isAdminAuthenticated } = useAdmin();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAdminAuthenticated) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [isAdminAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      if (isRegister) {
        // Validate required fields for registration
        if (!name.trim() || !email.trim() || !password.trim()) {
          toast({
            title: "Validation Error",
            description: "All fields are required",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        if (password.length < 6) {
          toast({
            title: "Validation Error",
            description: "Password must be at least 6 characters",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        res = await registerAdmin({ name: name.trim(), email: email.trim(), password: password.trim() });
        toast({
          title: "Admin Registered Successfully",
          description: "Welcome to the admin panel!",
        });
      } else {
        // Validate required fields for login
        if (!email.trim() || !password.trim()) {
          toast({
            title: "Validation Error",
            description: "Email and password are required",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        res = await loginAdmin({ email: email.trim(), password: password.trim() });
        toast({
          title: "Admin Login Successful",
          description: `Welcome back, ${res.user.name}!`,
        });
      }

      // Save admin in context and redirect
      adminLogin(res.user);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      console.error("Admin action error:", err);

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        `Admin ${isRegister ? "registration" : "login"} failed`;

      toast({
        title: `Admin ${isRegister ? "Registration" : "Login"} Failed`,
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    // Clear form when switching modes
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800/50 p-6 rounded-lg shadow-md border border-purple-500/20 w-96"
      >
        <h2 className="text-2xl text-white mb-4">
          {isRegister ? "Admin Register" : "Admin Login"}
        </h2>

        {isRegister && (
          <>
            <label className="text-gray-300 text-sm block mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-slate-700 text-white mb-3 border border-slate-600 focus:border-purple-500 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Admin Name"
              required
              disabled={loading}
            />
          </>
        )}

        <label className="text-gray-300 text-sm block mb-1">Email</label>
        <input
          type="email"
          className="w-full p-2 rounded bg-slate-700 text-white mb-3 border border-slate-600 focus:border-purple-500 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@meraki.com"
          required
          disabled={loading}
        />

        <label className="text-gray-300 text-sm block mb-1">Password</label>
        <input
          type="password"
          className="w-full p-2 rounded bg-slate-700 text-white mb-4 border border-slate-600 focus:border-purple-500 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={isRegister ? "Minimum 6 characters" : "Enter password"}
          required
          disabled={loading}
        />

        <Button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 mb-3 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Processing..." : (isRegister ? "Register Admin" : "Login")}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 mb-3"
          onClick={toggleMode}
          disabled={loading}
        >
          {isRegister ? "Already have an account? Login" : "Need to register? Sign up"}
        </Button>

        {/* Return to User Login Page Button */}
        <p className="text-gray-400 text-sm text-center">
          Go back to user login?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-pink-400 hover:underline cursor-pointer"
          >
            User Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
