import axios from 'axios';

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/auth`,
  withCredentials: true, // Send cookies for auth
});

export const loginUser = (formData) => API.post('/login', formData);
export const signupUser = (formData) => API.post('/signup', formData);
export const fetchUser = () => API.get('/me');
export const logoutUser = () => API.post('/logout');
