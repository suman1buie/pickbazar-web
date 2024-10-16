import { message } from 'antd';
import axiosInstance from './axiosInstance';


export const userInfo = async (): Promise<[boolean, any | string]> => {
    try {
        const response = await axiosInstance.get('/api/v1/get-user-data/');
        return [ true, response.data ];
    } catch (error:any) {
        message.error(error.message);
        return [false, error.message ];
    }
};
