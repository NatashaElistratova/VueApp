<template lang="html">
  <transition name="modal">
    <div class="modal-mask" v-if="showModal">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="login-form"  id="loginForm">
            <form class="" role="form" @submit.prevent="logIn">
              <transition name="errors">
                <p class="error-list" v-if="errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in errors" :key="error.id">{{ error }} </li>
                  </ul>
                </p>
              </transition>
              <div class="form-group">
                <label for="userEmail">Email:</label>
                <input type="email" class="form-control" placeholder="" id="userEmail" v-model="useremail" required>
                <label for="pass">Password:</label>
                <input type="password" class="form-control" placeholder="" id="pass" v-model="password" required>
                <button class="btn btn-primary" type="submit">Log In</button>
                <p class="under-form__text">You don't an account? You can
                  <router-link
                    to="/sign-up"
                    @click.prevent="showModalWin"
                    class="link_dark">create one
                </router-link>
              </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// import axios from 'axios';
import firebase from 'firebase';

export default {
  data() {
    return {
      errors: [],
      useremail: null,
      password: null,
      showModal: true
    };
  },
  methods: {
    logIn() {
      this.errors = [];
      firebase
        .auth()
        .signInWithEmailAndPassword(this.useremail, this.password)
        .then(user => {
          this.showModalWin();
          alert('Well done! You are now connected');
        })
        .catch(error => {
          this.errors.push(error.message);
        });
    },
    showModalWin() {
      this.showModal = false;
      this.$router.replace('/home');
    }
  }
};
</script>

<style lang="css" scoped>
.login-form{
  width: 350px;
  padding: 15px;
  box-sizing: border-box;
}

.login-form label {
  width: 100%;
  text-align: left;
  margin-bottom: 10px;

}
.login-form input {
  margin-bottom: 15px;
}

.errors-enter-active,
.errors-leave-active{
  transition: opacity .5s;
}

.errors-enter, .errors-leave-to{
  opacity: 0;
}

.login-enter-active,
.login-leave-active {
  transition: opacity 0.4s;
}

.login-enter,
.login-leave-to {
  opacity: 0;
}

</style>
