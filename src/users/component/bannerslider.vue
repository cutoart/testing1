<template>
  <!-- Slider ============================================= -->
  <section id="slider" class="slider-img">
    <div
      id="carouselsliderIndicators"
      class="carousel slide"
      data-ride="carousel"
    >
      <div class="carousel-inner">
        <div
          class="carousel-item"
          :class="{ active: i == 0 }"
          v-for="(banner, i) in ListOfBanner"
          :key="banner._id"
        >
          <div class="image-wrapper" @click="getBanner(banner.url)">
            <img
              :src="$store.state.apiURL + '/banner/' + banner.image"
              :class="banner.url != null ? 'cursor' : ''"
              class="banner-image"
            />
            <a id="bannerUrl" :href="banner.url"></a>
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselsliderIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="arrows" aria-hidden="true"
            ><i class="bx bx-chevron-left"></i
          ></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselsliderIndicators"
          role="button"
          data-slide="next"
        >
          <span class="arrows" aria-hidden="true"
            ><i class="bx bx-chevron-right"></i
          ></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import APIService from "@/services/api.service.js";
import Store from "@/store/index";

export default {
  data() {
    return {
      ListOfBanner: [],
    };
  },
  methods: {
    getBanner(path) {
      if (path != null) {
        window.open(path);
      }
    },
  },
  created() {
    APIService.post("/ListOfBanner", { usertype: "user" }, null, false).then(
      (response) => {
        Store.commit("hideLoader");
        this.$set(this, "ListOfBanner", response.data);
      }
    );
  },
};
</script>

<style>
.banner-image {
  height: 600px !important;
}
.image-wrapper {
  height: 700px;
}
@media only screen and (max-width: 768px) {
  .banner-image {
    height: 400px !important;
  }
  .image-wrapper {
    height: 450px;
    margin-bottom: 20px;
  }
}
@media only screen and (max-width: 425px) {
  .banner-image {
    height: 250px !important;
  }
  .image-wrapper {
    height: 300px;  
  }
}
</style>
