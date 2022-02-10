const CommonJS = {
  install: function (Vue) {
    // Vue.alert = Vue.prototype.$alert = function(src) {
    //   this.$dialog.alert(src);
    // };
    Vue.successAlert = Vue.prototype.$successAlert = function (msg) {
      this.$notify({
        type: "success",
        title: "Success",
        text: msg,
        'animation-type': 'velocity'
      });
    };

    Vue.dangerAlert = Vue.prototype.$dangerAlert = function (msg) {
      this.$notify({
        type: "danger",
        title: "Error",
        text: msg,
        'animation-type': 'velocity'
      });
    };

    Vue.converttime = Vue.prototype.$converttime = function converttime(timeString) {
      var H = +timeString.substr(0, 2);
      var h = H % 12 || 12;
      var ampm = H < 12 ? " AM" : " PM";
      h = h < 10 ? 0 + "" + h : h;
      return h + timeString.substr(2, 3) + ampm;
    }

    Vue.formatDate = Vue.prototype.$formatDate = function formatDate(date) {
      if (date != null && date != "" && date != undefined) {
        var d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [day, month, year].join("-");
      }
      return "";
    }
  }
};
export default CommonJS;