import { App } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { RedirectRoute } from '@/router/base';
import { createRouterGuards } from './router-guards';
import { getAppEnvConfig } from "../utils/env";
import { PageEnum } from "../enums/pageEnum";

const modules: any = import.meta.globEager('./modules/**/*.ts');

const routeModuleList: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routeModuleList.push(...modList);
});

function sortRoute(a, b) {
    return (a.meta?.sort || 0) - (b.meta?.sort || 0);
}

routeModuleList.sort(sortRoute);
const { appTitle } = getAppEnvConfig();
export const RootRoute: RouteRecordRaw = {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME,
    meta: {
        title: appTitle,
    },
};

export const LoginRoute: RouteRecordRaw = {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
        title: 'Login',
    },
};

export const SignupRoute: RouteRecordRaw = {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/signup/index.vue'),
    meta: {
        title: 'Signup',
        ignoreAuth: true,
    },
};

//Authentication permission required
export const asyncRoutes = [...routeModuleList];

//Ordinary routing without authentication authority
export const constantRouter: any[] = [...asyncRoutes, LoginRoute, SignupRoute, RootRoute, RedirectRoute];

const router = createRouter({
    history: createWebHistory(),
    routes: constantRouter,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App) {
    app.use(router);
    // Create a route guard
    createRouterGuards(router);
}

export default router;
