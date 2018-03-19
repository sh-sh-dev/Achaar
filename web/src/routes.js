import Vue from "vue"
import Router from 'vue-router';
import Index from '@/routes/Index.vue';
import ShoppingCart from '@/routes/ShoppingCart.vue';
import UserAccount from '@/routes/UserAccount.vue';
import LoginForm from '@/routes/LoginForm.vue';
import SigninForm from '@/routes/SigninForm.vue';
import CategoryList from '@/routes/CategoryList.vue';
import ErrorTag from '@/components/ErrorTag.vue';

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
        },
        {
            path: '/login',
            name: 'Log in',
            meta: {
                requiresAuth: -1
            },
            component: SigninForm
        },
        {
            path: '/signup',
            name: 'Sign up',
            meta: {
                requiresAuth: -1
            },
            component: LoginForm
        },
        {
            path: '/categories',
            name: 'Categories',
            component: CategoryList
        },
        {
            path: '*',
            component: ErrorTag
        }
    ]
})

export default routes;
