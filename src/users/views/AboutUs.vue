<template>
  <div>
    <header id="fancy-header" class="fancy-header">
      <div class="container">
        <h2 class="fancy-title">
          {{ $store.state.resource.aboutus.aboutusheading }}
        </h2>
      </div>
    </header>
    <div class="content" id="content">
      <div class="about-us-content" style="background: #f9f9f9">
        <div id="container" class="container"></div>
      </div>
    </div>
  </div>
</template>

<script>
import APIService from "@/services/api.service.js";
import Store from "@/store/index";
export default {
  data() {
    return {
      items: {
        aboutus: "",
      },
    };
  },
  created() {
    document.title = this.$store.state.projecttitle + " - About Us";
    Store.commit("showLoader");
    APIService.getById("/AboutUsGet", "").then((response) => {
      Store.commit("hideLoader");
      this.items.aboutus = response.data
        .filter((x) => x.language == this.$store.state.language)
        .map((x) => x.aboutus)[0];

      document.getElementById(
        "container"
      ).innerHTML = this.items.aboutus.replace("<br>", "");
    });
  },
};
</script>

<style scoped>
p {
  font-size: 16px !important;
  line-height: 25px !important;
}
</style>
