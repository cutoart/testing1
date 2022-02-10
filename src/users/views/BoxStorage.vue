<template>
  <div>
    <!-- Slider ============================================= -->
    <BannerSlider />
    <!-- Cntent ============================================= -->
    <div class="content" id="content">
      <section class="our-feature">
        <div class="container">
          <div class="sectoin-title">
            <h2 style="color:#4B5FC4 !important">{{ $store.state.resource.boxstorage.byboxstorage }}</h2>
          </div>
          <div class="section-content">
            <p>
              {{ $store.state.resource.boxstorage.byboxstoragetext }}
            </p>
          </div>
          <ul class="row">
            <li class="col-md-4" v-for="(item, key) in items" :key="key">
              <div
                class="content-wrap"
                @click="
                  (ShowContactusModal = true),
                    (ContactusModalContent = item.description),
                    (ContactusModalTitle = item.title)
                "
                style="cursor: pointer"
                title="click to show box detail"
              >
                <div class="img-content img">
                  <img :src="item.image" height="250px" width="250px" />
                </div>
                <div class="content">
                  <h3 class="title">
                    <strong
                      style="
                        font-size: 30px !important;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        color: #000000;
                        font-weight: normal;
                      "
                      >{{ item.title }}</strong
                    >
                    <!-- <a class="model" 
                      style="color: blue !important; font-size: 14px !important"
                      href="javascript:;"
                      @click="
                        (ShowContactusModal = true),
                          (ContactusModalContent = items.title)
                      "
                      >View more ></a
                    > -->
                  </h3>
                  <p
                    class="description"
                    style="
                      display: -webkit-box;
                      -webkit-line-clamp: 4;
                      -webkit-box-orient: vertical;
                      overflow: hidden;
                      min-height: 80px !important;
                      max-height: 80px !important;
                    "
                  >
                    {{ item.description }}
                  </p>
                  <a
                    v-if="item.description.length > 112"
                    style="color: blue !important; font-size: 14px !important"
                    href="javascript:;"
                    @click="
                      (ShowContactusModal = true),
                        (ContactusModalTitle = items.title),
                        (ContactusModalContent = items.description)
                    "
                    >View more ></a
                  >
                  <div
                    v-if="item.description.length < 112"
                    style="height: 24px"
                  ></div>
                  <h2
                    class="price"
                    :class="
                      item.price.length > 3
                        ? 'pricetext' + item.price.length
                        : ''
                    "
                  >
                    <span class="price-per">HKD</span>{{ item.price }}
                    <span class="price-per">{{
                      $store.state.resource.boxstorage.byboxstorageboxmonth
                    }}</span>
                  </h2>
                </div>
              </div>
            </li>
          </ul>
          <ul class="row">
            <li class="col-md-3">
              <div class="content-wrap">
                <div class="img-content">
                  <img src="../assets/images/Packing.png" />
                </div>
                <div class="content">
                  <h3 class="head">
                    {{ $store.state.resource.boxstorage.packing }}
                  </h3>
                  <p class="head-small">
                    {{ $store.state.resource.boxstorage.packingtext }}
                  </p>
                </div>
              </div>
            </li>
            <li class="col-md-3">
              <div class="content-wrap">
                <div class="img-content">
                  <img src="../assets/images/Pickup.png" />
                </div>
                <div class="content">
                  <h3 class="head">
                    {{ $store.state.resource.boxstorage.pickup }}
                  </h3>
                  <p class="head-small">
                    {{ $store.state.resource.boxstorage.pickuptext }}
                  </p>
                </div>
              </div>
            </li>
            <li class="col-md-3">
              <div class="content-wrap">
                <div class="img-content">
                  <img src="../assets/images/Store.png" />
                </div>
                <div class="content">
                  <h3 class="head">
                    {{ $store.state.resource.boxstorage.store }}
                  </h3>
                  <p class="head-small">
                    {{ $store.state.resource.boxstorage.storetext }}
                  </p>
                </div>
              </div>
            </li>
            <li class="col-md-3">
              <div class="content-wrap">
                <div class="img-content">
                  <img src="../assets/images/Return.png" />
                </div>
                <div class="content">
                  <h3 class="head">
                    {{ $store.state.resource.boxstorage.return }}
                  </h3>
                  <p class="head-small">
                    {{ $store.state.resource.boxstorage.returntext }}
                  </p>
                </div>
              </div>
            </li>
          </ul>
          <div class="row">
            <div class="col-12">
              <div class="form-group text-right">
                <button
                  class="btn btn-primary col-4 mr-2 joinnow"
                  v-on:click="$router.push('/service/boxstorage')"
                >
                  {{ $store.state.resource.boxstorage.btnbooknow }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <CModal :title="ContactusModalTitle" :show.sync="ShowContactusModal">
      <ContactUsModal
        :ShowContactusModal.sync="ShowContactusModal"
        :content="ContactusModalContent"
      />
    </CModal>
  </div>
</template>

<script>
import APIService from "@/services/api.service.js";
import Store from "@/store/index";
import ContactUsModal from "../../admin/views/ContactusModal";
import BannerSlider from "@/users/component/bannerslider";

export default {
  components: {
    ContactUsModal,
    BannerSlider: BannerSlider,
  },
  data() {
    return {
      items: [],
      ShowContactusModal: false,
      ContactusModalContent: "",
      ContactusModalTitle: "",
      ListOfBanner: [],
    };
  },
  methods: {
    getBanner(path) {
      window.open(path);
    },
  },
  created() {
    console.log(document.getElementById("chatra__iframe"))
    Store.commit("showLoader");
    document.title = this.$store.state.projecttitle + " - Box Storage";
    APIService.post("/ListOfBoxstore", {
      language: this.$store.state.language,
    }).then((response) => {
      Store.commit("hideLoader");
      if (response.data != null) {
        for (var i = 0; i < response.data.length; i++) {
          response.data[i].image =
            this.$store.state.apiURL + "/boxstore/" + response.data[i].image;
          response.data[i].index = i;
        }
        this.items = response.data;
      }
    });

    APIService.post("/ListOfBanner").then((response) => {
      Store.commit("hideLoader");
      this.$set(this, "ListOfBanner", response.data);
    });
  },
};
</script>

<style scoped>
.price {
  color: #007bff;
}
.head {
  color: #007bff;
}
.our-feature {
  background: white;
}
.sectoin-title h2 {
  font-weight: bold;
  font-size: 36px;
  line-height: 42px;
  text-align: center;
}
h3 a {
  font-size: 30px !important;
  line-height: 135.94% !important;
}
.description {
  font-size: 15px !important;
  line-height: 135.94% !important;
}
.price {
  font-size: 45px;
  line-height: 135.94%;
  color: #465ecb;
}
.price-per {
  font-size: 25px;
  line-height: 135.94%;
  color: #465ecb;
}
.head {
  font-size: 36px;
  line-height: 42px;
  text-align: center;
  color: #4d5681;
}
.head-small {
  font-size: 15px !important;
  line-height: 135.94% !important;
  text-align: center !important;
  color: #000000 !important;
}
.joinnow {
  background: #14b7eb;
  border-radius: 0px 0px 20px 0px;
}
.img {
  max-height: 250px !important;
  max-width: 250px !important;
}
.pricetext4 {
  font-size: 35px !important;
}
.pricetext5 {
  font-size: 29px !important;
}
.pricetext6 {
  font-size: 24px !important;
}
.pricetext7 {
  font-size: 21px !important;
}
</style>
