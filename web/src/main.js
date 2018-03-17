import Vue from 'vue';
import VueMaterial from 'vue-material';
import Meta from 'vue-meta';
import cookie from 'cookies-js';
import toFa from './utils/num-fa';
import router from './routes';
import http from './utils/http';

import MainView from './main.vue';
import 'vue-material/dist/vue-material.min.rtl.css';
import './sass/index.scss'

Vue.use(VueMaterial);
Vue.use(Meta);

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


Vue.use({
    install(Vue, options){
        Vue.prototype.ToFa = toFa
    }
})

window.VM = new Vue({
    el: '#app',
    components: {
        'main-view': MainView
    },
    router,
    'template': '<main-view></main-view>'
})
