import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';
import firebase from 'firebase';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.min.css';
Vue.use(BootstrapVue);

// Filters

// Custom directives
Vue.directive('rainbow', {
  bind(el, binding, vnode) {
    el.style.color =
      '#' +
      Math.random()
        .toString()
        .slice(2, 8);
  }
});
Vue.directive('theme', {
  bind(el, binding, vnode) {
    if (binding.value === 'wide') {
      el.style.maxWidth = '1000px';
    } else if (binding.value === 'narrow') {
      el.style.maxWidth = '560px';
    }
    if (binding.arg === 'column') {
      el.style.background = '#ccc';
      el.style.padding = '20px';
    }
  }
});

Vue.component('icon', Icon);

let app;
let config = {
  apiKey: 'AIzaSyDxNNDih71h8nYPIoU7wzkH1OPX_ckUIr8',
  authDomain: 'vue-post-list.firebaseapp.com',
  databaseURL: 'https://vue-post-list.firebaseio.com',
  projectId: 'vue-post-list',
  storageBucket: 'vue-post-list.appspot.com'
};

firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      render: h => h(App),
      router
    });
  }
});
