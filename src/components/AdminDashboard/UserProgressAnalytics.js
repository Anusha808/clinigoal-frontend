import React from "react";
import "./AdminAnalytics.css";

const UserProgressAnalytics = () => {
  const analyticsData = [
    { label: "Total Users", value: 452 },
    { label: "Active Courses", value: 28 },
    { label: "Completed Courses", value: 190 },
    { label: "Pending Approvals", value: 14 },
  ];

  const userProgress = [
    { name: "John Doe", course: "React Basics", progress: 80 },
    { name: "Sarah Smith", course: "Python Advanced", progress: 60 },
    { name: "Ravi Kumar", course: "Data Science", progress: 90 },
  ];

  return (
    <div className="analytics-section">
      <h2>User Progress & Analytics</h2>

      <div className="analytics-cards">
        {analyticsData.map((item, i) => (
          <div key={i} className="analytics-card">
            <h3>{item.label}</h3>
            <p>{item.value}</p>
          </div>
        ))}
      </div>

      <div className="analytics-charts">
        <h3>Course Completion Overview</h3>
        <p>📈 (You can integrate charts like Recharts or Chart.js here)</p>
      </div>

      <div className="analytics-table-container">
        <table className="analytics-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Course</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {userProgress.map((user, i) => (
              <tr key={i}>
                <td>{user.name}</td>
                <td>{user.course}</td>
                <td>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${user.progress}%` }}
                    ></div>
                  </div>
                  <span style={{ marginLeft: "8px" }}>{user.progress}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProgressAnalytics;
