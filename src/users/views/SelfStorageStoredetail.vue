<template>
  <div class="container">
    <div
      class="text-left font-weight-bold mt-4"
      v-if="vmodel.selfstoragestep2.storedetail.branch != null"
    >
      {{ vmodel.selfstoragestep2.storedetail.storeName }} :
      {{ vmodel.selfstoragestep2.storedetail.branch.label }}
    </div>
    <div class="row">
      <div class="col-lg-7 col-md-12">
        <div class="row slider">
          <section id="slider" class="slider-img">
            <div
              id="carouselsliderIndicators"
              class="col-12 carousel slide"
              data-ride="carousel"
            >
              <div class="carousel-inner">
                <div
                  v-for="(image, index) in vmodel.selfstoragestep2.storedetail
                    .storeimages"
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
        <div class="row">
          <div
            class="col-12 form-group text-left font-weight-normal"
            style="padding-top: 10px; display: flex"
          >
            {{ $store.state.resource.selfstoragestep2storedetail.address }}:
            {{ vmodel.selfstoragestep2.storedetail.address }}
            <div v-if="vmodel.selfstoragestep2.storedetail.pincode != null">
              ,({{ vmodel.selfstoragestep2.storedetail.pincode }})
            </div>
          </div>
        </div>
        <div class="row">
          <div class="form-group text-left font-weight-normal">
            <span
              class="col-lg-12 col-md-6 col-sm-12"
              v-if="vmodel.selfstoragestep2.storedetail.telephoneNumber != null"
            >
              {{ $store.state.resource.selfstoragestep2storedetail.tel }}:
              <a
                :href="
                  'tel:' +
                  vmodel.selfstoragestep2.storedetail.telephoneNumber.replace(
                    ' ',
                    ''
                  )
                "
              >
                {{ vmodel.selfstoragestep2.storedetail.telephoneNumber }}
              </a>
            </span>
            <span
              class="col-lg-12 col-md-6 col-sm-12"
              v-if="
                vmodel.selfstoragestep2.storedetail.directlinephoneNumber !=
                null
              "
            >
              {{
                $store.state.resource.selfstoragestep2storedetail.directline
              }}:
              <a
                :href="
                  'tel:' +
                  vmodel.selfstoragestep2.storedetail.directlinephoneNumber.replace(
                    ' ',
                    ''
                  )
                "
              >
                {{ vmodel.selfstoragestep2.storedetail.directlinephoneNumber }}
              </a>
            </span>
            <span
              class="col-lg-12 col-md-6 col-sm-12"
              v-if="vmodel.selfstoragestep2.storedetail.whatsappNumber != null"
            >
              {{ $store.state.resource.selfstoragestep2storedetail.whatspp }}:
              <a
                :href="
                  'tel:' +
                  vmodel.selfstoragestep2.storedetail.whatsappNumber.replace(
                    ' ',
                    ''
                  )
                "
              >
                {{ vmodel.selfstoragestep2.storedetail.whatsappNumber }}
              </a>
            </span>
            <span class="col-lg-12 col-md-6 col-sm-12">
              {{ $store.state.resource.selfstoragestep2storedetail.email }}:
              {{ vmodel.selfstoragestep2.storedetail.email }}
            </span>
          </div>
        </div>
        <div class="row scrollbar">
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
                  v-for="_charges in selfstorecharges.storecharges.slice(0, 4)"
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
        <div class="row image-wrapper">
          <div
            v-if="
              vmodel.selfstoragestep2.storedetail.iframe != undefined &&
              vmodel.selfstoragestep2.storedetail.iframe != null &&
              vmodel.selfstoragestep2.storedetail.iframe != ''
            "
            class="image-map"
          >
            <iframe
              :src="vmodel.selfstoragestep2.storedetail.iframe"
              height="100%"
              width="100%"
              frameborder="0" 
            ></iframe>
          </div>
        </div>
        <div class="row">
          <div class="font-weight-normal mt-4" style="display: flex">
            <div
              class="pr-3 firsticon"
              style="padding-top: 7px"
              v-if="
                vmodel.selfstoragestep2.storedetail.facilities != undefined &&
                vmodel.selfstoragestep2.storedetail.facilities.length > 0
                  ? vmodel.selfstoragestep2.storedetail.facilities.includes(
                      'TrainConnectivity'
                    )
                  : false
              "
            >
              <img src="../assets/images/downloadNew.png" height="45" width="52" />
            </div>
            <div
              class="pr-3"
              style="padding-top: 7px"
              v-if="
                vmodel.selfstoragestep2.storedetail.facilities != undefined &&
                vmodel.selfstoragestep2.storedetail.facilities.length > 0
                  ? vmodel.selfstoragestep2.storedetail.facilities.includes(
                      '24Hropen'
                    )
                  : false
              "
            >
              <img src="../assets/images/vector.png" height="41" width="41" />
            </div>
            <div
              class="pr-3"
              v-if="
                vmodel.selfstoragestep2.storedetail.facilities != undefined &&
                vmodel.selfstoragestep2.storedetail.facilities.length > 0
                  ? vmodel.selfstoragestep2.storedetail.facilities.includes(
                      'Webcam'
                    )
                  : false
              "
            >
              <img
                src="../assets/images/video-camera.png"
                height="56"
                width="52"
              />
            </div>
            <div
              class="pr-3"
              style="padding-top: 4px"
              v-if="
                vmodel.selfstoragestep2.storedetail.facilities != undefined &&
                vmodel.selfstoragestep2.storedetail.facilities.length > 0
                  ? vmodel.selfstoragestep2.storedetail.facilities.includes(
                      'wifi'
                    )
                  : false
              "
            >
              <img src="../assets/images/wifi.png" height="47" width="47" />
            </div>
            <div
              class="pr-3"
              style="padding-top: 9px"
              v-if="
                vmodel.selfstoragestep2.storedetail.facilities != undefined &&
                vmodel.selfstoragestep2.storedetail.facilities.length > 0
                  ? vmodel.selfstoragestep2.storedetail.facilities.includes(
                      'weather'
                    )
                  : false
              "
            >
              <img src="../assets/images/weather.png" />
            </div>
          </div>
        </div>
        <div class="row remark">
          <div
            v-html="vmodel.selfstoragestep2.storedetail.remarksdetail"
            class="form-group text-left font-weight-normal"
            style="margin-top: 10px"
          ></div>
        </div>
      </div>
      <div class="col-lg-4 col-md-12 partition1" >
        <CForm @submit.prevent="handleSubmit">
          <CCardBody style="padding-top: 0px">
            <CRow>
              <div class="row border-dark" >
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
                    <span v-if="!$v.user.email.email" class="invalid-feedback">
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
                            src="../assets/images/reload.png"
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
        <CForm @submit.prevent="bookAppoinment">
          <CCardBody>
            <CRow>
              <div class="row border-dark">
                <div
                  class="sectoin-title ml-3"
                  style="
                    float: left;
                    font-size: 24px;
                    font-weight: 400 !important;
                  "
                >
                  <strong>{{
                    $store.state.resource.selfstoragestep2booking.appoinment
                  }}</strong>
                </div>
                <div class="col-12 mt-3 form-group">
                  <b-datepicker
                    style="border-radius: 0px !important"
                    class="form-control"
                    id="date"
                    v-model="appoinment.date"
                    :min="new Date()"
                    :date-format-options="{
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                      weekday: 'short',
                    }"
                    :class="{
                      'is-invalid': $v.appoinment.date.$error,
                    }"
                  ></b-datepicker>
                  <span
                    v-if="$v.appoinment.date.required === false"
                    class="invalid-feedback"
                  >
                    Appoinment Date is required
                  </span>
                </div>
                <div class="col-12 form-group">
                  <label>{{
                    $store.state.resource.selfstoragestep2booking.labelstarttime
                  }}</label>
                  <b-timepicker
                    id="time"
                    v-model="appoinment.starttime"
                    class="form-control"
                    style="border-radius: 0px !important"
                    :class="{
                      'is-invalid': $v.appoinment.starttime.$error,
                    }"
                    @input="comparetime()"
                  ></b-timepicker>
                  <span
                    v-if="$v.appoinment.starttime.required === false"
                    class="invalid-feedback"
                  >
                    Start Time is required
                  </span>
                </div>
                <div class="col-12 form-group">
                  <label>{{
                    $store.state.resource.selfstoragestep2booking.labelendtime
                  }}</label>
                  <b-timepicker
                    id="time1"
                    v-model="appoinment.endtime"
                    class="form-control"
                    style="border-radius: 0px !important"
                    :class="{
                      'is-invalid':
                        $v.appoinment.endtime.$error || errormessage != '',
                    }"
                  ></b-timepicker>
                  <span
                    v-if="$v.appoinment.endtime.required === false"
                    class="invalid-feedback"
                  >
                    End Time is required
                  </span>
                  <span
                    v-if="
                      errormessage != '' &&
                      $v.appoinment.endtime.required === true
                    "
                    class="invalid-feedback"
                  >
                    {{ errormessage }}
                  </span>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <button type="submit" class="col-12 btn btn-send">
                      Book a Visit
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
</template>

<script>
import APIService from "@/services/api.service.js";
import Store from "@/store/index";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { required, email, sameAs } from "vuelidate/lib/validators";
import Vue from "vue";
Vue.config.productionTip = false;

export default {
  components: {
    vSelect,
  },
  data() {
    return {
      id:
        this.$route.params.id == undefined
          ? this.$route.query.id
          : this.$route.params.id,
      item: {},
      optionsBranch: [],
      vmodel: {
        servicetype: "",
        selfstoragestep2: {
          storedetail: {},
          facilities: [],
        },
      },
      user: {
        region: "",
        name: "",
        contact: "",
        email: "",
        verificationcode: "",
        genverificationcode: "",
        content: "",
      },
      appoinment: {
        date: "",
        starttime: "",
        endtime: "",
      },
      selfstorecharges: {
        store: "",
        storedurations: [],
        storecharges: [],
      },
      errormessage: "",
    };
  },
  props: {
    loginsuccess: {
      type: Boolean,
      default: false,
    },
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
    appoinment: {
      date: { required },
      starttime: { required },
      endtime: { required },
    },
  },
  created() {
    document.title = this.$store.state.projecttitle + " - Store Details";

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

    this.vmodel.servicetype = "selfstorage";
    APIService.getById("/getstore", this.id).then((response) => {
      if (this.$store.state.language === "chinese") {
        response.data.storeName = response.data.chineseValues.chineseStoreName;
        response.data.address = response.data.chineseValues.chineseAddress;
        response.data.area = response.data.chineseValues.chineseArea;
        response.data.remarks = response.data.chineseValues.chineseRemarks;
        response.data.remarksdetail =
          response.data.chineseValues.chineseRemarksdetail;
      }
      this.vmodel.selfstoragestep2.storedetail = response.data;
    });

    APIService.getById("/getselfstorechargesbystoreid", this.id).then(
      (response) => {
        this.$set(this, "selfstorecharges", response.data);
        Store.commit("hideLoader");
      }
    );

    this.user.genverificationcode = Math.floor(
      1000 + Math.random() * 9000
    ).toString();
  },
  methods: {
    updatecode() {
      this.user.genverificationcode = Math.floor(
        1000 + Math.random() * 9000
      ).toString();
    },

    handleSubmit() {
      this.$v.user.$touch();
      if (this.$v.user.$invalid) {
        return;
      }
      this.submitted = true;
      this.user.apiurl = this.$store.state.apiURL;
      APIService.post("/addonlineregister", this.user).then(() => {
        this.$successAlert("Your Online Register Successfully!!!.");
        this.$router.go();
        this.submitted = false;
      });
      this.submitted = true;
    },

    bookAppoinment() {
      this.errormessage = "";
      var strStartTime = this.appoinment.starttime;
      var strEndTime = this.appoinment.endtime;
      var currTime = new Date();

      if (strStartTime && strEndTime) {
        var startTime = currTime.setHours(
          this.GetHours(strStartTime),
          this.GetMinutes(strStartTime),
          0
        );
        var endTime = currTime.setHours(
          this.GetHours(strEndTime),
          this.GetMinutes(strEndTime),
          0
        );
        if (startTime > endTime) {
          this.errormessage = "End Time should be greater than Start time";
        }
      }
      if (
        this.$store.state.regUserInfo.userId != "" &&
        this.$store.state.regUserInfo.userId != null &&
        this.$store.state.regUserInfo.userId != undefined
      ) {
        this.$v.appoinment.$touch();
        if (this.$v.appoinment.$invalid || this.errormessage) {
          return;
        }
        this.submitted = true;
        this.appoinment.storeid = this.id;
        this.appoinment.userId = this.$store.state.regUserInfo.userId;
        this.appoinment.userName = this.$store.state.regUserInfo.userName;
        this.appoinment.email = this.$store.state.regUserInfo.userEmail;
        APIService.post("/addbookappointment", this.appoinment).then(() => {
          this.$successAlert("Your visit is booked!!!.");
          this.$router.go();
          this.submitted = false;
        });
      } else {
        this.$emit("loginmodalvalue");
      }
      this.submitted = true;
    },

    comparetime() {
      this.errormessage = "";
      var strStartTime = this.appoinment.starttime;
      var currTime = new Date();

      if (strStartTime) {
        var _newendTime = currTime.setHours(
          this.GetHours(strStartTime) + 1,
          this.GetMinutes(strStartTime),
          0
        );

        var _endHr = new Date(_newendTime).getHours();
        var _endMin = new Date(_newendTime).getMinutes();
        var _endSec = 0;

        this.appoinment.endtime =
          _endHr.toString().padStart(2, "0") +
          ":" +
          _endMin.toString().padStart(2, "0") +
          ":" +
          _endSec.toString().padStart(2, "0");
      }
    },

    GetHours(d) {
      var h = parseInt(d.split(":")[0]);
      if (d.split(":")[1].split(" ")[1] == "PM") {
        h = h + 12;
      }
      return h;
    },

    GetMinutes(d) {
      return parseInt(d.split(":")[1].split(" ")[0]);
    },
  },
  watch: {
    loginsuccess: function (newVal, oldVal) {
      if (newVal != oldVal) {
        this.bookAppoinment();
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
 // width: 370px;
  padding-left: 15px;
}
.slider {
  margin-top: -5.5rem;
  //width: 770px;
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
/*.table-striped {
  width: 766px;
}*/
.font-weight-bold {
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 140.62%;
  color: #696969e0;
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
