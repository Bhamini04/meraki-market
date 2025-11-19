import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // IMPORTANT for JWT cookie
});

// Add request interceptor to include admin token if available
api.interceptors.request.use((config) => {
  // Check if admin is logged in and add token to headers if needed
  const adminUser = localStorage.getItem('adminUser');
  if (adminUser) {
    try {
      const parsed = JSON.parse(adminUser);
      if (parsed && parsed._id) {
        // Admin is authenticated, let the cookie handle auth
        // The backend will verify via JWT cookie
      }
    } catch (e) {
      console.error('Error parsing admin user from localStorage:', e);
    }
  }
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Authentication error:', error.response.data);
      // Clear admin session on 401
      localStorage.removeItem('adminUser');
      // Redirect to admin login if on admin pages
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
