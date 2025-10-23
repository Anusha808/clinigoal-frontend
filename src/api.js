import axios from "axios";

// ✅ Auto-detect environment and use .env variable (with fallback)
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  (window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://clinigoal-backend.onrender.com/api");

console.log("🔧 API Base URL:", API_BASE_URL);
console.log("🌍 Current Hostname:", window.location.hostname);

// ✅ Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000, // 5 minutes (for large file uploads)
});

// ✅ Request interceptor (debugging + logs)
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Call: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response interceptor (error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("❌ API Error:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
    return Promise.reject(error);
  }
);

//
// ✅ Organized API Groups
//

export const videoAPI = {
  getAllVideos: () => api.get("/videos"),
  uploadVideo: (formData) =>
    api.post("/videos/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  deleteVideo: (id) => api.delete(`/videos/${id}`),
};

export const approvalAPI = {
  getAllApprovals: () => api.get("/approvals").catch(() => ({ data: [] })),
};

export const reviewAPI = {
  getAllReviews: () => api.get("/reviews").catch(() => ({ data: [] })),
};

export const quizAPI = {
  getAllQuizzes: () => api.get("/quizzes").catch(() => ({ data: [] })),
};

export const notesAPI = {
  getAllNotes: () => api.get("/notes").catch(() => ({ data: [] })),
};

export const courseAPI = {
  getAllCourses: () => api.get("/courses").catch(() => ({ data: [] })),
};

// ✅ Health check endpoint
export const healthCheck = () => api.get("/health");

// ✅ Default export
export default api;
