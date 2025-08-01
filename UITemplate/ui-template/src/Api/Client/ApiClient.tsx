import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7001/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Přidání tokenu do každého požadavku
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
