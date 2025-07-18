// src/utils/authFetch.js
export const authFetch = (url, options = {}) => {
  const token = localStorage.getItem("smartedge_token");

  const headers = {
    ...(options.headers || {}),
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  return fetch(url, {
    ...options,
    credentials: "include",
    headers,
  });
};
