import axios from 'axios';

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/auth`,
  withCredentials: true, // ✅ Allow sending/receiving cookies
});

// ✅ Interceptor: attach token from localStorage (for Safari and fallback)
API.interceptors.request.use(config => {
  const token = localStorage.getItem('smartedge_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Login: save token to localStorage (for Safari fallback)
export const loginUser = async (formData) => {
  const res = await API.post('/login', formData);

  // Save token for Safari (doesn’t support 3rd-party cookies reliably)
  if (res.data?.token) {
    localStorage.setItem('smartedge_token', res.data.token);
  }

  return res;
};

// ✅ Signup: no token returned usually
export const signupUser = (formData) => API.post('/signup', formData);

// ✅ Fetch current user (cookie or token-based)
export const fetchUser = () => API.get('/me');

// ✅ Logout: clear cookie + remove token
export const logoutUser = async () => {
  await API.post('/logout');
  localStorage.removeItem('smartedge_token'); // Clear Safari token fallback
};