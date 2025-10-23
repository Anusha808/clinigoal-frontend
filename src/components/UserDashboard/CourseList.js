import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./CourseList.css";

const CourseList = ({ onEnroll }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          "https://clinigoal-server-side.onrender.com/api/courses"
        );
        setCourses(res.data || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return <p className="loading-text">Loading courses...</p>;
  }

  return (
    <div className="course-list-container">
      <h2 className="section-title">📘 Available Courses</h2>

      {Array.isArray(courses) && courses.length > 0 ? (
        <div className="course-grid">
          {courses.map((course, index) => (
            <motion.div
              key={course._id || index}
              className="course-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="course-header">
                <h3>{course.title}</h3>
                <p className="course-desc">
                  {course.description?.slice(0, 100)}...
                </p>
              </div>

              <div className="course-footer">
                <span className="course-price">
                  ₹{course.price || "Free"}
                </span>
                <button
                  className="enroll-btn"
                  onClick={() => onEnroll(course)} // ✅ Trigger Razorpay on click
                >
                  Enroll Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="no-courses">No courses found.</p>
      )}
    </div>
  );
};

export default CourseList;
