import { defineStore } from 'pinia';
import { createStorage } from '@/utils/Storage';
import { store } from '@/store';
import { ACCESS_TOKEN, CURRENT_USER, DARK_THEME, IS_LOCKSCREEN } from '@/store/mutation-types';
import { ResultEnum } from '@/enums/httpEnum';
import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies();
const Storage = createStorage({ storage: localStorage });
import { login, logoutUser } from '@/api/auth';
import { loginAs } from '@/api/auth';
import { getUserInfo } from '@/api/users';
import { storage } from '@/utils/Storage';
import { getUserNotifications, getUserUnreadNotificationCount } from '@/api/notifications';
import { useOrderStore } from '@/store/modules/orderStatusesStats';
const orderStore = useOrderStore();

export interface IUserState {
  token: string;
  username: string;
  welcome: string;
  avatar: string;
  info: any;
  unReadNotification: number | null;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
    token: cookies.get(ACCESS_TOKEN),
    username: '',
    welcome: '',
    avatar: '',
    info: Storage.get(CURRENT_USER, {}),
    unReadNotification: null,
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getAvatar(): string {
      return this.avatar;
    },
    getNickname(): string {
      return this.username;
    },
    getPermissions(): string[] {
      return this.permissions;
    },
    getRoles(): string[] {
      return this.roles;
    },
    getUserInfo(): any {
      return this.info;
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setAvatar(avatar: string) {
      this.avatar = avatar;
    },
    setPermissions(permissions) {
      this.permissions = permissions;
    },
    setRoles(roles) {
      this.roles = roles;
    },
    setUserInfo(info) {
      this.info = info;
    },
    // Log in
    async login(userInfo) {
      try {
        const response = await login(userInfo);
        const { result, code }: any = response;
        if (code === ResultEnum.SUCCESS) {
          const ex = 7 * 24 * 60 * 60 * 1000;
          cookies.set(ACCESS_TOKEN, result.data.token, ex);
          storage.set(CURRENT_USER, result, ex);
          storage.set(IS_LOCKSCREEN, false);
          this.setToken(result.data.token);
          this.setUserInfo(result.data.user);
          orderStore.fetchOrderStatuses({});
        }
        return Promise.resolve(response);
      } catch (e) {
        return Promise.reject(e);
      }
    },
    // Login As
    async loginAs(userInfo) {
      try {
        const response = await loginAs(userInfo);
        const { result, code }: any = response;
        if (code === ResultEnum.SUCCESS) {
          const ex = 7 * 24 * 60 * 60 * 1000;
          cookies.set(ACCESS_TOKEN, result.data.token, ex);
          storage.set(CURRENT_USER, result, ex);
          storage.set(IS_LOCKSCREEN, false);
          this.setToken(result.data.token);
          this.setUserInfo(result.data.user);
          orderStore.fetchOrderStatuses({});
        }
        return Promise.resolve(response);
      } catch (e) {
        return Promise.reject(e);
      }
    },
    userNotifications() {
      getUserNotifications().then((response: any) => {
        this.notification = response.result;
      });
    },
    fetchUnReadNotificationCount() {
      getUserUnreadNotificationCount().then((response: any) => {
        this.unReadNotification = response.result.count;
      });
    },
    fetchOnceUserNotifications() {
      if (!this.notification.data.length) {
        getUserNotifications().then((response: any) => {
          this.notification = response.result;
        });
      }
    },
    fetchOnceUserUnreadNotification() {
      if (this.unReadNotification === null) {
        getUserUnreadNotificationCount().then((response: any) => {
          this.unReadNotification = response.result.count;
        });
      }
    },
    // get user information
    GetInfo() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;
      return new Promise((resolve) => {
        getUserInfo()
          .then((res) => {
            const { result } = res;
            if (result.data.permissions && result.data.permissions.length) {
              that.setPermissions(result.data.permissions.map((v) => v.name));
            }

            if (result.data.roles && result.data.roles.length) {
              that.setRoles(result.data.roles.map((v) => v.name));
              for (const role of result.data.roles) {
                if (role.permissions && role.permissions.length) {
                  that.setPermissions([
                    ...this.permissions,
                    ...role.permissions.map((v) => v.name),
                  ]);
                }
              }
            }
            delete result.data.permissions;
            delete result.data.roles;
            that.setUserInfo(result.data);

            // else {
            //   // reject(new Error('getInfo: permissionsList must be a non-null array !'));
            // }
            that.setAvatar(result.data.avatar);
            this.fetchUnReadNotificationCount();
            resolve(result.data);
          })
          .catch((error) => {
            resolve(error);
          });
      });
    },

    // Sign out
    async logout() {
      logoutUser();
      this.setPermissions([]);
      this.setRoles([]);
      this.setUserInfo('');
      storage.remove(CURRENT_USER);
      storage.remove(DARK_THEME);
      return Promise.resolve('');
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWidthOut() {
  return useUserStore(store);
}
