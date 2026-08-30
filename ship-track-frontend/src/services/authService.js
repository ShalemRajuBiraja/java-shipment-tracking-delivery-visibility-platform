
import axiosInstance from "../config/axiosInstance";
import { API_END_POINTS } from "../constants/ApiEndPoints";

export const registerApi= async (formData) => {

    return await axiosInstance.post(API_END_POINTS.register, formData);

} 

export const loginApi = async (formData) => {
    return await axiosInstance.post(API_END_POINTS.signin, formData);
}

export const adminLoginApi = async (adminData) => {
  return await axiosInstance.post(API_END_POINTS.adminLogin, adminData);
};