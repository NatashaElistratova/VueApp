import Vue from 'vue';
import Router from 'vue-router';

import startPage from '../components/StartPage.vue';
import homePage from '../components/Home.vue';
import postsPage from '../components/Posts.vue';
import addPost from '../components/AddPost.vue';
import singlePost from '../components/SinglePost.vue';
import eventsPage from '../components/Events.vue';
import blogPage from '../components/Blog.vue';
import login from '../components/LogInForm.vue';
import signup from '../components/SignUpForm.vue';
import notFoundComponent from '../components/NotFoundComponent.vue';
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
      component: postsPage
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
      component: notFoundComponent
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
