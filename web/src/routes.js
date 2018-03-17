import Vue from "vue"
import Router from 'vue-router';
import Index from '@/routes/index.vue';
import ProductPage from '@/routes/product.vue';
import ShoppingCart from '@/routes/cart.vue';
import UserAccount from '@/routes/account.vue';

Vue.use(Router);

/*
    some routes require authentication.
    ->meta->requiresAuth
    can be 1 or -1 (reversed) and 0 (no auth required)
*/

const routes = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Index
        },
        {
            path: '/product/:id',
            component: ProductPage
        },
        {
            path: '/cart',
            name: 'Cart',
            component: ShoppingCart,
            meta: {
                requiresAuth: 1
            }
        },
        {
            path: '/account',
            name: 'Account',
            component: UserAccount,
            meta: {
                requiresAuth: 1
            }
        }
    ]
})

export default routes;
