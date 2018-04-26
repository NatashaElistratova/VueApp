export default {
  methods: {
    sortByDate(a, b) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  }
};
