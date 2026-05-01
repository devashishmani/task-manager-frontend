
import axios from "axios";

const API = axios.create({
  baseURL: "https://taskmanger-production-76c9.up.railway.app/api"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = token;
  }
  return req;
});

export default API;