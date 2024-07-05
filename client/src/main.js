import Vue from 'vue'
import App from './App.vue' 
import Router from 'vue-router';
import Registro from './components/Registro.vue';
import Login from './components/Login.vue';
import TaskList from './components/TaskList.vue';

Vue.use(Router);

Vue.config.productionTip = false


const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/registro',
      name: 'UserRegister',
      component: Registro
    },
    {
      path: '/login',
      name: 'userLogin',
      component: Login
    },
    {
      path: '/tasks',
      name: 'TaskList',
      component: TaskList
    }
  ]
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');