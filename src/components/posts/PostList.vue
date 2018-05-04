<template>
  <b-container>
    <b-input-group size="lg" class="mt-3 mb-3">
      <b-form-input type="text" placeholder="Search posts" v-model="search"></b-form-input>
    </b-input-group>
    <transition-group name="list" tag="div">
      <b-card v-for="post in filteredPosts"
              :key="post.id"
              tag="article"
              style="max-width: 100%;"
              class="mb-2 list-item">
        <post :post="post" v-on:delete-post="deletePost"></post>
      </b-card>
    </transition-group>
    <b-button type="button" variant="primary" v-on:click="getPosts">Load more</b-button>
  </b-container>
</template>

<script>
import axios from 'axios';
// import firebase from 'firebase';
import Post from './Post.vue';
import searchMixin from '../../mixins/searchMixin';
import sortByDate from '../../mixins/sortByDate';

export default {
  components: {
    post: Post
  },
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
      let curPostId = id;
      let index;
      for (let i = 0; i < this.posts.length; i++) {
        if (this.posts[i].id === curPostId) {
          index = i;
        }
      }
      // let index = this.posts.indexOf(curPost);
      this.posts.splice(index, 1);
      axios
        .delete(`https://vue-post-list.firebaseio.com/posts/${id}.json`)
        .then(() => {
          // this.getPosts();
        });
    }
  },

  computed: {},
  created() {
    this.getPosts();
  },
  mounted() {},
  mixins: [searchMixin, sortByDate]
};
</script>

<style scoped>
article {
  line-height: 1.4;
}
</style>
