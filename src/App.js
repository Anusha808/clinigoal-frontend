import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css";

// 🌐 ===== PUBLIC COMPONENTS =====
import Home from "./components/Home/Home";

// 🔐 ===== AUTH COMPONENTS =====
import AdminLogin from "./components/AdminLogin";
import UserLogin from "./components/UserLogin";
import UserRegister from "./components/UserRegister/UserRegister"; // ✅ NEW

// 🧑‍💼 ===== ADMIN DASHBOARD & MANAGEMENT =====
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import AdminCourseManagement from "./components/AdminDashboard/AdminCourseManagement";
import AdminVideoManagement from "./components/AdminDashboard/AdminVideoManagement";
import AdminNoteManagement from "./components/AdminDashboard/AdminNoteManagement";
import AdminQuizManagement from "./components/AdminDashboard/AdminQuizManagement";
import AdminApprovalManagement from "./components/AdminDashboard/AdminApprovalManagement";
import AdminUserTracking from "./components/AdminDashboard/AdminUserTracking";
import AdminAnalytics from "./components/AdminDashboard/AdminAnalytics";
import AdminSettings from "./components/AdminDashboard/AdminSettings";
import TestimonialsReviews from "./components/AdminDashboard/TestimonialsReviews";

// 👩‍🎓 ===== USER DASHBOARD =====
import UserDashboard from "./components/UserDashboard/UserDashboard";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* 🌐 PUBLIC ROUTES */}
          <Route
            path="/"
            element={
              <>
                <Home />
              </>
            }
          />

          {/* 🔐 AUTH ROUTES */}
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/login/user" element={<UserLogin />} />
          <Route path="/register/user" element={<UserRegister />} /> {/* ✅ New registration route */}

          {/* 👩‍🎓 USER DASHBOARD */}
          <Route path="/user-dashboard" element={<UserDashboard />} />

          {/* 🧑‍💼 ADMIN DASHBOARD & MANAGEMENT */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/courses" element={<AdminCourseManagement />} />
          <Route path="/admin/videos" element={<AdminVideoManagement />} />
          <Route path="/admin/notes" element={<AdminNoteManagement />} />
          <Route path="/admin/quizzes" element={<AdminQuizManagement />} />
          <Route path="/admin/approvals" element={<AdminApprovalManagement />} />
          <Route path="/admin/users" element={<AdminUserTracking />} /> {/* ✅ User tracking view */}
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/testimonials" element={<TestimonialsReviews />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
