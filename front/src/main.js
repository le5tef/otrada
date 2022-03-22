import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import Vuex from 'vuex'
import CKEditor from '@ckeditor/ckeditor5-vue2';

Vue.use(CKEditor);
Vue.config.productionTip = false

Vue.use(Vuex)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
