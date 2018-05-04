import firebase from 'firebase';

export default {
  methods: {
    isAuthor(item) {
      let curUser = firebase.auth().currentUser;
      if (curUser) {
        let curUserId = curUser.uid;
        let authorId = item.userId || item.author.userId;
        if (curUserId === authorId) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
};
