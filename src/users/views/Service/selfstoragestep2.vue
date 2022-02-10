<template>
  <div class="container">
    <div class="content">
      <div class="title">
        {{ $store.state.resource.selfstoragestep2.selfstorage }}
      </div>
    </div>
    <div class="row">
      <div class="col-6 scrollbar">
        <div class="border-white">
          <div class="border-white" v-for="item in items" v-bind:key="item.id">
            <div class="container">
              <div class="row">
                <div class="col-12 font-weight-bold">
                  {{ item.storeName }} :
                  {{
                    $store.state.language == "chinese"
                      ? item.branch.label.split("/")[1]
                      : item.branch.label.split("/")[0]
                  }}
                </div>
              </div>
              <div class="row">
                <div class="col-12 font-weight-normal">
                  {{ $store.state.resource.selfstoragestep2.address }}:

                  {{ item.address }}, {{ item.area }},
                  {{
                    $store.state.language == "chinese"
                      ? item.city.label.split("/")[1] == null ||
                        item.city.label.split("/")[1] == undefined ||
                        item.city.label.split("/")[1] == ""
                        ? item.city.label.split("/")[0]
                        : item.city.label.split("/")[1]
                      : item.city.label.split("/")[0]
                  }}
                  ,
                  {{
                    $store.state.language == "chinese"
                      ? item.state.label.split("/")[1] == null ||
                        item.state.label.split("/")[1] == undefined ||
                        item.state.label.split("/")[1] == ""
                        ? item.state.label.split("/")[0]
                        : item.state.label.split("/")[1]
                      : item.state.label.split("/")[0]
                  }}
                  ({{ item.pincode }})
                </div>
              </div>
              <div class="row">
                <div class="col-12 font-weight-normal">
                  <span class="pr-2">
                    {{ $store.state.resource.selfstoragestep2.tel }}:
                    <a :href="'tel:' + item.telephoneNumber.replace(' ', '')">
                      {{ item.telephoneNumber }}
                    </a>
                  </span>
                  <span class="pr-2">
                    {{ $store.state.resource.selfstoragestep2.directline }}:
                    <a
                      :href="
                        'tel:' + item.directlinephoneNumber.replace(' ', '')
                      "
                    >
                      {{ item.directlinephoneNumber }}
                    </a>
                  </span>
                  <span class="pr-2">
                    {{ $store.state.resource.selfstoragestep2.whatsapp }}:
                    <a :href="'tel:' + item.whatsappNumber.replace(' ', '')">
                      {{ item.whatsappNumber }}
                    </a>
                  </span>
                  <span class="pr-2">
                    {{ $store.state.resource.selfstoragestep2.email }}:
                    {{ item.email }}
                  </span>
                </div>
              </div>
              <div class="row">
                <div class="col-7 font-weight-normal">
                  <b-dropdown
                    text="Office hours:"
                    split
                    split-variant="outline-primary"
                    variant="primary"
                    block
                  >
                    <b-dropdown-item
                      ><div class="day-name">
                        {{ $store.state.resource.selfstoragestep2.daymonday }} :
                      </div>
                      {{
                        item.officehours.monstart != "" &&
                        item.officehours.monend != ""
                          ? $converttime(item.officehours.monstart) +
                            " - " +
                            $converttime(item.officehours.monend)
                          : "closed"
                      }}</b-dropdown-item
                    >
                    <b-dropdown-item
                      ><div class="day-name">
                        {{ $store.state.resource.selfstoragestep2.daytuesday }}
                        :
                      </div>
                      {{
                        item.officehours.tuestart != "" &&
                        item.officehours.tueend != ""
                          ? $converttime(item.officehours.tuestart) +
                            " - " +
                            $converttime(item.officehours.tueend)
                          : "closed"
                      }}</b-dropdown-item
                    >
                    <b-dropdown-item
                      ><div class="day-name">
                        {{
                          $store.state.resource.selfstoragestep2.daywednesday
                        }}
                        :
                      </div>
                      {{
                        item.officehours.wedstart != "" &&
                        item.officehours.wedend != ""
                          ? $converttime(item.officehours.wedstart) +
                            " - " +
                            $converttime(item.officehours.wedend)
                          : "closed"
                      }}</b-dropdown-item
                    >
                    <b-dropdown-item
                      ><div class="day-name">
                        {{ $store.state.resource.selfstoragestep2.daythursday }}
                        :
                      </div>
                      {{
                        item.officehours.thustart != "" &&
                        item.officehours.thuend != ""
                          ? $converttime(item.officehours.thustart) +
                            " - " +
                            $converttime(item.officehours.thuend)
                          : "closed"
                      }}</b-dropdown-item
                    >
                    <b-dropdown-item
                      ><div class="day-name">
                        {{ $store.state.resource.selfstoragestep2.dayfriday }} :
                      </div>
                      {{
                        item.officehours.fristart != "" &&
                        item.officehours.friend != ""
                          ? $converttime(item.officehours.fristart) +
                            " - " +
                            $converttime(item.officehours.friend)
                          : "closed"
                      }}</b-dropdown-item
                    >
                    <b-dropdown-item
                      ><div class="day-name">
                        {{ $store.state.resource.selfstoragestep2.daysaturday }}
                        :
                      </div>
                      {{
                        item.officehours.satstart != "" &&
                        item.officehours.satend != ""
                          ? $converttime(item.officehours.satstart) +
                            " - " +
                            $converttime(item.officehours.satend)
                          : "closed"
                      }}</b-dropdown-item
                    >
                    <b-dropdown-item
                      ><div class="day-name">
                        {{ $store.state.resource.selfstoragestep2.daysunday }} :
                      </div>
                      {{
                        item.officehours.sunstart != "" &&
                        item.officehours.sunend != ""
                          ? $converttime(item.officehours.sunstart) +
                            " - " +
                            $converttime(item.officehours.sunend)
                          : "closed"
                      }}</b-dropdown-item
                    >
                  </b-dropdown>
                </div>
              </div>
              <div class="row">
                <div
                  class="col-12 font-weight-normal mt-4"
                  style="display: flex"
                >
                  <div
                    class="pr-3"
                    style="padding-top: 7px"
                    v-if="
                      item.facilities != undefined && item.facilities.length > 0
                        ? item.facilities.includes('TrainConnectivity')
                        : false
                    "
                  >
                    <img
                      src="../../assets/images/downloadNew.png"
                      height="45"
                      width="52"
                    />
                  </div>
                  <div
                    class="pr-3"
                    style="padding-top: 7px"
                    v-if="
                      item.facilities != undefined && item.facilities.length > 0
                        ? item.facilities.includes('24Hropen')
                        : false
                    "
                  >
                    <img
                      src="../../assets/images/vector.png"
                      height="41"
                      width="41"
                    />
                  </div>
                  <div
                    class="pr-3"
                    v-if="
                      item.facilities != undefined && item.facilities.length > 0
                        ? item.facilities.includes('Webcam')
                        : false
                    "
                  >
                    <img
                      src="../../assets/images/video-camera.png"
                      height="56"
                      width="52"
                    />
                  </div>
                  <div
                    class="pr-3"
                    style="padding-top: 4px"
                    v-if="
                      item.facilities != undefined && item.facilities.length > 0
                        ? item.facilities.includes('wifi')
                        : false
                    "
                  >
                    <img
                      src="../../assets/images/wifi.png"
                      height="47"
                      width="47"
                    />
                  </div>
                  <div
                    class="pr-3"
                    style="padding-top: 9px"
                    v-if="
                      item.facilities != undefined && item.facilities.length > 0
                        ? item.facilities.includes('weather')
                        : false
                    "
                  >
                    <img src="../../assets/images/weather.png" />
                  </div>
                  <div class="text-right pt-2">
                    <a
                      href="#"
                      class="btn btn-primary looking-better"
                      v-on:click="setstore(item)"
                      >{{ $store.state.resource.selfstoragestep2.btnselect }}</a
                    >
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="button2">
                  <a
                    href="#"
                    class="btn btn-primary looking-better"
                    v-on:click="setstore(item)"
                    >{{ $store.state.resource.selfstoragestep2.btnselect }}</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6 form-group map">
        <div
          v-if="
            user.iframe != undefined && user.iframe != null && user.iframe != ''
          "
          class="image-map1"
        >
          <iframe
            :src="user.iframe"
            height="100%"
            width="100%"
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import APIService from "@/services/api.service.js";
import Store from "@/store/index";
Vue.config.productionTip = false;

export default {
  name: "Selfstorage",
  props: {
    vmodel: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      items: [],
    };
  },
  created() {
    document.title = this.$store.state.projecttitle + " - Store";
    Store.commit("showLoader");
    APIService.post(
      "/selfstorelist",
      { languageType: this.$store.state.language },
      null
    ).then((response) => {
      this.$set(this, "items", response.data);
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
        Store.commit("hideLoader");
      }
    });
  },
  methods: {
    setstore(storedetail) {
      this.vmodel.storedetail = storedetail;
      this.$emit("isselect", this.vmodel);
    },
    getmultiplePosition: function (marker) {
      return {
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng),
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 23px;
  padding-bottom: 23px;
  text-align: left;
}
.scrollbar::-webkit-scrollbar {
  height: 5px;
  width: 5px;
  background-color: #f5f5f5;
}
.scrollbar::-webkit-scrollbar-track {
  background-color: #f5f5f5;
}
.scrollbar::-webkit-scrollbar-thumb {
  background-color: #000000;
  border: 2px solid #555555;
}
.scrollbar {
  height: 715px;
  overflow: scroll;
  overflow-x: hidden;
}
.title {
  font-size: 35px;
  line-height: 41px;
  text-align: center;
}
.border-white {
  margin-top: 15px;
  height: auto;
  width: 640px;
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 0px 0px 30px 0px;
}
.font-weight-bold {
  font-size: 26px;
  line-height: 140.62%;
  color: #4e7082;
  font-family: Roboto;
  font-weight: bold;
  padding-top: 23px;
}
.font-weight-normal {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 140.62%;
  color: #4e7082;
  padding-top: 9px;
}
.font-weight-normal1 {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 140.62%;
  color: #4e7082;
  padding-top: 9px;
  margin: 0px 16px;
}
.img {
  position: absolute;
  width: 52px;
  height: 45px;
  left: 21px;
  margin-top: 40px;
}
.img1 {
  position: absolute;
  width: 41px;
  height: 41px;
  left: 101px;
  margin-top: 40px;
}
.img2 {
  position: absolute;
  width: 35.1px;
  height: 32.9px;
  left: 176px;
  margin-top: 40px;
}
.img3 {
  position: absolute;
  width: 47px;
  height: 47px;
  left: 235px;
  margin-top: 40px;
}
.img4 {
  position: absolute;
  width: 45px;
  height: 45px;
  left: 307px;
  margin-top: 40px;
}
a.looking-better {
  background: #f28f8f;
  border: 0;
  outline: 0;
  padding: 15px 14px 15px 45px;
  position: relative;
  font-size: 18px;
  line-height: 10px;
  color: #ffffff;
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
.img-map {
  margin-top: 15px;
  height: 700px;
  width: 620px;
}
.image-map {
  height: 100%;
  width: 100%;
  display: contents;
}
.text-right {
  position: absolute;
  right: 2%;
}
.button2 {
  display: none;
}
.day-name {
  width: 100px;
}
</style>
<style>
.slider {
  width: auto !important;
}
.dropdown-item {
  display: flex !important;
}

@media only screen and (max-width: 992px) {
  .border-white[data-v-36655ddc] {
    margin-top: -18px;
    width: 345px;
  }
  .pr-3,
  img {
    margin-top: -15px;
  }
  .scrollbar[data-v-36655ddc] {
    overflow: scroll;
    max-width: 360px;
    margin-right: 10px;
  }
  .text-right {
    display: none;
  }
  .button2[data-v-36655ddc] {
    display: block;
    margin-left: 200px;
  }
}

@media only screen and (max-width: 765px) {
  .border-white[data-v-36655ddc] {
    margin-top: -15px;
    width: 345px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  }
  .font-weight-bold[data-v-36655ddc] {
    font-size: 20px;
  }
  .font-weight-normal,
  span {
    display: block;
  }
  .pr-3,
  img {
    margin-top: -15px;
  }
  .scrollbar[data-v-36655ddc] {
    height: 550px;
    overflow: scroll;
    padding-left: 0px;
    margin-left: 10px;
    flex: 0 0 95%;
    max-width: 100%;
  }
  .text-right {
    display: none;
  }
  .button2[data-v-36655ddc] {
    display: block;
    margin-left: 200px;
    margin-top: 0px;
  }
  .map {
    height: 400px;
    margin-left: 15px;
    margin-top: 30px;
    flex: 0 0 95%;
    max-width: 345px;
  }
}
</style>
