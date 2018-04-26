export default {
  methods: {
    createDate() {
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];
      const d = new Date();
      let monthName = monthNames[d.getMonth()];
      let minutes = d.getMinutes();
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      let date = `${d.getDate()} ${monthName} ${d.getFullYear()} ${d.getHours()}:${minutes}`;
      // console.log(date);
      return date;
    }
  }
};
