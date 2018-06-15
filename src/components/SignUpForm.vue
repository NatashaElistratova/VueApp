<template lang="html">
  <transition name="modal">
    <div class="modal-mask" v-if="showModal">
      <div class="modal-wrapper" @click.self="hideModalWin">
        <div class="modal-container">
          <form class="signup-form" id="signUpForm" role="form" @submit.prevent="signUp">
            <transition name="errors">
              <p class="error-list" v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                  <li v-for="error in errors" :key="error.id">{{ error }}</li>
                </ul>
              </p>
            </transition>
            <div class="form-group">
              <label for="userEmail">Email:</label>
              <input type="email" class="form-control"  v-model="useremail" required>
              <label for="">User Name:</label>
              <input type="text" class="form-control"  v-model="username" required>
              <label for="pass">Password:</label>
              <input type="password" class="form-control" v-model="password" required>
              <label for="pass2">Repeat password:</label>
              <input type="password" class="form-control" v-model="confirmPassword" required>
              <button class="btn btn-primary" type="submit">Sign Up</button>
              <p class="under-form__text">You already have an account? <router-link to="/login" @click.prevent="hideModalWin" class="link_dark">Click here</router-link></p>
            </div>
          </form>
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
      username: null,
      password: null,
      confirmPassword: null,
      showModal: true
    };
  },
  methods: {
    signUp() {
      this.errors = [];
      if (this.confirmPassword !== this.password) {
        this.errors.push('Passwords not match');
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.useremail, this.password)
          .then(user => {
            let curUserId = user.uid;
            // alert('Your account has been created');
            this.hideModalWin();
            return firebase
              .database()
              .ref('users')
              .child(curUserId)
              .update({
                username: this.username,
                userId: curUserId
              });
          })
          .catch(error => {
            this.errors.push(error.message);
          });
      }
    },
    hideModalWin() {
      this.showModal = false;
      this.$router.replace('/home');
    }
  }
};
</script>

<style scoped>
.signup-form label {
  width: 100%;
  text-align: left;
  margin-bottom: 10px;
}

.signup-form input {
  margin-bottom: 15px;
}

.error-list {
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  background-color: #f39191;
  border: 1px solid red;
  border-radius: 5px;
  margin-bottom: 15px;
}

.error-list b {
  color: #fff;
  font-weight: 500;
}

.error-list ul {
  margin-top: 10px;
}

.errors-enter-active,
.errors-leave-active {
  transition: opacity 0.5s;
}

.errors-enter,
.errors-leave-to {
  opacity: 0;
}
</style>
