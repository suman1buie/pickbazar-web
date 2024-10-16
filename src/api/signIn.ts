import { message } from 'antd';
import axiosInstance from './axiosInstance';

type credentials = {
    username: string;
    password: string;
}

export const login = async (credentials:credentials) => {
    try {
        const response = await axiosInstance.post('/signin/', credentials);
        const token = response.data.token;
        localStorage.setItem('token', token);
        axiosInstance.defaults.headers.common['Authorization'] = `Token ${token}`;
        message.success(response.data);
        return response.data;
    } catch (error:any) {
        message.error(error.message);
        console.error(error);
    }
};
