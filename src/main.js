import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'normalize.css';
import app from './app';
import routes from './routes';
import './styles/global.scss';
import './styles/element-reset.scss';
import './styles/element-variables.scss';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(ElementUI, { size: 'small' });
const router = new VueRouter({
  routes,
  base: '',
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { app },
  template: '<app/>',
});
