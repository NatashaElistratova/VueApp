<template>
  <div>
    <div class="cross"
          v-on:click="deleteComment(comment.id)">x</div>
    <b-card-body class="text-left">{{ comment.body }}</b-card-body>
    <b-card-footer>
      <div class="comment__footer">
        <p>Author: {{ comment.author }}</p>
        <p>{{ comment.date }}</p>
      </div>
    </b-card-footer>
  </div>
</template>

<script>
export default {
  props: ['comment'],
  data() {
    return {};
  }
};
</script>

<style scoped>
.comment__footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.post_comment {
  position: relative;
}
.post_comment .cross {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 2px 5px;
  color: #fff;
  background-color: #2d77ff;
  border-radius: 3px;
  cursor: pointer;
}
</style>
