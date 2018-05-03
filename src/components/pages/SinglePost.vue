<template>
<b-container>
  <div class="post-list__item">
    <div class="post">
      <h2>{{post.title}}</h2>
      <div class="post__img">
        <b-img :src="post.imageUrl" fluid-grow alt="Post image" />
      </div>
      <article class="">{{post.body}}</article>
      <div class="post__info">
        <p>Author: <span class="italic">{{ author }}</span> </p>
        <p>Date: <span class="italic">{{ date }}</span> </p>
      </div>
      <p>Post Categories:</p>
      <ul class="categories">
        <li v-for="category in post.categories" :key="category.id">{{ category }}</li>
      </ul>
    </div>
    <div class="likes-wrap">
      <div class="likes" v-on:click="addLike">
        <icon name="heart" color="#5d5d5d" scale="1.5"></icon>
      </div>
    </div>
  </div>
  <router-link to="/posts">
    <b-button variant="secondary">Back to posts</b-button>
  </router-link>
  <comments></comments>
</b-container>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase';
import Comments from '../comments/CommentList.vue';

export default {
  components: {
    comments: Comments
  },
  data() {
    return {
      id: this.$route.params.id,
      userId: '',
      post: {},
      author: '',
      date: ''
    };
  },
  methods: {
    createPost() {
      axios
        .get(`https://vue-post-list.firebaseio.com/posts/${this.id}.json`)
        .then(response => {
          return response.data;
        })
        .then(post => {
          this.post = post.data;
          this.postId = post.name;
          this.userId = post.userId;
          this.date = post.date;
          return this.userId;
        })
        .then(id => {
          return axios.get(
            `https://vue-post-list.firebaseio.com/users/${id}.json`
          );
        })
        .then(response => {
          let user = response.data;
          this.author = user.username;
        });
    },
    addLike(e) {
      e.target.style.fill = '#e63f2e';
      this.post.likes++;

      firebase
        .database()
        .ref(`posts/${this.id}/likes`)
        .push({
          userId: this.userId
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.createPost();
  }
};
</script>

<style scoped>
.post-list__item {
  height: 100%;
  text-align: left;
  padding: 20px;
}

.post-list__item h2 {
  font-size: 30px;
  margin-bottom: 20px;
}

.post-list__item p,
article {
  margin: 20px 0;
}

.post {
  display: flex;
  flex-direction: column;
}

.post__img {
  width: 40%;
}

.post article {
  line-height: 1.4;
}

.post .italic {
  font-style: italic;
  font-weight: 600;
}
.post__info {
  display: flex;
  justify-content: space-between;
}
.post .categories {
  list-style: disc;
  margin-left: 20px;
}

.likes-wrap {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.likes:hover {
  cursor: pointer;
}

.btn_back {
  margin-top: 40px;
  background-color: #333;
}
</style>
