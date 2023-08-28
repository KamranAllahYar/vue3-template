import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils/index';

/**
 * @param name Route name, must be set, and cannot have the same name
 * @param meta Routing meta information (routes come with extended information)
 * @param redirect Redirect address, when accessing this route, redirect it by yourself
 * @param meta.disabled Disable entire menu
 * @param meta.title menu name
 * @param meta.icon menu icon
 * @param meta.keepAlive cache the route
 * @param meta.sort The smaller the order, the higher the order
 *
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/exception',
    name: 'Exception',
    redirect: '/exception/403',
    component: Layout,
    meta: {
      hidden: true,
      title: 'Exception Page',
      sort: 3,
    },
    children: [
      {
        path: '403',
        name: 'exception-403',
        meta: {
          title: '403',
        },
        component: () => import('@/views/exception/403.vue'),
      },
      {
        path: '404',
        name: 'exception-404',
        meta: {
          title: '404',
        },
        component: () => import('@/views/exception/404.vue'),
      },
      {
        path: '500',
        name: 'exception-500',
        meta: {
          title: '500',
        },
        component: () => import('@/views/exception/500.vue'),
      },
    ],
  },
];

export default routes;
