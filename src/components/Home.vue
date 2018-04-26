
<template>
<div>
  <div class="home"></div>
</div>
</template>

<script>
export default {
  data() {
    return {
      showModal: true
    };
  },
  methods: {
    changeHeaderColor(val) {
      // let contentBlock = document.getElementsByClassName('content')[0];
      let header = document.getElementsByTagName('nav')[0];
      header.style.backgroundColor = val;
    }
  },
  mounted() {
    this.changeHeaderColor('transparent');
  },
  destroyed() {
    this.changeHeaderColor('#2c3e50');
  }
};
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: url(../assets/background.jpg) center no-repeat;
  background-size: cover;
}
</style>
