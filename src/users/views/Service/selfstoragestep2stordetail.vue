<template>
  <div class="container">
    <div class="content">
      <div class="title">
        {{ $store.state.resource.selfstoragestep2storedetail.selfstorage }}
      </div>
    </div>
    <div class="text-left font-weight-bold">
      {{ vmodel.storedetail.storeName }} :
      {{ vmodel.storedetail.branch.label }}
    </div>
    <div class="row">
      <div class="col-7 partition" v-show="renewid == null">
        <div class="row slider">
          <section id="slider" class="slider-img" v-show="renewid == null">
            <div
              id="carouselsliderIndicators"
              class="col-12 carousel slide"
              data-ride="carousel"
            >
              <div class="carousel-inner">
                <div
                  v-for="(image, index) in vmodel.storedetail.storeimages"
                  v-bind:key="index"
                  :class="index == 0 ? 'carousel-item active' : 'carousel-item'"
                >
                  <div class="image-wrapper">
                    <img :src="$store.state.apiURL + '/store/' + image" />
                  </div>
                </div>
                <a
                  class="carousel-control-prev"
                  href="#carouselsliderIndicators"
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
                  href="#carouselsliderIndicators"
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
        <div class="row" v-show="renewid == null">
          <div
            class="col-12 form-group text-left font-weight-normal"
            style="padding-top: 10px"
          >
            {{ $store.state.resource.selfstoragestep2storedetail.address }}:
            {{ vmodel.storedetail.address }}, {{ vmodel.storedetail.area }},
            {{
              $store.state.language == "chinese"
                ? vmodel.storedetail.city.label.split("/")[1] == null ||
                  vmodel.storedetail.city.label.split("/")[1] == undefined ||
                  vmodel.storedetail.city.label.split("/")[1] == ""
                  ? vmodel.storedetail.city.label.split("/")[0]
                  : vmodel.storedetail.city.label.split("/")[1]
                : vmodel.storedetail.city.label.split("/")[0]
            }}
            ,
            {{
              $store.state.language == "chinese"
                ? vmodel.storedetail.state.label.split("/")[1] == null ||
                  vmodel.storedetail.state.label.split("/")[1] == undefined ||
                  vmodel.storedetail.state.label.split("/")[1] == ""
                  ? vmodel.storedetail.state.label.split("/")[0]
                  : vmodel.storedetail.state.label.split("/")[1]
                : vmodel.storedetail.state.label.split("/")[0]
            }}
            ({{ vmodel.storedetail.pincode }})
          </div>
        </div>
        <div class="row" v-show="renewid == null">
          <div class="form-group text-left font-weight-normal">
            <span class="col-lg-12 col-md-6 col-sm-12">
              {{ $store.state.resource.selfstoragestep2storedetail.tel }}:
              <a
                :href="
                  'tel:' + vmodel.storedetail.telephoneNumber.replace(' ', '')
                "
              >
                {{ vmodel.storedetail.telephoneNumber }}
              </a>
            </span>
            <span class="col-lg-12 col-md-6 col-sm-12">
              {{
                $store.state.resource.selfstoragestep2storedetail.directline
              }}:
              <a
                :href="
                  'tel:' +
                  vmodel.storedetail.directlinephoneNumber.replace(' ', '')
                "
              >
                {{ vmodel.storedetail.directlinephoneNumber }}
              </a>
            </span>
            <span class="col-lg-12 col-md-6 col-sm-12">
              {{ $store.state.resource.selfstoragestep2storedetail.whatspp }}:
              <a
                :href="
                  'tel:' + vmodel.storedetail.whatsappNumber.replace(' ', '')
                "
              >
                {{ vmodel.storedetail.whatsappNumber }}
              </a>
            </span>
            <span class="col-lg-12 col-md-6 col-sm-12">
              {{ $store.state.resource.selfstoragestep2storedetail.email }}:
              {{ vmodel.storedetail.email }}
            </span>
          </div>
        </div>
        <div class="row" v-show="renewid == null">
          <div
            class="col-md-6 col-sm-12 form-group text-left font-weight-normal"
          >
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
                  vmodel.storedetail.officehours.monstart != "" &&
                  vmodel.storedetail.officehours.monend != ""
                    ? $converttime(vmodel.storedetail.officehours.monstart) +
                      " - " +
                      $converttime(vmodel.storedetail.officehours.monend)
                    : "closed"
                }}</b-dropdown-item
              >
              <b-dropdown-item
                ><div class="day-name">
                  {{ $store.state.resource.selfstoragestep2.daytuesday }}
                  :
                </div>
                {{
                  vmodel.storedetail.officehours.tuestart != "" &&
                  vmodel.storedetail.officehours.tueend != ""
                    ? $converttime(vmodel.storedetail.officehours.tuestart) +
                      " - " +
                      $converttime(vmodel.storedetail.officehours.tueend)
                    : "closed"
                }}</b-dropdown-item
              >
              <b-dropdown-item
                ><div class="day-name">
                  {{ $store.state.resource.selfstoragestep2.daywednesday }}
                  :
                </div>
                {{
                  vmodel.storedetail.officehours.wedstart != "" &&
                  vmodel.storedetail.officehours.wedend != ""
                    ? $converttime(vmodel.storedetail.officehours.wedstart) +
                      " - " +
                      $converttime(vmodel.storedetail.officehours.wedend)
                    : "closed"
                }}</b-dropdown-item
              >
              <b-dropdown-item
                ><div class="day-name">
                  {{ $store.state.resource.selfstoragestep2.daythursday }}
                  :
                </div>
                {{
                  vmodel.storedetail.officehours.thustart != "" &&
                  vmodel.storedetail.officehours.thuend != ""
                    ? $converttime(vmodel.storedetail.officehours.thustart) +
                      " - " +
                      $converttime(vmodel.storedetail.officehours.thuend)
                    : "closed"
                }}</b-dropdown-item
              >
              <b-dropdown-item
                ><div class="day-name">
                  {{ $store.state.resource.selfstoragestep2.dayfriday }} :
                </div>
                {{
                  vmodel.storedetail.officehours.fristart != "" &&
                  vmodel.storedetail.officehours.friend != ""
                    ? $converttime(vmodel.storedetail.officehours.fristart) +
                      " - " +
                      $converttime(vmodel.storedetail.officehours.friend)
                    : "closed"
                }}</b-dropdown-item
              >
              <b-dropdown-item
                ><div class="day-name">
                  {{ $store.state.resource.selfstoragestep2.daysaturday }}
                  :
                </div>
                {{
                  vmodel.storedetail.officehours.satstart != "" &&
                  vmodel.storedetail.officehours.satend != ""
                    ? $converttime(vmodel.storedetail.officehours.satstart) +
                      " - " +
                      $converttime(vmodel.storedetail.officehours.satend)
                    : "closed"
                }}</b-dropdown-item
              >
              <b-dropdown-item
                ><div class="day-name">
                  {{ $store.state.resource.selfstoragestep2.daysunday }} :
                </div>
                {{
                  vmodel.storedetail.officehours.sunstart != "" &&
                  vmodel.storedetail.officehours.sunend != ""
                    ? $converttime(vmodel.storedetail.officehours.sunstart) +
                      " - " +
                      $converttime(vmodel.storedetail.officehours.sunend)
                    : "closed"
                }}</b-dropdown-item
              >
            </b-dropdown>
          </div>
        </div>
        <div class="row scrollbar" v-show="renewid == null">
          <div>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th style="width: 150px">
                    {{
                      $store.state.resource.selfstoragestep2storedetail
                        .usablearea
                    }}
                  </th>
                  <th style="width: 150px">
                    {{
                      $store.state.resource.selfstoragestep2storedetail
                        .widthdepth
                    }}
                  </th>
                  <th style="width: 150px">
                    {{
                      $store.state.resource.selfstoragestep2storedetail
                        .standardrate
                    }}
                  </th>
                  <th
                    v-for="_duration in selfstorecharges.storedurations"
                    v-bind:key="_duration.index"
                    style="width: 150px"
                  >
                    {{ _duration.months }}
                    {{ $store.state.resource.selfstoragestep2storedetail.months
                    }}<br />({{ _duration.discount
                    }}{{
                      $store.state.resource.selfstoragestep2storedetail.off
                    }})
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="_charges in selfstorecharges.storecharges"
                  v-bind:key="_charges.index"
                >
                  <td>{{ _charges.usablearea }}</td>
                  <td>{{ _charges.areainwidth }}X{{ _charges.areaindepth }}</td>
                  <td>{{ _charges.monthlyrate }}</td>
                  <td
                    v-for="_duration in selfstorecharges.storedurations"
                    v-bind:key="_duration.index"
                  >
                    {{
                      Math.round(
                        _duration.discount > 0
                          ? _charges.monthlyrate -
                              (_charges.monthlyrate * _duration.discount) / 100
                          : _charges.monthlyrate
                      )
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row" v-show="renewid == null">
          <div class="content-wrap map">
            <div class="image-wrapper">
              <div>
                <gmap-map
                  class="image-map"
                  ref="mymap"
                  :center="{
                    lat: parseFloat(item.latitude),
                    lng: parseFloat(item.longitude),
                  }"
                  :zoom="15"
                  :options="{
                    zoomControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false,
                  }"
                >
                  <gmap-info-window
                    :options="infoOptions"
                    :position="infoPosition"
                    :opened="infoOpened"
                    @closeclick="infoOpened = false"
                  >
                    {{ infoContent }}
                  </gmap-info-window>
                  <gmap-marker
                    v-for="(item, key) in item.coordinates"
                    :key="key"
                    :position="getPosition(item)"
                    :clickable="true"
                  />
                </gmap-map>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-show="renewid == null">
          <div class="font-weight-normal mt-4" style="display: flex">
            <div
              class="pr-3 firsticon"
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
              <img src="../../assets/images/wifi.png" height="47" width="47" />
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
          </div>
        </div>
        <div class="row remark" v-show="renewid == null">
          <div
            id="remarks"
            class="form-group text-left font-weight-normal"
            style="margin-top: 10px"
          ></div>
        </div>
      </div>
      <div :class="renewid == null ? 'partition1' : ''">
        <div class="">
          <div class="row sqft" v-show="renewid == null">
            <div
              class="col-6 form-group"
              v-for="item in selfstorecharges.storecharges"
              :key="item.index"
            >
              <button
                class="btn btn-secondary button-storecharge"
                :class="{ active: vmodel.active_sq == item.index }"
                @click="toggleClass(item.index)"
              >
                {{ item.usablearea }}
                {{ $store.state.resource.selfstoragestep2storedetail.btnsqft }}
              </button>
            </div>
          </div>
          <div :class="renewid != null ? 'row' : ''">
            <div
              class="month"
              style="margin-top: 50px"
              :class="renewid == null ? 'row' : 'row col-md-6 col-sm-12 '"
            >
              <div
                class="form-group"
                v-for="item in selfstorecharges.storedurations"
                :key="item.index"
                :class="
                  renewid != null
                    ? 'p-0 col-6 col-lg-6 col-md-6 col-sm-6 '
                    : 'col-6'
                "
              >
                <button
                  class="btn button-storecharge"
                  :class="
                    renewid != null
                      ? vmodel.active_month == item.index
                        ? 'active btn-secondary1'
                        : ' btn-secondary1'
                      : vmodel.active_month == item.index
                      ? 'active btn-secondary'
                      : ' btn-secondary'
                  "
                  @click="togglemonth(item.index)"
                >
                  {{ item.months }}
                  {{
                    $store.state.resource.selfstoragestep2storedetail.btnmonth
                  }}
                </button>
              </div>
            </div>
            <div :class="renewid != null ? 'row col-6 ' : ''">
              <div class="price" :class="renewid == null ? 'row' : 'col-12'">
                <div class="" :class="renewid == null ? 'border1 ' : 'brd'">
                  {{ $store.state.resource.selfstoragestep2storedetail.price }}
                </div>
                <div
                  class="border text-center"
                  :class="renewid == null ? 'border' : 'brd1'"
                >
                  ${{ vmodel.charges }}
                </div>
              </div>
              <div :class="renewid == null ? 'row' : 'col-12'">
                <div class="form-group" style="display: flex">
                  <button
                    class="btn button-storecharge"
                    :class="renewid == null ? 'btn-primary' : 'btn-primary1'"
                    v-on:click="checklogin()"
                  >
                    {{
                      $store.state.resource.selfstoragestep2storedetail
                        .btnbooknow
                    }}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <CForm @submit.prevent="handleSubmit" v-show="renewid == null">
            <CCardBody>
              <CRow>
                <div class="row border-dark" style="margin-left: 2px">
                  <div class="col-12">
                    <span>{{
                      $store.state.resource.selfstoragestep2storedetail
                        .registeronline
                    }}</span>
                  </div>
                  <div class="col-12">
                    <span>{{
                      $store.state.resource.selfstoragestep2storedetail
                        .weshallcontactyoushortly
                    }}</span>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label>{{
                        $store.state.resource.selfstoragestep2storedetail
                          .labelregion
                      }}</label>
                      <v-select
                        v-model="user.region"
                        :options="optionsBranch"
                        :placeholder="
                          $store.state.resource.selfstoragestep2storedetail
                            .regionplaceholder
                        "
                        :class="{
                          'is-invalid': $v.user.region.$error,
                        }"
                      />
                      <span
                        v-if="$v.user.region.required === false"
                        class="invalid-feedback"
                      >
                        Region is required
                      </span>
                    </div>
                  </div>

                  <div class="col-12">
                    <div class="form-group">
                      <label>{{
                        $store.state.resource.selfstoragestep2storedetail
                          .labelyourname
                      }}</label>
                      <input
                        style="border-radius: 0px !important"
                        v-model="user.name"
                        class="form-control"
                        maxlength="25"
                        :placeholder="
                          $store.state.resource.selfstoragestep2storedetail
                            .yournameplaceholder
                        "
                        autocomplete="off"
                        :class="{
                          'is-invalid': $v.user.name.$error,
                        }"
                      />
                      <span
                        v-if="$v.user.name.required === false"
                        class="invalid-feedback"
                      >
                        Name is required
                      </span>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label>{{
                        $store.state.resource.selfstoragestep2storedetail
                          .labelcontactphone
                      }}</label>
                      <input
                        style="border-radius: 0px !important"
                        v-model="user.contact"
                        maxlength="9"
                        v-mask="'#### ####'"
                        onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                        class="form-control"
                        :placeholder="
                          $store.state.resource.selfstoragestep2storedetail
                            .contactphoneplaceholder
                        "
                        autocomplete="off"
                        :class="{
                          'is-invalid': $v.user.contact.$error,
                        }"
                      />
                      <span
                        v-if="$v.user.contact.required === false"
                        class="invalid-feedback"
                      >
                        Contact Number is required
                      </span>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label>{{
                        $store.state.resource.selfstoragestep2storedetail
                          .labelemail
                      }}</label>
                      <input
                        style="border-radius: 0px !important"
                        v-model="user.email"
                        class="form-control"
                        maxlength="100"
                        :placeholder="
                          $store.state.resource.selfstoragestep2storedetail
                            .emailplaceholder
                        "
                        autocomplete="off"
                        :class="{
                          'is-invalid': $v.user.email.$error,
                        }"
                      />
                      <span
                        v-if="!$v.user.email.email"
                        class="invalid-feedback"
                      >
                        Email is invalid
                      </span>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label style="display: flex"
                        >{{
                          $store.state.resource.selfstoragestep2storedetail
                            .labelverificationcode
                        }}
                        <div class="verify-code">
                          {{ user.genverificationcode }}
                          <span>
                            <img
                              src="../../assets/images/reload.png"
                              style="height: 20px; width: 20px"
                              v-on:click="updatecode()"
                            />
                          </span>
                        </div>
                      </label>
                      <input
                        style="border-radius: 0px !important"
                        v-model="user.verificationcode"
                        class="form-control"
                        maxlength="4"
                        :placeholder="
                          $store.state.resource.selfstoragestep2storedetail
                            .verificationcodeplaceholder
                        "
                        autocomplete="off"
                        :class="{
                          'is-invalid': $v.user.verificationcode.$error,
                        }"
                      />
                      <span
                        v-if="$v.user.verificationcode.required === false"
                        class="invalid-feedback"
                      >
                        Verification Code is required
                      </span>
                      <span
                        v-else-if="
                          $v.user.verificationcode.sameasgenerated === false
                        "
                        class="invalid-feedback"
                      >
                        Wrong Verification Code!
                      </span>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label>{{
                        $store.state.resource.selfstoragestep2storedetail
                          .labelcontent
                      }}</label>
                      <textarea
                        style="border-radius: 0px !important"
                        v-model="user.content"
                        class="form-control"
                        maxlength="150"
                        :placeholder="
                          $store.state.resource.selfstoragestep2storedetail
                            .contentplaceholder
                        "
                        autocomplete="off"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <button type="submit" class="col-12 btn btn-send">
                        {{
                          $store.state.resource.selfstoragestep2storedetail
                            .btnsend
                        }}
                      </button>
                    </div>
                  </div>
                </div>
              </CRow>
            </CCardBody>
          </CForm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import APIService from "@/services/api.service.js";
import Store from "@/store/index";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { required, email, sameAs } from "vuelidate/lib/validators";

export default {
  components: {
    vSelect,
  },
  data() {
    return {
      item: {},
      optionsBranch: [],
      user: {
        region: "",
        name: "",
        contact: "",
        email: "",
        verificationcode: "",
        genverificationcode: "",
        content: "",
      },
      selfstorecharges: {
        store: "",
        storedurations: [],
        storecharges: [],
      },
      startLocation: {
        lat: 22.3157,
        lng: 114.2166,
      },
      infoPosition: null,
      infoContent: null,
      infoOpened: false,
      infoCurrentKey: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
    };
  },
  validations: {
    user: {
      region: { required },
      name: { required },
      contact: { required },
      email: { email },
      genverificationcode: { required },
      verificationcode: {
        required,
        sameasgenerated: sameAs("genverificationcode"),
      },
    },
  },
  props: {
    vmodel: {
      type: Object,
      default: null,
    },
    haslogindata: {
      type: Boolean,
      default: false,
    },
    renewid: {
      type: String,
      default: null,
    },
  },
  created() {
    document.title = this.$store.state.projecttitle + " - Store Details";
    if (this.$store.state.language == "chinese") {
      this.vmodel.storedetail.address = this.vmodel.storedetail.chineseValues.chineseAddress;
      this.vmodel.storedetail.branch.label = this.vmodel.storedetail.branch.label.split(
        "/"
      )[1];
    } else {
      this.vmodel.storedetail.branch.label = this.vmodel.storedetail.branch.label.split(
        "/"
      )[0];
    }
    this.item = this.vmodel.storedetail;
    Store.commit("showLoader");
    APIService.getById(
      "/getselfstorechargesbystoreid",
      this.vmodel.storedetail._id
    ).then((response) => {
      this.$set(this, "selfstorecharges", response.data);
      if (this.renewid != null) {
        var areafilter = this.selfstorecharges.storecharges.filter(
          (x) => x.usablearea == this.vmodel.active_sq
        );
        this.vmodel.active_sq =
          areafilter != null && areafilter.length > 0 ? areafilter[0].index : 0;
        var monthfilter = this.selfstorecharges.storedurations.filter(
          (x) => x.months == this.vmodel.active_month
        );
        this.vmodel.active_month =
          monthfilter != null && monthfilter.length > 0
            ? monthfilter[0].index
            : 0;
      }
      this.calculatecharges();
      Store.commit("hideLoader");
    });
    var _optionsBranchlist = [];
    APIService.post("/getbranchforDD").then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        const tag = {
          label: response.data[i].Name,
          value: response.data[i]._id,
        };
        _optionsBranchlist.push(tag);
      }
      this.optionsBranch = _optionsBranchlist;
    });
    this.user.genverificationcode = Math.floor(
      1000 + Math.random() * 9000
    ).toString();
  },
  mounted() {
    document.getElementById(
      "remarks"
    ).innerHTML = this.vmodel.storedetail.remarks.replace("<br>", "");
  },
  methods: {
    toggleClass(sq) {
      this.vmodel.active_sq = sq;
      this.calculatecharges();
    },
    togglemonth(month) {
      this.vmodel.active_month = month;
      this.calculatecharges();
    },
    updatecode() {
      this.user.genverificationcode = Math.floor(
        1000 + Math.random() * 9000
      ).toString();
    },
    getPosition: function (marker) {
      return {
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng),
      };
    },
    calculatecharges() {
      if (
        this.selfstorecharges != null &&
        this.selfstorecharges != undefined &&
        this.selfstorecharges != ""
      ) {
        this.vmodel.sqfeet = this.selfstorecharges.storecharges[
          this.vmodel.active_sq
        ].usablearea;

        this.vmodel.duration = this.selfstorecharges.storedurations[
          this.vmodel.active_month
        ].months;

        var monthlyrate = this.selfstorecharges.storecharges[
          this.vmodel.active_sq
        ].monthlyrate;

        var discount = this.selfstorecharges.storedurations[
          this.vmodel.active_month
        ].discount;

        this.vmodel.charges = Math.round(
          discount > 0
            ? monthlyrate - (monthlyrate * discount) / 100
            : monthlyrate
        );
      }
    },
    checklogin() {
      if (
        this.$store.state.regUserInfo.userId != "" &&
        this.$store.state.regUserInfo.userId != null &&
        this.vmodel.charges > 0
      ) {
        this.$emit("isbook", this.vmodel);
      } else if (this.vmodel.charges > 0) {
        this.$emit("loginmodalvalue");
      }

      if (this.vmodel.charges <= 0) {
        this.$dangerAlert("Payment amount should not be zero.");
      }
    },
    handleSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.submitted = true;
      this.user.apiurl = this.$store.state.apiURL;
      APIService.post("/addonlineregister", this.user).then(() => {
        this.$successAlert("Your Online Register Successfully!!!.");
        this.$router.go("/service");
        this.submitted = false;
      });
      this.submitted = true;
    },
  },
  watch: {
    haslogindata: function (newVal, oldVal) {
      if (newVal != oldVal && this.vmodel.charges > 0) {
        this.$emit("isbook", this.vmodel);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 35px;
  line-height: 41px;
  text-align: center;
  color: #000000;
}
.partition {
  max-width: 770px;
}
.partition1 {
  width: 370px;
  padding-left: 15px;
}
.slider {
  margin-top: -5.5rem;
  width: 770px;
}
.arrowsleft {
  margin-left: 20px;
}
.arrowsright {
  margin-right: 20px;
}
.text-center {
  margin-top: 10px;
  margin-left: 15px;
}
.table td {
  text-align: center !important;
}
.table th {
  text-align: center !important;
}
.table-striped {
  width: 766px;
}
.font-weight-bold {
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 140.62%;
  color: #4e7082;
}
.font-weight-normal {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 140.62%;
  color: #4e7082;
}
.slider-img {
  margin-top: 90px;
}
.slider-img .image-wrapper {
  height: 370px;
  display: inline-block;
  z-index: -1;
}
.image-map {
  margin-top: 15px;
  height: 383px;
  width: 763px;
}
.img {
  height: 50px;
  width: 50px;
  display: block;
  margin-top: 10px;
}
.img1 {
  height: 50px;
  width: 50px;
  display: block;
  margin-top: 10px;
  margin-left: 15px;
}
.border1 {
  font-size: 30px;
  margin-top: 40px;
  color: #ffffff;
  background: #92a7d8;
  margin-left: 15px;
  width: 375px !important;
  height: 43px;
  text-align: center;
}
.border {
  font-size: 40px;
  background: #ffffff;
  color: #407bff;
  margin-left: 15px;
  margin-top: 0px;
  width: 375px !important;
  height: 125px;
  text-align: center;
  padding: 30px;
  border-bottom-right-radius: 30px;
}
.brd1 {
  font-size: 40px;
  background: #ffffff;
  color: #407bff;
  margin-left: 15px;
  margin-top: 0px;
  width: 320px !important;
  height: 125px;
  text-align: center;
  padding: 30px;
  border-bottom-right-radius: 30px;
}
.brd {
  font-size: 20px;
  margin-top: 30px;
  color: #ffffff;
  background: #92a7d8;
  margin-left: 15px;
  width: 320px !important;
  height: 43px;
  text-align: center;
}
.btn-primary {
  background: #14b7eb;
  border-radius: 0px 0px 20px 0px;
  margin-top: 30px;
  font-size: 30px;
  line-height: 35px;
  color: #ffffff;
  width: 375px !important;
  height: 84px;
  margin-left: 15px;
}
.btn-secondary {
  background: #e0e6eb !important;
  color: #407bff !important;
  font-size: 30px;
  line-height: 35px;
  margin-right: 25px;
  border-radius: 0px 0px 20px 0px;
  font-family: Roboto;
  height: 84px;
  width: 178px;
  border-color: transparent !important;
}
.btn-secondary1 {
  background: #e0e6eb !important;
  color: #407bff !important;
  font-size: 25px !important;
  line-height: 25px !important;
  border-radius: 0px 0px 20px 0px;
  font-family: Roboto;
  height: 70px !important;
  width: 140px !important;
  border-color: transparent !important;
  margin-left: 38px !important;
}
.btn-primary1 {
  background: #14b7eb !important;
  border-radius: 0px 0px 20px 0px !important;
  margin-top: 30px !important;
  font-size: 30px !important;
  line-height: 35px !important;
  color: #ffffff !important;
  width: 320px !important;
  height: 75px !important;
  margin-left: 15px !important;
}
.border-dark {
  border: 3px solid #dee2e6 !important;
}
.btn-send {
  background: #14b7eb;
  border-radius: 0px 0px 20px 0px;
  color: #ffffff;
}
.active {
  background: #14b7eb !important;
  color: #ffffff !important;
}
.button-storecharge {
  border: none;
}
@media only screen and (max-width: 992px) {
  .scrollbar {
    overflow: scroll;
    margin-right: 0;
    margin-left: 0;
  }
  .image-map[data-v-048f5b67] {
    margin-left: 15px;
    margin-right: 0px;
    overflow: auto;
    width: 740px;
  }
  .map {
    margin-left: -4px;
    margin-top: 10px;
    margin-bottom: -55px;
  }
  .firsticon {
    margin-left: 15px;
  }
  .pr-3,
  img {
    margin-top: 20px;
  }
  .remark {
    margin-left: 0px;
  }
  .month {
    margin-top: 30px;
  }
}

@media only screen and (max-width: 765px) {
  .slider[data-v-048f5b67] {
    width: 375px;
  }
  .arrowsleft {
    margin-left: 50px;
  }
  .arrowsright {
    margin-right: 50px;
  }
  .col-lg-12,
  col-md-6,
  col-sm-12 {
    display: block;
  }
  .scrollbar {
    overflow: scroll;
    margin-right: 0;
    margin-left: 0;
  }
  .scrollbar::-webkit-scrollbar {
    height: 3px;
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
  .image-map[data-v-048f5b67] {
    width: 100%;
  }
  .firsticon {
    margin-left: 15px;
  }

  .pr-3,
  img {
    margin-top: 20px;
  }
  .remark {
    margin-left: 0px;
  }
  .price {
    margin-top: -20px;
    padding-right: 20px;
  }
  .btn-primary[data-v-048f5b67] {
    width: 345px !important;
  }
  .sqft {
    padding-right: 25px;
    margin-left: -23px;
    margin-top: 10px;
  }
  .month {
    padding-right: 25px;
    margin-left: -23px;
    margin-top: 20px;
  }
  .active {
    background: #14b7eb !important;
    color: #ffffff !important;
  }
  .btn-secondary {
    background: #e0e6eb !important;
    color: #407bff !important;
    font-size: 30px;
    line-height: 35px;
    margin-right: 25px;
    border-radius: 0px 0px 20px 0px;
    font-family: Roboto;
    height: 84px;
    width: 178px;
    border-color: transparent !important;
  }
  .btn-secondary1 {
    font-size: 20px !important;
    line-height: 25px !important;
    border-radius: 0px 0px 20px 0px;
    font-family: Roboto;
    height: 65px !important;
    width: 120px !important;
    border-color: transparent !important;
    margin-left: 38px !important;
  }
  .brd1 {
    font-size: 40px;
    background: #ffffff;
    color: #407bff;
    margin-left: 15px;
    margin-top: 0px;
    width: 285px !important;
    height: 125px;
    text-align: center;
    padding: 30px;
    border-bottom-right-radius: 30px;
  }
  .brd {
    font-size: 25px;
    margin-top: 30px;
    color: #ffffff;
    background: #92a7d8;
    margin-left: 15px;
    width: 285px !important;
    height: 43px;
    text-align: center;
  }
  .btn-primary1 {
    background: #14b7eb !important;
    border-radius: 0px 0px 20px 0px !important;
    margin-top: 30px !important;
    font-size: 30px !important;
    line-height: 35px !important;
    color: #ffffff !important;
    width: 285px !important;
    height: 75px !important;
    margin-left: 15px !important;
  }
}
</style>

<style>
div#remarks p {
  color: #4e7082 !important;
}
.verify-code {
  background: white;
  border: 1px solid;
  padding: 5px;
  margin-left: 10px;
}
</style>
