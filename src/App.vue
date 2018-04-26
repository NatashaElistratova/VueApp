<template>
  <div id="app">
    <app-nav></app-nav>
    <router-view>  </router-view>
    <!-- <app-main></app-main> -->
    <!-- <app-footer></app-footer> -->
  </div>
</template>

<script>
// import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';

export default {
  components: {
    'app-nav': Navbar
    // 'app-header': Header,
    // 'app-footer': Footer,
    // 'app-main': Main
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
@import '../src/assets/css/reset.css';
body {
  overflow-y: scroll;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f9f9f9;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.container {
  padding-top: 60px;
  padding-bottom: 30px;
}

.under-form__text {
  font-size: 14px;
  margin-top: 15px;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 400px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.link_dark {
  color: #007bff;
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
</style>
