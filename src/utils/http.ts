import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useCookies } from "vue3-cookies";
import { ACCESS_TOKEN } from "@/store/mutation-types";

const { cookies } = useCookies();

export const http: AxiosInstance = axios.create({
    baseURL: '/api/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

http.interceptors.request.use(function (config: InternalAxiosRequestConfig) {
    config.headers.setAuthorization(`Bearer ${cookies.get(ACCESS_TOKEN)}`);
    return config;
});


http.interceptors.response.use(
    (response: any) => {
        return Promise.resolve({ message: response.data?.message, result: response.data, code: response.status });
    },
    (error) => {
        return Promise.reject({
            message: error.response.data?.message,
            result: error.response.data,
            code: error.response.status
        })
    }
);
