import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';

Vue.config.productionTip = false;

require('materialize-css/sass/materialize.scss');

new Vue({
  render: (h) => h(App),
}).$mount('#app');
