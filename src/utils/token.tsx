// import axios from "axios";

// const getCookie = (name: string): string | null => {
//   const cookies = document.cookie.split("; ");
//   for (let cookie of cookies) {
//     const [key, value] = cookie.split("=");
//     if (key === name) {
//       return decodeURIComponent(value);
//     }
//   }
//   return null;
// };

// console.log("원래 쿠키 : ",document.cookie);
// const token = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND_URL,
//   withCredentials: true,
//   headers: {
//     "ngrok-skip-browser-warning": "true",
//   },
// });

// token.interceptors.request.use(
//   (config) => {
//     const token = getCookie("accessToken");
//     console.log("토큰 : ",token);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default token;
// import axios from "axios";

// const getCookie = (name: string): string | null => {
//   const cookies = document.cookie.split("; ");
//   for (let cookie of cookies) {
//     const [key, value] = cookie.split("=");
//     if (key === name) {
//       return decodeURIComponent(value);
//     }
//   }
//   return null;
// };

// console.log("원래 쿠키 : ",document.cookie);
// const token = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND_URL,
//   withCredentials: true,
//   headers: {
//     "ngrok-skip-browser-warning": "true",
//   },
// });

// token.interceptors.request.use(
//   (config) => {
//     const token = getCookie("accessToken");
//     console.log("토큰 : ",token);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default token;
import axios from "axios";
const token = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});
token.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default token;
