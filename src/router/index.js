import Vue from 'vue';
import Router from 'vue-router';
import todo from 'components/todo';
import Pending from '../components/Pending/Pending.vue';
import Completed from '../components/Completed/Completed.vue';

Vue.use(Router);

export default new Router({
  routes : [
    {
      path      : '/',
      name      : 'todo',
      component : todo,
      children:  [
        {
          path: '/pending',
          component: Pending
        },
        {
          path: '/completed',
          component: Completed
        }
      ]
    }
  ],
  mode:'history'
})
