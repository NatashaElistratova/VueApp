export default {
  computed: {
    filteredPosts: function() {
      return this.posts.filter(post => {
        return post.data.title.toLowerCase().match(this.search.toLowerCase());
      });
    }
  }
};
