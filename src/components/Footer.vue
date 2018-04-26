<template>
  <footer>
    <p> &copy; {{ copyright }}</p>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      copyright: '2018 My Vue App'
    };
  }
};
</script>

<style scoped>
footer {
  background: #222;
  padding: 5px;
}

p {
  color: lightgreen;
  text-align: center;
  height: 100px;
}
</style>
