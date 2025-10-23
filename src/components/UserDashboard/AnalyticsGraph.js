import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import "./AnalyticsGraph.css";

const COLORS = ["#0078FF", "#00C49F", "#FFBB28", "#FF8042", "#845EC2"];

const AnalyticsGraph = ({ courses }) => {
  const data = courses.map((c) => ({
    name: c.courseName,
    progress: Math.floor(Math.random() * 100),
    students: Math.floor(Math.random() * 300 + 50),
  }));

  return (
    <div className="analytics-container">
      <h2 className="analytics-title">📊 Course Performance Analytics</h2>

      <div className="analytics-grid">
        {/* 🔹 Bar Chart */}
        <div className="analytics-card">
          <h3>Course Completion (%)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="progress" fill="url(#colorProgress)" barSize={50} />
              <defs>
                <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0078FF" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#00C9A7" stopOpacity={0.7} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 🔹 Line Chart */}
        <div className="analytics-card">
          <h3>Active Students per Course</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="students"
                stroke="#845EC2"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 🔹 Pie Chart */}
        <div className="analytics-card pie-chart">
          <h3>Overall Course Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                dataKey="students"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsGraph;
