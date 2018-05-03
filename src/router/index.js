import Vue from 'vue';
import Router from 'vue-router';

import startPage from '../components/pages/StartPage.vue';
import homePage from '../components/pages/Home.vue';
import posts from '../components/posts/PostList.vue';
import addPost from '../components/pages/AddPost.vue';
import singlePost from '../components/pages/SinglePost.vue';
import eventsPage from '../components/pages/Events.vue';
import blogPage from '../components/pages/Blog.vue';
import login from '../components/LogInForm.vue';
import signup from '../components/SignUpForm.vue';
import notFoundPage from '../components/pages/NotFoundPage.vue';
import firebase from 'firebase';

Vue.use(Router);

let router = new Router({
  mode: 'history',
  fallback: false,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      component: startPage
    },
    {
      path: '/home',
      name: '',
      component: homePage
    },
    {
      path: '/sign-up',
      name: '',
      component: signup
    },
    {
      path: '/login',
      name: '',
      component: login
    },
    {
      path: '/posts',
      name: '',
      component: posts
    },
    {
      path: '/add-post',
      name: '',
      component: addPost,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/blog',
      name: '',
      component: blogPage
    },
    {
      path: '/events',
      name: '',
      component: eventsPage
    },
    {
      path: '/post/:id',
      name: '',
      component: singlePost
    },
    {
      path: '*',
      component: notFoundPage
    }
  ]
});

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requireAuth);

  if (requiresAuth && !currentUser) {
    next('/login');
  } else {
    // else if (!requiresAuth && currentUser) next('home');
    next();
  }
});

export default router;
