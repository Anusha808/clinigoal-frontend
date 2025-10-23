import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import API from "../../api"; // ✅ centralized Axios instance
import "./AdminAnalytics.css";

const COLORS = ["#0078FF", "#00C49F", "#845EC2"];

const AdminAnalytics = () => {
  const [lineData, setLineData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await API.get("/admin/analytics");
        const data = res.data;

        // Expecting your backend to return:
        // { lineData: [...], barData: [...], pieData: [...], stats: {...} }

        setLineData(data.lineData || []);
        setBarData(data.barData || []);
        setPieData(data.pieData || []);
        setStats(data.stats || {});
      } catch (err) {
        console.error("Analytics fetch error:", err);
        setError("Failed to load analytics data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <div className="analytics-loading">Loading analytics...</div>;
  }

  if (error) {
    return <div className="analytics-error">{error}</div>;
  }

  return (
    <div className="analytics-dashboard">
      <h2 className="analytics-heading">📊 Platform Analytics Overview</h2>

      {/* 🔹 Stat Summary Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <h3>👥 Total Users</h3>
          <p>{stats.totalUsers || 0}</p>
        </div>
        <div className="stat-card">
          <h3>📚 Total Courses</h3>
          <p>{stats.totalCourses || 0}</p>
        </div>
        <div className="stat-card">
          <h3>📈 Monthly Growth</h3>
          <p>{stats.monthlyGrowth || "0%"} </p>
        </div>
      </div>

      {/* 🔹 Charts Grid */}
      <div className="charts-grid">
        {/* Line Chart */}
        <div className="chart-card">
          <h3>User & Course Growth</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#0078ff"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="courses"
                stroke="#00C49F"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="chart-card">
          <h3>Monthly Engagement (%)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="engagement" barSize={50} fill="url(#barGradient)" />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0078FF" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#00C9A7" stopOpacity={0.7} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="chart-card">
          <h3>User Roles Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
