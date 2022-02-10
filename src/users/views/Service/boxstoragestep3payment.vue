<template>
  <section class="our-feature">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="sectoin-title">
            <h2>
              {{ $store.state.resource.boxstoragestep3payment.paymentheading }}
            </h2>
          </div>
        </div>
      </div>
      <form>
        <div class="col-md-12" style="display: flex">
          <div class="col-md-8">
            <div class="form-group">
              <div
                class="sectoin-title star"
                style="
                  float: left;
                  padding-top: 20px;
                  font-size: 24px;
                  font-weight: 400 !important;
                "
              >
                <strong>{{
                  $store.state.resource.boxstoragestep3payment.biilinginfo
                }}</strong>
              </div>
              <div
                class="col-md-12"
                style="display: flex; padding-left: 0px !important"
              >
                <div class="col-md-6" style="padding-left: 0px !important">
                  <input
                    style="border-radius: 0px !important"
                    class="form-control"
                    :placeholder="
                      $store.state.resource.boxstoragestep3payment
                        .firstnameplaceholder
                    "
                    maxlength="25"
                    autocomplete="off"
                    id="firstName"
                    v-model="vmodel.boxstoragestep3.firstname"
                    :class="{
                      'is-invalid': $v.vmodel.boxstoragestep3.firstname.$error,
                    }"
                  />
                  <span
                    v-if="
                      $v.vmodel.boxstoragestep3.firstname.required === false
                    "
                    class="invalid-feedback"
                  >
                    Firstname is required
                  </span>
                </div>
                <div
                  class="col-md-6"
                  style="
                    padding-left: 0px !important;
                    padding-right: 0px !important;
                  "
                >
                  <input
                    style="border-radius: 0px !important"
                    class="form-control"
                    :placeholder="
                      $store.state.resource.boxstoragestep3payment
                        .lastnameplaceholder
                    "
                    maxlength="25"
                    autocomplete="off"
                    id="lastName"
                    v-model="vmodel.boxstoragestep3.lastname"
                    :class="{
                      'is-invalid': $v.vmodel.boxstoragestep3.lastname.$error,
                    }"
                  />
                  <span
                    v-if="$v.vmodel.boxstoragestep3.lastname.required === false"
                    class="invalid-feedback"
                  >
                    Lastname is required
                  </span>
                </div>
              </div>
              <br />
              <div class="col-md-12" style="padding-left: 0px !important">
                <div class="form-group">
                  <input
                    style="border-radius: 0px !important"
                    class="form-control"
                    :placeholder="
                      $store.state.resource.boxstoragestep3payment
                        .phonenumberplaceholder
                    "
                    maxlength="9"
                    v-mask="'#### ####'"
                    autocomplete="off"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                    id="phoneno"
                    v-model="vmodel.boxstoragestep3.phonenumber"
                    :class="{
                      'is-invalid':
                        $v.vmodel.boxstoragestep3.phonenumber.$error,
                    }"
                  />
                  <span
                    v-if="
                      $v.vmodel.boxstoragestep3.phonenumber.required === false
                    "
                    class="invalid-feedback"
                  >
                    Phonenumber is required
                  </span>
                </div>
              </div>
            </div>
            <br />
            <div class="form-group">
              <div
                class="sectoin-title"
                style="
                  font-size: 24px;
                  font-weight: 400 !important;
                "
              >
                <strong>{{
                  $store.state.resource.boxstoragestep3payment.biilingaddress
                }}</strong>
              </div>
              <div class="col-md-12" style="padding-left: 0px !important">                
                <stripecardpayment></stripecardpayment>
              </div>
            </div>
          </div>

          <div class="col-md-4 order">
            <div style="padding-top: 30px">
              <CCard>
                <CCardHeader>
                  <CCol style="font-size: 20px; color: #000000">
                    <strong>{{
                      $store.state.resource.boxstoragestep3payment.order
                    }}</strong>
                  </CCol>
                  <CCol>
                    <CButton
                      block
                      color="link"
                      style="float: right; font-size: 20px"
                      v-on:click="$emit('iseditbooking', vmodel)"
                      >{{
                        $store.state.resource.boxstoragestep3payment.orderedit
                      }}</CButton
                    >
                  </CCol>
                </CCardHeader>

                <CCardBody>
                  <CRow
                    class="pt-3"
                    v-for="item in vmodel.boxstoragestep2.selectedboxes"
                    :key="item.boxid"
                  >
                    <CCol class="col-8" style="color: #000000; font-size: 20px">
                      {{ item.noofbox }} X {{ item.boxtype }}
                    </CCol>
                    <CCol
                      class="col-4"
                      style="
                        color: #407bff;
                        text-align: right;
                        padding-right: 30px;
                        font-size: 20px;
                      "
                    >
                      ${{ item.charges }}
                    </CCol>
                  </CRow>
                  <CRow class="pt-3">
                    <CCol class="col-8">
                      <div class="col-1 buttons2 design">
                        <a
                          href="#"
                          class="btn btn-primary book-now1"
                          style="background: #465ecb"
                        >
                          {{
                            $store.state.resource.boxstoragestep3payment
                              .btntotal
                          }}:
                        </a>
                      </div>
                    </CCol>
                    <CCol
                      class="col-4 tot"
                      style="
                        font-weight: bold;
                        text-align: right;
                        padding-right: 30px;
                      "
                    >
                      {{ vmodel.boxstoragestep2.charges }}
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </div>

            <div style="padding-top: 30px">
              <CCard>
                <CCardHeader>
                  <CCol style="font-size: 20px; color: #000000">
                    <strong>{{
                      $store.state.resource.boxstoragestep3payment.appoinment
                    }}</strong>
                  </CCol>
                  <CCol>
                    <CButton
                      block
                      color="link"
                      style="float: right"
                      v-on:click="$emit('iseditappointment', vmodel)"
                      >{{
                        $store.state.resource.boxstoragestep3payment
                          .appoinmentedit
                      }}</CButton
                    >
                  </CCol>
                </CCardHeader>

                <CCardBody>
                  <CRow>
                    <CCol
                      class="col-4"
                      style="color: #000000; font-weight: bold"
                    >
                      {{
                        $store.state.resource.boxstoragestep3payment
                          .appoinmentdate
                      }}
                    </CCol>
                    <CCol
                      class="col-8"
                      style="font-weight: bold; color: #007bff"
                    >
                      {{
                        vmodel.boxstoragestep2.bookingdetail.appointment.date
                      }}
                      :
                      {{
                        vmodel.boxstoragestep2.bookingdetail.appointment
                          .starttime
                      }}
                      -
                      {{
                        vmodel.boxstoragestep2.bookingdetail.appointment.endtime
                      }}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol
                      class="col-4"
                      style="color: #000000; font-weight: bold"
                    >
                      {{
                        $store.state.resource.boxstoragestep3payment
                          .appoinmentaddress
                      }}
                    </CCol>
                    <CCol
                      class="col-8"
                      style="font-weight: bold; color: #007bff"
                    >
                      {{ vmodel.boxstoragestep2.bookingdetail.address }}
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </div>
          </div>
        </div>
        <div class="row justify-content-end">
          <div class="col-1 buttons2">
            <a
              href="#"
              class="btn btn-primary looking-better1"
              style="background: #f28f8f"
              v-on:click="pay()"
            >
              {{ $store.state.resource.boxstoragestep3payment.btnconfirm }}</a
            >
          </div>
        </div>
      </form>
    </div>    
  </section>
</template>

<script src="https://js.stripe.com/v3/"></script>
<script>
import { required } from "vuelidate/lib/validators";
import APIService from "@/services/api.service.js";
import stripecardpayment from "./stripecardpayment";
import Store from "@/store/index";

export default {
  data() {
    return {
      publishableKey: process.env.VUE_APP_publishableKey,
      clientSecret: process.env.VUE_APP_clientSecret,
      stripe: "",
      elements: "",
      card: "",
      orderData: {
        currency: "hkd",
      },
      submitted: false,
    };
  },
  props: {
    vmodel: {
      type: Object,
      default: null,
    },
  },
  validations: {
    vmodel: {
      boxstoragestep3: {
        firstname: { required },
        lastname: { required },
        phonenumber: { required },
      },
    },
  },
  components: {
    stripecardpayment: stripecardpayment,
  },
  created() {
    document.title = this.$store.state.projecttitle + " - Payment";
  },
  mounted() {
    this.configureStripe();
  },
  methods: {
    configureStripe() {
      this.stripe = Stripe(this.publishableKey);
      /* ------- Set up Stripe Elements to use in checkout form ------- */
      this.elements = this.stripe.elements();
      var style = {
        base: {
          color: "#32325d",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a",
        },
      };

      this.card = this.elements.create("card", { style: style });
      this.card.mount("#card-element");
    },
    handleAction(clientSecret) {
      var self = this;
      this.stripe.handleCardAction(clientSecret).then(function(data) {
        if (data.error) {
          self.showError("Your card was not authenticated, please try again");
        } else if (data.paymentIntent.status === "requires_confirmation") {
          var reqdata = {
            paymentIntentId: data.paymentIntent.id,
          };

          APIService.post("/pay", reqdata, null).then(function(result) {
            if (result != null && result != undefined) {
              if (result.error != undefined) {
                self.showError(result.error);
              } else {
                self.orderComplete(clientSecret);
              }
            }
          });
        }
      });
    },
    pay() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      Store.commit("showLoader");
      var self = this;
      // Collects card details and creates a PaymentMethod
      this.stripe
        .createPaymentMethod("card", this.card)
        .then(function(result) {
          if (result.error) {
            self.showError(result.error.message);
          } else {
            // self.submitted = true;
            self.$emit("paymentprocess");
            self.orderData.paymentMethodId = result.paymentMethod.id;
            var data = {
              paymentMethodId: result.paymentMethod.id,
              amount: self.vmodel.boxstoragestep2.charges * 100,
              currency: "hkd",
            };

            APIService.post("/pay", data, null).then(function(response) {
              if (response != null && response != undefined) {
                if (response.error != undefined) {
                  self.showError(response.error);
                } else if (response.data.requiresAction) {
                  // Request authentication
                  self.handleAction(response.data.clientSecret);
                } else {
                  self.orderComplete(response.data.clientSecret);
                }
              }
            });
          }
        })
        .then(function(result) {
          Store.commit("hideLoader");
        });
    },
    orderComplete(clientSecret) {
      var self = this;
      this.stripe.retrievePaymentIntent(clientSecret).then(function(result) {
        self.vmodel.boxstoragestep3.paymentid = result.paymentIntent.id;
        self.$emit("isdone", self.vmodel);
        Store.commit("hideLoader");
      });
    },
    showError(errorMsgText) {
      Store.commit("hideLoader");
      this.$dangerAlert(errorMsgText);
      this.$emit("paymentprocesshide");
    },
  },
};
</script>
<style scoped>
a.looking-better1 {
  background: #ef2b37;
  border: 0;
  outline: 0;
  padding: 15px 14px 15px 45px;
  position: relative;
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
  border-bottom: 55px solid transparent;
  border-left: 45px solid #ffffff;
  width: 0;
}

a.book-now1:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  border-top: 56px solid transparent;
  border-right: 45px solid #ffffff;
  width: 0;
}

a.book-now1 {
  background: #465ecb;
  border: 0;
  outline: 0;
  padding: 7px 50px 7px 20px;
  position: relative;
}

.buttons2 {
  display: contents !important;
}

body {
  padding: 40px;
}

.button {
  border: 1px solid #ced4da;
}

.tot {
  font-size: 25px;
  color: #465ecb;
}

.space {
  padding-top: 40px !important;
}

.card {
  border: transparent;
  border-radius: 0.25rem;
}

.card-header {
  border-bottom: transparent;
}

th {
  padding-left: 10px;
  padding-right: 10px;
}
.star {
  float: left;
  font-size: 24px;
  font-weight: 400 !important;
}

[v-cloak] {
  display: none;
}
@media only screen and (max-width: 992px) {
  .col-md-8 {
    flex: 0 0 55%;
    max-width: 55%;
  }
  .col-md-4 {
    flex: 0 0 45%;
    max-width: 45%;
  }
  .justify-content-end{
    margin-right: 30px;
  }
}

@media only screen and (max-width: 765px) {
  .col-md-8 {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .col-md-4 {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .order {
    margin: 285px 0px 0px -320px;
  }
  .justify-content-end {
    margin-right: 32px;
  }
}
</style>
