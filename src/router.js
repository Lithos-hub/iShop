import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from './stores/user';

const requiresAuth = async (to, from, next) => {
    const userStore = useUserStore();
    const user = await userStore.currentUser();
    if (!user) {
        // console.log('Access denied')
        next('/')
    } else {
        // console.log('Access granted')
        next();
    }
}

const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import('./views/Index.vue'),
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('./views/Home.vue'),
        beforeEnter: requiresAuth,
    },
    {
        path: '/shop',
        name: 'Shop',
        props: true,
        component: () => import('./views/Shop.vue'),
        beforeEnter: requiresAuth,
    },
    {
        path: '/cart',
        name: 'Cart',
        component: () => import('./views/Cart.vue'),
        beforeEnter: requiresAuth,
    },
    {
        path: '/product/:id',
        name: 'Product',
        component: () => import('./views/Product.vue'),
        beforeEnter: requiresAuth,
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('./views/About.vue'),
        beforeEnter: requiresAuth,
    },
]

const router = createRouter({
    routes,
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
    history: createWebHistory(),
})

export default router;