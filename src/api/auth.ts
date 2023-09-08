import {http} from '@/utils/http';

export interface LoginModel<T = any> {
    email?: string;
    phone?: string;
    password: string;
}

export interface SignupModel<T = any> {
    name: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
}

export interface BasicResponseModel<T = any> {
    code: number;
    message: string;
    result: T;
}

/**
 * @description: User login
 */
export function login(data: LoginModel) {
    return http.request<BasicResponseModel>({
        url: 'auth/login',
        method: 'POST',
        data,
    });
}

export function signup(data) {
    return http.request<BasicResponseModel>({
        url: 'auth/signup',
        method: 'POST',
        data,
    });
}

export function logoutUser() {
    return http.request<BasicResponseModel>({
        url: 'auth/logout',
        method: 'GET',
    });
}
