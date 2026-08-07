import axios from "axios";

// ✅ Har axios request mein cookies automatically jayengi
axios.defaults.withCredentials = true;

// Agar 401 aaye → login pe bhejo
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axios;