import axios from "axios";

const api = axios.create({
  baseURL: "https://shopeasy-backend-8tjr.onrender.com/api",
});

export default api;