import 'core-js/stable';
import Vue from 'vue';
import App from './App.vue';
import CoreuiVue from '@coreui/vue';
import router from './router';
import { iconsSet as icons } from './admin/assets/icons/icons.js';
import store from './store';
import Axios from 'axios';
import CommonJS from "./admin/assets/common";
import Vuelidate from 'vuelidate';
import Notifications from 'vue-notification';
import velocity from 'velocity-animate';
import VueConfirmDialog from 'vue-confirm-dialog'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueLazyload from 'vue-lazyload'
import VueMask from 'v-mask'
import Embed from 'v-video-embed'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.prototype.$http = Axios;

const token = localStorage.getItem('user-token')
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}
Vue.config.productionTip = false
Vue.use(CoreuiVue)
Vue.use(Vuelidate);
Vue.use(Notifications, { velocity });
Vue.use(CommonJS)
Vue.use(VueConfirmDialog)
Vue.component('vue-confirm-dialog', VueConfirmDialog.default)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueLazyload)
Vue.use(VueMask);
Vue.use(Embed);

new Vue({
    icons,
    router,
    store,
    render: h => h(App),
}).$mount('#app')
