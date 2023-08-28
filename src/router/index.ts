import {createRouter, createWebHistory} from "vue-router";

export default createRouter({
        history: createWebHistory(),
        routes: [
            {
                path: '/',
                component: import('@/views/Main.vue'),
            },
            {
                path: '/user',
                component: import('@/views/User.vue'),
            }
        ]
    }
)
