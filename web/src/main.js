import Vue from 'vue';
import router from './routes';
import MainView from './main.vue';
import VueMaterial from 'vue-material';
import Meta from 'vue-meta';
import toFa from './utils/num-fa';
import 'vue-material/dist/vue-material.min.rtl.css';
import './sass/index.scss'

Vue.use(VueMaterial);
Vue.use(Meta);

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
