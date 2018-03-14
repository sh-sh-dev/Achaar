import Vue from "vue"
import Router from 'vue-router';
import Index from '@/routes/index.vue';
import ProductPage from '@/routes/product.vue';
import ShoppingCart from '@/routes/cart.vue';
import UserAccount from '@/routes/account.vue';

Vue.use(Router);

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
            component: ShoppingCart
        },
        {
            path: '/account',
            name: 'Account',
            component: UserAccount
        }
    ]
})

export default routes;
