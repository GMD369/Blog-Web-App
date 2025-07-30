// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // Remove withCredentials to avoid CORS issues
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const authTokens = localStorage.getItem("authTokens");
    if (authTokens) {
      try {
        const tokens = JSON.parse(authTokens);
        config.headers.Authorization = `Bearer ${tokens.access}`;
      } catch (error) {
        console.error("Error parsing auth tokens:", error);
        localStorage.removeItem("authTokens");
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Only retry once and only for 401 errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const authTokens = localStorage.getItem("authTokens");
        if (authTokens) {
          const tokens = JSON.parse(authTokens);
          const response = await axios.post(`${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}/api/token/refresh/`, {
            refresh: tokens.refresh
          });
          
          const newTokens = response.data;
          localStorage.setItem("authTokens", JSON.stringify(newTokens));
          
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${newTokens.access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Refresh failed, redirect to login
        localStorage.removeItem("authTokens");
        window.location.href = "/login";
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
