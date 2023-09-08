import {RouteRecordRaw} from 'vue-router';
import {Layout} from '@/router/constant';

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
        path: '/driver',
        name: 'Driver',
        component: Layout,
        meta: {
            title: 'Driver',
            sort: 1,
        }, children: [
            {
                path: 'home',
                name: 'Home',
                component: ()=> import('../../views/index.vue'),
                meta: {
                    title: 'Driver Home',
                    sort: 1,
                }
            },
            {
                path: 'account',
                name: 'Account',
                component: ()=> import('../../views/account/index.vue'),
                meta: {
                    title: 'Account',
                    sort: 1,
                },
                children:[
                    {
                        path: 'edit',
                        name: 'Edit',
                        component: ()=> import('../../views/account/edit.vue'),
                        meta: {
                            title: 'Edit Account',
                            sort: 1,
                        },
                    },
                ]
            },{
                path: 'edit',
                name: 'Edit',
                component: ()=> import('../../views/account/edit.vue'),
                meta: {
                    title: 'Edit Account',
                    sort: 1,
                },
            },
            {
                path: 'earnings',
                name: 'Earnings',
                component: ()=> import('../../views/earnings/index.vue'),
                meta: {
                    title: 'Earnings',
                    sort: 1,
                }
            }, {
                path: 'orders',
                name: 'Orders',
                component: ()=> import('../../views/orders/index.vue'),
                meta: {
                    title: 'Orders',
                    sort: 1,
                }
            }, {
                path: 'orders-confirmation',
                name: 'OrderConfirmation',
                component: ()=> import('../../views/confirmation/index.vue'),
                meta: {
                    title: 'Order Confirmation',
                    sort: 1,
                }
            }
        ]
    },
];

export default routes;
