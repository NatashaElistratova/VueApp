<template>
  <div>
    <b-card-body class="text-left">
      <b-img :src="post.data.imageUrl" alt="Post Image"></b-img>
      <div class="card-text-wrap">
        <h2>{{ post.data.title | to-uppercase }}</h2>
        <p class="card-text">
          {{ post.data.body }}
        </p>
        <router-link class="card-link" v-bind:to="`/post/${post.id}`">Read more</router-link>
      </div>
    </b-card-body>
    <b-card-footer>
      <div>
        <div class="post-item__likes" v-if="post.likes">
          <icon name="heart" class="likes-icon"></icon>
          <span >{{ getLikesLength }}</span>
        </div>
        <div class="post-item__comments" v-if="post.comments">
          <icon name="comment" class="comments-icon"></icon>
          <span >{{ getCommentsLength }}</span>
        </div>
      </div>
      <b-button type="button"
                variant="warning"
                v-if="isAuthor(post)"
                v-on:click="$emit('delete-post', post.id)">Delete Post</b-button>
    </b-card-footer>
  </div>
</template>

<script>
import isAuthor from '../../mixins/isAuthor';

export default {
  props: ['post'],
  data() {
    return {};
  },
  computed: {
    getLikesLength() {
      let likes = Object.values(this.post.likes).length;
      return likes;
    },
    getCommentsLength() {
      let comments = Object.values(this.post.comments).length;
      return comments;
    }
  },
  mixins: [isAuthor],
  filters: {
    'to-uppercase': function(data) {
      return data.toUpperCase();
    }
  }
};
</script>

<style scoped>
article h2 {
  font-size: 1.2em;
  font-weight: 600;
}
article img {
  width: 300px;
  max-width: 30%;
  margin-right: 15px;
}
.card-body {
  display: flex;
  height: 300px;
  overflow: hidden;
}
.card-text-wrap {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  justify-content: space-between;
}
.card-text {
  max-height: 135px;
  overflow: hidden;
}
.card-footer {
  display: flex;
  justify-content: space-between;
}
.card-footer > div {
  display: flex;
}
.post-item__likes,
.post-item__comments {
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.post-item__likes span,
.post-item__comments span {
  font-size: 14px;
  font-style: italic;
}
.likes-icon {
  color: #e63f2e;
}
.comments-icon {
  color: #2d77ff;
}
</style>
