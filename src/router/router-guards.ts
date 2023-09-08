import {isNavigationFailure, Router} from 'vue-router';
import {ACCESS_TOKEN} from '@/store/mutation-types';
import {PageEnum} from '@/enums/pageEnum';
import {ResultEnum} from '@/enums/httpEnum';
import {useCookies} from 'vue3-cookies';
import {useUserStoreWidthOut} from "../store/modules/user";

const {cookies} = useCookies();

const LOGIN_PATH = PageEnum.BASE_LOGIN;

const whitePathList = [LOGIN_PATH]; // no redirect whitelist
const userStore = useUserStoreWidthOut();

export function createRouterGuards(router: Router) {
    router.beforeEach(async (to, from, next) => {
        const Loading = window['$loading'] || null;
        Loading && Loading.start();
        if (from.path === LOGIN_PATH && to.name === 'errorPage') {
            next(PageEnum.BASE_HOME);
            return;
        }

        const token = cookies.get(ACCESS_TOKEN);
        // Whitelist can be directly entered
        if (whitePathList.includes(to.path as PageEnum)) {
            if (to.path == LOGIN_PATH && token) {
                next(from);
            }
            next();
            return;
        }

        if (!token) {
            // You can access without permissions. You need to set the routing meta.ignoreAuth to true
            if (to.meta.ignoreAuth) {
                next();
                return;
            }
            // redirect login page
            const redirectData: { path: string; replace: boolean; query?: any } = {
                path: LOGIN_PATH,
                replace: true,
            };
            if (to.path) {
                redirectData.query = {
                    ...redirectData.query,
                    redirect: to.path,
                };
            }
            next(redirectData);
            return;
        }
        const userInfo: any = userStore.GetInfo();
        // console.log(userInfo);
        if (userInfo.code === ResultEnum.UNAUTHORIZED) {
            const redirectData: { path: string; replace: boolean; query?:any } = {
                path: LOGIN_PATH,
                replace: true,
            };
            if (to.path) {
                redirectData.query = {
                    ...redirectData.query,
                    redirect: to.path,
                };
            }
            next(redirectData);
            return;
        }
        Loading && Loading.finish();
        next();
    });

    router.afterEach((to, _, failure) => {
        document.title = (to?.meta?.title as string) || document.title;
        if (isNavigationFailure(failure)) {
            //console.log('failed navigation', failure)
        }
        const Loading = window['$loading'] || null;
        Loading && Loading.finish();
    });

    router.onError((error) => {
        console.log(error, 'routing error');
    });
}
