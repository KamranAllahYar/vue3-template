import type { RouteRecordRaw } from 'vue-router';
import { isNavigationFailure, Router } from 'vue-router';
import { ACCESS_TOKEN } from '@/store/mutation-types';
import { PageEnum } from '@/enums/pageEnum';
import { ResultEnum } from '@/enums/httpEnum';
import { ErrorPageRoute } from '@/router/base';
import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies();

const LOGIN_PATH = PageEnum.BASE_LOGIN;

const whitePathList = [LOGIN_PATH]; // no redirect whitelist


export function createRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const Loading = window['$loading'] || null;
    Loading && Loading.start();
    if (from.path === LOGIN_PATH && to.name === 'errorPage') {
      next(PageEnum.BASE_HOME);
      return;
    }

    // Whitelist can be directly entered
    if (whitePathList.includes(to.path as PageEnum)) {
      next();
      return;
    }

    const token = cookies.get(ACCESS_TOKEN);
    if (!token) {
      // You can access without permissions. You need to set the routing meta.ignoreAuth to true
      if (to.meta.ignoreAuth) {
        next();
        return;
      }
      // redirect login page
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
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


    const userInfo: any = {};
    if (userInfo.code === ResultEnum.UNAUTHORIZED) {
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
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


    //Add 404
    const isErrorPage = router.getRoutes().findIndex((item) => item.name === ErrorPageRoute.name);
    if (isErrorPage === -1) {
      router.addRoute(ErrorPageRoute as unknown as RouteRecordRaw);
    }

    const redirectPath = (from.query.redirect || to.path) as string;
    const redirect = decodeURIComponent(redirectPath);
    const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
    next(nextData);
    Loading && Loading.finish();
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
