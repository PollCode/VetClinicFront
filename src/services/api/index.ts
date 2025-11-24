import axios from "axios";
//import toast from "react-hot-toast";

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: import.meta.env.API_BASE_URL || "http://localhost:8000/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access");
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
    // let errorMessage = "Error desconocido";

    // if (axios.isAxiosError(error)) {
    //   // Manejo de errores de campo específicos
    //   if (error.response?.data) {
    //     const fieldErrors = Object.entries(error.response.data)
    //       .filter(([key]) => key !== "non_field_errors") // Excluye errores generales si usas DRF
    //       .map(([key, value]) => {
    //         // Si el valor es un array, une los mensajes
    //         const messages = Array.isArray(value) ? value.join(", ") : value;
    //         return `${key}: ${messages}`;
    //       });

    //     if (fieldErrors.length > 0) {
    //       errorMessage = fieldErrors.join("; ");
    //     } else if (error.response.data.detail) {
    //       errorMessage = error.response.data.detail;
    //     } else if (error.response.data.message) {
    //       errorMessage = error.response.data.message;
    //     }
    //   }
    // } else if (error instanceof Error) {
    //   errorMessage = error.message;
    // }
    // toast.error(errorMessage, { duration: 5000 });
    // console.log("Error detallado:", errorMessage);
  }
);

export default api;
