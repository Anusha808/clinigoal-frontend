import React from "react";
import { motion } from "framer-motion";
import "./UserDashboard.css";

const CourseCard = ({ course, status, isLoading, onEnroll, onContinue }) => {
  const isThisCourseActive = status === "approved";
  let label = "Enroll Now",
    cls = "enroll-btn",
    disabled = false;

  if (status === "pending") {
    label = "Pending Approval ⏳";
    cls = "pending-btn";
    disabled = true;
  } else if (status === "approved") {
    label = isThisCourseActive ? "Continue Learning ▶️" : "Paid ✅";
    cls = "paid-btn";
  }

  return (
    <motion.div
      className={`course-card ${isThisCourseActive ? "active-course" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <button
        disabled={isLoading || disabled}
        className={cls}
        onClick={() =>
          status === "approved" ? onContinue() : onEnroll(course)
        }
      >
        {isLoading && status === "not_enrolled" ? "Processing..." : label}
      </button>
    </motion.div>
  );
};

export default CourseCard;
