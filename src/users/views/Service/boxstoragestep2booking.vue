<template>
  <section class="our-feature">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="sectoin-title">
            <h2>
              {{ $store.state.resource.boxstoragestep2booking.bookingschedule }}
            </h2>
          </div>
        </div>
      </div>
      <form>
        <div class="col-md-12" style="display: flex">
          <div class="col-md-8">
            <div class="form-group">
              <div
                class="sectoin-title"
                style="
                  float: left;
                  padding-top: 20px;
                  font-size: 24px;
                  font-weight: 400 !important;
                "
              >
                <strong>{{
                  $store.state.resource.boxstoragestep2booking.createlogin
                }}</strong>
              </div>
              <div
                class="col-md-12"
                style="display: flex; padding-left: 0px !important"
              >
                <input
                  style="border-radius: 0px !important"
                  type="email"
                  class="form-control"
                  :placeholder="
                    $store.state.resource.boxstoragestep2booking
                      .emailplaceholder
                  "
                  maxlength="30"
                  autocomplete="off"
                  id="email"
                  v-model="vmodel.bookingdetail.email"
                  :class="{
                    'is-invalid': $v.vmodel.bookingdetail.email.$error,
                  }"
                />
                <span
                  v-if="$v.vmodel.bookingdetail.email.required === false"
                  class="invalid-feedback"
                >
                  Email is required
                </span>
                <span
                  v-if="
                    !$v.vmodel.bookingdetail.email.email &&
                    $v.vmodel.bookingdetail.email.required
                  "
                  class="invalid-feedback"
                >
                  Email is invalid
                </span>
              </div>
            </div>
            <br />
            <br />
            <div class="form-group">
              <div
                class="sectoin-title"
                style="
                  float: left;
                  font-size: 24px;
                  font-weight: 400 !important;
                "
              >
                <strong>{{
                  $store.state.resource.boxstoragestep2booking.personaldetail
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
                      $store.state.resource.boxstoragestep2booking
                        .firstnameplaceholder
                    "
                    maxlength="25"
                    autocomplete="off"
                    id="firstName"
                    v-model="vmodel.bookingdetail.firstname"
                    :class="{
                      'is-invalid': $v.vmodel.bookingdetail.firstname.$error,
                    }"
                  />
                  <span
                    v-if="$v.vmodel.bookingdetail.firstname.required === false"
                    class="invalid-feedback"
                  >
                    First Name is required
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
                      $store.state.resource.boxstoragestep2booking
                        .lastnameplaceholder
                    "
                    maxlength="25"
                    autocomplete="off"
                    id="lastName"
                    v-model="vmodel.bookingdetail.lastname"
                    :class="{
                      'is-invalid': $v.vmodel.bookingdetail.lastname.$error,
                    }"
                  />
                  <span
                    v-if="$v.vmodel.bookingdetail.lastname.required === false"
                    class="invalid-feedback"
                  >
                    Last Name is required
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
                      $store.state.resource.boxstoragestep2booking
                        .phonenumberplaceholder
                    "
                    maxlength="9"
                    v-mask="'#### ####'"
                    autocomplete="off"
                    onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                    id="phoneno"
                    v-model="vmodel.bookingdetail.phonenumber"
                    :class="{
                      'is-invalid': $v.vmodel.bookingdetail.phonenumber.$error,
                    }"
                  />
                  <span
                    v-if="
                      $v.vmodel.bookingdetail.phonenumber.required === false
                    "
                    class="invalid-feedback"
                  >
                    Phonenumber is required
                  </span>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div class="form-group">
              <div
                class="sectoin-title"
                style="
                  float: left;
                  font-size: 24px;
                  font-weight: 400 !important;
                "
              >
                <strong>{{
                  $store.state.resource.boxstoragestep2booking.appoinmentaddress
                }}</strong>
              </div>

              <div class="col-md-12" style="padding-left: 0px !important">
                <input
                  style="border-radius: 0px !important"
                  class="form-control"
                  :placeholder="
                    $store.state.resource.boxstoragestep2booking
                      .addressplaceholder
                  "
                  maxlength="100"
                  autocomplete="off"
                  id="address"
                  v-model="vmodel.bookingdetail.address"
                  :class="{
                    'is-invalid': $v.vmodel.bookingdetail.address.$error,
                  }"
                />
                <span
                  v-if="$v.vmodel.bookingdetail.address.required === false"
                  class="invalid-feedback"
                >
                  Asddress is required
                </span>
              </div>
              <br />
              <div class="col-md-12" style="padding-left: 0px !important">
                <input
                  style="border-radius: 0px !important"
                  class="form-control"
                  :placeholder="
                    $store.state.resource.boxstoragestep2booking
                      .regionplaceholder
                  "
                  maxlength="50"
                  autocomplete="off"
                  id="region"
                  v-model="vmodel.bookingdetail.region"
                  :class="{
                    'is-invalid': $v.vmodel.bookingdetail.region.$error,
                  }"
                />
                <span
                  v-if="$v.vmodel.bookingdetail.region.required === false"
                  class="invalid-feedback"
                >
                  Region is required
                </span>
              </div>
              <br />
              <div class="col-md-12" style="padding-left: 0px !important">
                <CInput
                  :placeholder="
                    $store.state.resource.boxstoragestep2booking
                      .walkupplaceholder
                  "
                  id="walkup"
                  class="form-group"
                  autocomplete="off"
                  v-model="vmodel.bookingdetail.walkup"
                >
                  <template #append>
                    <CButton
                      class="button"
                      style="
                        color: #8fa7b3;
                        font-size: 17px !important;
                        line-height: 25px;
                      "
                      v-model="vmodel.bookingdetail.iswalkup"
                      v-on:click="vmodel.bookingdetail.iswalkup = true"
                      >{{
                        $store.state.resource.boxstoragestep2booking
                          .walkupbtnyes
                      }}</CButton
                    >
                    <CButton
                      class="button"
                      style="
                        color: #8fa7b3;
                        font-size: 17px !important;
                        line-height: 25px;
                      "
                      v-model="vmodel.bookingdetail.iswalkup"
                      v-on:click="vmodel.bookingdetail.iswalkup = false"
                      >{{
                        $store.state.resource.boxstoragestep2booking.walkupbtnno
                      }}</CButton
                    >
                  </template>
                </CInput>
              </div>
              <div class="col-md-12" style="padding-left: 0px !important">
                <CTextarea
                  style="
                    border-radius: 0px !important;
                    color: #8fa7b3 !important;
                  "
                  :placeholder="
                    $store.state.resource.boxstoragestep2booking
                      .remarkplaceholder
                  "
                  class="form-group"
                  :maxlength="200"
                  autocomplete="off"
                  id="remark"
                  v-model="vmodel.bookingdetail.remark"
                />
              </div>
            </div>
            <br />
            <br />
            <br />
            <div class="form-group">
              <div
                class="sectoin-title"
                style="
                  float: left;
                  font-size: 24px;
                  font-weight: 400 !important;
                "
              >
                <strong>{{
                  $store.state.resource.boxstoragestep2booking
                    .deliveryappoinment
                }}</strong>
              </div>
              <div class="col-md-12" style="padding-left: 0px !important">
                <div class="form-group">
                  <b-datepicker
                    id="date"
                    class="form-control"
                    style="border-radius: 0px !important"
                    :min="new Date()"
                    :date-format-options="{
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                      weekday: 'short',
                    }"
                    v-model="vmodel.bookingdetail.appointment.date"
                    :class="{
                      'is-invalid':
                        $v.vmodel.bookingdetail.appointment.date.$error,
                    }"
                  ></b-datepicker>
                  <span
                    v-if="
                      $v.vmodel.bookingdetail.appointment.date.required ===
                      false
                    "
                    class="invalid-feedback"
                  >
                    Appointment Date is required
                  </span>
                </div>
              </div>
              <div class="row">
                <div style="width: 412px; padding-left: 15px">
                  <div class="form-group timepicker">
                    <label
                      ><b>{{
                        $store.state.resource.boxstoragestep2booking
                          .starttimelabel
                      }}</b></label
                    >
                    <b-timepicker
                      id="time"
                      class="form-control"
                      style="border-radius: 0px !important"
                      v-model="vmodel.bookingdetail.appointment.starttime"
                      :class="{
                        'is-invalid':
                          $v.vmodel.bookingdetail.appointment.starttime.$error,
                      }"
                      @input="comparetime()"
                    ></b-timepicker>
                    <span
                      v-if="
                        $v.vmodel.bookingdetail.appointment.starttime
                          .required === false
                      "
                      class="invalid-feedback"
                    >
                      Start Time is required
                    </span>
                  </div>
                </div>
                <div style="width: 413px; padding-left: 15px">
                  <div class="form-group timepicker">
                    <label
                      ><b>{{
                        $store.state.resource.boxstoragestep2booking
                          .endtimelabel
                      }}</b></label
                    >
                    <b-timepicker
                      id="time1"
                      class="form-control"
                      style="border-radius: 0px !important"
                      v-model="vmodel.bookingdetail.appointment.endtime"
                      :class="{
                        'is-invalid':
                          $v.vmodel.bookingdetail.appointment.endtime.$error ||
                          errormessage != '',
                      }"
                    ></b-timepicker>
                    <span
                      v-if="
                        $v.vmodel.bookingdetail.appointment.endtime.required ===
                        false
                      "
                      class="invalid-feedback"
                    >
                      End Time is required
                    </span>
                    <span
                      v-if="
                        errormessage != '' &&
                        $v.vmodel.bookingdetail.appointment.endtime.required ===
                          true
                      "
                      class="invalid-feedback"
                    >
                      {{ errormessage }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-4 order">
            <div style="padding-top: 30px" class="orderorder">
              <CCard>
                <CCardHeader>
                  <CCol style="font-size: 20px; color: #000000">
                    <strong>{{
                      $store.state.resource.boxstoragestep2booking.order
                    }}</strong>
                  </CCol>
                  <CCol>
                    <CButton
                      block
                      color="link"
                      style="float: right; font-size: 20px"
                      v-on:click="$emit('isedit', vmodel)"
                      >{{
                        $store.state.resource.boxstoragestep2booking.orderedit
                      }}</CButton
                    >
                  </CCol>
                </CCardHeader>

                <CCardBody>
                  <CRow
                    class="pt-3"
                    v-for="item in vmodel.selectedboxes"
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
                            $store.state.resource.boxstoragestep2booking
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
                      {{ vmodel.charges }}
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
              v-on:click="checkdata()"
            >
              {{ $store.state.resource.boxstoragestep2booking.btnconfirm }}</a
            >
          </div>
        </div>
      </form>
    </div>
  </section>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      errormessage: "",
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
      bookingdetail: {
        email: { required, email },
        firstname: { required },
        lastname: { required },
        phonenumber: { required },
        address: { required },
        region: { required },
        appointment: {
          date: { required },
          starttime: { required },
          endtime: { required },
        },
      },
    },
  },
  created() {
    document.title = this.$store.state.projecttitle + " - Booking";
  },
  methods: {
    checkdata() {
      this.errormessage = "";
      var strStartTime = this.vmodel.bookingdetail.appointment.starttime;
      var strEndTime = this.vmodel.bookingdetail.appointment.endtime;
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

      this.$v.$touch();
      if (this.$v.$invalid || this.errormessage) {
        return;
      }
      this.$emit("iscon", this.vmodel);
    },
    comparetime() {
      this.errormessage = "";
      var strStartTime = this.vmodel.bookingdetail.appointment.starttime;
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

        this.vmodel.bookingdetail.appointment.endtime =
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

::placeholder {
  color: #8fa7b3 !important;
  font-size: 20px !important;
  line-height: 30px;
}

/* .place {
  color: #8fa7b3 !important;
  font-size: 20px !important;
  line-height: 30px !important;
} */

th {
  padding-left: 10px;
  padding-right: 10px;
}

[v-cloak] {
  display: none;
}
</style>
<style>
::placeholder {
  color: #8fa7b3 !important;
  font-size: 20px !important;
  line-height: 30px;
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
  .timepicker {
    width: 345px;
  }
  .justify-content-end {
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
    margin: 1000px 0px 0px -323px;
  }

  .orderorder {
    padding-top: 0px;
  }

  .timepicker {
    width: 270px;
  }
}
</style>
