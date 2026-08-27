import axios from 'axios';
import { AUTH_CONFIG } from '../constants/baseUrl';

const axiosInstance = axios.create({
    baseURL : AUTH_CONFIG.BASE_URL,
    timeout : AUTH_CONFIG.TIME_OUT,
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (req) => {
                const token = localStorage.getItem(AUTH_CONFIG.TOKEN);
                if (token) {
                    req.headers[AUTH_CONFIG.AUTHORIZATION] = `${AUTH_CONFIG.BEARER} ${token}`;
                }
                return req;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(

    // SUCCESS RESPONSE
    (response) => {

        return response;

    },

    // ERROR RESPONSE
    (error) => {

    // Token expired / Invalid token / Unauthorized
        if(error.response?.status === 401){

            localStorage.removeItem("token");
            localStorage.removeItem("userData");

            window.location.href = "/home";

        }

        // Forbidden (role issue)
        else if(error.response?.status === 403){

            console.log("Access denied");
        }

        // Backend server error
        else if(error.response?.status === 500){

            console.log("Server Error");
        }

        return Promise.reject(error);
    }

);



export default axiosInstance;