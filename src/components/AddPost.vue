<template>

  <b-container>
    <transition name="fade">
      <div class="error-list" v-if="showError">
        <b>An error occurred while sending the data!</b>
      </div>
    </transition>

    <b-form  class="mt-5 text-left" @submit.prevent="sendPost" v-if="!submitted">
      <b-form-group id="postTitleWrap"
                    label="Post title:"
                    label-size="lg"
                    label-for="postTitleWrap">
        <b-form-input id="postTitle"
                      type="text"
                      v-model="post.title"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="postTextWrap"
                    label="Post text:"
                    label-size="lg"
                    label-for="postTextWrap">
        <b-form-textarea id="postText"
                      type="text"
                      v-model="post.text"
                      :rows="6"
                      :max-rows="10"
                      required>
        </b-form-textarea>
      </b-form-group>
      <b-form-group id="postCategotiesWrap"
                    label="Choose category:"
                    label-size="lg"
                    label-for="postCategotiesWrap" >
        <b-form-checkbox-group v-model="post.categories" id="postCategoties">
          <b-form-checkbox value="wizards">Wizards</b-form-checkbox>
          <b-form-checkbox value="mario">Mario</b-form-checkbox>
          <b-form-checkbox value="cheese">Cheese</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      <p>
        <b-button v-on:click="onPickFile">Upload Image</b-button>
        <input type="file" style="display:none;" ref="fileInput" accept="image/*" v-on:change="onFilePicked">
      </p>
      <b-img :src="post.imageUrl" class="mt-3 preview-img" alt=""></b-img>
      <p>
        <b-button type="submit" class="mt-3" size="lg" variant="primary">Add Post</b-button>
      </p>
    </b-form>

    <transition name="fade">
      <div class="submitMsg" v-if="submitted">
        <h3>Thanks for adding your post!</h3>
        <button type="button" class="btn" v-on:click="showForm"> Add one more post</button>
      </div>
    </transition>
  </b-container>

</template>

<script>
// import axios from 'axios';
import firebase from 'firebase';
import curDateMixin from '../mixins/curDate';

export default {
  data() {
    return {
      post: {
        title: '',
        text: '',
        categories: [],
        image: null,
        imageUrl: ''
      },
      date: '',
      submitted: false,
      showError: false,
      curUserId: firebase.auth().currentUser.uid
    };
  },
  methods: {
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      let filename = files[0].name;
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please add a valid file!');
      }
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.post.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.post.image = files[0];
    },
    sendPost() {
      let key;
      let imageUrl;
      this.date = this.createDate();

      firebase
        .database()
        .ref(`posts`)
        .push({
          data: {
            title: this.post.title,
            body: this.post.text,
            categories: this.post.categories
          },
          date: this.date,
          userId: this.curUserId
        })
        .then(response => {
          key = response.key;
          return key;
        })
        .then(key => {
          if (this.post.image) {
            const filename = this.post.image.name;
            const ext = filename.slice(filename.lastIndexOf('.'));

            return firebase
              .storage()
              .ref(`posts/` + key + '.' + ext)
              .put(this.post.image);
          }
        })
        .then(fileData => {
          if (fileData) {
            imageUrl = fileData.metadata.downloadURLs[0];
            return firebase
              .database()
              .ref(`posts/${key}`)
              .child('data')
              .update({
                imageUrl: imageUrl
              });
          }
        })
        .then(response => {
          this.submitted = true;
        })
        .catch(error => {
          console.log(error);
          // if (data.status !== '200') {
          //   this.submitted = false;
          //   this.showError = true;
          // }
        });
    },
    showForm() {
      this.$router.go(this.$router.currentRoute);
      location.reload();
    }
  },
  mixins: [curDateMixin],
  created() {},
  computed: {}
};
</script>

<style scoped>
.form-group .col-form-label {
  font-size: 18px;
  font-weight: 500;
}

.submitMsg {
  padding: 20px 40px;
  background-color: #fff;
  border-radius: 5px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.preview-img {
  width: 200px;
  /* height: 150px; */
  margin-top: 20px;
}
</style>
