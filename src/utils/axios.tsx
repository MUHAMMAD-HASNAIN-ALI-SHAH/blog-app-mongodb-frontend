import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://blog-app-mongodb-backend.vercel.app/api",
  withCredentials: true,
});


export default axiosInstance;
