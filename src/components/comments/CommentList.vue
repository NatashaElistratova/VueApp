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
    <!-- <transition-group name="list" tag="div"> -->
      <b-card v-for="comment in comments" :key="comment.id" style="max-width: 100%;" class="post_comment mb-2">
        <comment :comment="comment"
                  v-on:delete-comment="deleteComment">
        </comment>
      </b-card>
    <!-- </transition-group> -->
  </b-container>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase';
import Comment from './Comment.vue';
import curDate from '../../mixins/curDate';
import sortByDate from '../../mixins/sortByDate';

export default {
  components: {
    comment: Comment
  },
  data() {
    return {
      commentText: '',
      // isLogin: true,
      comments: [],
      postId: '',
      userId: '',
      author: null,
      commentDate: ''
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
            this.author = user;
            return this.author;
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
          let data = response.data;
          if (data) {
            let commentArray = [];
            for (let key in data) {
              data[key].id = key;
              commentArray.push(data[key]);
            }
            return commentArray;
          }
        })
        .then(comments => {
          if (comments) {
            let sortedComments = comments.sort(this.sortByDate);
            this.comments = sortedComments;
            return sortedComments;
          }
        });
    },
    addComment() {
      let date = this.createDate();
      let comments = this.comments;
      let curUser = this.isUser();

      if (curUser) {
        let comment = {
          body: this.commentText,
          author: this.author,
          date: date
        };
        comments.unshift(comment);

        firebase
          .database()
          .ref(`posts/${this.postId}/comments`)
          .push(comment);
        this.commentText = '';
      }
    },
    isUser() {
      if (!this.author) {
        this.$router.replace('/login');
        return false;
      } else {
        return true;
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
.text_under {
  font-size: 12px;
  font-style: italic;
}
</style>
