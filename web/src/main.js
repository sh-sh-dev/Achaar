import Vue from 'vue';
import VueMaterial from 'vue-material';
import Meta from 'vue-meta';
import cookie from 'cookies-js';
import toFa from './utils/number-to-fa';
import toEn from './utils/number-to-en';
import router from './routes';
import http from './utils/http';

import MainView from './main.vue';
import 'vue-material/dist/vue-material.min.rtl.css';
import './sass/index.scss';

import LoadingOverlay from './components/LoadingOverlay.vue';
import ErrorTag from './components/ErrorTag.vue';

Vue.use(VueMaterial);
Vue.use(Meta);

window.Vue = Vue;

router.beforeEach(async function(to, from, next) {
    if (to.matched.some(record => record.meta.requiresAuth) && to.path !== '/') {
        const authed = await http({
            url: 'checkToken',
            data: {
                token: cookie.get('$_TOKEN') || ''
            }
        })
        try {
            let condition;
            switch (to.matched[0].meta.requiresAuth) {
                case 1:
                    condition = authed.data.ok
                    break
                case -1:
                    condition = !authed.data.ok
                    break
            }

            if (condition) {
                next()
            } else {
                next({
                    path: '/'
                })
            }
        } catch (e) {
            return false;
        }
    } else {
        next()
    }
})

Vue.component('loading-overlay', LoadingOverlay);
Vue.component('error-tag', ErrorTag)

Vue.use({
    install(Vue, options){
        Vue.prototype.ToFa = toFa
        Vue.prototype.ToEn = toEn
    }
})

new Vue({
    el: '#app',
    components: {
        'main-view': MainView
    },
    router,
    'template': '<main-view></main-view>'
})
