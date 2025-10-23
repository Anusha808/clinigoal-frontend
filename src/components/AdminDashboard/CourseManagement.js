import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../api";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/courses`)
      .then((res) => setCourses(res.data))
      .catch(() => console.log("Error fetching courses"));
  }, []);

  return (
    <div>
      <h2>Course Management</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Students</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td>{course.title}</td>
              <td>{course.category}</td>
              <td>₹{course.price}</td>
              <td>{course.enrolledUsers?.length || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseManagement;
