import firebase from 'firebase';

export default {
  methods: {
    isAuthor(item) {
      let curUser = firebase.auth().currentUser;
      if (curUser) {
        let curUserId = curUser.uid;
        let postAuthorId = item.userId;
        if (curUserId === postAuthorId) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
};
