import axios from 'axios';
import { baseUrl, tokenAPI } from '../constant_variables/vars.ts';

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenAPI}`,
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const isGuest = localStorage.getItem('guest') === 'true';

        if ((status === 401 || status === 403) && !isGuest) {
            window.location.href = '/';
        }

        return Promise.reject(error);
    }
);

