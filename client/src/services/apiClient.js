import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any request preprocessing here
    // e.g., add auth token, logging, etc.
    console.log(`📤 ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error.message);
    return Promise.reject(error);
  },
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Handle successful responses
    console.log(`✅ Response from ${response.config.url}:`, response.data);
    return response;
  },
  (error) => {
    // Handle errors
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";
    const status = error.response?.status;

    console.error(`❌ API Error (${status}):`, message);

    // Return a rejected promise with meaningful error
    return Promise.reject({
      status,
      message,
      data: error.response?.data,
    });
  },
);

export default apiClient;
