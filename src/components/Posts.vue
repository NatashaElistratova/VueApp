<template>
  <b-container>
    <b-input-group size="lg" class="mt-3 mb-3">
      <b-form-input type="text" placeholder="Search posts" v-model="search"></b-form-input>
    </b-input-group>
    <b-card v-for="post in filteredPosts" :key="post.id" tag="article" style="max-width: 100%;" class="mb-2">
      <b-card-body class="text-left">
        <b-img left :src="post.data.imageUrl" alt="Post Image"></b-img>
        <div class="h-100 card-text-wrap">
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
            <icon name="heart" color="#e63f2e"></icon>
            <span >{{ Object.values(post.likes).length }}</span>
          </div>
          <div class="post-item__comments" v-if="post.comments">
            <icon name="comment" color="#2d77ff"></icon>
            <span >{{ Object.values(post.comments).length }}</span>
          </div>
        </div>
        <b-button type="button" variant="warning" v-if="isAuthor(post)" v-on:click="deletePost(post.id)">Delete Post</b-button>
      </b-card-footer>
    </b-card>
    <b-button type="button" variant="primary" v-on:click="getPosts">Load more</b-button>
  </b-container>
</template>

<script>
import axios from 'axios';
// import firebase from 'firebase';
import searchMixin from '../mixins/searchMixin';
import sortByDate from '../mixins/sortByDate';
import isAuthor from '../mixins/isAuthor';

export default {
  data() {
    return {
      posts: [],
      count: 2,
      search: ''
    };
  },
  methods: {
    getPosts() {
      axios
        .get(`https://vue-post-list.firebaseio.com/posts.json`)
        .then(response => {
          return response.data;
        })
        .then(data => {
          let postArray = [];
          for (let key in data) {
            data[key].id = key;
            postArray.push(data[key]);
          }
          return postArray;
        })
        .then(posts => {
          posts.sort(this.sortByDate);
          return (this.posts = posts);
        });
    },

    deletePost(id) {
      axios
        .delete(`https://vue-post-list.firebaseio.com/posts/${id}.json`)
        .then(() => {
          this.getPosts();
        });
    }
  },

  computed: {},
  created() {
    this.getPosts();
  },
  mounted() {},
  filters: {
    'to-uppercase': function(data) {
      return data.toUpperCase();
    }
  },
  mixins: [searchMixin, sortByDate, isAuthor]
};
</script>

<style scoped>
article {
  line-height: 1.4;
}

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
  overflow: hidden;
}
.card-text-wrap {
  display: flex;
  flex-direction: column;
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
</style>
