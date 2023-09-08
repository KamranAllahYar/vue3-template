import { defineStore } from 'pinia';
import { createStorage } from '@/utils/Storage';
import { store } from '@/store';
import { ACCESS_TOKEN, CURRENT_USER, DARK_THEME, IS_LOCKSCREEN } from '@/store/mutation-types';
import { ResultEnum } from '@/enums/httpEnum';
import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies();
const Storage = createStorage({ storage: localStorage });
import { login, logoutUser, BasicResponseModel, LoginModel } from '@/api/auth';
import { getUserInfo } from '@/api/users';
import { storage } from '@/utils/Storage';

export interface IUserState {
    token: string;
    username: string;
    welcome: string;
    info: any;
    unReadNotification: number | null;
}

export const useUserStore = defineStore({
    id: 'app-user',
    state: (): IUserState => ({
        token: cookies.get(ACCESS_TOKEN),
        username: '',
        welcome: '',
        info: Storage.get(CURRENT_USER, {}),
        unReadNotification: null,
    }),
    getters: {
        getToken(): string {
            return this.token;
        },
        getNickname(): string {
            return this.username;
        },
        getUserInfo(): any {
            return this.info;
        },
    },
    actions: {
        setToken(token: string) {
            this.token = token;
        },
        setUserInfo(info) {
            this.info = info;
        },
        // Log in
        async login(userInfo: LoginModel) {
            try {
                const response: any = await login(userInfo);
                const { result, code } = response;
                if (code === ResultEnum.SUCCESS) {
                    const ex = 7 * 24 * 60 * 60 * 1000;
                    cookies.set(ACCESS_TOKEN, result.token, ex);
                    storage.set(CURRENT_USER, result, ex);
                    storage.set(IS_LOCKSCREEN, false);
                    this.setToken(result.token);
                    this.setUserInfo(result.user);
                }
                return Promise.resolve(response);
            } catch (e) {
                return Promise.reject(e);
            }
        },
        // get user information
        GetInfo() {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const that = this;
            return new Promise((resolve) => {
                getUserInfo()
                    .then((res: any) => {
                        const { result } = res;
                        that.setUserInfo(result.data);
                        resolve(result.data);
                    })
                    .catch((error) => {
                        resolve(error);
                    });
            });
        },

        // Sign out
        async logout() {
            await logoutUser()
            this.setUserInfo('');
            storage.remove(CURRENT_USER);
            storage.remove(DARK_THEME);
            cookies.remove(ACCESS_TOKEN);
            window.location.reload();
            return Promise.resolve('');
        },
    },
});

// Need to be used outside the setup
export function useUserStoreWidthOut() {
    return useUserStore(store);
}
