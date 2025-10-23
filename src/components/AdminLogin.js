import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "https://images.pexels.com/photos/7269618/pexels-photo-7269618.jpeg",
    "https://images.pexels.com/photos/7722918/pexels-photo-7722918.jpeg",
    "https://images.pexels.com/photos/8392576/pexels-photo-8392576.jpeg",
  ];

  // Image slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@clinigoal.com" && password === "admin123") {
      setMessage("✅ Login successful!");
      setType("success");
      setTimeout(() => navigate("/admin/dashboard"), 1000);
    } else {
      setMessage("❌ Invalid credentials. Use admin@clinigoal.com / admin123");
      setType("error");
    }
  };

  const handleForgot = (e) => {
    e.preventDefault();
    setMessage(`📩 Password reset link sent to ${email}`);
    setType("success");
    setView("login");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      setType("error");
      return;
    }
    setMessage("✅ Account created successfully!");
    setType("success");
    setView("login");
  };

  return (
    <div className="admin-login-page">
      {/* 🌄 Left Side Image Slider */}
      <div className="admin-login-left">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="background"
            className={`admin-slider-image ${
              index === currentImage ? "active" : ""
            }`}
          />
        ))}

        <div className="admin-overlay-text">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Welcome to <span>Clinigoal</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3 }}
          >
            Empowering healthcare learning and management with intelligence.
          </motion.p>
        </div>
      </div>

      {/* 🧾 Right Side Form */}
      <div className="admin-login-right">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className="admin-login-card"
          >
            {view === "login" && (
              <>
                <h2>👑 Admin Login</h2>
                <form onSubmit={handleLogin}>
                  <div className="input-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="admin@clinigoal.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  {message && (
                    <p className={`message ${type === "error" ? "error" : "success"}`}>
                      {message}
                    </p>
                  )}

                  <button type="submit" className="login-btn">
                    Login
                  </button>

                  <div className="form-links">
                    <span onClick={() => setView("forgot")}>Forgot Password?</span>
                    <span> | </span>
                    <span onClick={() => setView("register")}>Create Account</span>
                  </div>
                </form>
                <p className="login-hint">
                  Default: <strong>admin@clinigoal.com</strong> /{" "}
                  <strong>admin123</strong>
                </p>
              </>
            )}

            {view === "forgot" && (
              <>
                <h2>🔑 Forgot Password</h2>
                <form onSubmit={handleForgot}>
                  <div className="input-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="login-btn">
                    Send Reset Link
                  </button>
                  <div className="form-links">
                    <span onClick={() => setView("login")}>← Back to Login</span>
                  </div>
                </form>
              </>
            )}

            {view === "register" && (
              <>
                <h2>📝 Create Account</h2>
                <form onSubmit={handleRegister}>
                  <div className="input-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  {message && (
                    <p className={`message ${type === "error" ? "error" : "success"}`}>
                      {message}
                    </p>
                  )}

                  <button type="submit" className="login-btn">
                    Create Account
                  </button>

                  <div className="form-links">
                    <span onClick={() => setView("login")}>← Back to Login</span>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminLogin;
