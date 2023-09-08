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
 * @description: Authenticated User Info
 */
export function getUserInfo() {
  return http.request<BasicResponseModel>({
    url: '/users/authenticated',
    method: 'GET',
  });
}
