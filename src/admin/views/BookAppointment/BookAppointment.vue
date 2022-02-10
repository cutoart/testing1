<template>
  <div>
    <CCol>
      <CCard>
        <CForm @submit.prevent="handleSubmit">
          <CCardHeader>
            <strong>Book Storage</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="6" class="form-group">
                <span>User</span>
                <v-select
                  style="margin-top: 8px"
                  v-model="appointment.user"
                  :options="optionsUser"
                  placeholder="Select User"
                  @input="getUserDetail()"
                  :class="{ 'is-invalid': $v.appointment.user.$error }"
                />
                <div
                  v-if="!$v.appointment.user.required"
                  class="invalid-feedback"
                >
                  User is required.
                </div>
              </CCol>
              <CCol sm="6" class="form-group">
                <span>Store Name</span>
                <v-select
                  style="margin-top: 8px"
                  v-model="appointment.store"
                  :options="optionsStore"
                  placeholder="Select Store"
                  @input="getStoreDetail()"
                  :class="{ 'is-invalid': $v.appointment.store.$error }"
                />
                <div
                  v-if="!$v.appointment.store.required"
                  class="invalid-feedback"
                >
                  Store Name is required.
                </div>
              </CCol>
              <CCol sm="6">
                <span>Select Date</span>
                <b-datepicker
                  class="form-control"
                  id="appointmentdate"
                  v-model="appointment.date"
                  :min="new Date()"
                  :date-format-options="{
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    weekday: 'short',
                  }"
                  :class="{
                    'is-invalid': $v.appointment.date.$error,
                  }"
                ></b-datepicker>
                <span
                  v-if="$v.appointment.date.required === false"
                  class="invalid-feedback"
                >
                  Appointment Date is required
                </span>
              </CCol>
              <CCol sm="6" class="form-group">
                <span>Select Start Time</span>
                <b-timepicker
                  id="time"
                  v-model="appointment.starttime"
                  class="form-control"
                  :class="{
                    'is-invalid': $v.appointment.starttime.$error,
                  }"
                  @input="comparetime()"
                ></b-timepicker>
                <span
                  v-if="$v.appointment.starttime.required === false"
                  class="invalid-feedback"
                >
                  Start Time is required
                </span>
              </CCol>
              <CCol sm="6" class="form-group">
                <span>Select End Time</span>
                <b-timepicker
                  id="time1"
                  v-model="appointment.endtime"
                  class="form-control"
                  :class="{
                    'is-invalid':
                      $v.appointment.endtime.$error || errormessage != '',
                  }"
                ></b-timepicker>
                <span
                  v-if="$v.appointment.endtime.required === false"
                  class="invalid-feedback"
                >
                  End Time is required
                </span>
                <span
                  v-if="
                    errormessage != '' &&
                    $v.appointment.endtime.required === true
                  "
                  class="invalid-feedback"
                >
                  {{ errormessage }}
                </span>
              </CCol>
            </CRow>
          </CCardBody>
          <CForm
            v-if="
              appointment.store != undefined &&
              appointment.store != null &&
              appointment.store != ''
            "
          >
            <CRow class="pt-3 pl-3">
              <h5
                class="col-12"
                v-if="vmodel.selfstoragestep2.storedetail.branch != null"
              >
                {{ vmodel.selfstoragestep2.storedetail.storeName }} :
                {{ vmodel.selfstoragestep2.storedetail.branch.label }}
              </h5>
            </CRow>
            <CRow class="pt-3 pl-3">
              <CCol>
                Address :
                {{ vmodel.selfstoragestep2.storedetail.address }}
                <span
                  v-if="vmodel.selfstoragestep2.storedetail.pincode != null"
                >
                  ,({{ vmodel.selfstoragestep2.storedetail.pincode }})
                </span>
              </CCol>
            </CRow>
            <CRow class="pt-3 pl-3 pr-3">
              <CCol>
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
                        {{
                          $store.state.resource.selfstoragestep2storedetail
                            .months
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
                      <td>
                        {{ _charges.areainwidth }}X{{ _charges.areaindepth }}
                      </td>
                      <td>{{ _charges.monthlyrate }}</td>
                      <td
                        v-for="_duration in selfstorecharges.storedurations"
                        v-bind:key="_duration.index"
                      >
                        {{
                          Math.round(
                            _duration.discount > 0
                              ? _charges.monthlyrate -
                                  (_charges.monthlyrate * _duration.discount) /
                                    100
                              : _charges.monthlyrate
                          )
                        }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CCol>
            </CRow>
            <CRow class="mt-3 pl-3">
              <CCol sm="6">
                <strong>Commencement date :</strong>
              </CCol>
              <CCol sm="6">
                <strong>Order Status :</strong>
              </CCol>
            </CRow>
            <CRow class="pl-3 pr-3">
              <CCol sm="6">
                <b-datepicker
                  id="commencementdate"
                  class="form-control"
                  :min="new Date()"
                  :date-format-options="{
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    weekday: 'short',
                  }"
                  v-model="book.commencementdate"
                  :class="{
                    'is-invalid': $v.book.commencementdate.$error,
                  }"
                ></b-datepicker>
                <span
                  v-if="$v.book.commencementdate.required === false"
                  class="invalid-feedback"
                >
                  Commencement Date is required
                </span>
              </CCol>
              <CCol sm="6">
                <v-select
                  v-model="book.status"
                  :options="book.optionstatus"
                  placeholder="Select Status"
                  :clearable="false"
                />
              </CCol>
            </CRow>
            <CRow class="pt-3 ml-3 pr-3">
              <strong>Select Square Feet :</strong>
            </CRow>
            <CRow>
              <CCol
                class="col-3 ml-3"
                v-for="item in selfstorecharges.storecharges"
                :key="item.index"
              >
                <CButton
                  class="col-12 mt-1 btn-secondary button-storecharge"
                  :class="{
                    active: vmodel.selfstoragestep2.active_sq == item.index,
                  }"
                  @click="toggleClass(item.index)"
                >
                  {{ item.usablearea }}
                  {{
                    $store.state.resource.selfstoragestep2storedetail.btnsqft
                  }}
                </CButton></CCol
              >
            </CRow>
            <CRow class="mt-3 ml-3">
              <strong>Select Month :</strong>
            </CRow>
            <CRow>
              <CCol
                class="col-3 ml-3"
                v-for="item in selfstorecharges.storedurations"
                :key="item.index"
                @click="togglemonth(item.index)"
              >
                <CButton
                  class="col-12 mt-1 btn-secondary button-storecharge"
                  :class="{
                    active: vmodel.selfstoragestep2.active_month == item.index,
                  }"
                >
                  {{ item.months }}
                  {{
                    $store.state.resource.selfstoragestep2storedetail.btnmonth
                  }}
                </CButton></CCol
              >
            </CRow>
            <CRow class="">
              <CCol class="col-3 mt-3 ml-3 mb-3">
                <CCol class="col-12 mt-3 border1">
                  {{ $store.state.resource.selfstoragestep2storedetail.price }}
                </CCol>
                <CCol class="border text-center">
                  ${{ vmodel.selfstoragestep2.charges }}
                </CCol>
              </CCol>
            </CRow>
          </CForm>
          <CCardFooter>
            <CButton type="submit" class="mr-1" color="primary"> Save </CButton>
            <CButton
              type="button"
              router-link
              :to="{ name: 'BookAppointmentList' }"
              class="mr-1"
              color="secondary"
            >
              Cancel
            </CButton>
          </CCardFooter>
        </CForm>
      </CCard>
    </CCol>
  </div>
</template>

<script>
import APIService from "@/services/api.service.js";
import { required } from "vuelidate/lib/validators";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  components: {
    vSelect,
  },
  data() {
    return {
      optionsStore: [],
      optionsUser: [],
      appointment: {
        store: "",
        user: "",
        storeid: "",
        userId: "",
        userName: "",
        email: "",
        date: "",
        starttime: "",
        endtime: "",
      },
      book: {
        servicetype: "",
        status: "Processing",
        optionstatus: ["Processing", "Confirm", "Retreat", "Retrieve"],
        commencementdate: "",
        selfstoragestep2: {
          storedetail: {},
          appointment: {
            date: "",
            starttime: "",
            endtime: "",
          },
          sqfeet: 0,
          duration: 0,
          charges: 0,
          email: "",
          firstname: "",
          lastname: "",
          phonenumber: "",
        },
        selfstoragestep3: {
          firstname: "",
          lastname: "",
          phonenumber: "",
          address: "",
          region: "",
          paymentid: "",
        },
        userid: "",
        bookingid: "",
      },
      paymentlist: {},
      vmodel: {
        servicetype: "",
        selfstoragestep2: {
          storedetail: {},
          facilities: [],
          active_sq: 0,
          active_month: 0,
          sqfeet: 0,
          duration: 0,
          charges: 0,
        },
      },
      selfstorecharges: {
        store: "",
        storedurations: [],
        storecharges: [],
      },
      errormessage: "",
    };
  },

  validations: {
    appointment: {
      store: { required },
      user: { required },
      date: { required },
      starttime: { required },
      endtime: { required },
    },
    book: {
      commencementdate: { required },
    },
  },

  created() {
    var _optionsStorelist = [];
    APIService.post("/GetStoreForDD").then((response) => {
      for (var store = 0; store < response.data.length; store++) {
        const tag = {
          label:
            response.data[store].storeName +
            " : " +
            response.data[store].branch.label,
          value: response.data[store]._id,
        };
        _optionsStorelist.push(tag);
      }
      this.optionsStore = _optionsStorelist;
    });

    var _optionUserlist = [];
    APIService.post("/registeruserlist").then((response) => {
      for (var user = 0; user < response.data.length; user++) {
        const tag = {
          label:
            response.data[user].firstName +
            " " +
            response.data[user].lastName +
            " -- " +
            response.data[user].email,
          value: response.data[user]._id,
          name:
            response.data[user].firstName + " " + response.data[user].lastName,
          email: response.data[user].email,
        };
        _optionUserlist.push(tag);
      }
      this.optionsUser = _optionUserlist;
    });
  },

  methods: {
    handleSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.errormessage = "";
      var strStartTime = this.appointment.starttime;
      var strEndTime = this.appointment.endtime;
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
        this.$v.$touch();
        if (this.$v.$invalid || this.errormessage) {
          return;
        }
        this.appointment.userId = this.appointment.user.value;
        this.appointment.userName = this.appointment.user.name;
        this.appointment.email = this.appointment.user.email;
        this.appointment.storeid = this.appointment.store.value;
        APIService.post("/addbookappointment", this.appointment).then(
          (response) => {
            this.book.bookingid = response.data.id;
            APIService.post("/addpaymentdetail", this.book).then(() => {
              this.$successAlert("Your Storage Booking Confirm!!!.");
              this.$router.push({ name: "BookAppointmentList" });
            });
          }
        );
      }
    },

    getUserDetail() {
      APIService.getById(
        "/GetUserById",
        this.appointment.user.value,
        false
      ).then((response) => {
        this.book.selfstoragestep2.email = response.data.email;
        this.book.selfstoragestep2.firstname = response.data.firstName;
        this.book.selfstoragestep2.lastname = response.data.lastName;
        this.book.selfstoragestep2.phonenumber = "";
        this.book.selfstoragestep3.firstname = response.data.firstName;
        this.book.selfstoragestep3.lastname = response.data.lastName;
        this.book.selfstoragestep3.address = response.data.address;
        this.book.selfstoragestep3.region = response.data.region;
        this.book.selfstoragestep3.paymentid = "";
        this.book.userid = response.data._id;
      });
    },
    getStoreDetail() {
      APIService.getById("/getstore", this.appointment.store.value, false).then(
        (response) => {
          this.book.selfstoragestep2.storedetail = response.data;
          this.book.servicetype = "selfstorage";
          if (this.$store.state.language === "chinese") {
            response.data.storeName =
              response.data.chineseValues.chineseStoreName;
            response.data.address = response.data.chineseValues.chineseAddress;
            response.data.area = response.data.chineseValues.chineseArea;
            response.data.remarks = response.data.chineseValues.chineseRemarks;
          }
          this.vmodel.selfstoragestep2.storedetail = response.data;
        }
      );

      APIService.getById(
        "/getselfstorechargesbystoreid",
        this.appointment.store.value,
        false
      ).then((response) => {
        this.$set(this, "selfstorecharges", response.data);
        this.vmodel.selfstoragestep2.active_sq = 0;
        this.vmodel.selfstoragestep2.active_month = 0;
        this.calculatecharges();
      });
    },

    comparetime() {
      this.errormessage = "";
      var strStartTime = this.appointment.starttime;
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

        this.appointment.endtime =
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

    toggleClass(sq) {
      this.vmodel.selfstoragestep2.active_sq = sq;
      this.calculatecharges();
    },
    togglemonth(month) {
      this.vmodel.selfstoragestep2.active_month = month;
      this.calculatecharges();
    },
    calculatecharges() {
      if (
        this.selfstorecharges != null &&
        this.selfstorecharges != undefined &&
        this.selfstorecharges != ""
      ) {
        this.vmodel.selfstoragestep2.sqfeet =
          this.selfstorecharges.storecharges[
            this.vmodel.selfstoragestep2.active_sq
          ].usablearea;

        this.vmodel.selfstoragestep2.duration =
          this.selfstorecharges.storedurations[
            this.vmodel.selfstoragestep2.active_month
          ].months;

        var monthlyrate =
          this.selfstorecharges.storecharges[
            this.vmodel.selfstoragestep2.active_sq
          ].monthlyrate;

        var discount =
          this.selfstorecharges.storedurations[
            this.vmodel.selfstoragestep2.active_month
          ].discount;

        this.vmodel.selfstoragestep2.charges = Math.round(
          discount > 0
            ? monthlyrate - (monthlyrate * discount) / 100
            : monthlyrate
        );
        this.book.selfstoragestep2.sqfeet = this.vmodel.selfstoragestep2.sqfeet;
        this.book.selfstoragestep2.duration =
          this.vmodel.selfstoragestep2.duration;
        this.book.selfstoragestep2.charges =
          this.vmodel.selfstoragestep2.charges;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.text-center {
  margin-top: 10px;
}
.active {
  background: #14b7eb !important;
  color: #ffffff !important;
}
.border1 {
  font-size: 25px;
  margin-top: 40px;
  color: #ffffff;
  background: #6c757d;
  width: 375px !important;
  height: 35px;
  text-align: center;
}
.border {
  font-size: 40px;
  background: #ffffff;
  color: #407bff;
  margin-top: 0px;
  width: 375px !important;
  height: 75px;
  text-align: center;
  border-bottom-right-radius: 30px;
}
.button-storecharge {
  border: none;
}
</style>
