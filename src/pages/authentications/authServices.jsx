// src/pages/authentications/authServices.jsx
import axios from 'axios';

const API = axios.create({
  baseURL: 'https:smartedge-backend-production-b679.up.railway.app/api/auth',
  withCredentials: true,
});

export const loginUser = (formData) => API.post('/login', formData);
export const signupUser = (formData) => API.post('/signup', formData);
export const fetchUser = () => API.get('/me');
export const logoutUser = () => API.post('/logout');
