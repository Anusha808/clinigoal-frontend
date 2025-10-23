import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ Navigation
import "./UserLogin.css";

const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://clinigoal-server-side.onrender.com/api";

const images = [
  "https://images.pexels.com/photos/7251050/pexels-photo-7251050.jpeg",
  "https://images.pexels.com/photos/7723391/pexels-photo-7723391.jpeg",
  "https://images.pexels.com/photos/8392576/pexels-photo-8392576.jpeg",
  "https://images.pexels.com/photos/12467838/pexels-photo-12467838.jpeg",
];

const UserLogin = () => {
  const navigate = useNavigate(); // ✅ for redirecting after login

  const [formType, setFormType] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const [loading, setLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // ✅ Smooth background image slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      if (formType === "login") {
        const res = await axios.post(`${API_BASE_URL}/users/login`, formData);
        setMessage("✅ Login successful!");
        setType("success");

        // ✅ Redirect after successful login
        setTimeout(() => {
          navigate("/user-dashboard", { replace: true });
        }, 1000);
      } else if (formType === "register") {
        await axios.post(`${API_BASE_URL}/users/register`, formData);
        setMessage("🎉 Registration successful! You can now login.");
        setType("success");
        setFormType("login");
      } else if (formType === "forgot") {
        await axios.post(`${API_BASE_URL}/users/forgot-password`, {
          email: formData.email,
        });
        setMessage("📩 Password reset link sent to your email.");
        setType("success");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
      setType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-login-page">
      {/* 🌄 Left Side Image Section */}
      <div className="login-image-section">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="background"
            className={`login-slider-image ${
              index === currentImage ? "active" : ""
            }`}
          />
        ))}
        <div className="overlay-text">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to <span>Clinigoal</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            Learn. Grow. Achieve. Your journey starts here.
          </motion.p>
        </div>
      </div>

      {/* 🧾 Right Form Section */}
      <div className="user-login-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={formType}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="user-login-card"
          >
            <h2>
              {formType === "login"
                ? "👤 User Login"
                : formType === "register"
                ? "📝 Create Account"
                : "🔑 Forgot Password"}
            </h2>

            <form onSubmit={handleSubmit}>
              {formType === "register" && (
                <div className="input-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {formType !== "forgot" && (
                <div className="input-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              {message && (
                <p
                  className={`message ${
                    type === "error" ? "error" : "success"
                  }`}
                >
                  {message}
                </p>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : formType === "login"
                  ? "Login"
                  : formType === "register"
                  ? "Register"
                  : "Send Reset Link"}
              </motion.button>
            </form>

            {/* 🔗 Links */}
            <div className="form-links">
              {formType === "login" && (
                <>
                  <p>
                    Don’t have an account?{" "}
                    <span onClick={() => setFormType("register")}>
                      Register
                    </span>
                  </p>
                  <p>
                    <span onClick={() => setFormType("forgot")}>
                      Forgot Password?
                    </span>
                  </p>
                </>
              )}
              {formType === "register" && (
                <p>
                  Already have an account?{" "}
                  <span onClick={() => setFormType("login")}>Login</span>
                </p>
              )}
              {formType === "forgot" && (
                <p>
                  Back to{" "}
                  <span onClick={() => setFormType("login")}>Login</span>
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserLogin;
