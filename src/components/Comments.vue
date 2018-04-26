<template lang="html">
  <b-container>
    <div class="text-right">
      <p class="text-left mt-5">Add your comment:</p>
      <p class="text-left text_under mb-2">(To add comment you have to
        <router-link to="/login">
          log in
        </router-link>
        first.)</p>
      <b-form-textarea v-model="commentText"
                    type="text"
                    placeholder="Enter your comment"
                    :rows="3"
                    :max-rows="10"
                    class="border_blue">
                    </b-form-textarea>

        <b-button type="button"
        variant="primary"
        class="mt-2"
        v-on:click="addComment">
        Add comment</b-button>

    </div>
    <h3 class="text-left mb-3">Comments</h3>
    <b-card v-for="comment in comments" :key="comment.id" style="max-width: 100%;" class="post_comment mb-2">
      <div class="cross"
            v-on:click="deleteComment(comment.id)">x</div>
      <b-card-body class="text-left">{{ comment.body }}</b-card-body>
      <b-card-footer>
        <div class="comment__footer">
          <p>Author: {{ comment.author }}</p>
          <p>{{ comment.date }}</p>
        </div>
      </b-card-footer>
    </b-card>
  </b-container>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase';
import curDate from '../mixins/curDate';
import sortByDate from '../mixins/sortByDate';

export default {
  data() {
    return {
      commentText: '',
      // isLogin: true,
      comments: [],
      postId: '',
      userId: '',
      username: '',
      commentDate: '',
      commentId: ''
    };
  },
  methods: {
    getCommentAuthor() {
      let curUser = firebase.auth().currentUser;
      // let author;
      if (curUser) {
        let id = curUser.uid;
        axios
          .get(`https://vue-post-list.firebaseio.com/users/${id}.json`)
          .then(response => {
            return response.data;
          })
          .then(user => {
            let author = user.username;
            this.username = author;
            return author;
          });
      }
    },
    renderComments() {
      axios
        .get(
          `https://vue-post-list.firebaseio.com/posts/${
            this.postId
          }/comments.json`
        )
        .then(response => {
          if (response.data) {
            return Object.values(response.data);
          }
        })
        .then(data => {
          if (data) {
            let sortedComments = data.sort(this.sortByDate);
            this.comments = sortedComments;
            return sortedComments;
          }
        });
    },
    addComment() {
      this.isUser();
      let date = this.createDate();
      let comments = this.comments;
      let comment = {
        body: this.commentText,
        author: this.username,
        date: date
      };
      comments.unshift(comment);

      firebase
        .database()
        .ref(`posts/${this.postId}/comments`)
        .push(comment);
      this.commentText = '';
    },
    isUser() {
      if (!this.username) {
        this.$router.replace('/login');
      }
    },
    deleteComment(id) {
      axios
        .delete(
          `https://vue-post-list.firebaseio.com/posts/${
            this.postId
          }/comments/${id}.json`
        )
        .then(() => {
          this.renderComments();
        });
    }
  },
  mixins: [curDate, sortByDate],
  created() {
    this.postId = this.$parent.id;
    // this.userId = this.$parent.userId;
    this.renderComments();
    this.getCommentAuthor();
  },

  watch: {},
  computed: {}
};
</script>

<style scoped>
h3 {
  font-size: 18px;
  font-weight: 600;
  color: #2d77ff;
}
.border_blue {
  box-shadow: 0 0 5px 1px #2d77ff;
}
.comment__footer {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.text_under {
  font-size: 12px;
  font-style: italic;
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
