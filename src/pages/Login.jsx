import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", formData);
      login(res.data.user, res.data.accessToken);
      navigate("/courses");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <div className="w-full max-w-md p-6 bg-gray-900 border border-gray-700 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-white text-center">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>

          <motion.div
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </motion.div>

          <motion.div
            variants={inputVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition-all duration-300"
            >
              Login
            </button>

            <p className="text-gray-300 text-center mt-3">
              Don’t have an account?
            </p>

            <Link
              to="/register"
              className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition-all duration-300 mt-2"
            >
              Register
            </Link>
          </motion.div>
        </form>

        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
      </div>
    </div>
  );
}
