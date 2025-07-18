import axios from 'axios';

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/auth`,
  withCredentials: true, // ✅ Include cookie if available
});

// ✅ Add token from localStorage for Safari (fallback)
API.interceptors.request.use(config => {
  const token = localStorage.getItem('smartedge_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = (formData) => API.post('/login', formData);
export const signupUser = (formData) => API.post('/signup', formData);
export const fetchUser = () => API.get('/me');
export const logoutUser = () => API.post('/logout');
