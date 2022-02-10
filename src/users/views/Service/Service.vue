<template>
  <div id="app">
    <ul class="steps has-content-centered" v-if="stepcount != 2">
      <li
        class="steps-segment"
        v-for="tab in tabs"
        :class="{ 'is-active': tab.selected }"
        v-bind:key="tab.name"
      >
        <span class="steps-marker"></span>
        <div class="steps-content">
          <p class="is-size-4">{{ tab.name }}</p>
          <p class="digi">{{ tab.info }}</p>
        </div>
      </li>
    </ul>
    <div ref="tabdetails" class="tab-details" v-if="stepcount != 2">
      <tab name="Step 1" info="Select" v-if="tabs[0].selected == true">
        <div id="form-step-1">
          <section class="our-feature" v-if="stepcount == 0">
            <div class="container">
              <div class="sectoin-title">
                <h2>{{ $store.state.resource.service.selectservice }}</h2>
              </div>
              <div class="section-content">
                <p>
                  {{ $store.state.resource.service.selectservicetext }}
                </p>
              </div>
              <ul class="row">
                <li class="col-md-4">
                  <div class="content-wrap">
                    <div class="img-content">
                      <img src="../../assets/images/our-feature-1.png" />
                    </div>
                    <div class="content">
                      <h3 class="title">
                        <a
                          v-on:click="
                            (stepcount = 11),
                              (tabs[0].selected = false),
                              (tabs[1].selected = true),
                              (tabs[2].selected = false),
                              (paymentFormData.servicetype = 'selfstorage')
                          "
                          style="cursor: pointer"
                          >{{ $store.state.resource.service.selfstorage }}</a
                        >
                      </h3>
                      <p>
                        {{ $store.state.resource.service.selfstoragetext }}
                      </p>
                      <div class="buttons">
                        <router-link
                          class="btn btn-primary book-now"
                          :to="'/selfstoragestores'"
                          >{{
                            $store.state.resource.service.selfstoragebtnbooknow
                          }}</router-link
                        >
                        <a
                          class="btn btn-primary looking-better"
                          v-on:click="
                            (stepcount = 11),
                              (tabs[0].selected = false),
                              (tabs[1].selected = true),
                              (tabs[2].selected = false),
                              (paymentFormData.servicetype = 'selfstorage')
                          "
                          >{{
                            $store.state.resource.service.selfstoragebtnlooking
                          }}</a
                        >
                      </div>
                    </div>
                  </div>
                </li>
                <li class="col-md-4">
                  <div class="content-wrap">
                    <div class="img-content">
                      <img src="../../assets/images/our-feature-1.png" />
                    </div>
                    <div class="content">
                      <h3 class="title">
                        <a
                          v-on:click="
                            (stepcount = 21),
                              (tabs[0].selected = false),
                              (tabs[1].selected = true),
                              (tabs[2].selected = false),
                              (paymentFormDataBoxStorage.servicetype =
                                'boxstorage')
                          "
                          style="cursor: pointer"
                          >{{ $store.state.resource.service.boxstorage }}</a
                        >
                      </h3>
                      <p>
                        {{ $store.state.resource.service.boxstoragetext }}
                      </p>
                      <div class="buttons">
                        <a
                          class="btn btn-primary book-now"
                          v-on:click="
                            (stepcount = 21),
                              (tabs[0].selected = false),
                              (tabs[1].selected = true),
                              (tabs[2].selected = false),
                              (paymentFormDataBoxStorage.servicetype =
                                'boxstorage')
                          "
                        >
                          {{
                            $store.state.resource.service.boxstoragebtnbooknow
                          }}
                        </a>
                        <a
                          v-on:click="
                            (stepcount = 21),
                              (tabs[0].selected = false),
                              (tabs[1].selected = true),
                              (tabs[2].selected = false),
                              (paymentFormDataBoxStorage.servicetype =
                                'boxstorage')
                          "
                          class="btn btn-primary looking-better"
                          >{{
                            $store.state.resource.service.boxstoragebtnlooking
                          }}</a
                        >
                      </div>
                    </div>
                  </div>
                </li>
                <li class="col-md-4">
                  <div class="content-wrap">
                    <div class="img-content">
                      <img src="../../assets/images/our-feature-1.png" />
                    </div>
                    <div class="content">
                      <h3 class="title">
                        <a href="#">{{
                          $store.state.resource.service.movingservice
                        }}</a>
                      </h3>
                      <p>
                        {{ $store.state.resource.service.movingservicetext }}
                      </p>
                      <div class="buttons">
                        <!-- <a
                          href="#"
                          class="btn btn-primary book-now"
                          v-on:click="
                            (stepcount = 21),
                              (tabs[0].selected = false),
                              (tabs[1].selected = true),
                              (tabs[2].selected = false),
                              (paymentFormDataBoxStorage.servicetype =
                                'movingservice')
                          "
                          >{{
                            $store.state.resource.service
                              .movingservicebtnbooknow
                          }}</a
                        > -->
                        <a href="#" class="btn btn-primary book-now"
                          >Book Now</a
                        >
                        <a href="#" class="btn btn-primary looking-better">{{
                          $store.state.resource.service.movingservicebtnlooking
                        }}</a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </tab>
      <tab name="Step 2" info="Book" v-if="tabs[1].selected == true">
        <div id="form-step-2">
          <selfstoragestep2
            v-if="stepcount == 11"
            v-on:isselect="
              (stepcount = 12),
                (tabs[0].selected = false),
                (tabs[1].selected = true),
                (tabs[2].selected = false),
                (paymentFormData.selfstoragestep2 = $event)
            "
            :vmodel.sync="paymentFormData.selfstoragestep2"
          />
          <selfstoragestep2stordetail
            v-if="stepcount == 12"
            v-on:isbook="
              (stepcount = 13),
                (tabs[0].selected = false),
                (tabs[1].selected = true),
                (tabs[2].selected = false),
                (paymentFormData.selfstoragestep2 = $event)
            "
            v-on:loginmodalvalue="$emit('loginmodalvalue')"
            :vmodel.sync="paymentFormData.selfstoragestep2"
            :renewid="renewid"
            :haslogindata="haslogindata"
          />
          <selfstoragestep2booking
            v-if="stepcount == 13"
            v-on:isedit="
              (stepcount = 12),
                (tabs[0].selected = false),
                (tabs[1].selected = true),
                (tabs[2].selected = false),
                (paymentFormData.selfstoragestep2 = $event)
            "
            v-on:iscon="
              (stepcount = 14),
                (tabs[0].selected = false),
                (tabs[1].selected = false),
                (tabs[2].selected = true),
                (paymentFormData.selfstoragestep2 = $event),
                (paymentFormData.selfstoragestep3.phonenumber =
                  $event.phonenumber)
            "
            :vmodel.sync="paymentFormData.selfstoragestep2"
          />

          <boxstoragestep2
            v-if="stepcount == 21"
            v-on:isconfirm="
              (stepcount = 22),
                (tabs[0].selected = false),
                (tabs[1].selected = true),
                (tabs[2].selected = false),
                (paymentFormDataBoxStorage.boxstoragestep2 = $event)
            "
            v-on:loginmodalvalue="$emit('loginmodalvalue')"
            :vmodel.sync="paymentFormDataBoxStorage.boxstoragestep2"
            :renewid="renewid"
            :haslogindata="haslogindata"
          />
          <boxstoragestep2booking
            v-if="stepcount == 22"
            v-on:isedit="
              (stepcount = 21),
                (tabs[0].selected = false),
                (tabs[1].selected = true),
                (tabs[2].selected = false),
                (paymentFormDataBoxStorage.boxstoragestep2 = $event)
            "
            v-on:iscon="
              (stepcount = 23),
                (tabs[0].selected = false),
                (tabs[1].selected = false),
                (tabs[2].selected = true),
                (paymentFormDataBoxStorage.boxstoragestep2 = $event),
                (paymentFormDataBoxStorage.boxstoragestep3.phonenumber =
                  $event.bookingdetail.phonenumber),
                (paymentFormDataBoxStorage.boxstoragestep3.address =
                  $event.bookingdetail.address)
            "
            :vmodel.sync="paymentFormDataBoxStorage.boxstoragestep2"
          />
        </div>
      </tab>
      <tab name="Step 3" info="Payment" v-if="tabs[2].selected == true">
        <div id="form-step-3">
          <selfstoragestep3payment
            v-if="stepcount == 14"
            v-on:iseditbooking="
              (stepcount = 12),
                (tabs[0].selected = false),
                (tabs[1].selected = true),
                (tabs[2].selected = false),
                (paymentFormData = $event)
            "
            v-on:iseditappointment="
              (stepcount = 13),
                (tabs[0].selected = false),
                (tabs[1].selected = true),
                (tabs[2].selected = false),
                (paymentFormData = $event)
            "
            v-on:isdone="
              (stepcount = 2),
                (paymentFormData = $event),
                (paymentid = paymentFormData.selfstoragestep3.paymentid);
              savepayment('selfstorage');
            "
            :vmodel.sync="paymentFormData"
            v-on:paymentprocess="$emit('paymentprocess')"
            v-on:paymentprocesshide="$emit('paymentprocesshide')"
          />
          <boxstoragestep3payment
            v-if="stepcount == 23"
            v-on:iseditbooking="
              (stepcount = 21),
                (tabs[0].selected = false),
                (tabs[1].selected = true),
                (tabs[2].selected = false),
                (paymentFormDataBoxStorage = $event)
            "
            v-on:iseditappointment="
              (stepcount = 22),
                (tabs[0].selected = false),
                (tabs[1].selected = true),
                (tabs[2].selected = false),
                (paymentFormDataBoxStorage = $event)
            "
            v-on:isdone="
              (stepcount = 2),
                (paymentFormDataBoxStorage = $event),
                (paymentid =
                  paymentFormDataBoxStorage.boxstoragestep3.paymentid);
              savepayment('boxstorage');
            "
            :vmodel.sync="paymentFormDataBoxStorage"
            v-on:paymentprocess="$emit('paymentprocess')"
            v-on:paymentprocesshide="$emit('paymentprocesshide')"
          />
        </div>
      </tab>
    </div>
    <div>
      <thankyou v-if="stepcount == 2" :paymentid="paymentid" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";
import APIService from "@/services/api.service.js";
import Store from "@/store/index";

import Tab from "./Tab.vue";
import "bulma/css/bulma.css";
import boxstoragestep2view from "./boxstoragestep2";
import boxstoragestep2bookingview from "./boxstoragestep2booking";
import selfstoragestep2view from "./selfstoragestep2";
import selfstoragestep2bookingview from "./selfstoragestep2booking";
import selfstoragestep2stordetailview from "./selfstoragestep2stordetail";
import selfstoragestep3paymentview from "./selfstoragestep3payment.vue";
import boxstoragestep3paymentview from "./boxstoragestep3payment.vue";
import thankyouview from "./thankyou.vue";

Vue.use(VeeValidate);

export default {
  name: "app",
  data() {
    return {
      id:
        this.$route.params.id == undefined
          ? this.$route.query.id
          : this.$route.params.id,
      stepcount: 0,
      tabs: [
        {
          name: "Step 1",
          info: "Select",
          selected: true,
        },
        {
          name: "Step 2",
          info: "Book",
          selected: false,
        },
        {
          name: "Step 3",
          info: "Payment",
          selected: false,
        },
      ],
      renewid:
        this.$route.query.renewid != undefined
          ? this.$route.query.renewid
          : null,
      paymentid: "",
      currentActive: 0,
      totalTabs: 0,
      haslogindata: false,
      paymentFormData: {
        servicetype: "",
        paymentid: "",
        cardnumber: "",
        selfstoragestep2: {
          storedetail: {},
          active_sq: 0,
          active_month: 0,
          sqfeet: 0,
          duration: 0,
          charges: 0,
          email: null,
          firstname: null,
          lastname: null,
          phonenumber: "",
          appointment: {
            date: "",
            time: "",
          },
        },
        selfstoragestep3: {
          firstname: null,
          lastname: null,
          phonenumber: "",
          address: "",
          region: "",
          paymentid: "",
        },
        userid: null,
        renewid: null,
      },
      paymentFormDataBoxStorage: {
        servicetype: "",
        boxstoragestep2: {
          boxstorages: [],
          selectedboxes: [],
          totalbox: 0,
          charges: 0,
          bookingdetail: {
            email: null,
            firstname: null,
            lastname: null,
            phonenumber: "",
            address: "",
            region: "",
            walkup: "",
            iswalkup: true,
            remark: "",
            appointment: {
              date: "",
              time: "",
            },
          },
        },
        boxstoragestep3: {
          firstname: null,
          lastname: null,
          phonenumber: "",
          address: "",
          region: "",
          paymentid: "",
        },
        userid: null,
        renewid: null,
      },
    };
  },
  props: {
    loginsuccess: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    Store.commit("showLoader");
    document.title = this.$store.state.projecttitle + " - Services";
    APIService.post("/ListOfBoxstore", {
      language: this.$store.state.language,
    }).then((response) => {
      Store.commit("hideLoader");
      if (response.data != null) {
        for (var i = 0; i < response.data.length; i++) {
          response.data[i].image =
            this.$store.state.apiURL + "/boxstore/" + response.data[i].image;
          response.data[i].index = i;
          response.data[i].value = 0;
        }
        this.paymentFormDataBoxStorage.boxstoragestep2.boxstorages =
          response.data;
        if (this.renewid != null) {
          APIService.getById("/orderdetailsbyid", this.renewid).then(
            (response) => {
              if (response.data.renew) {
                this.$dangerAlert("Order has been already renewed.");
                var self = this;
                setTimeout(function () {
                  self.$router.push({ name: "Userinfo" });
                }, 2000);
              } else {
                this.paymentFormDataBoxStorage.servicetype =
                  response.data.servicetype;

                for (
                  var count = 0;
                  count < response.data.selectedboxes.length;
                  count++
                ) {
                  this.paymentFormDataBoxStorage.boxstoragestep2.boxstorages.filter(
                    (x) => x._id == response.data.selectedboxes[count].boxid
                  )[0].value = response.data.selectedboxes[count].noofbox;

                  this.paymentFormDataBoxStorage.boxstoragestep2.selectedboxes.push(
                    response.data.selectedboxes[count]
                  );
                }

                this.paymentFormDataBoxStorage.boxstoragestep2.totalbox =
                  response.data.totalbox;
                this.paymentFormDataBoxStorage.boxstoragestep2.charges =
                  response.data.charges;

                this.paymentFormDataBoxStorage.boxstoragestep2.bookingdetail.email =
                  response.data.bookingdetail.email;
                this.paymentFormDataBoxStorage.boxstoragestep2.bookingdetail.firstname =
                  response.data.bookingdetail.firstname;
                this.paymentFormDataBoxStorage.boxstoragestep2.bookingdetail.lastname =
                  response.data.bookingdetail.lastname;
                this.paymentFormDataBoxStorage.boxstoragestep2.bookingdetail.phonenumber =
                  response.data.bookingdetail.phonenumber;
                this.paymentFormDataBoxStorage.boxstoragestep2.bookingdetail.address =
                  response.data.bookingdetail.address;
                this.paymentFormDataBoxStorage.boxstoragestep2.bookingdetail.region =
                  response.data.bookingdetail.region;
                this.paymentFormDataBoxStorage.boxstoragestep2.bookingdetail.walkup =
                  response.data.bookingdetail.walkup;
                this.paymentFormDataBoxStorage.boxstoragestep2.bookingdetail.iswalkup =
                  response.data.bookingdetail.iswalkup;
                this.paymentFormDataBoxStorage.boxstoragestep2.bookingdetail.remark =
                  response.data.bookingdetail.remark;

                this.paymentFormDataBoxStorage.boxstoragestep3.firstname =
                  response.data.billinginfo.firstname;
                this.paymentFormDataBoxStorage.boxstoragestep3.lastname =
                  response.data.billinginfo.lastname;
                this.paymentFormDataBoxStorage.boxstoragestep3.phonenumber =
                  response.data.billinginfo.phonenumber;
                this.paymentFormDataBoxStorage.boxstoragestep3.address =
                  response.data.billinginfo.address;
                this.paymentFormDataBoxStorage.boxstoragestep3.region =
                  response.data.billinginfo.region;

                this.paymentFormDataBoxStorage.userid = this.$store.state.regUserInfo.userId;
                this.stepcount = 21;
                this.tabs[0].selected = false;
                this.tabs[1].selected = true;
                this.tabs[2].selected = false;
              }
            }
          );
        }
      }
    });

    if (this.id != undefined && this.id != null) {
      if (this.id == "boxstorage" || this.id == "movingservice") {
        this.stepcount = 21;
        this.tabs[0].selected = false;
        this.tabs[1].selected = true;
        this.tabs[2].selected = false;
        this.paymentFormDataBoxStorage.servicetype = "boxstorage";
      } else if (this.id == "selfstorage") {
        this.stepcount = 11;
        this.tabs[0].selected = false;
        this.tabs[1].selected = true;
        this.tabs[2].selected = false;
        this.paymentFormData.servicetype = "selfstorage";
      } else {
        this.paymentFormData.servicetype = "selfstorage";
        APIService.getById("/getstore", this.id).then((response) => {
          Store.commit("hideLoader");
          if (this.$store.state.language === "chinese") {
            response.data.storeName =
              response.data.chineseValues.chineseStoreName;
            response.data.address = response.data.chineseValues.chineseAddress;
            response.data.area = response.data.chineseValues.chineseArea;
            response.data.remarks = response.data.chineseValues.chineseRemarks;
          }
          this.paymentFormData.selfstoragestep2.storedetail = response.data;
          this.stepcount = 12;
          this.tabs[0].selected = false;
          this.tabs[1].selected = true;
          this.tabs[2].selected = false;
        });

        if (this.renewid != null) {
          APIService.getById("/orderdetailsbyid", this.renewid).then(
            (response) => {
              if (response.data.renew) {
                this.$dangerAlert("Order has been already renewed.");
                var self = this;
                setTimeout(function () {
                  self.$router.push({ name: "Userinfo" });
                }, 2000);
              } else {
                if (response.data.servicetype == "selfstorage") {
                  this.paymentFormData.selfstoragestep2.active_sq =
                    response.data.sqfeet;
                  this.paymentFormData.selfstoragestep2.active_month =
                    response.data.duration;
                  this.paymentFormData.selfstoragestep2.sqfeet =
                    response.data.sqfeet;
                  this.paymentFormData.selfstoragestep2.duration =
                    response.data.duration;
                  this.paymentFormData.selfstoragestep2.charges =
                    response.data.charges;
                  this.paymentFormData.selfstoragestep2.email =
                    response.data.email;
                  this.paymentFormData.selfstoragestep2.firstname =
                    response.data.firstname;
                  this.paymentFormData.selfstoragestep2.lastname =
                    response.data.lastname;
                  this.paymentFormData.selfstoragestep2.phonenumber =
                    response.data.phonenumber;

                  this.paymentFormData.selfstoragestep3.firstname =
                    response.data.billinginfo.firstname;
                  this.paymentFormData.selfstoragestep3.lastname =
                    response.data.billinginfo.lastname;
                  this.paymentFormData.selfstoragestep3.phonenumber =
                    response.data.billinginfo.phonenumber;
                  this.paymentFormData.selfstoragestep3.address =
                    response.data.billinginfo.address;
                  this.paymentFormData.selfstoragestep3.region =
                    response.data.billinginfo.region;

                  this.paymentFormData.userid = this.$store.state.regUserInfo.userId;
                }
              }
            }
          );
        }
      }
    }
  },
  mounted() {
    if (
      this.$store.state.regUserInfo.userId != "" &&
      this.$store.state.regUserInfo.userId != null &&
      this.renewid == null
    ) {
      this.updatedata();
    }
  },
  components: {
    //FormWizard,
    Tab,
    boxstoragestep2: boxstoragestep2view,
    boxstoragestep2booking: boxstoragestep2bookingview,
    selfstoragestep2: selfstoragestep2view,
    selfstoragestep2booking: selfstoragestep2bookingview,
    selfstoragestep2stordetail: selfstoragestep2stordetailview,
    selfstoragestep3payment: selfstoragestep3paymentview,
    boxstoragestep3payment: boxstoragestep3paymentview,
    thankyou: thankyouview,
  },
  methods: {
    savepayment(servicetype) {
      Store.commit("showLoader");
      this.$emit("paymentprocesshide");
      this.paymentFormData.renewid = this.renewid;
      this.paymentFormDataBoxStorage.renewid = this.renewid;
      this.paymentFormData.apiurl = this.$store.state.apiURL;
      this.paymentFormDataBoxStorage.apiurl = this.$store.state.apiURL;
      APIService.post(
        "/addpaymentdetail",
        servicetype == "selfstorage"
          ? this.paymentFormData
          : this.paymentFormDataBoxStorage
      ).then(() => {
        Store.commit("hideLoader");
      });
    },
    updatedata() {
      this.paymentFormData.selfstoragestep2.email = this.$store.state.regUserInfo.userEmail;
      this.paymentFormData.selfstoragestep2.firstname = this.$store.state.regUserInfo.userName.split(
        " "
      )[0];
      this.paymentFormData.selfstoragestep2.lastname = this.$store.state.regUserInfo.userName.split(
        " "
      )[1];
      this.paymentFormData.selfstoragestep3.firstname = this.$store.state.regUserInfo.userName.split(
        " "
      )[0];
      this.paymentFormData.selfstoragestep3.lastname = this.$store.state.regUserInfo.userName.split(
        " "
      )[1];
      this.paymentFormData.selfstoragestep3.address = this.$store.state.regUserInfo.userAddress;
      this.paymentFormData.selfstoragestep3.region = this.$store.state.regUserInfo.userRegion;
      this.paymentFormData.userid = this.$store.state.regUserInfo.userId;

      this.paymentFormDataBoxStorage.boxstoragestep2.bookingdetail.email = this.$store.state.regUserInfo.userEmail;
      this.paymentFormDataBoxStorage.boxstoragestep2.bookingdetail.firstname = this.$store.state.regUserInfo.userName.split(
        " "
      )[0];
      this.paymentFormDataBoxStorage.boxstoragestep2.bookingdetail.lastname = this.$store.state.regUserInfo.userName.split(
        " "
      )[1];
      this.paymentFormDataBoxStorage.boxstoragestep2.bookingdetail.address = this.$store.state.regUserInfo.userAddress;
      this.paymentFormDataBoxStorage.boxstoragestep2.bookingdetail.region = this.$store.state.regUserInfo.userRegion;
      this.paymentFormDataBoxStorage.boxstoragestep3.firstname = this.$store.state.regUserInfo.userName.split(
        " "
      )[0];
      this.paymentFormDataBoxStorage.boxstoragestep3.lastname = this.$store.state.regUserInfo.userName.split(
        " "
      )[1];
      this.paymentFormDataBoxStorage.boxstoragestep3.address = this.$store.state.regUserInfo.userAddress;
      this.paymentFormDataBoxStorage.boxstoragestep3.region = this.$store.state.regUserInfo.userRegion;
      this.paymentFormDataBoxStorage.userid = this.$store.state.regUserInfo.userId;
      this.haslogindata = true;
    },
  },
  watch: {
    loginsuccess: function (newVal, oldVal) {
      if (newVal != oldVal) {
        this.updatedata();
      }
    },
  },
};
</script>

<style lang="scss">
@import "./node_modules/bulma/bulma.sass";
@import "./node_modules/bulma-steps-component/bulma-steps.sass";

.number-input--inline > input[data-v-3580ff4f] {
  display: inline-block !important;
  width: 20rem !important;
}
.is-active .steps-content p {
  color: #4B5FC4 !important;
}
.steps-content p {
  color: #8fa7b3;
}
</style>

<style scoped>
a.looking-better1 {
  background: #ef2b37;
  border: 0;
  outline: 0;
  padding: 15px 14px 15px 34px !important;
  position: relative;
  margin-left: 15px !important;
}
a {
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
}
a.looking-better1:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  border-bottom: 60px solid transparent;
  border-left: 45px solid #ffffff;
  width: 0;
}

a.book-now1:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  border-top: 60px solid transparent;
  border-right: 45px solid #ffffff;
  width: 0;
  margin-left: 15px !important;
}

a.book-now1 {
  background: #465ecb;
  border: 0;
  outline: 0;
  padding: 15px 45px 15px 14px !important;
  position: relative;
  margin-left: 15px !important;
}

.buttons2 {
  display: contents !important;
}

.our-feature ul li .content-wrap .content .buttons {
  position: absolute;
  left: 0;
  right: 0;
  padding: 0px 0px !important;
  margin-left: 15px;
}

body {
  padding: 40px;
}

[v-cloak] {
  display: none;
}

.steps:not(.is-vertical).has-content-centered
  .steps-segment:not(:last-child):after {
  left: 61% !important;
  right: -39% !important;
  color: #8fa7b3;
}

.is-size-4 {
  font-size: 35px !important;
  margin: 8px !important;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
}

.digi {
  font-size: 14px !important;
  margin: 20px !important;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  line-height: 16px;
}

.our-feature {
  background: transparent !important;
  padding: 20px 0px;
}

.steps:not(.is-vertical) .steps-segment:not(:last-child):after {
  height: 0rem !important;
  left: 1.76rem !important;
  right: -0.24rem !important;
  border: 1px dashed !important;
  top: calc(4rem - (0.6em)) !important;
}

.steps:not(.is-hollow) .steps-segment.is-active .steps-marker:not(.is-hollow) {
  background-color: transparent !important;
}

.steps-segment:after {
  background-color: transparent !important;
}

.steps:not(.is-hollow) .steps-marker:not(.is-hollow) {
  background-color: transparent !important;
  /* color: #fff; */
}
.our-feature ul li .content-wrap .content h3 {
  padding: 30px 0px 20px;
  margin-bottom: 0;
  text-align: left;
}
</style>
