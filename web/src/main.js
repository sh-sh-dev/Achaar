import Vue from 'vue';


// vue tools
import VueMaterial from 'vue-material';
import Meta from 'vue-meta';
import 'vue-material/dist/vue-material.min.rtl.css';
import './sass/index.scss';
Vue.use(VueMaterial);
Vue.use(Meta);


// custom plugins
import plugins from './vue/plugins';
Vue.use(plugins);


// router
import router from './routes';
import checkRoute from './vue/check-route';
router.beforeEach(checkRoute)


// components
import LoadingOverlay from './components/LoadingOverlay.vue';
import ErrorTag from './components/ErrorTag.vue';
Vue.component('loading-overlay', LoadingOverlay);
Vue.component('error-tag', ErrorTag)


// the root instance
window.Vue = Vue;
new Vue({
    el: '#app',
    router
})
