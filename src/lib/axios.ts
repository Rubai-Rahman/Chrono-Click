// lib/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log(
  'Axios instance created with base URL:',
  process.env.NEXT_PUBLIC_API_BASE_URL
);
export default axiosInstance;
