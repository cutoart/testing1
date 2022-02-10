<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },
};
</script>

<style lang="scss">
// Import Main styles for this application
@import "admin/assets/scss/style";
</style>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<style>
.vue-lightbox-modal-image {
  max-height: 250px !important;
}
</style>
