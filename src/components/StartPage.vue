<template lang="html">
  <transition name="modal">
    <div class="modal-mask" v-if="showModal">
      <div class="btn-wrap">
        <button type="button" v-on:click="startApp">GET STARTED</button>
      </div>
        <div class="images">
          <img :src="img2" fluid alt="Image">
          <img :src="img1" fluid alt="Image">
          <img :src="img3" fluid alt="Image">
        </div>
    </div>
  </transition>
</template>

<script>
import fbimg from '../assets/logo.png';
import vueimg from '../assets/firebase.png';
import btimg from '../assets/bootstrap.png';

export default {
  data() {
    return {
      showModal: true,
      img1: vueimg,
      img2: fbimg,
      img3: btimg
    };
  },
  methods: {
    startApp() {
      this.$router.replace('/home');
      this.showModal = false;
    }
  }
};
</script>

<style lang="css">

.modal-mask {
  /* background-color: rgb(40, 47, 62); */
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.images {
  position: relative;
  flex-grow: 1;
  height: 35%;
  max-height: 250px;
}

.btn-wrap {
  flex-grow: 1;
}

.btn-wrap button {
  outline: none;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  background-color: #4caf50;
  color: #2c3e50;
  font-weight: 900;
  cursor: pointer;
}

.images img {
  position: absolute;
  width: 30%;
  animation-name: topDown;
  animation-iteration-count: infinite;
}

.images img:nth-child(1) {
  top: -50px;
  left: 20%;
  z-index: 99;
  animation-duration: 3s;
}

.images img:nth-child(2) {
  left: 10%;
  top: 30%;
  z-index: 50;
  animation-duration: 4s;
}

.images img:nth-child(3) {
  left: 30%;
  bottom: 0;
  z-index: 5;
  animation-duration: 5s;
}

@keyframes topDown {
  0% {
    transform: translateY(10px);
  }

  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(10px);
  }
}
@media (max-width: 1024px) {
  .modal-mask{
    flex-direction: column-reverse;
    align-items: inherit;
  }
  .images {
    flex-grow: 0;
  }
  .images img:nth-child(1) {
    left: 35%;
  }
  .images img:nth-child(2) {
    left: 25%;
  }
  .images img:nth-child(3) {
    left: 50%;
    top:30%;
  }

  .btn-wrap {
    flex-grow: 0;
  }

}
</style>
