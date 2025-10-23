import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../api";

const TestimonialsReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/reviews`)
      .then((res) => setReviews(res.data))
      .catch(() => console.log("Error fetching reviews"));
  }, []);

  return (
    <div>
      <h2>Testimonials & Reviews</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Course</th>
            <th>Rating</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((r) => (
            <tr key={r._id}>
              <td>{r.userName}</td>
              <td>{r.courseTitle}</td>
              <td>{r.rating}</td>
              <td>{r.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestimonialsReviews;
