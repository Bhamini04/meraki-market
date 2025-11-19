import axios from "axios";

const api = axios.create({
  baseURL:"https://meraki-market.onrender.com/api",
  withCredentials: true,
});

export default api;

