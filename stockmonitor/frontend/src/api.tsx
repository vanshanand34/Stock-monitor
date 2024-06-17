 import axios from "axios";

const api = axios.create({
    baseURL : "https://localhost:3000",
});

api.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error)
    }
);

export default api;