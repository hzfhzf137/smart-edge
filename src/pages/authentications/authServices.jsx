import axios from 'axios';

// ✅ Fixed baseURL to match backend route structure
const API = axios.create({
  baseURL: 'https://smartedge-backend-production-b679.up.railway.app/api/auth',
  withCredentials: true, // Send cookies for auth
});

// ✅ Corrected endpoint paths
export const loginUser = (formData) => API.post('/login', formData);
export const signupUser = (formData) => API.post('/signup', formData);
export const fetchUser = () => API.get('/me');
export const logoutUser = () => API.post('/logout');
