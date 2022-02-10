<template>
  <div style="background: #e5e5e5">
    <BannerSlider />
    <div class="content" id="content">
      <section class="our-feature2">
        <div class="container">
          <div class="row background">
            <div class="col-6 map1 form-group" style="margin-bottom:0px">
              <div
                class="col-12"
                style="border-radius:15px;background-color:white"
              >
                <div class="row">
                  <div class="col-12 mb-4 location">
                    <h2>{{ $store.state.resource.selfstorage.ourlocation }}</h2>
                  </div>
                </div>
                <div
                  class="row form-group"
                  v-for="list in listOfMapValue"
                  :key="list.id"
                >
                  <div class="col list">{{ list.name }}</div>
                  <div class="col-10 row">
                    <span
                      class="col-6 span-content"
                      v-for="item in items.filter(
                        (a) => a.state['value'] == list.id
                      )"
                      :key="item._id"
                    >
                      {{ item.storeName }}
                      :
                      {{
                        $store.state.language == "chinese"
                          ? item.branch.label.split("/")[1] == null ||
                            item.branch.label.split("/")[1] == undefined ||
                            item.branch.label.split("/")[1] == ""
                            ? item.branch.label.split("/")[0]
                            : item.branch.label.split("/")[1]
                          : item.branch.label.split("/")[0]
                      }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6 map form-group">
              <div
                style="border-radius:15px;background-color:white;padding-top: 15px;
    padding-bottom: 15px;"
                v-if="
                  setting.iframe != undefined &&
                    setting.iframe != null &&
                    setting.iframe != ''
                "
                class="col-12 image-map1"
              >
                <iframe
                  :src="setting.iframe"
                  height="100%"
                  width="100%"
                  frameborder="0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="content" id="content">
      <section class="our-feature1">
        <div class="container details" style="padding-right:0px">
          <div
            class="row border col-12"
            v-for="item in items"
            v-bind:key="item.id"
          >
            <div class="col-lg-6 col-sm-12 p-0">
              <div class="row slider">
                <section id="slider" class="slider-img">
                  <div
                    :id="'carouselsliderIndicators_' + item._id"
                    class="col-12 carousel slide popup-side-slider"
                    data-ride="carousel"
                  >
                    <div class="carousel-inner">
                      <div
                        v-for="(image, index) in item.storeimages"
                        v-bind:key="index"
                        :class="
                          index == 0 ? 'carousel-item active' : 'carousel-item'
                        "
                      >
                        <div class="image-wrapper">
                          <img :src="$store.state.apiURL + '/store/' + image" />
                        </div>
                      </div>
                      <a
                        class="carousel-control-prev"
                        :href="'#carouselsliderIndicators_' + item._id"
                        role="button"
                        data-slide="prev"
                      >
                        <span class="arrowsleft" aria-hidden="true"
                          ><i class="bx bx-chevron-left"></i
                        ></span>
                        <span class="sr-only">Previous</span>
                      </a>
                      <a
                        class="carousel-control-next"
                        :href="'#carouselsliderIndicators_' + item._id"
                        role="button"
                        data-slide="next"
                      >
                        <span class="arrowsright" aria-hidden="true"
                          ><i class="bx bx-chevron-right"></i
                        ></span>
                        <span class="sr-only">Next</span>
                      </a>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <!-- <div class="col-lg-8 col-sm-12 p-0 " style="height:463px !important"> -->
            <div class="col-lg-6 col-sm-12 p-0 ">
              <div class="scrollbar">
                <div class="col-12 title" style="color:#282020e0">
                  <h5
                    v-on:click="$router.push('/selfstorage/' + item._id)"
                    style="
                    cursor: pointer;
                    font-size: 1.25rem !important;
                    margin-bottom: 0 !important;
                  "
                  >
                    {{ item.storeName }} :
                    {{
                      $store.state.language == "chinese"
                        ? item.branch.label.split("/")[1] == null ||
                          item.branch.label.split("/")[1] == undefined ||
                          item.branch.label.split("/")[1] == ""
                          ? item.branch.label.split("/")[0]
                          : item.branch.label.split("/")[1]
                        : item.branch.label.split("/")[0]
                    }}
                  </h5>
                </div>
                <!-- </div> -->

                <div class="col-12 title-content detail">
                  {{ $store.state.resource.selfstorage.address }}:
                  {{ item.address }} {{ item.area }}
                </div>

                <div class="col-12 title-content">
                  <span
                    class="col-lg-12 col-md-6 col-sm-12"
                    style="padding-left: 0px"
                  >
                    {{ $store.state.resource.selfstorage.tel }}:
                    <a :href="'tel:' + item.telephoneNumber.replace(' ', '')">
                      {{ item.telephoneNumber }}
                    </a>
                  </span>
                  <span class="col-lg-12 col-md-6 col-sm-12">
                    {{ $store.state.resource.selfstorage.directline }}:
                    <a
                      :href="
                        'tel:' + item.directlinephoneNumber.replace(' ', '')
                      "
                    >
                      {{ item.directlinephoneNumber }}
                    </a>
                  </span>
                  <span class="col-lg-12 col-md-6 col-sm-12">
                    {{ $store.state.resource.selfstorage.whatsapp }}:
                    <a :href="'tel:' + item.whatsappNumber.replace(' ', '')">
                      {{ item.whatsappNumber }}
                    </a>
                  </span>
                  <span class="col-lg-12 col-md-6 col-sm-12">
                    {{ $store.state.resource.selfstorage.email }}:
                    {{ item.email }}
                  </span>
                </div>

                <div class="col-12 remark">
                  <div
                    id="remarks"
                    class="form-group text-left font-weight-normal"
                    v-html="item.remarks"
                  ></div>
                </div>
              </div>
              <div class="col-12">
                <div class="row mt-2">
                  <div class="row col-md-8 col-sm-12 facility">
                    <div
                      v-if="
                        item.facilities != undefined &&
                        item.facilities.length > 0
                          ? item.facilities.includes('TrainConnectivity')
                          : false
                      "
                    >
                      <img
                        src="../assets/images/downloadNew.png"
                        class="icon1"
                      />
                    </div>
                    <div
                      v-if="
                        item.facilities != undefined &&
                        item.facilities.length > 0
                          ? item.facilities.includes('24Hropen')
                          : false
                      "
                    >
                      <img src="../assets/images/vector.png" class="icon" />
                    </div>
                    <div
                      v-if="
                        item.facilities != undefined &&
                        item.facilities.length > 0
                          ? item.facilities.includes('Webcam')
                          : false
                      "
                    >
                      <img
                        src="../assets/images/video-camera.png"
                        class="icon"
                      />
                    </div>
                    <div
                      v-if="
                        item.facilities != undefined &&
                        item.facilities.length > 0
                          ? item.facilities.includes('wifi')
                          : false
                      "
                    >
                      <img src="../assets/images/wifi.png" class="icon" />
                    </div>
                    <div
                      v-if="
                        item.facilities != undefined &&
                        item.facilities.length > 0
                          ? item.facilities.includes('weather')
                          : false
                      "
                    >
                      <img src="../assets/images/weather.png" class="icon" />
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-12" style="text-align: right">
                    <div class="buttons">
                      <router-link
                        class="btn btn-primary looking-better"
                        :to="'/selfstorage/' + item._id"
                        >{{
                          $store.state.resource.selfstorage.storebtndetails
                        }}</router-link
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import APIService from "@/services/api.service.js";
import Store from "@/store/index";
import BannerSlider from "@/users/component/bannerslider";
Vue.config.productionTip = false;

export default {
  name: "Selfstorage",
  data() {
    return {
      setting: {},
      gropStoreName: "",
      items: [],
      ListOfBanner: [],
      faciltties: [],
      listOfMapValue: [],
    };
  },
  components: {
    BannerSlider: BannerSlider,
  },
  methods: {
    getBanner(path) {
      window.open(path);
    },
  },
  props: {
    vmodel: {
      type: Object,
      default: null,
    },
  },
  created() {
    document.title = this.$store.state.projecttitle + " - Self Storage";
    Store.commit("showLoader");
    APIService.getById("/getglobalsettings").then((response) => {
      Store.commit("hideLoader");
      this.$set(this, "setting", response.data[0]);
    });
    Store.commit("showLoader");
    APIService.post(
      "/storelist",
      { userType: "user", languageType: this.$store.state.language },
      null,
      true
    ).then((response) => {
      Store.commit("hideLoader");
      if (response.data) {
        this.listOfMapValue = [];
        for (var j = 0; j < response.data.length; j++) {
          this.listOfMapValue = this.listOfMapValue.filter(
            (a) => a.id != response.data[j].state.value
          );
          const tag = {
            name: response.data[j].state.label,
            id: response.data[j].state.value,
          };
          this.listOfMapValue.push(tag);
        }
      }
      this.$set(this, "items", response.data);
    });

    APIService.post("/ListOfBanner", null, null, false).then((response) => {
      Store.commit("hideLoader");
      this.$set(this, "ListOfBanner", response.data);
    });
  },
};
</script>

<style scoped>
.map1 {
  padding-left: 0px !important;
}
.location {
  margin-top: 20px;
}
.name {
  font-size: 12px;
}
.span-content {
  font-size: 12px;
  color: #d83f1c;
  margin-bottom: 8px;
}
.list {
  color: #4e7082;
  font-size: 12px;
}
.title {
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 140.62%;
  color: #4e7082;
  margin-top: 23px;
}
.title-content {
  font-family: Roboto;
  font-size: 16px;
  margin-top: 9px;
  color: #282020;
}
.icon {
  height: 40px;
  width: 40px;
  margin-left: 20px;
}
.icon1 {
  height: 40px;
  width: 40px;
}
a.looking-better {
  background: #e83828;
  border: 0;
  outline: 0;
  position: relative;
  font-size: 18px;
  line-height: 42px;
  color: #ffffff !important;
  margin-bottom: 15px;
  margin-left: auto;
  padding-left: 45px;
}
a.looking-better:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  border-bottom: 55px solid transparent;
  border-left: 45px solid #ffffff;
  width: 0;
}
.storage-list {
  padding-top: 5%;
}
.border {
  width: 1246px;
  margin-top: 30px;
  margin-bottom: 20px;
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 0px 0px 30px 0px;
  padding: 0px;
}
.our-feature1 {
  background: #e5e5e5;
  padding-top: 0px;
  padding-bottom: 100px;
}
.our-feature2 {
  background: #e5e5e5;
  padding-top: 50px;
  padding-bottom: 50px;
}
.title-content {
  font-size: 16px;
}
.image-map1 {
  height: 100%;
  width: 100%;
}
.image-map {
  width: 344px;
  height: 268px;
}
.map-section {
  padding: 0px !important;
}
.slider-img .image-wrapper img {
  height: 389px; 
  width: 581px;
  padding: 30px 0px 24px 30px;
}
.bx-chevron-left {
  margin-left: 60px;
  margin-top: 30px;
}
.facility {
  padding-left: 35px;
}
.font-weight-normal {
  margin-top: 10px;
}
.day-name {
  width: 100px;
}
.map {
  flex: 0 0 50%;
  max-width: 100%;
}
.shop {
  width: 30% !important;
}
.shop1 {
  width: 70% !important;
}
.button {
  padding-bottom: 15px;
}
.scrollbar::-webkit-scrollbar {
  width: 5px;
  background-color: #fff;
}
.scrollbar::-webkit-scrollbar-track {
  background-color: #fff;
}
.scrollbar::-webkit-scrollbar-thumb {
  background-color: #465ecb;
  border: 2px solid #465ecb;
}
.scrollbar {
  height: 330px !important;
  overflow: scroll;
  overflow-x: hidden;
}

.i4ewOd-pzNkMb-fI6EEc{
  display:none;
}
@media only screen and (max-width: 992px) {
  .our-feature2[data-v-47472484] {
    padding-top: 0px;
  }
  .image-map1 {
    margin-top: 100px;
    width: 320px;
  }
  .image-map[data-v-47472484] {
    width: 270px;
    height: 268px;
  }
  .shop1[data-v-47472484] {
    margin-left: 255px;
    margin-top: -300px;
  }
  .detail {
    font-size: 12px;
  }
  .border {
    margin-left: -5px;
    width: 100%;
  }
  .icon {
    height: 25px;
    width: 25px;
    margin-top: 25px;
    margin-left: 30px;
  }
  .icon1 {
    height: 25px;
    width: 25px;
    margin-top: 25px;
  }

  .button {
    padding-right: 10px;
  }
  .slider-img .image-wrapper img {
    width: 100%;
    padding: 20px 20px 0px 20px;
  }
  .bx-chevron-left {
    margin-left: 0px;
    margin-top: 30px;
  }
  .bx-chevron-right {
    margin-top: 20px;
  }
  .facility {
    padding-left: 0px;
  }
  a.looking-better {
    line-height: 28px;
    margin-bottom: 20px;
    margin-top: 25px;
  }
}

@media only screen and (max-width: 768px) {
  .image-map1 {
    width: 100%;
    margin-top: 0px;
  }
}

@media only screen and (max-width: 765px) {
  .our-feature2[data-v-47472484] {
    padding-top: 0px;
  }
  .map {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .map1 {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .col-lg-12,
  col-md-6,
  col-sm-12 {
    display: block;
  }
  .border {
    height: 100%;
    width: 100%;
    margin-top: 30px !important;
    margin-bottom: 20px;
    background: #ffffff;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
    border-radius: 0px 0px 10px 0px;
    border: 1px solid #ffffff !important;
    margin: 0px;
    padding: 0px;
  }
  .image-map[data-v-47472484] {
    width: 345px;
    height: 240px;
    position: relative !important;
  }
  .shop1[data-v-47472484] {
    margin-left: 0px;
    margin-top: 0px;
  }
  .slider-img .image-wrapper img {
    padding: 20px 20px 0px 20px;
  }
  .bx-chevron-left {
    margin-left: 30px;
  }
  .bx-chevron-right {
    margin-right: 30px;
  }
  .icon {
    height: 25px;
    width: 25px;
    margin-top: 15px;
    margin-left: 15px;
  }
  a.looking-better {
    margin-left: -6rem;
    margin-top: 10px;
  }
  .button {
    padding-right: 15px;
  }
  .title {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 110.62%;
    color: #4e7082;
    margin-top: 23px;
  }
  .detail {
    font-size: 12px;
  }
  .title-content {
    font-family: Roboto;
    font-size: 14px;
    margin-top: 9px;
    color: #4e7082;
  }
  .title-content span {
    padding-left: 0px;
  }
}

@media only screen and (max-width: 425px) {
  .image-map1 {
    margin-top: 0px !important;
    width: 400px !important;
  }
  .scrollbar::-webkit-scrollbar {
    width: 2px;
  }
  .scrollbar {
    height: 150px !important;
  }
  .slider-img .image-wrapper img{
    height: 184px;
  }
}

@media only screen and (max-width: 375px) {
  .image-map1 {
    margin-top: 0px !important;
    width: 346px !important;
  }
}

@media only screen and (min-width: 320px) and (max-width: 768px) {
  .icon1 {
    margin-top: 15px !important;
    margin-left: 30px;
  }
  .details {
    padding-right: 15px !important;
  }
}
@media only screen and (min-width: 320px) and (max-width: 1240px) {
  .map1 {
    padding-left: 15px !important;
  }
  .details {
    padding-right: 15px !important;
  }
}
@media only screen and (min-width: 768px) and (max-width: 992px) {
  .image-map1 {
    margin-top: 0px !important;
    width: 354px !important;
  }
}
@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .icon1 {
    margin-top: 25px !important;
    margin-left: 30px;
  }
  @media only screen and (max-width: 1207px) {
    .map1 {
      padding-left: 0px;
    }
  }
}
@media only screen and (min-width: 993px) and (max-width: 1023px) {
  .icon {
    height: 25px;
    width: 25px;
    margin-top: 15px;
    margin-left: 15px;
  }
  .icon1 {
    height: 25px;
    width: 25px;
    margin-top: 15px !important;
    margin-left: 15px;
  }
}
</style>
<style>
.dropdown-item {
  display: flex !important;
}
div#remarks p {
  color: #282020 !important;
}
</style>
