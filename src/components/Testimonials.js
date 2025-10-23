import React, { useState } from "react";

const TestimonialsReviews = () => {
  const [reviews, setReviews] = useState([
    { id: 1, name: "Priya", feedback: "Amazing course!", approved: true },
    { id: 2, name: "Ravi", feedback: "Loved the notes!", approved: false },
  ]);

  const toggleApproval = (id) => {
    setReviews(
      reviews.map((r) =>
        r.id === id ? { ...r, approved: !r.approved } : r
      )
    );
  };

  return (
    <div className="section-container">
      <h2>Testimonials & Reviews ⭐</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Feedback</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((r) => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.feedback}</td>
              <td>{r.approved ? "Approved" : "Pending"}</td>
              <td>
                <button onClick={() => toggleApproval(r.id)}>
                  {r.approved ? "Unapprove" : "Approve"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestimonialsReviews;
