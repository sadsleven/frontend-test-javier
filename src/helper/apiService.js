import axios from "axios";

// Instancia principal del axios con la ruta a la api del .env

const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 1000,
});

export default axiosInstance;