import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://blog-app-mongodb-backend.onrender.com/api",
  withCredentials: true,
});


export default axiosInstance;