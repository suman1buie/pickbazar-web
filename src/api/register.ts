import { message } from "antd";
import axiosInstance from "./axiosInstance"

type registerPropsType = {
    username:string,
    name:string,
    password:string,
    email:string,
}

type verifyPropsType = {
    otp:string | undefined,
    email:string,
}

export const register = async(credentials:registerPropsType) => {
    try {
        await axiosInstance.post('/api/v1/register/', credentials);
        message.success("candidate successfully registered");
        return true
    } catch (error) {
        message.error(String(error))
        return false
    }
}

export const verifyOTP = async(credentials:verifyPropsType) =>{
    try {
        await axiosInstance.post(`/api/v1/verify-otp/`, credentials);
        message.success("Verified successfully");
        return true
    } catch (error) {
        message.error(String(error))
        return false
    }
}