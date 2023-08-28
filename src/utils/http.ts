import axios, {AxiosInstance, InternalAxiosRequestConfig} from 'axios';

export const http: AxiosInstance = axios.create<AxiosInstance>({
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

axios.interceptors.request.use(function (config: InternalAxiosRequestConfig) {
    config.headers.setAuthorization('Bearer token');
    return config;
});
