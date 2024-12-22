import { RouteRecordRaw } from 'vue-router';

export default {
    path: '/about',
    name: 'About',
    component: () => import('@/views/about/index.vue'),
    meta: {},
    children: [],
} as RouteRecordRaw;