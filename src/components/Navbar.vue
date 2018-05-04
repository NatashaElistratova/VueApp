<template>
<div>
  <b-navbar toggleable="md" fixed="top" type="dark">
    <b-navbar-brand tag="h1" href="#">Project</b-navbar-brand>

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item v-for="link in links"
                    :key="link.id"
                    :to="link.href">
            {{ link.name }}
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown class="button_blue mr-2" right>
          <template slot="button-content">
              <em class="text-light">Log In</em>
          </template>
          <b-dropdown-item>Facebook</b-dropdown-item>
          <b-dropdown-item>Google</b-dropdown-item>
          <b-dropdown-item  to="/login">Log In</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-button size="sm" class="my-2 my-sm-0 mr-2">
          <router-link to="/sign-up" class="text_light">Sign Up</router-link>
        </b-button>
        <b-button size="sm" class="my-2 my-sm-0" v-on:click="logout">Log Out</b-button>

      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
// import logInForm from './LogInForm.vue';
import firebase from 'firebase';
export default {
  components: {},
  data() {
    return {
      links: [
        {
          name: 'Home',
          className: 'home',
          href: '/home'
        },
        {
          name: 'Posts',
          className: 'posts',
          href: '/posts'
        },
        {
          name: 'Add Post',
          className: 'addPost',
          href: '/add-post'
        },
        // {
        //   name: 'Blog',
        //   className: 'blog',
        //   href: '/blog'
        // },
        {
          name: 'Event',
          className: 'event',
          href: '/events'
        }
      ]
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('/login');
        });
    }
  }
};
</script>

<style scoped>
nav {
  background-color: #2c3e50;
}

.navbar-brand {
  font-size: 30px;
  font-weight: 500;
  text-transform: uppercase;
}
.nav-item .nav-link {
  font-size: 18px;
  font-weight: 600;
}

.nav-item .nav-link.active {
  color: #ffa31a;
}
.button_blue {
  background-color: #65aee2;
  border-radius: 3px;
}
.text_light {
  color: #fff;
  text-decoration: none;
}
</style>
