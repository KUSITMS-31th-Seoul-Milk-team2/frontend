import axios from "axios";

const token = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});
token.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default token;
// import axios from "axios";

// const token = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND_URL,
//   withCredentials: true,
//   headers: {
//     "ngrok-skip-browser-warning": "true",
//     "Authorization": `Bearer eyJhbGciOiJIUzUxMiJ9.eyJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiNyIsImlzcyI6InNlb3VsbWlsayIsImlhdCI6MTc0MTM3Mzc1MiwiZXhwIjoxNzcyOTA5NzUyfQ.Mh4ktKIwq3Dp27YXQI6E3DQU-_TtrzdbiSBHODfBzs0ELJio7LS20Q3kjjjIO9gyTIFIfuWDlNQ_76vqWnLobw`
//   },
// });

// export default token;
